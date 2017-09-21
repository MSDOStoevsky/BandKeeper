var request = require('request');
var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;

// your application requests authorization
var auth_options = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
};



module.exports = {
    get_access: ( res ) => {
        request.post(auth_options, function(error, response, body) {
            if (!error && response.statusCode === 200) {
        
                // use the access token to access the Spotify Web API
                res(body.access_token);
                /*var options = {
                    url: 'https://api.spotify.com/v1/users/jmperezperez',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    json: true
                };
                request.get(options, function(error, response, body) {
                    console.log(body);
                });*/
            }
        });
    }
}
