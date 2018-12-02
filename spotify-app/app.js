var express = require('express');
var request = require('request');
var cors = require('cors');
var querystring = require('querystring'); 
var cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const Sequelize = require('sequelize')

const sequelize = new Sequelize('spotify_database', 'root', '', {
    dialect: "mysql",
    host: "localhost",
    define : {
		timestamps : false
	}
})

sequelize.authenticate().then(() => {
    console.log("Connected to database")
}).catch(() => {
    console.log("Unable to connect to database")
})

//         model de date
const Tags = sequelize.define('tags', {
    name: Sequelize.STRING,
})

const WeatherTypes = sequelize.define('weather_types', {
    type: Sequelize.STRING,
})

const Users = sequelize.define('users', {
   name : {
		type : Sequelize.STRING,
		allowNull : false,
		validate : {
			len : [3,40]
		},
		set(value){
			this.setDataValue('name', value.toLowerCase())
		}
	}
})

const Preferences = sequelize.define('preferences');
const UserPreferences = sequelize.define('user_preferences');

Tags.belongsToMany(WeatherTypes, { through: Preferences });
WeatherTypes.belongsToMany(Tags, { through: Preferences });

Users.belongsToMany(Preferences, { through: UserPreferences });
Preferences.belongsToMany(Users, { through: UserPreferences });

const app = express()
app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser())
   .use(bodyParser.json());

var client_id = 'ed1ca454291b4e9b91b36f6d003c347c';
var client_secret = 'fa0cd02ded7c45c7b55d563fa11f0559';
var redirect_uri = 'https://my-project-irisalexandrescu.c9users.io/callback';

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';


app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  var scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});


app.get('/createdb', (request, response) => {
    sequelize.sync({force:true}).then(() => {
        response.status(200).send('tables created')
    }).catch((err) => {
        console.log(err)
        response.status(200).send('could not create tables')
    })
})

app.post('/userPreferences', (req, res) =>{
  const UserId = req.body.userId;
  const WeatherId = req.body.weatherId
  const TagId = req.body.tagId
  let foundUser;
  Users.find({where: { id : UserId }})
  .then(user => {
     foundUser = user;
   return Preferences.findOrCreate({where: {tagId : TagId, weatherTypeId: WeatherId }})
  }).then(preferences =>{
    return foundUser.setPreferences(preferences[0]);
  }).then(() => res.status(200).send("the user's preferences had been set"))
    .catch((err) =>res.status(500).send(err))
  
})

//          --- endpoints ---

const spotifySearchEndpoint = 'https://api.spotify.com/v1/search';

app.get('/search', (req, res) => {
  const searchTerm = req.query.term;
  const searchGenre = req.query.genre;
  if (searchTerm == undefined) {
    res.status(400).send('One or more parameteres are missing!');
    return;
  }
  let bearer = req.get('Authorization') || null;
  if (!bearer) {
    res.status(400).send('Authorization token not correct or missing!');
    return;
  }
  let url;
  if(searchGenre)
    url = `${spotifySearchEndpoint}?q=${searchTerm} genre:${searchGenre}&type=track,album,artist&`;
  else 
    url = `${spotifySearchEndpoint}?q=${searchTerm}&type=track,album,artist&`
  var searchOptions = {
    url: url,
    headers: {
      'Authorization': bearer
    }
  }
      
  request.get(searchOptions, function(error, response, body) {
    console.error(error);
    const parsedBody = JSON.parse(body);
    if(parsedBody.error) {
      res.status(500).json(parsedBody.error);
      return;
    }
    try {
      const resultTracks = [];
      parsedBody.tracks.items.forEach(item => {
        let track = {};
        track.name = item.name;
        track.duration = item.duration;
        track.preview_url = item.preview_url;
        track.artists = [];
        track.image_url = item.album.images[1].url;
        item.artists.forEach(artist => track.artists.push(artist.name));
          resultTracks.push(track);
      })
      res.status(200).json(resultTracks);
    } catch(ex) {
      console.error(ex.stack);
      res.status(500).send("There's been an error on the server");
    }
  })
})



console.log('Listening on 8080');
app.listen(8080);
