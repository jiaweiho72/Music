import { exp } from "react-native-reanimated";
import SpotifyWebApi from "spotify-web-api-js"
import { getData } from './firebaseConfig'
import { Alert} from 'react-native';




async function getToken() {
    let result;
    const data = await getData()
    .then(data => {
        if (data != null) {
            //console.log("data: " + data.Spotify )
            result = data.Spotify;
        }
        
    })
    return result;
    /*
    .catch(error => Alert.alert('Error Setting Data', error.message, [
      { text: 'OK', onPress: () => null },
    ])
    )
    */
    //return 'BQBKFAyYV7QEpUWWaBKbigHTrpfefEmW69RUuF72dDf9QFW8-MCl1CPP-1VvfYJklOpuCjv-3qB-bvDEcxg9VeX5aSs_Mfvz1ygcydOfBRFH_BzX7hsCds2YIadUAokYUNQJ_CqghoCcSSXS7S3ZK0mmy1RVOHVwwqvuRUm9f-q7Jlpmk0OJVz7JNncwwuEVAnLdC7G0Go-7YhsBw6wGM4-W1NhvrHU1QZMuzpQpFfq4Tw';
    //return data.Spotify;
}

let token = '';
token = getToken();

var Spotify = require('spotify-web-api-js');
//var s = new Spotify();

let client_id = 'fa0e91b1fbca40a6975edb5a456fcae5';
let client_secret = 'a0d451e4eeb048da8ccf693b14c80f11';

const spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
});
//spotifyApi.setClientId(client_id);
//spotifyApi.setClientSecret(client_secret);
spotifyApi.setAccessToken(getToken());
//spotifyApi.setAccessToken('BQBKFAyYV7QEpUWWaBKbigHTrpfefEmW69RUuF72dDf9QFW8-MCl1CPP-1VvfYJklOpuCjv-3qB-bvDEcxg9VeX5aSs_Mfvz1ygcydOfBRFH_BzX7hsCds2YIadUAokYUNQJ_CqghoCcSSXS7S3ZK0mmy1RVOHVwwqvuRUm9f-q7Jlpmk0OJVz7JNncwwuEVAnLdC7G0Go-7YhsBw6wGM4-W1NhvrHU1QZMuzpQpFfq4Tw');
//spotifyApi.setAccessToken(getToken());

async function getArtistAlbums() {
    console.log("Getting artist albums");
    test(token);
    /*
    console.log("check token: " + token)
    spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', function (err, data) {
        console.log("Getting artist albums");
        if (err) { console.error(err); }
        else {
            console.log("you made it");
            console.log('Artist albums', data);
        }
    });
    */
    
}



async function getMe() {
    /*
    spotifyApi.getMe(function (err, data) {
        console.log("getting me: ")
        console.log("check token: " + token)
        if (err) console.error(err);
        else console.log('me: ', data);
    });
    */
    const accessToken = await getToken();
    console.log("access" + accessToken);
    const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ` + String(accessToken),
        },
    });
    const user = await response.json();
    //console.log(typeof user);
    return user;
}

async function getMyTopItems() {
    const accessToken = await getToken();
    
    const response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=3&offset=2', {
        headers: {
          Authorization: `Bearer ` + String(accessToken),
          limit: 3,
          time_range: 'short_term',
        },
    });
    //const topItems = await response.json();
    const topItems = await response.json()
    //console.log(typeof topItems);
    return topItems;
}

async function getMyPlaylists() {
    const accessToken = await getToken();
    const response = await fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: `Bearer ` + String(accessToken),
        },
    });
    const playlists = await response.json();
    //console.log(typeof user);
    return playlists;
}

async function getMySavedTracks() {
    const accessToken = await getToken();
    const response = await fetch('https://api.spotify.com/v1/me/tracks', {
        headers: {
          Authorization: `Bearer ` + String(accessToken),
        },
    });
    const savedTracks = await response.json();
    //console.log(typeof user);
    return savedTracks;
}

export { getArtistAlbums, getMe, getMyTopItems, getMyPlaylists, getMySavedTracks}