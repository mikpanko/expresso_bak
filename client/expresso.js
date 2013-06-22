// Client-side JavaScript, bundled and sent to client.

// Texts -- {text: String}
Texts = new Meteor.Collection("texts");

Template.canvas.events({
  'click input#submit-entry' : function () {
    // submitted text entry
    Texts.insert({text: $("#text-entry").val()});
  }
});