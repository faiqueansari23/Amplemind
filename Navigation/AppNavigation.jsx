import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppDrawer from './AppDrawer';
import SignUp from '../Registration/SignUp';
import Subcategories from '../Exam/Subcategories';
import Contact from '../Component/Contact';   
import AboutUs from '../Component/AboutUs';

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
        <Stack.Screen name="Subcategories" component={Subcategories} options={{ headerShown: false }} />
        <Stack.Screen name="Contact" component={Contact} options={{ headerShown: false }} />
        <Stack.Screen name="AboutUs" component={AboutUs} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;





