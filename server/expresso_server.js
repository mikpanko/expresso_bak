// Server-side JavaScript

// Publish collections
Meteor.publish("texts", function () {
  return Texts.find({userId: this.userId});
});

Meteor.publish("games", function (level) {
	if (this.userId) {
  	return Games.find({number: {$lte: level}});
  }
  else
  	return null;
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


// Handle calls
Meteor.methods({

	completeGame: function (gameNum) {
		Texts.update({userId: this.userId, game: gameNum}, {$set: {active: false}});
		Texts.insert({
			userId: this.userId,
			game: gameNum+1,
			text: "",
			active: true,
			analysisState: "none",
			timeWritten: 0,
			timeCreated: new Date().getTime()
		});
		level = Meteor.user().level;
		if (level <= Games.find().count())
			Meteor.users.update({_id: this.userId}, {$inc: {level: 1}});
		return true;
	},

	startedGame: function (gameNum) {
		Texts.update({userId: this.userId, game: gameNum}, {$set: {timeWritten: new Date().getTime()}});
	},

	analyzeText: function (gameNum) {
		var userId = this.userId;
		Texts.update({userId: this.userId, game: gameNum}, {$set: {analysisState: "sent"}});
    Meteor.http.call("POST", "http://dry-inlet-8038.herokuapp.com/analyze-text",
      {data: {text: Texts.findOne({userId: userId, game: gameNum}).text}},
      function (error, result) {
        if (result.statusCode === 200) {
        	console.log("received analyzed text");
        	Texts.update({userId: userId, game: gameNum}, {$set: result.data});
        	Texts.update({userId: userId, game: gameNum}, {$set: {analysisState: "complete"}});
        }
        console.log(Texts.findOne({userId: userId, game: gameNum}));
        console.log(JSON.stringify(result));
    });
  }

});