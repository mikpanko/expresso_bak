// Server-side JavaScript

Meteor.publish("texts", function () {
  return Texts.find();
});

Meteor.publish("games", function () {
  return Games.find();
});