import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppDrawer from './AppDrawer';
import SignUp from '../Registration/SignUp';
import LanguageTechnologies from '../Exam/LanguageTechnologies';
import Contact from '../Component/Contact';

const Stack = createNativeStackNavigator();

function AuthLoadingScreen({ navigation }) {
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const userData = await AsyncStorage.getItem('userDetails');
        if (userData !== null) {
          // Already logged in
          navigation.replace('AppDrawer');
        } else {
          // Not logged in
          navigation.replace('SignUp');
        }
      } catch (e) {
        console.error('Failed to load user details', e);
        navigation.replace('SignUp');
      }
    };

    checkLogin();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="AppDrawer" component={AppDrawer} options={{ headerShown: false }} />
        <Stack.Screen name="LanguageTechnologies" component={LanguageTechnologies} options={{ headerShown: false }} />
        <Stack.Screen name="Contact" component={Contact} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;





// import Home from '../Component/Home';
// import Course from '../Component/Course';

 {/* <Stack.Screen name="Mernstack" component={Mernstack} options={{headerShown:false}}/> */}
      {/* <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/> */}