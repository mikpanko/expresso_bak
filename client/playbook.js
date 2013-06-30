// Playbook template handling

Template.playbook.games = function () {
	var games = Games.find().fetch();
	for (var i=0; i<games.length; i++)
		games[i].active = Texts.findOne({game: i+1}).active;
  return games;
};

Template.playbook.rendered = function () {
  $(".navbar-all").removeClass("active");
  $("#navbar-playbook").addClass("active");
};