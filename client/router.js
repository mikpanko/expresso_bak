// Router

Meteor.Router.add({
  "/": "main",

  "/game": { to: "game", and: function() {
    if (Meteor.user())
      Session.set("currentGameNum", Math.min(Meteor.user().level, Games.find().count()));
  }},

  "/playbook": "playbook",

  "/game/:id": { to: "game", and: function(id) {
    Session.set("currentGameNum", parseInt(id));
  }},

  "/canvas/:id": { to: "canvas", and: function(id) {
    Session.set("currentGameNum", parseInt(id));
  }}
});