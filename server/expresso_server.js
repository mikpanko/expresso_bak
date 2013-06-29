// Server-side JavaScript

// Publish collections
Meteor.publish("texts", function () {
  return Texts.find();
});

Meteor.publish("games", function () {
  return Games.find();
});

Meteor.publish("userData", function () {
  return Meteor.users.find({_id: this.userId}, {fields: {"level": 1}});
});


// Customize user creation
Accounts.onCreateUser( function(options, user) {
	user.level = 1;
	Texts.insert({
		userId: user._id,
		game: 1,
		text: "",
		active: true,
		timeWritten: 0,
		timeCreated: new Date().getTime()
	});
	return user;
});