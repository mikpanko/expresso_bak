// Canvas template handling

Template.canvas.game = function () {
  return Games.findOne({number: Session.get("currentGameNum")});
};

Template.canvas.text = function () {
  return Texts.findOne({game: Session.get("currentGameNum")});
};

Template.canvas.saved = function () {
  return Session.get("saved");
};

Template.canvas.rendered = function () {
  $(".navbar-all").removeClass("active");
  if (Meteor.user() && (Session.get("currentGameNum") === Meteor.user().level))
    $("#navbar-todays-game").addClass("active");
};

Template.canvas.events({
  'keyup textarea#text-entry' : function () {
    // updated text entry
    if ($("#text-entry").val() !== Texts.findOne({game: Session.get("currentGameNum")}).text) {
      Session.set("saved", false);
      if (!Session.get("timerId")) {
        var timerId = Meteor.setTimeout(function () {
          console.log("Timer ran out.");
          Texts.update(Texts.findOne({game: Session.get("currentGameNum")})._id, {$set: {text: $("#text-entry").val()}});
          Session.set("timerId", 0);
          Session.set("saved", true);
        }, 3000);
        Session.set("timerId", timerId);
      }
    }
  }
});