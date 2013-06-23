// Server-side JavaScript

Meteor.publish("texts", function () {
  return Texts.find();
});
