// Client-side JavaScript, bundled and sent to client.

// Subscriptions
Deps.autorun(function () {

  Meteor.autosubscribe(function () {
    Meteor.subscribe("userData");
  });
  
  var level;
  if (Meteor.user())
    level = Meteor.user().level;
  else
    level = 0;
  Meteor.subscribe("games", level, function () {
    console.log(level + "***");
  });
  
  Meteor.subscribe("texts", function () {
    console.log("exist starting text for current game = " + Texts.find({game: Session.get("currentGameNum")}).count());
    if (Texts.findOne({game: Session.get("currentGameNum")})) {
      Session.set("saved", true);
      console.log("value of saved = " + Session.get("saved"));
    }
  });

});

// Startup
Meteor.startup(function () {

});