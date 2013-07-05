// Stats template handling

Template.stats.game = function () {
  return Games.findOne({number: Session.get("currentGameNum")});
};

Template.stats.stats = function () {
  return Texts.findOne({game: Session.get("currentGameNum")});
};

Template.stats.rendered = function () {
	$(".navbar-all").removeClass("active");
  if (Meteor.user() && (Session.get("currentGameNum") === Meteor.user().level))
    $("#navbar-todays-game").addClass("active");
};

Template.stats.events({
  
});