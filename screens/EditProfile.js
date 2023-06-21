import { useEffect, useState, useRef, createRef, useCallback } from 'react';
import {
  StyleSheet,
  Alert,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { userData, supabase } from '../supabaseClient';
import { Dropdown } from 'react-native-element-dropdown';

import { StatusBar } from 'expo-status-bar';
// import formik
import { Formik } from 'formik';
import {
  StyledContainer,
  InnerContainer,
  PageTitle2,
  StyledFormArea,
  StyledTextInput2,
  StyledButton,
  DisabledButton,
  LeftIcon2,
  ButtonText,
  Colors,
  ProfilePicture,
  ProfilePicture2,
} from '../components/styles';

// import icons
import { Octicons, Ionicons } from '@expo/vector-icons';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { Constants } from 'expo-constants';
import { Camera, CameraType } from 'expo-camera';

// Colors
const { grey, lightGrey, black } = Colors;

//dropdown data
var minAge = 18,
  minWeight = 30,
  minHeight = 130,
  minBodyFat = 15,
  minSleepTime = 1,
  maxAge = 100,
  maxWeight = 250,
  maxHeight = 200,
  maxBodyFat = 36,
  maxSleepTime = 15;
// age
const age = [];
for (var i = minAge; i <= maxAge; i++) {
  age.push({ label: i.toString(), value: i });
}
// gender
const gender = [
  { label: 'Female', value: 'female' },
  { label: 'Male', value: 'male' },
];
// weight
const weight = [];
for (var i = minWeight; i <= maxWeight; i++) {
  weight.push({ label: i.toString(), value: i });
}
// height
const height = [];
for (var i = minHeight; i <= maxHeight; i++) {
  height.push({ label: i.toString(), value: i });
}
// bodyFatPercentage
const bodyFat = [];
for (var i = minBodyFat; i <= maxBodyFat; i++) {
  bodyFat.push({ label: i.toString(), value: i });
}
// sleepTime
const sleepTime = [];
for (var i = minSleepTime; i <= maxSleepTime; i++) {
  sleepTime.push({ label: i.toString(), value: i });
}

const goal = [
  { label: 'Lose Weight', value: 'lose-weight' },
  { label: 'Build Muscles', value: 'build-muscles' },
  { label: 'Become Healthier', value: 'become-healthier' },
];

const EditProfile = () => {
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);
  const [value4, setValue4] = useState(null);
  const [value5, setValue5] = useState(null);
  const [value6, setValue6] = useState(null);
  const [value7, setValue7] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [BMR, setBMR] = useState(null);
  const [BMI, setBMI] = useState(null);

  const user = supabase.auth.user();
  const navigation = useNavigation();

  async function handleBMRnBMI(age, gender, weight, height) {
    let bmr = 0;
    if (gender == 'male') {
      //console.log("you are male");
      // Formula: 88.362 + (13.397 x weight in kg) + (4.799 x height in cm) – (5.677 x age in years)
      bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    } else {
      bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
    }
    let bmi = (weight / ((height * height) / 10000)).toFixed(2);
    setBMR(Math.round(bmr, 1));
    setBMI(bmi);
  }

  // Get User Input Data
  async function getHealthData() {
    const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('id', supabase.auth.user().id);
    return data[0];
  }

  //get detailed data
  async function setDetailedData() {
    const data = await getHealthData();
    setValue1(data.Age);
    setValue2(data.Gender);
    setValue3(data.Weight);
    setValue4(data.Height);
    setValue5(data.BFP);
    setValue6(data.Sleep);
    setValue7(data.Goal);
    setAvatarUrl(data.avatar_url);
  }
  // Render once only
  useEffect(() => {
    setDetailedData();
  }, []);

  // Updates profile picture and delete old plans upon toggling to this screen
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      deleteOldPlan();
      setDetailedData();
    });
    return unsubscribe;
  }, [navigation]);

  // updates bmi and bmi when data values are updated
  useEffect(() => {
    handleBMRnBMI(value1, value2, value3, value4);
  }, [value1, value2, value3, value4]);

  //delete old plan while updating new
  async function deleteOldPlan() {
    const { dataA, errorA } = await supabase
      .from('Diet')
      .delete()
      .eq('id', supabase.auth.user().id);
    const { dataB, errorB } = await supabase
      .from('Exercise')
      .delete()
      .eq('id', supabase.auth.user().id);
    console.log();
  }

  // Update Exercise table
  async function updateExercise(usergoal) {
    if (usergoal == 'build-muscles') {
      const { data, error } = await supabase.from('Exercise').insert([
        {
          id: supabase.auth.user().id,
          Name: 'Abs',
          Day: 1,
          Amount: '2x 10reps',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Push-ups',
          Day: 1,
          Amount: '3x 8reps',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Sit-ups',
          Day: 2,
          Amount: '2x 20reps',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Crunches',
          Day: 2,
          Amount: '2x 10reps',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Squats',
          Day: 3,
          Amount: '2x 20reps',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Cardio',
          Day: 3,
          Amount: '30mins',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Planks',
          Day: 5,
          Amount: '4x 90s',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Pull-ups',
          Day: 5,
          Amount: '5x 6reps',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Barbell Curls',
          Day: 7,
          Amount: '3x 25reps',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Burpees',
          Day: 7,
          Amount: '3x 8reps',
        },
      ]);
    } else if (usergoal == 'become-healthier') {
      const { data, error } = await supabase.from('Exercise').insert([
        {
          id: supabase.auth.user().id,
          Name: 'Steps',
          Day: 1,
          Amount: '7500',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Steps',
          Day: 2,
          Amount: '7500',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Steps',
          Day: 3,
          Amount: '7500',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Body Yoga',
          Day: 4,
          Amount: '10mins',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Steps',
          Day: 5,
          Amount: '7500',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Swim/Ball Sports',
          Day: 6,
          Amount: '30mins',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Steps',
          Day: 7,
          Amount: '12000',
        },
      ]);
    } else if (usergoal == 'lose-weight') {
      const { data, error } = await supabase.from('Exercise').insert([
        {
          id: supabase.auth.user().id,
          Name: 'Rower',
          Day: 1,
          Amount: '30mins',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Jumping Jacks',
          Day: 1,
          Amount: '6x 30reps',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Squats',
          Day: 2,
          Amount: '5x 15reps',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Elliptical',
          Day: 2,
          Amount: '30mins',
        },
        {
          id: supabase.auth.user().id,
          Name: 'HIIT',
          Day: 3,
          Amount: '20mins',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Steps',
          Day: 4,
          Amount: '12000',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Pull-ups',
          Day: 5,
          Amount: '5x 10reps',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Jump Rope',
          Day: 5,
          Amount: '5x 200reps',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Indoor Cycle',
          Day: 7,
          Amount: '30mins',
        },
        {
          id: supabase.auth.user().id,
          Name: 'Burpees',
          Day: 7,
          Amount: '3x 10reps',
        },
      ]);
    }
  }

  // update Diet table
  async function updateDiet(goal) {
    if (goal == 'build-muscles') {
      const { data, error } = await supabase.from('Diet').upsert([
        {
          id: supabase.auth.user().id,
          Day: 'Monday',
          Breakfast:
            'Protein shake, whole bagel with fried eggs and sugar-free peanut butter',
          Lunch:
            'Whole wheat pasta, chicken breast and a cup of mixed vegetables',
          Dinner: 'Steak, brown rice, and grilled broccoli',
          Snack: 'Apple and Handful of Cashews',
        },

        {
          id: supabase.auth.user().id,
          Day: 'Tuesday',
          Breakfast: 'Whole wheat bread, egg whites, and milk',
          Lunch: 'Cobb salad',
          Dinner: 'Shrimp fried quinoa with vegetables',
          Snack: 'Orange and greek yugurt',
        },
        {
          id: supabase.auth.user().id,
          Day: 'Wednesday',
          Breakfast: 'Frozen mixed berries, whole milk, and rolled oats',
          Lunch: 'Chicken breast, fried mixed vegetables, and egg noodles',
          Dinner: 'Whole grain salmon burger with lettuce',
          Snack: 'Apple and protein smoothie',
        },

        {
          id: supabase.auth.user().id,
          Day: 'Thursday',
          Breakfast:
            'Boiled eggs, protein shake, cashews, and steamed sweet potatoes',
          Lunch: 'Hainanese chicken rice',
          Dinner: 'Sesame zoodles With crispy tofu',
          Snack: 'Cherry tomatoes and protein bars',
        },
        {
          id: supabase.auth.user().id,
          Day: 'Friday',
          Breakfast: 'Egg whites, whole wheat toast, and protein shake',
          Lunch:
            'Steak, grilled potatoes, and boiled vegetables with soy sauce',
          Dinner: 'Turkey lettuce wraps',
          Snack: 'Apple and handful of Cashews',
        },
        {
          id: supabase.auth.user().id,
          Day: 'Saturday',
          Breakfast: 'Chocolate protein pancakes with fried eggs',
          Lunch: 'Steak and bean burrito bowl',
          Dinner: 'Soba noodles with boiled chicken breast and cucumber',
          Snack: 'Orange and beef jerky',
        },
        {
          id: supabase.auth.user().id,
          Day: 'Sunday',
          Breakfast: 'Overnight oats and boiled eggs',
          Lunch:
            'Sushi rolles with high protein(California Roll, Sashimi, etc)',
          Dinner: 'Sweet potato chicken bowl',
          Snack: 'Avocado toast with greek yogurt',
        },
      ]);
    } else if (goal == 'become-healthier') {
      const { data, error } = await supabase.from('Diet').upsert([
        {
          id: supabase.auth.user().id,
          Day: 'Monday',
          Breakfast: 'Oatmeal, scrambled eggs, and fruit',
          Lunch: 'Roasted chicken wrap',
          Dinner: 'Fresh garden salad with beef ham',
          Snack: 'No-salt added almonds',
        },

        {
          id: supabase.auth.user().id,
          Day: 'Tuesday',
          Breakfast:
            'Banana and sugar-free yogurt blend with cocoa powder, and 1 boiled egg',
          Lunch: 'Beef Noodle Soup',
          Dinner: 'Turkey Burger Wraps',
          Snack: 'No-sugar added yogurt',
        },

        {
          id: supabase.auth.user().id,

          Day: 'Wednesday',
          Breakfast: 'Spinach Loaded, omelette, and tea',
          Lunch: 'Avocado pasta',
          Dinner: 'Vietnamese rice paper rolls',
          Snack: 'Whole fruits',
        },
        {
          id: supabase.auth.user().id,

          Day: 'Thursday',
          Breakfast: 'Overnight oats and fried eggs without oil',
          Lunch: 'Soba noodle salad with chicken',
          Dinner: 'Baked salmon and caprese zoodles',
          Snack: 'Yogurt with fruits',
        },
        {
          id: supabase.auth.user().id,

          Day: 'Friday',
          Breakfast: 'Sugar-free latte with egg sandwich',
          Lunch: 'Chicken Caesar Salad',
          Dinner: 'Cabbage burritos',
          Snack: 'Whole fruits',
        },

        {
          id: supabase.auth.user().id,

          Day: 'Saturday',
          Breakfast: 'Healthy eggs benedict',
          Lunch: 'Non-spicy Chinese hot pot with low fat/sugar dipping sauces',
          Dinner: 'Garlicky lemon mahi mahi',
          Snack: 'No-salt added walnuts',
        },

        {
          id: supabase.auth.user().id,

          Day: 'Sunday',
          Breakfast: 'Vietnamese beef pho',
          Lunch: 'Rainbow roll with seaweed salad',
          Dinner: 'Turkey meatball pad thai',
          Snack: 'Baked rice cakes and fruits',
        },
      ]);
    } else {
      const { data, error } = await supabase.from('Diet').upsert([
        {
          id: supabase.auth.user().id,
          Day: 'Monday',
          Breakfast: 'Boiled egg, whole wheat bread, 0 fat milk',
          Lunch: 'Vegetable salad with healthy salad dressing, grilled chicken',
          Dinner: 'Salmon salad with cannellini beans',
          Snack: 'Grapefruit and sugar-free yogurt',
        },
        {
          id: supabase.auth.user().id,
          Day: 'Tuesday',
          Breakfast: 'Whole grain toast, fried eggs, and sugar-free yogurt',
          Lunch: 'Chicken caesar salad on a spinach wrap',
          Dinner: 'Grilled fish tacos topped with cabbage-cilantro slaw',
          Snack: 'Cherry tomatoes',
        },

        {
          id: supabase.auth.user().id,
          Day: 'Wednesday',
          Breakfast: 'Oatmeal with milk, boiled eggs',
          Lunch: 'Boiled corn, grilled beef tenderloin and broccoli',
          Dinner: 'Shirataki noodle with cucumber and shrimp',
          Snack: 'Cucumber',
        },

        {
          id: supabase.auth.user().id,

          Day: 'Thursday',
          Breakfast: 'Boiled egg, whole wheat bread, 0 fat milk',
          Lunch: 'Mediterranean chickpea quinoa bowl',
          Dinner: 'Vegetable udon soup with tofu',
          Snack: 'Grapefruit and sugar-free yogurt',
        },

        {
          id: supabase.auth.user().id,
          Day: 'Friday',
          Breakfast: 'Shakshuka',
          Lunch:
            'Mixed grain rice with fried Chinese cabbage and boiled chicken slices',
          Dinner: 'Spicy tofu tacos',
          Snack: 'Cherry tomatoes',
        },

        {
          id: supabase.auth.user().id,
          Day: 'Saturday',
          Breakfast: 'Whole grain toast, fried eggs, and sugar-free yogurt',
          Lunch: 'Tuna rolls with cucumber',
          Dinner: 'Boiled vegetables and shrimp',
          Snack: 'Apple and 0 fat milk',
        },
        {
          id: supabase.auth.user().id,
          Day: 'Sunday',
          Breakfast: 'Boiled egg, whole wheat bread, 0 fat milk',
          Lunch: 'Grilled potatoes, veges, and fish',
          Dinner: 'Whole wheat low-fat tuna sandwhich',
          Snack: 'Cherry tomatoes',
        },
      ]);
    }
  }

  // Insert into profiles table in Supabase
  async function doUpdate(values, bmr, bmi) {
    //console.log(values.gender)
    const { data, error } = await supabase.from('profiles').upsert({
      id: supabase.auth.user().id,
      Age: values.age,
      Gender: values.gender,
      Weight: values.weight,
      Height: values.height,
      BFP: values.bodyFatPercentage,
      Sleep: values.sleepTime,
      Goal: values.goal,
      BMR: bmr,
      BMI: bmi,
    });
    if (error) {
      Alert.alert('Error Updating', error.message, [
        { text: 'OK', onPress: () => null },
      ]);
      //console.log("Error");
    } else {
      console.log(BMR);
      console.log(BMI);
      navigation.navigate('SettingsPage');
    }
  }
  // Bottom Sheet Display
  const renderInner = () => (
    <View
      style={{
        backgroundColor: 'white',
        padding: 0,
        height: 600,
      }}
    >
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <StyledButton
        onPress={() => {
          bs.current.snapTo(1);
          navigation.navigate('CameraPage');
        }}
      >
        <ButtonText>Take picture</ButtonText>
      </StyledButton>

      <StyledButton
        onPress={async () => {
          const response = await pickImage();
        }}
      >
        <ButtonText>Choose From Library</ButtonText>
      </StyledButton>

      <StyledButton onPress={() => bs.current.snapTo(1)}>
        <ButtonText>Close</ButtonText>
      </StyledButton>
    </View>
  );

  //Bottom sheet
  const bs = createRef();
  const fall = new Animated.Value(1);

  const [isOpen, setIsOpen] = useState(true);
  const [imageUpdated, setImageUpdated] = useState(false);

  // Request permission for image picker
  useEffect(() => {
    (async () => {
      //const { status } = await Camera.requestCameraPermissionsAsync();
      //setHasPermission(status === 'granted');

      if (Platform.OS != 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry! We need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  // Updates image url column in profiles table
  const updateUrl = async (url) => {
    setImageUpdated(!imageUpdated);
    const { data, error } = await supabase
      .from('profiles')
      .upsert({ id: supabase.auth.user().id, avatar_url: url })
      .eq('id', supabase.auth.user().id);
  };

  // Uploads image to supabase storage bucket
  const uploadFromURI = async (photo) => {
    console.log('upload supabase');
    if (!photo.cancelled) {
      const ext = photo.uri.substring(photo.uri.lastIndexOf('.') + 1);
      const fileName = photo.uri.replace(/^.*[\\\/]/, '');
      var formData = new FormData();
      formData.append('files', {
        uri: photo.uri,
        name: fileName,
        type: photo.type ? `imagee/${ext}` : `video/${ext}`,
      });
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(fileName, formData);
      if (error) throw new Error(error.message);
      let avatar = '';
      if (data) {
        setAvatarUrl(data.Key);
        avatar = data.Key;
      }
      updateUrl(avatar);
      return { ...photo, imageData: data };
    } else {
      return photo;
    }
  };

  // To use image picker, to select an image
  const pickImage = async () => {
    console.log('pick image');
    // No permissions request is necessary for launching the image library
    let photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    try {
      console.log(photo);
      return await uploadFromURI(photo);
    } catch (e) {
      console.log(e.message);
      return null;
    }
  };

  // Updates profile picture upon selecting new image
  useEffect(() => {
    setDetailedData();
  }, [imageUpdated]);

  return (
    <StyledContainer> 
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      {/*
      <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
      >
        <BottomSheetView>
          <Text>
            Hello
          </Text>
        </BottomSheetView>
      </BottomSheet>
      </GestureHandlerRootView>
      */}
      <StatusBar style="dark" />
      
      <InnerContainer>
        <TouchableOpacity onPress={() => {isOpen ? (bs.current.snapTo(0)) : (bs.current.snapTo(1)); setIsOpen(!isOpen);}}>

          {avatarUrl ? 
          (
            <ProfilePicture2 
              resizeMode="cover"
              //source={{ uri: `https://xpiordhecqmaqsczvzgs.supabase.co/storage/v1/object/sign/${avatarUrl}${`?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL0JDREVDNTFGLUFEQkMtNEMyNi05NENFLTk3MzYyNzNGMTUxRC5qcGciLCJpYXQiOjE2NTgzODUzNjMsImV4cCI6MTk3Mzc0NTM2M30.tIzpVgT_ttoMRa2RPgfraH-1y4mS8AIRS8fxcZBUxyk&t=2022-07-21T06%3A36%3A03.463Z`}`}}
              source={{ uri: `https://xpiordhecqmaqsczvzgs.supabase.co/storage/v1/object/public/${avatarUrl}`}}
              //style={{width: 400, height: 400}}
            />
          ):( 
          <ProfilePicture2
              resizeMode="cover"
              source={require('./../assets/img/adaptive-icon.png')}
            />
          )
          }  
        </TouchableOpacity>
        <Ionicons name="create-outline" color='rgb(255,153,48)' size={30} style={{ position: 'absolute', top: 100, left: 230 }} />
        
        <StyledFormArea>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.dropdownTextStyle}
            selectedTextStyle={styles.dropdownTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={age}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Age"
            value={value1}
            searchPlaceholder="Search..."
            onChange={(item) => {
              setValue1(item.value);
            }}
            renderLeftIcon={() => (
              <Ionicons
                name={'arrow-forward-circle-outline'}
                size={25}
                color={grey}
              />
            )}
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.dropdownTextStyle}
            selectedTextStyle={styles.dropdownTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={gender}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Gender"
            searchPlaceholder="Search..."
            value={value2}
            onChange={(item) => {
              setValue2(item.value);
            }}
            renderLeftIcon={() => (
              <Ionicons
                name={'arrow-forward-circle-outline'}
                size={25}
                color={grey}
              />
            )}
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.dropdownTextStyle}
            selectedTextStyle={styles.dropdownTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={weight}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Weight(kg)"
            searchPlaceholder="Search..."
            value={value3}
            onChange={(item) => {
              setValue3(item.value);
            }}
            renderLeftIcon={() => (
              <Ionicons
                name={'arrow-forward-circle-outline'}
                size={25}
                color={grey}
              />
            )}
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.dropdownTextStyle}
            selectedTextStyle={styles.dropdownTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={height}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Height(cm)"
            searchPlaceholder="Search..."
            value={value4}
            onChange={(item) => {
              setValue4(item.value);
            }}
            renderLeftIcon={() => (
              <Ionicons
                name={'arrow-forward-circle-outline'}
                size={25}
                color={grey}
              />
            )}
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.dropdownTextStyle}
            selectedTextStyle={styles.dropdownTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={bodyFat}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="BodyFatPercentage"
            searchPlaceholder="Search..."
            value={value5}
            onChange={(item) => {
              setValue5(item.value);
            }}
            renderLeftIcon={() => (
              <Ionicons
                name={'arrow-forward-circle-outline'}
                size={25}
                color={grey}
              />
            )}
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.dropdownTextStyle}
            selectedTextStyle={styles.dropdownTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={sleepTime}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="SleepTime(hr)"
            searchPlaceholder="Search..."
            value={value6}
            onChange={(item) => {
              setValue6(item.value);
            }}
            renderLeftIcon={() => (
              <Ionicons
                name={'arrow-forward-circle-outline'}
                size={25}
                color={grey}
              />
            )}
          />

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.dropdownTextStyle}
            selectedTextStyle={styles.dropdownTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={goal}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Goal"
            searchPlaceholder="Search..."
            value={value7}
            onChange={(item) => {
              setValue7(item.value);
            }}
            renderLeftIcon={() => (
              <Ionicons
                name={'arrow-forward-circle-outline'}
                size={25}
                color={grey}
              />
            )}
          />

          <StyledButton
            onPress={() => {
              let test = {
                age: value1,
                gender: value2,
                weight: value3,
                height: value4,
                bodyFatPercentage: value5,
                sleepTime: value6,
                goal: value7,
              };
              //console.log(test.age);
              //console.log(test);
              doUpdate(test, BMR, BMI);
              updateDiet(test.goal);
              updateExercise(test.goal);
            }}
          >
            <ButtonText>Confirm</ButtonText>
          </StyledButton>
        </StyledFormArea>
      </InnerContainer>
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    margin: 10,
    padding: 10,
    height: 45,
    backgroundColor: lightGrey,
    borderRadius: 8,
  },
  icon: {
    width: 25,
    height: 25,
  },
  dropdownTextStyle: {
    fontSize: 16,
    marginLeft: 10,
  },
  inputSearchStyle: {
    height: 35,
    fontSize: 18,
  },
});

export default EditProfile;
