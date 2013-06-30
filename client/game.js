// Game template handling
Template.game.game = function () {
  return Games.findOne({number: Session.get("currentGameNum")});
};

Template.game.text = function () {
  return Texts.findOne({game: Session.get("currentGameNum")});
};

Template.game.events({
  "click button.to-canvas" : function () {
    Meteor.Router.to("/canvas/" + Session.get("currentGameNum"));
  },

  "click button#complete" : function () {
    Meteor.call("completeGame", Session.get("currentGameNum"));
    Meteor.Router.to("/game/" + Session.get("currentGameNum"));
  }
});