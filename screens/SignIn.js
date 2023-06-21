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
import { signIn, auth, createToken } from '../firebaseConfig'
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, ResponseType } from 'expo-auth-session';
import { getAuth, signInWithCustomToken } from "firebase/auth";




// Colors
const { grey, lightGrey } = Colors;

const SignIn = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  
  async function doSignIn(email, password) {
    signIn(email, password)
    .then(
      userCredentials => {
      //const user = userCredentials.user;
      //console.log(user.email);
      navigation.navigate('Tabs');
    })
    .catch(error => Alert.alert('Error Signing In', error.message, [
      { text: 'OK', onPress: () => null },
    ])
    )
  }
  
 
  // Performs Sign In in Supabase
  /*
  async function doSignIn(email, password) {
    try {
      setLoading(true);
      const { user, session, error } = await signIn(email, password);
      if (error) {
        Alert.alert('Error Signing In', error.message, [
          { text: 'OK', onPress: () => null },
        ]);
        console.log(error);
      } else {
        navigation.navigate('Tabs');
      }
      console.log(supabase.auth.user());
    } finally {
      setLoading(false);
    }
  }
  */


  async function bypassSignin() {
    navigation.navigate('Tabs');
  }

  const [hidePassword, setHidePassword] = useState(true);

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageTitle1>Log into your Account</PageTitle1>

        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => doSignIn(values.email, values.password)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <StyledFormArea>
              <UserTextInput
                icon="mail"
                placeholder="Email"
                placeholderTextColor={grey}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />

              <UserTextInput
                icon="lock"
                placeholder="Password"
                placeholderTextColor={grey}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={hidePassword}
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
              />
              <StyledButton onPress={handleSubmit}>
                <ButtonText>Sign In</ButtonText>
              </StyledButton>

              
              <StyledButton onPress={bypassSignin}>
                <ButtonText>Bypass Sign In</ButtonText>
              </StyledButton>
              
            </StyledFormArea>
          )}
        </Formik>
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

export default SignIn;
