// Canvas template handling
Template.canvas.game = function () {
  return Games.findOne({number: Session.get("currentGameNum")});
};

Template.canvas.activeGame = function () {
  return (Session.get("currentGameNum") === Session.get("maxGameNum"));
};

Template.canvas.saved = function () {
  return Session.get("saved");
};

Template.canvas.text = function () {
  var currentText = Texts.findOne({game: Session.get("currentGameNum")});
  if (currentText)
    return currentText.text;
  else
    return "";
};

Template.canvas.events({
  'keyup textarea#text-entry' : function () {
    // updated text entry
    if ((!Texts.findOne({game: Session.get("currentGameNum")})) ||
      ($("#text-entry").val() !== Texts.findOne({game: Session.get("currentGameNum")}).text)) {
      Session.set("saved", false);
      if (!Session.get("timerId")) {
        var timerId = Meteor.setTimeout(function () {
          console.log("Timer ran out.");
          if (!Texts.findOne({game: Session.get("currentGameNum")}))
            Texts.insert({game: Session.get("currentGameNum"),
              text: $("#text-entry").val()});
          else
            Texts.update(Texts.findOne({game: Session.get("currentGameNum")})._id, {$set: {text: $("#text-entry").val()}});
          Session.set("timerId", 0);
          Session.set("saved", true);
        }, 3000);
        Session.set("timerId", timerId);
      }
    }
  }
});