// Game template handling
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