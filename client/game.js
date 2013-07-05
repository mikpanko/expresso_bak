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

Template.game.analysisComplete = function () {
  if (Texts.findOne({game: Session.get("currentGameNum")}))
    return (Texts.findOne({game: Session.get("currentGameNum")}).analysisState === "complete");
  else
    return 0;
};

Template.game.rendered = function () {
	$(".navbar-all").removeClass("active");
  if (Meteor.user() && (Session.get("currentGameNum") === Meteor.user().level))
    $("#navbar-todays-game").addClass("active");
	$("button.disabled").tooltip({title: "you need to play the game before completing it"});
  if (Texts.findOne({game: Session.get("currentGameNum")}).analysisState === "sent")
    $("#analyze-text").button('loading');
};

Template.game.events({

  "click button.to-canvas" : function () {
    Meteor.Router.to("/canvas/" + Session.get("currentGameNum"));
  },

  "click button#complete" : function () {
    Meteor.call("completeGame", Session.get("currentGameNum"));
    Meteor.Router.to("/game/" + Session.get("currentGameNum"));
  },

  "click button#analyze-text" : function () {
    $("#analyze-text").button('loading');
    Meteor.call("analyzeText", Session.get("currentGameNum"), function (error, result) {
      if (!error)
        console.log("sent server call 'analyzeText'");
    });
  },

  "click button#to-stats" : function () {
    Meteor.Router.to("/stats/" + Session.get("currentGameNum"));
  }

});