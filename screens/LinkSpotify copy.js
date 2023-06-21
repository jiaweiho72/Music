import { React, useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Alert, Pressable } from 'react-native';
import { Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
//import { signIn, supabase } from '../supabaseClient';

import { StatusBar } from 'expo-status-bar';
// import formik
import { Formik } from 'formik';
import {
  StyledContainer,
  InnerContainer,
  PageTitle1,
  StyledFormArea,
  SubTitle,
  StyledTextInput,
  StyledButton,
  LeftIcon,
  RightIcon,
  ButtonText,
  Colors,
  TextLink,
  TextLinkContent,
  SubTitleView,
} from '../components/styles';
// import icons
import { Octicons, Ionicons } from '@expo/vector-icons';

//Firebase
import { signIn, auth, createToken, linkSpotify, updateUserGenre } from '../firebaseConfig'
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, ResponseType, useAuthResponse } from 'expo-auth-session';
import { getAuth, signInWithCustomToken } from "firebase/auth";

import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
//import { run } from "../SpotifyConfig"


// Colors
const { grey, lightGrey } = Colors;


WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

let client_id = 'fa0e91b1fbca40a6975edb5a456fcae5';
let client_secret = 'a0d451e4eeb048da8ccf693b14c80f11';
let redirectUri = 'exp://localhost:19000/--/';
let code;
/*
const scopesArr = ['user-modify-playback-state','user-read-currently-playing','user-read-playback-state','user-library-modify',
                   'user-library-read','playlist-read-private','playlist-read-collaborative','playlist-modify-public',
                   'playlist-modify-private','user-read-recently-played','user-top-read'];
const scopes = scopesArr.join(' ');

const getAuthorizationCode = async () => {
  let result;
  try {
    const clientId = CLIENT_ID //we wrote this function above
    const redirectUrl = AuthSession.getRedirectUrl(); //this will be something like https://auth.expo.io/@your-username/your-app-slug
    result = await AuthSession.startAsync({
      authUrl:
        'https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' +
        clientId +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' +
        encodeURIComponent(redirectUrl),
    })
  } catch (err) {
    console.error(err)
  }
  return result.params.code
}
*/



const SignIn = () => {
  //Spotify
  const [code, setCode] = useState("");
  

  
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: client_id,
      clientSecret: client_secret,
      scopes: [
        "playlist-modify-public",
        "playlist-read-private",
        "playlist-read-collaborative",
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-top-read",
        "user-modify-playback-state",
        "user-library-read",
        "streaming",
        "user-read-email",
        "user-read-private",
      ],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: redirectUri
      
      //makeRedirectUri({
      //  scheme: 'newProject.app'
      //}),
      
      
    },
    discovery
  );
  
  //const [request, response, promptAsync] = run(promptAsync);

  useEffect(() => {
    if (response?.type === 'success') {
      //const { access_token } = response.params;
      //setAccess_token(response.params);
      //console.log("access token: " + access_token);
      const { access_token } = response.params;
      //props.saveLogin(code);
      console.log("code" + response.params)
      setCode(access_token);
      linkSpotify(access_token);
      navigation.navigate('Tabs');
      //const firebaseToken = createFirebaseToken(access_token);
    }
  }, [response]);

  /*
  const requestAccessToken = async (code) => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=authorization_code&code=${code}&redirect_uri=YOUR_REDIRECT_URI&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET`,
    });
    return response.json();
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: client_id,
      redirectUri: redirectUri,
      scopes: ['user-read-private', 'user-read-email'],
    },
    {
      useProxy: true,
      service: 'spotify',
    }
  );

  // Handle the response from the Spotify API
  const { data, error } = useAuthResponse(response, {
    onSuccess: async (code) => {
      // Request an access token using the authorization code
      const accessToken = await requestAccessToken(code);
      // Refresh the access token
      //setAccessToken(accessToken.access_token);
      linkSpotify(accessToken.access_token);
    },
  });


  // Initiate the authentication request
  const initiateAuth = async () => {
    await promptAsync({ useProxy: true });
  };
  */


  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  async function bypassSignin() {
    navigation.navigate('UserData');
  }

  const [hidePassword, setHidePassword] = useState(true);

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageTitle1>Log into your Account</PageTitle1>
            <StyledFormArea>
              
              <StyledButton onPress={bypassSignin}>
                <ButtonText>Bypass Sign In</ButtonText>
              </StyledButton>

              <StyledButton onPress={() => {promptAsync();}}>
              {/*<StyledButton onPress={() => {initiateAuth}}>*/}
                <ButtonText> Spotify Login </ButtonText>
              </StyledButton>
              
            </StyledFormArea>
        <SubTitleView>
          <SubTitle>Don't have an account? </SubTitle>
          <TextLink onPress={() => navigation.navigate('SignUp')}>
            <TextLinkContent>Sign up</TextLinkContent>
          </TextLink>
        </SubTitleView>
      </InnerContainer>
    </StyledContainer>
  );
};

const UserTextInput = ({
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={20} color={grey} />
      </LeftIcon>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? 'md-eye-off' : 'md-eye'}
            size={30}
            color={grey}
          />
        </RightIcon>
      )}
    </View>
  );
};

export const getFirstTokenData = async (code) => {
  var dataToSend = { 
    code: code,
    redirect_uri: makeRedirectUri(),
    grant_type: 'authorization_code'};
  //making data to send on server
  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');
  //POST request
  var response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST', //Request Type
    body: formBody, //post body
    headers: {
      //Header Defination
      'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')),
    },
  })
  try{
      return await response.json()
  }catch (error){
      console.log(error)
  }
  
}


export const getRefreshTokenData = async (refreshToken) => {
  console.log(refreshToken)
  console.log(refreshToken + " going in for refresh")
  var dataToSend = { 
      refresh_token : refreshToken,
      grant_type: 'refresh_token'};
  //making data to send on server
  var formBody = [];
  for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');
  //POST request
  var response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST', //Request Type
      body: formBody, //post body
      headers: {
      //Header Defination
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
      },
  })
  try{
      return await response.json()
  }catch (error){
      console.log(error)
  }
  
}

export default SignIn;
