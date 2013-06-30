// Create games collection, if the database is empty on server start

Meteor.startup(function () {

  if (Games.find().count() === 0) {
    var data = [
      { number: 1,
        name: "Game #1",
        description: "This is description of Game #1."
      },
      { number: 2,
        name: "Game #2",
        description: "This is description of Game #2."
      },
      { number: 3,
        name: "Game #3",
        description: "This is description of Game #3."
      },
      { number: 4,
        name: "Game #4",
        description: "This is description of Game #4."
      },
      { number: 5,
        name: "Game #5",
        description: "This is description of Game #5."
      }
    ];
    for (var i = 0; i < data.length; i++)
      Games.insert({number: data[i].number,
        name: data[i].name,
        description: data[i].description
      });
  }

});
