// Client-side JavaScript, bundled and sent to client.


// Subscriptions
Deps.autorun(function () {
  
  Meteor.subscribe("games", function () {
    Session.set("maxGameNum", Games.find().count());
  });
  
  Meteor.subscribe("texts", function () {
    console.log("exist starting text for current game = " + Texts.find({game: Session.get("currentGameNum")}).count());
    if (Texts.findOne({game: Session.get("currentGameNum")})) {
      Session.set("saved", true);
      console.log("value of saved = " + Session.get("saved"));
    }
  });

});


// Router
Meteor.Router.add({
  "/": { to: "main", and: function() {
    $(".navbar-all").removeClass("active");
  }},

  "/game": { to: "game", and: function() {
    Session.set("currentGameNum", Session.get("maxGameNum"));
    $(".navbar-all").removeClass("active");
    $("#navbar-todays-game").addClass("active");
  }},

  "/playbook": { to: "playbook", and: function() {
    $(".navbar-all").removeClass("active");
    $("#navbar-playbook").addClass("active");    
  }},

  "/game/:id": { to: "game", and: function(id) {
    Session.set("currentGameNum", parseInt(id));
    $(".navbar-all").removeClass("active");
    if (Session.get("currentGameNum") === Session.get("maxGameNum"))
      $("#navbar-todays-game").addClass("active");
  }},

  "/canvas/:id": { to: "canvas", and: function(id) {
    Session.set("currentGameNum", parseInt(id));
    $(".navbar-all").removeClass("active");
    if (Session.get("currentGameNum") === Session.get("maxGameNum"))
      $("#navbar-todays-game").addClass("active");
  }}
});


// Playbook template
Template.playbook.games = function () {
  return Games.find();
};


// Game template
Template.game.game = function () {
  return Games.findOne({number: Session.get("currentGameNum")});
};

Template.game.activeGame = function () {
  return (Session.get("currentGameNum") === Session.get("maxGameNum"));
};

Template.game.events({
  'click button.to-canvas' : function () {
    Meteor.Router.to("/canvas/" + Session.get("currentGameNum"));
  }
});


// Canvas template
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
    if ($("#text-entry").val() !== Texts.findOne({game: Session.get("currentGameNum")}).text) {
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


// Startup
Meteor.startup(function () {
});