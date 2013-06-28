// if the database is empty on server start, create some sample data.
Meteor.startup(function () {

  if (Games.find().count() === 0) {
    var data = [
      { number: 1,
        name: "Game #1",
        description: "This is description of Game #1"
      },
      { number: 2,
        name: "Game #2",
        description: "This is description of Game #2"
      },
      { number: 3,
        name: "Game #3",
        description: "This is description of Game #3"
      }
    ];
    for (var i = 0; i < data.length; i++)
      Games.insert({number: data[i].number,
        name: data[i].name,
        description: data[i].description
      });
  }

  if (Texts.find().count() === 0) {
    var data = [
      { game: 1,
        text: "This is text of Game #1"
      },
      { game: 2,
        text: "This is text of Game #2"
      },
      { game: 3,
        text: ""
      }
    ];
    for (var i = 0; i < data.length; i++)
      Texts.insert({game: data[i].game,
        text: data[i].text
      });
  }

});
