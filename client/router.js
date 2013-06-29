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