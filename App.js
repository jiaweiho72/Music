import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';
import { Button } from '@rneui/base';
import { Header } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { supabase } from './supabaseClient';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import 'react-native-url-polyfill/auto';



import React from "react";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import tokenReducer from "./store/reducers/token";
import songReducer from "./store/reducers/topSongs";
import { Settings } from "react-native";

import { configureStore } from '@reduxjs/toolkit'


const store = configureStore({ 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: {
        // Ignore state paths, e.g. state for 'items':
        ignoredPaths: ['items.data']
    },
    serializableCheck: { ignoredPaths: ['some.nested.path'] }
  }),
  reducer: {
    token: tokenReducer,
    topSongs: songReducer,
  }
})


export default function App() {
  console.log('App executed');
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <Provider store={store}>
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
