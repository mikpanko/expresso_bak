// Client-side JavaScript, bundled and sent to client.


// Subscriptions
Deps.autorun(function () {

  //Meteor.autosubscribe(function () {
    Meteor.subscribe("userData");
  //});
  
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


// Startup
Meteor.startup(function () {

});