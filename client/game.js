// Game template handling

Template.game.game = function () {
  return Games.findOne({number: Session.get("currentGameNum")});
};

Template.game.text = function () {
  return Texts.findOne({game: Session.get("currentGameNum")});
};

Template.game.emptyText = function () {
	if (Texts.findOne({game: Session.get("currentGameNum")}))
  	return (Texts.findOne({game: Session.get("currentGameNum")}).text === "");
  else
  	return 1;
};

Template.game.rendered = function () {
	$(".navbar-all").removeClass("active");
  if (Meteor.user() && (Session.get("currentGameNum") === Meteor.user().level))
    $("#navbar-todays-game").addClass("active");
	$("button.disabled").tooltip({title: "you need to complete the game before proceeding"});
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