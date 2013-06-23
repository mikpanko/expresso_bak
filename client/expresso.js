// Client-side JavaScript, bundled and sent to client.

Template.canvas.saved = function () {
  return Session.get("saved");
};

Template.canvas.startingText = function () {
  return Session.get("startingText");
};

Template.canvas.startedTyping = function () {
  return Session.get("startedTyping");
};

Template.canvas.events({
  'keypress textarea#text-entry' : function () {
    // updated text entry
    Session.set("startedTyping", true);
    Session.set("saved", false);
    if (!Session.get("timerId")) {
      var timerId = Meteor.setTimeout(function () {
        console.log("Timer ran out.");
        if (!Texts.find().count())
          Texts.insert({text: $("#text-entry").val()});
        else
          Texts.update(Texts.findOne()._id, {text: $("#text-entry").val()});
        Session.set("timerId", 0);
        Session.set("saved", true);

      }, 3000);
      Session.set("timerId", timerId);
    }
  }
});

Meteor.startup(function () {
  Session.set("dataLoaded", false);

  // subscribe to Texts collection
  Meteor.subscribe("texts", function () {
    //Set the reactive session as true to indicate that the data have been loaded
    Session.set('dataLoaded', true);
    console.log("number of text entries = " + Texts.find().count());
    // flag - text saved - and starting text on canvas
    if (!Texts.find().count()) {
      Session.set("saved", false);
      console.log("value of saved = " + Session.get("saved"));
      Session.set("startingText", "");
    }
    else {
      Session.set("saved", true);
      console.log("value of saved = " + Session.get("saved"));
      Session.set("startingText", Texts.findOne().text);
    }
  });

  // timer identifier
  Session.setDefault("timerId", 0);  

  // timer identifier
  Session.setDefault("startedTyping", false);
});