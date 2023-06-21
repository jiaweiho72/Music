import { signIn, auth, createToken, linkSpotify } from '../firebaseConfig'
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, ResponseType } from 'expo-auth-session';
import { exp } from 'react-native-reanimated';

// Endpoint
const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
};
  
let CLIENT_ID = 'fa0e91b1fbca40a6975edb5a456fcae5';
let CLIENT_SECRET = 'a0d451e4eeb048da8ccf693b14c80f11';

async function run() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: CLIENT_ID,
      //clientSecret: CLIENT_SECRET,
      scopes: [
        "playlist-modify-public",
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-top-read",
        "user-modify-playback-state",
        "streaming",
        "user-read-email",
        "user-read-private",

      ],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: 'exp://localhost:19000/--/'
    },
        discovery
  );
  return [request, response, promptAsync];

    
    
}

export { run };

/*
useEffect(() => {
  if (response?.type === 'success') {
    //const { access_token } = response.params;
    setAccess_token(response.params);
    //console.log("access token: " + access_token);
    linkSpotify(access_token);
    navigation.navigate('Tabs');
    //const firebaseToken = createFirebaseToken(access_token);
  }
}, [response]);
*/

/*
    let firebaseToken = "";
    
    createToken(access_token)
      .then ((customToken) => {
        firebaseToken = customToken;
        console.log("customToken: " + firebaseToken);
      })
      .catch(error => {
        console.log(error.message);
      });
    
    signInWithCustomToken(auth, firebaseToken)
      .then((userCredentials) => {
        const user = userCredentials.user;
      })
      .catch(error => {
        console.log(error.message);
      })
    */