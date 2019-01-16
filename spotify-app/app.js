var express = require('express');
var request = require('request');
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const Sequelize = require('sequelize')
const logger = require('morgan');
const axios = require('axios');

const sequelize = new Sequelize('spotify_database', 'root', '', {
    dialect: "mysql",
    host: "localhost",
    define: {
        timestamps: false
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
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3, 40]
        },
        set(value) {
            this.setDataValue('name', value.toLowerCase())
        }
    }
})

const Preferences = sequelize.define('preferences', { id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }}); 
const UserPreferences = sequelize.define('user_preferences');

Tags.belongsToMany(WeatherTypes, { through: Preferences });
WeatherTypes.belongsToMany(Tags, { through: Preferences });

Users.belongsToMany(Preferences, { through: UserPreferences });
Preferences.belongsToMany(Users, { through: UserPreferences });

const app = express()
app.use(express.static(__dirname + '/public'))
    .use(cors())
    .use(cookieParser())
    .use(bodyParser.json())
    .use(logger());


const newTags = [
		{"name": "calmness"},
		{"name": "chill"},
		{"name": "classic"},
		{"name": "dance"},
		{"name": "dark"},
		{"name": "electronic"},
		{"name": "energy"},
		{"name": "focus"},
		{"name": "gaming"},
		{"name": "happy"},
		{"name": "instrumental"},
		{"name": "lounge"},
		{"name": "oldschool"},
		{"name": "party"},
		{"name": "positive-vibes"},
		{"name": "quiet"},
		{"name": "romance"},
		{"name": "sadness"},
		{"name": "sentimental"},
		{"name": "soft"},
		{"name": "uplifting"},
		{"name": "workout"}
	]
	
	const weatherTypes = [
	    {"type":"snowy"},
	    {"type":"sunny"},
	    {"type":"cloudy"},
	    {"type":"rainy"}
	]

//             ENDPOINTS SEQUELIZE

app.get('/createdb', (request, response) => {
    sequelize.sync({ force: true }).then(() => {
        WeatherTypes.bulkCreate(weatherTypes).then(wtResults => {
            Tags.bulkCreate(newTags, {returning: true}).then(tagResult => {
                const wtResultArray = [];
                wtResults.forEach(wt => {
                    wt.setTags(tagResult, {returning: true}).then(final => {
                        wtResultArray.push(final);
                    })
                })
                response.status(201).json({wtResults, tagResult, wtResultArray});    
                        
            })
        })
    }).catch((err) => {
        console.log(err)
        response.status(200).send('could not create tables')
    })
})

app.post('/users', (request, response) => {
    const newUser = request.body.newUser;
    Users.create(newUser).then(userResult => {
        response.status(201).json(userResult);
    }).catch(err => {
        response.status(500).json(err);
    })
})

app.get('/users', (request, response) => {
    Users.findAll().then(result => { 
        response.status(200).json(result);
    });
})

app.put('/users/:userId', (request, response) => {
    const userId = request.params.userId;
    const newName = request.body.newName;
    Users.find({ where: { id: userId }}).then(user => {
        return user.update({name: newName});
    }).then(updatedUser => {
        response.status(200).json(updatedUser);
    }).catch(err => {
        response.status(500).json(err);
    });
})

app.delete('/users/:userId', (request, response) => {
    const userId = request.params.userId;
    Users.find({ where: {id: userId}}).then(user => {
        return user.destroy();
    }).then(() => 
        response.status(200).send('The user was succesfully deleted')
    ).catch(err =>
        response.status(500).json(err)
    );
    
})

app.post('/weatherTypes', (request, response) => {
    const newTypes = request.body.newTypes;
    WeatherTypes.bulkCreate(newTypes).then(result => {
        response.status(201).json(result);
    }).catch(err => { 
        response.status(500).json(err);
    })
})

app.get('/weatherTypes', (request, response) => {
    WeatherTypes.findAll().then(result => {
        response.status(200).json(result);
    }).catch(err => { 
        response.status(500).send(err);
    });
})

app.put('/weatherTypes/:weatherTypeId', (request, response) =>{
    const weatherTypeId = request.params.weatherTypeId;
    const newType = request.body.newType;
    WeatherTypes.findOne({where: { id: weatherTypeId}})
    .then(updatedWeather => {
        return updatedWeather.update({type: newType})
    }).then((updatedWeather) => {
        response.status(200).json(updatedWeather);
    }).catch((err) => {
        response.status(500).json(err)
    })
})

app.delete('/weatherTypes/:weatherTypeId', (request, response) => {
    const weatherTypeId = request.params.weatherTypeId;
    WeatherTypes.findOne({where: {id: weatherTypeId}}).then(result => {
        return result.destroy();
    }).then(() => {
        response.status(200).send('weather type succesfully deleted');
    }).catch(err => { 
        response.status(500).json(err);
    });
})


app.post('/tags', (request, response) => {
    const newTags = request.body.newTags;
    Tags.bulkCreate(newTags).then(result => {
        response.status(201).json(result);
    }).catch(err => {
        response.status(500).json(err);
    })
})

app.get('/tags', (request, response) => {
    Tags.findAll().then(result => { 
        response.status(200).json(result);
    }).catch(err => { 
        response.status(500).json(err) 
    });
})

app.put('/tags/:tagId', (request, response) =>{
     const tagId = request.params.tagId;
     const newTag = request.body.newTag;
     Tags.findOne({where:{id: tagId}}).then((updatedTag) => {
         return updatedTag.update({name: newTag});
     }).then((updatedTag) => {
         response.status(200).json(updatedTag);
     }).catch((err) => {
         response.status(500).json(err);
     })
    
})

app.delete('/tags/:tagId', (request, response) => {
    const tagId = request.params.tagId;
    Tags.find({where: { id: tagId }}).then(tag => {
        return tag.destroy();
    }).then(() => {
        response.status(200).send('tag deleted');  
    }).catch(err => {
        response.status(500).json(err);
    })
})


app.post('/preferences', (request, response) => {
    const UserId = request.body.userId;
    const newPreferences = request.body.newPreferences;
    let tagsIds = [], weatherTypesIds = [];
    newPreferences.forEach(pref => {
        tagsIds.push(pref.tagId);
        weatherTypesIds.push(pref.weatherTypeId);
    })
    let foundUser;
    Users.findOne({ where: { id: UserId } })
        .then(user => {
            foundUser = user;
            return Preferences.findAll({
                where: {
                    tagId: tagsIds,
                    weatherTypeId: weatherTypesIds
                }
            });
        }).then(allPreferences => {
            return foundUser.setPreferences(allPreferences);
        }).then(() => response.status(200).send("the user's preferences have been set"))
        .catch(err => response.status(500).send(err))
})

app.get('/preferences/:userId', (request, response) => {
    const userId = request.params.userId;
    Users.findOne({
        where: {id: userId},
        include: [{
            model: Preferences, 
            through: { where: { userId: userId }, attributes: [] } 
        }]
    }).then(result => {
        return response.status(200).json(result);
    }).catch(err => {
        response.status(500).json(err);
    })
})

//             SPOTIFY API ENDPOINTS

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
    if (searchGenre)
        url = `${spotifySearchEndpoint}?q=${searchTerm} genre:${searchGenre}&type=track`;
    else
        url = `${spotifySearchEndpoint}?q=${searchTerm}&type=track`;
    var searchOptions = {
        url: url,
        headers: {
            'Authorization': bearer
        }
    }

    request.get(searchOptions, function (error, response, body) {
        console.error(error);
        const parsedBody = JSON.parse(body);
        if (parsedBody.error) {
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
                track.id = item.id;
                track.uri = item.uri;
                item.artists.forEach(artist => track.artists.push(artist.name));
                resultTracks.push(track);
            })
            res.status(200).json(resultTracks);
        } catch (ex) {
            console.error(ex.stack);
            res.status(500).send("There's been an error on the server");
        }
    })
})



function removeDuplicates(arr){
    let unique_array = []
    for(let i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1){
            unique_array.push(arr[i])
        }
    }
    return unique_array
}

function getPlaylistsForCategory(category) {
    return `https://api.spotify.com/v1/browse/categories/${category}/playlists`;
}


const spotifyBrowseEndpoint = 'https://api.spotify.com/v1/browse/categories';
app.get('/recommendations', (req, res) => {
    // preferintele se vor trimite ca string-uri, intr-un query numit preferences, separate prin virgula
    let preferences = req.query.preferences.split(",");
    if (preferences == undefined) {
        res.status(400).send('One or more parameteres are missing!');
        return;
    }
    
    let bearer = req.get('Authorization') || null;
    if (!bearer) {
        res.status(400).send('Authorization token not correct or missing!');
        return;
    }
    let categoriesToBrowse = [];
    let playlistsToBrowse = [];
    if( preferences.includes('calmness') || preferences.includes('chill') 
        || preferences.includes('focus') || preferences.includes('quiet') || preferences.includes('soft')) {
            categoriesToBrowse.push('chill');
            categoriesToBrowse.push('focus');
            categoriesToBrowse.push('sleep');
            categoriesToBrowse.push('mood');
            playlistsToBrowse.push('chill');
            playlistsToBrowse.push('quiet');
        }
    
    if (preferences.includes('classical') || preferences.includes('instrumental')) {
        categoriesToBrowse.push('classical');
        playlistsToBrowse.push('piano');
        playlistsToBrowse.push('guitar');
    }
    
    if (preferences.includes('gaming')) {
        categoriesToBrowse.push('gaming');
    }
    
    if (preferences.includes('workout')) {
        categoriesToBrowse.push('workout');
    }
    
    if (preferences.includes('dance') || preferences.includes('electronic')) {
        categoriesToBrowse.push('edm_dance');
    }
    
    if (preferences.includes('party')) {
        categoriesToBrowse.push('party');
    }
    
    if (preferences.includes('workout')) {
        categoriesToBrowse.push('workout');
    }
    
    if (preferences.includes('oldschool')) {
        categoriesToBrowse.push('hiphop');
        playlistsToBrowse.push('gold');
        playlistsToBrowse.push('90');
    }
    
    if (preferences.includes('lounge')) {
        categoriesToBrowse.push('jazz');
        categoriesToBrowse.push('blues');
    }
    
    if (preferences.includes('happy') || preferences.includes('positive-vibes')
        || preferences.includes('uplifting') || preferences.includes('energy')) {
        categoriesToBrowse.push('mood');
        playlistsToBrowse.push('feeling good');
        playlistsToBrowse.push('happy');
        playlistsToBrowse.push('energy');
        playlistsToBrowse.push('boost');
    }
    
    if (preferences.includes('romance') || preferences.includes('sentimental')) {
        categoriesToBrowse.push('romance');
    }
    
    if (preferences.includes('dark') || preferences.includes('sadness')) {
        categoriesToBrowse.push('mood');
        categoriesToBrowse.push('romance');
        playlistsToBrowse.push('life sucks');
        playlistsToBrowse.push('sad');
        playlistsToBrowse.push('broken');
    }
    
    categoriesToBrowse = removeDuplicates(categoriesToBrowse);
    playlistsToBrowse = removeDuplicates(playlistsToBrowse);
    const headers = {
        Authorization: bearer,
    }
    let categoriesRequests = categoriesToBrowse.map(categ => axios.get(getPlaylistsForCategory(categ), {headers}));
    Promise.all(categoriesRequests).then(result => {
        console.log('first promise all');
        let allPlaylists = [];
        result.forEach(item => {
            let random = Math.random() >= 0.5;
            if (random) {
                let firstPlaylists = item.data.playlists.items.filter(pl => {
                    for(let i = 0; i < playlistsToBrowse.length; i++) {
                        let p = playlistsToBrowse[i];
                        if(pl.name.toLowerCase().indexOf(p) > 0) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                    
                });
                allPlaylists.push(...firstPlaylists);
            } else {
                random = Math.min(parseInt(Math.random() * 10), item.data.playlists.items.length - 3);
                let firstPlaylists = item.data.playlists.items.slice(random, random+2);
                allPlaylists.push(...firstPlaylists);
            }
        });
        console.log('allPlaylists length='+ allPlaylists.length);

        let trackRequests = allPlaylists.map(p => axios.get(p.tracks.href, {headers}));
        let allTracks = [];
        Promise.all(trackRequests).then(secondResult => {
            console.log('second promise all');
            
            secondResult.forEach(trackResult => {
                let random = Math.min(parseInt(Math.random() * 10), trackResult.data.items.length - 5);
                let firstTracks = trackResult.data.items.slice(random,random+4);
                allTracks.push(...firstTracks);
            })
            console.log('allTracks length='+ allTracks.length);
            const finalTracks = allTracks.map(t => {
                const { id, uri, name, duration_ms, preview_url } = t.track;
                let artists = t.track.artists.map(a => a.name);
                let image_url = t.track.album.images ? t.track.album.images[0].url : 'http://placekitten.com/300/300';
                return {
                    id, uri, name, duration_ms, artists, image_url, preview_url
                }
            })
            res.json(finalTracks);
        })
    })
    
})



const spotifyPlaylistEndpoint = 'https://api.spotify.com/v1/me/playlists';
app.get('/playlists', (req, res) => {
    let bearer = req.get('Authorization') || null;
    if (!bearer) {
        res.status(400).send('Authorization token not correct or missing!');
        return;
    }
    var searchOptions = {
        url: spotifyPlaylistEndpoint,
        headers: {
            'Authorization': bearer
        }
    }

    request.get(searchOptions, function (error, response, body) {
        try {
            const parsedBody = JSON.parse(body);
            if (parsedBody.error) {
                res.status(response.statusCode).json(parsedBody.error);
                return;
            }
            res.status(200).json(parsedBody);
        }
        catch (ex) {
            console.error(ex.stack);
            res.status(500).send("There's been an error on the server");
        }

    })
})

const spotifyPutPlaylistEndpoint = 'https://api.spotify.com/v1/playlists';
app.put('/playlists', (req, res) => {
    let bearer = req.get('Authorization') || null;
    if (!bearer) {
        res.status(400).send('Authorization token not correct or missing!');
        return;
    }
    const newPlaylistName = req.body.name;
    const playlistId = req.body.playlistId;

    var playlistUpdateOptions = {
        url: spotifyPutPlaylistEndpoint + '/' + playlistId,
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        },
        json: {
            name: newPlaylistName,
        }
    }

    request.put(playlistUpdateOptions, function (error, response, body) {
        try {
            if (response.statusCode !== 200) {
                res.status(response.statusCode).send(body);
            } else {
                res.status(200).send('OK');
            }
        } catch (ex) {
            console.error(ex.stack);
            res.status(500).send("There's been an error on the server");
        }
    })
})

const playlistEndpoint = 'https://api.spotify.com/v1/playlists/';
app.delete('/playlists', (req, res) => {
    let bearer = req.get('Authorization') || null;
    if (!bearer) {
        res.status(400).send('Authorization token not correct or missing!');
        return;
    }

    const playlistId = req.query.playlistId;
    const trackURI = req.query.trackURI;
    console.log(trackURI);
    if (!trackURI) {
        var playlistUpdateOptions = {
            url: playlistEndpoint + playlistId + '/followers',
            headers: {
                'Authorization': bearer
            }
        }
    }
    else {
        var playlistUpdateOptions = {
            url: playlistEndpoint + playlistId + '/tracks',
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json'
            },
            json: {
                tracks: [
                    { "uri": trackURI }
                ]
            }
        }
    }
    console.log(playlistUpdateOptions.url);
    request.delete(playlistUpdateOptions, function (error, response, body) {
        try {
            if (response.statusCode !== 200) {
                res.status(response.statusCode).send(body);
            } else {
                res.status(200).send('OK');
            }
        } catch (ex) {
            console.error(ex.stack);
            res.status(500).send("There's been an error on the server");
        }
    })
})

app.post('/playlists', (req, res) => {
    let bearer = req.get('Authorization') || null;
    if (!bearer) {
        res.status(400).send('Authorization token not correct or missing!');
        return;
    }

    const playlistId = req.body.playlistId;
    const trackURI = req.body.uri;
    console.log(trackURI);
    var playlistUpdateOptions = {
        url: playlistEndpoint + playlistId + '/tracks',
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        },
        json: {
            uris: [trackURI]
        }
    }

    console.log(playlistUpdateOptions.url);
    request.post(playlistUpdateOptions, function (error, response, body) {
        try {
            if (response.statusCode !== 200) {
                res.status(response.statusCode).send(body);
            } else {
                res.status(200).send('OK');
            }
        } catch (ex) {
            console.error(ex.stack);
            res.status(500).send("There's been an error on the server");
        }
    })
})

const featuresEndpoint= 'https://api.spotify.com/v1/audio-features/';
app.get('/features/:track_id', (req, res) => {
    let bearer = req.get('Authorization') || null;
    if (!bearer) {
        res.status(400).send('Authorization token not correct or missing!');
        return;
    }
    
    const track_id = req.params.track_id;
    if(!track_id) {
        res.status(400).send('Track id parameter is missing!');
        return;
    }
    
    const featuresOptions = {
        url: featuresEndpoint + track_id,
        headers: {
            'Authorization': bearer
        }
    }
    
    request.get(featuresOptions, function(error, response, body) {
        console.log('body', body);
        console.log('error', error);
        try {
            const parsedBody = JSON.parse(body);
            if(body.error) {
                res.status(response.statusCode).json(body.error);
            } else {
                res.status(200).send(parsedBody);
            }
        } catch (ex) {
            console.error(ex.stack);
            res.status(500).send("There's been an error on the server");
        }
    })
})


//       SPOTIFY INTEGRATION LOGIC

var client_id = 'ed1ca454291b4e9b91b36f6d003c347c';
var client_secret = 'fa0cd02ded7c45c7b55d563fa11f0559';
var base_url = 'https://fast-and-curious-andreeabajenaru.c9users.io';
var redirect_uri = base_url + ':8081/callback'; // MODIFY HERE WITH OWN REDIRECT-URI

var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

var stateKey = 'spotify_auth_state';

app.get('/login', function (req, res) {

    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    var scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
});

app.get('/callback', function (req, res) {
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

        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {

                var access_token = body.access_token,
                    refresh_token = body.refresh_token;

                res.redirect(base_url + '/#' +
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

app.get('/refresh_token', function (req, res) {
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

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            res.send({
                'access_token': access_token
            });
        }
    });
});


app.listen(8081, function () {
    console.log('Server started. Listening on 8081');
});
