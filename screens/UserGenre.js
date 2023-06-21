import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Button,
  Alert,
} from 'react-native';
// import simpleSelectButton Package
import SimpleSelectButton from 'react-native-simple-select-button';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import {
  StyledContainer,
  InnerContainer,
  PageTitle2,
  StyledFormArea,
  StyledButton,
  DisabledButton,
  ButtonText,
  Colors,
  ExitIcon1,
} from '../components/styles';
// import icons
import { Octicons, Ionicons } from '@expo/vector-icons';
import styledComponents from 'styled-components';
import { auth, updateUserGenre } from '../firebaseConfig'

// Colors
const { lightGrey, black, secondary, primary } = Colors;

const UserGenre = () => {
  const [goal, setGoal] = useState('');
  const button_list = [
    { label: 'Rock', value: 'Rock' },
    { label: 'Build Muscles', value: 'build-muscles' },
    { label: 'Become Healthier', value: 'become-healthier' },
  ];
  const navigation = useNavigation();
  //enable button navigation to next page only after user has chosen a goal
  let isEnabled;

  // Insert User Goal into Profiles Table
  async function doUpdate(userGenre) {
    updateUserGenre(userGenre)
    .then(
      x => {
      console.log("User Genre updated");
      navigation.navigate('LinkSpotify');
    })
    .catch(error => Alert.alert('Error Inputing Genre', error.message, [
      { text: 'OK', onPress: () => null },
    ])
    );
  }

  /*
  // Get Health Data
  async function getHealthData() {
    const { data1, error } = await supabase
      .from('profiles')
      .select()
      .eq('id', supabase.auth.user().id);
    return data1[0];
  }
  */

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <ExitIcon1>
          <Octicons
            onPress={() => navigation.navigate('UserData')}
            name={'arrow-left'}
            size={30}
            color={black}
          />
        </ExitIcon1>
        <PageTitle2>What is Your Goal?</PageTitle2>
        <View
          style={{
            marginTop: 35,
            width: Dimensions.get('screen').width - 65,
          }}
        >
          <FlatList
            data={button_list}
            keyExtractor={(item) => item.value}
            extraData={goal}
            renderItem={({ item }) => (
              <SimpleSelectButton
                style={styles.goals}
                onPress={() => {
                  setGoal(item.value);
                  // console.log(goal);
                }}
                isChecked={goal === item.value}
                text={item.label}
                textSize={20}
                iconName="checkcircleo"
                iconColor="#fff"
                iconSize={25}
                buttonDefaultColor="#e5e5e5"
                buttonSelectedColor="#ff9c5b"
                textDefaultColor="#333"
                textSelectedColor="#fff"
              />
            )}
          />
          {goal ? (isEnabled = true) : (isEnabled = false)}
          {isEnabled ? (
            <StyledButton
              onPress={() => goal && doUpdate(goal)}
            >
              <ButtonText>Next</ButtonText>
            </StyledButton>
          ) : (
            <DisabledButton disabled={true}>
              <ButtonText>Next</ButtonText>
            </DisabledButton>
          )}
        </View>
      </InnerContainer>
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  goals: {
    padding: 10,
    borderRadius: 15,
    marginVertical: 20,
  },
});

export default UserGenre;
