import { React, useState } from 'react';
import { Alert, View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SimpleSelectButton from 'react-native-simple-select-button';
import { supabase } from '../supabaseClient';
import { StatusBar } from 'expo-status-bar';

import {
  StyledContainer,
  InnerContainer,
  PageTitle2,
  DataViewR3,
  DataViewR4,
  DataTextR,
  BMRImage,
  ExitIcon1,
  Colors,
  DataViewR5,
} from '../components/styles';

// import icon
import { Octicons } from '@expo/vector-icons';
// Colors
const { black } = Colors;

const TDEECalculator = () => {
  const navigation = useNavigation();
  const [choice, setChoice] = useState('');
  const [BMR, setBMR] = useState('');

  const button_list = [
    { label: 'Sedentary', value: '1.2' },
    { label: 'Lightly active', value: '1.375' },
    { label: 'Moderately active', value: '1.55' },
    { label: 'Very active', value: '1.725' },
    { label: 'Extra active', value: '1.9' },
  ];
  // Get User Input Data
  async function getHealthData() {
    const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('id', supabase.auth.user().id);
    //.then(response => {return response})
    //console.log(data[0]);
    return data[0];
  }

  // Get BMR from supabase
  async function handleBMR() {
    const data = await getHealthData();
    setBMR(data.BMR);
  }
  handleBMR();

  const ListHeader = () => {
    //View to set in Header
    return (
      <DataViewR3>
        <DataTextR>• Sedentary: little or no exercise, desk job</DataTextR>
        <DataTextR>
          • Lightly active: light exercise/ sports 1-3 days/week
        </DataTextR>
        <DataTextR>
          • Moderately active: moderate exercise/ sports 6-7 days/week
        </DataTextR>
        <DataTextR>
          • Very active: hard exercise every day, or exercising 2 xs/day
        </DataTextR>
        <DataTextR>
          • Extra active: hard exercise 2 or more times per day, or training for
          marathon, or triathlon, etc.
        </DataTextR>
      </DataViewR3>
    );
  };

  const ListFooter = () => {
    //View to set in Footer
    return (
      <View>
        <DataViewR4>
          <DataTextR>Your TDEE: {choice * BMR}</DataTextR>
        </DataViewR4>
        <DataViewR5>
          <DataTextR>
            ☑️ On Diet Page the suggested calories intake is for moderately
            active activity rate
          </DataTextR>
          <DataTextR>
            ☑️ Eat every day according to TDEE would be more efficient for you
            to accomplish fitness goal!
          </DataTextR>
        </DataViewR5>
      </View>
    );
  };

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <ExitIcon1>
          <Octicons
            onPress={() => navigation.navigate('ReportPage')}
            name={'arrow-left'}
            size={30}
            color={black}
          />
        </ExitIcon1>
        <PageTitle2>Choose Your Activity Rate</PageTitle2>
        <FlatList
          ListHeaderComponent={ListHeader}
          ListFooterComponent={ListFooter}
          data={button_list}
          keyExtractor={(item) => item.value}
          extraData={choice}
          renderItem={({ item }) => (
            <SimpleSelectButton
              onPress={() => {
                setChoice(item.value);
              }}
              isChecked={choice === item.value}
              text={item.label}
              textSize={16}
              buttonDefaultColor="#e5e5e5"
              buttonSelectedColor="#ff9c5b"
              textDefaultColor="#333"
              textSelectedColor="#fff"
            />
          )}
        />
      </InnerContainer>
    </StyledContainer>
  );
};

export default TDEECalculator;
