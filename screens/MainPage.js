import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/base';
import { supabase } from '../supabaseClient';

import {
  StyledContainer,
  PageTitle2,
  Colors,
  UserinfoView,
  DataView,
  DataText,
  InnerContainer,
  ScrollContainer,
  StyledButton,
  ButtonText,
  DataTitleText,
  ProfilePicture,
} from '../components/styles';

// import icons
import { Octicons, Ionicons } from '@expo/vector-icons';
import { getData } from '../firebaseConfig'
import SpotifyWebApi from 'spotify-web-api-js';
import { getArtistAlbums, getMe, getMyTopItems, getMyPlaylists, getMySavedTracks} from '../SpotifyApi';

// Colors
const { grey, lightGrey, black } = Colors;

const MainPage = () => {
  const navigation = useNavigation();
  const user = supabase.auth.user();
  const [age, setAge] = useState('');
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [healthData, setUserData] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);
  const [country, setCountry] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [topItems, setTopItems] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [likedTrack, setLikedTrack] = useState(null);
  // Get User Input Data
  /*
  async function getHealthData() {
    console.log('get health');
    const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('id', supabase.auth.user().id);
    setHealthData(data[0]);
    return data[0];
  }
  */

  async function getUserData() {
    return getData()
    /*
    .then(
      userCredentials => {
      console.log(userCredentials);
      setUserData(userCredentials);
    })
    */
   /*
    .then(
      userCredentials => {
        console.log(userCredentials);
        return userCredentials;
        console.log("still ahvent");
      }
    )
    */
    .catch(error => Alert.alert('Error Setting Data', error.message, [
      { text: 'OK', onPress: () => null },
    ])
    )
  }

  //get detailed data
  async function setDetailedData() {
    /*
    const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer BQBKFAyYV7QEpUWWaBKbigHTrpfefEmW69RUuF72dDf9QFW8-MCl1CPP-1VvfYJklOpuCjv-3qB-bvDEcxg9VeX5aSs_Mfvz1ygcydOfBRFH_BzX7hsCds2YIadUAokYUNQJ_CqghoCcSSXS7S3ZK0mmy1RVOHVwwqvuRUm9f-q7Jlpmk0OJVz7JNncwwuEVAnLdC7G0Go-7YhsBw6wGM4-W1NhvrHU1QZMuzpQpFfq4Tw`,
        },
    });
    const user = await response.json();
    */
    // Get User Profile
    const user = await getMe();
    setUserName(user.display_name);
    setCountry(user.country);
    //setAvatarUrl(user.images[0].url);
    //console.log("avatar: " + await user);

    //Top Items
    const items = await getMyTopItems();
    console.log("items: " + await JSON.stringify(items.offset));

    setTopItems(items.items.length);
    
    // Get User's Playlists
    const playlists = await getMyPlaylists();
    //console.log(playlists.items[0])

    // Get User's Saved Tracks
    const savedTracks = await getMySavedTracks();
    setLikedTrack(JSON.stringify(savedTracks.items[1].track.album.name));
    //console.log('saved: ' + JSON.stringify(savedTracks.items[0].track.album.name))

    /*
    .then((response) => {
      // Access the user's name from the response object
      const user = response.data;
      console.log(user);
      setUserName(user.id);
      //setUserName("hello");
    });
    */
    /*
    .then((response)=> {
      const trackId = response.data.id;
      setUserName(trackId);
      console.log(trackId);
    });
    */

    const data = await getUserData();
    //const data = healthData;
    setAge(data.age);
    setName(data.name);
    setGenre(data.genre);
    setToken(data.Spotify);
    //setAvatarUrl(data.avatar_url);
  }
  // Render once only
  /*
  useEffect(() => {
    getHealthData();
    setDetailedData();
  }, []);
*/
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      setDetailedData();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <StyledContainer>
      <ScrollContainer>
        <PageTitle2>WELCOME!😊</PageTitle2>
        
        {avatarUrl ? (
          <UserinfoView>
            <ProfilePicture
              resizeMode="cover"
              //source={{ uri: `https://xpiordhecqmaqsczvzgs.supabase.co/storage/v1/object/sign/${avatarUrl}${`?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL0JDREVDNTFGLUFEQkMtNEMyNi05NENFLTk3MzYyNzNGMTUxRC5qcGciLCJpYXQiOjE2NTgzODUzNjMsImV4cCI6MTk3Mzc0NTM2M30.tIzpVgT_ttoMRa2RPgfraH-1y4mS8AIRS8fxcZBUxyk&t=2022-07-21T06%3A36%3A03.463Z`}`}}
              source={{
                //uri: `https://xpiordhecqmaqsczvzgs.supabase.co/storage/v1/object/public/${avatarUrl}`,
                uri: avatarUrl,
              }}
              //style={{width: 400, height: 400}}
            />
          </UserinfoView>
        ) : (
          <UserinfoView>
            <ProfilePicture
              resizeMode="cover"
              source={require('./../assets/img/adaptive-icon.png')}
            />
          </UserinfoView>
        )}
        
        

        <UserinfoView>
          <DataView>
            <DataTitleText>Name:</DataTitleText>
            <DataText>{userName}</DataText>
          </DataView>
          <DataView>
            <DataTitleText>Age:</DataTitleText>
            <DataText>{age}</DataText>
          </DataView>
          <DataView>
            <DataTitleText>Genre:</DataTitleText>
            <DataText>{genre}</DataText>
          </DataView>
          <DataView>
            <DataTitleText>Country:</DataTitleText>
            <DataText>{country}</DataText>
          </DataView>
          <DataView>
            <DataTitleText>Top Items:</DataTitleText>
            <DataText>{topItems}</DataText>
          </DataView>
          <DataView>
            <DataTitleText>Liked Track:</DataTitleText>
            <DataText>{likedTrack}</DataText>
          </DataView>
        
        </UserinfoView>
        {/*
        <Button color="red" onPress={() => console.log(getUser())}>
          Get user
        </Button>
        */}
      </ScrollContainer>
    </StyledContainer>
  );
};

export default MainPage;
