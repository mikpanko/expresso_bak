// Javascript loaded both on server and client sides

// Games -- {number: int, name: string, description: string}
Games = new Meteor.Collection("games");

// Texts -- {text: string, game: game_id}
Texts = new Meteor.Collection("texts");
