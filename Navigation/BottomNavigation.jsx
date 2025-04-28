import {StyleSheet, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Home from '../Component/Home';
import Tutorial from '../Component/Tutorial';
import Course from '../Component/Course';
import Exam from '../Component/Exam';
import Home from '../Component/Home';
// import AboutUs from '../Component/AboutUs';
// import Home from '../Component/Home';
// import Course from '../Component/Course';
// import AboutPage from '../Component/AboutUs';
// import AboutUs from '../Component/AboutUs';



const Tab = createBottomTabNavigator();
const BottomComponent = () => {
  return (
    <>
      {/* <NavigationContainer> */}
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconComponent;

             
            },
            tabBarActiveTintColor: '#2ec4a5',
            tabBarInactiveTintColor: '#0D0D0D',
            tabBarStyle: {
              // backgroundColor: 'black', // Background color for the bottom navigation bar
              borderTopWidth: 0, // Optional: Removes border at the top of the tab bar
            },
          })}>
          <Tab.Screen
        name="HOME"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            // Using Ionicons for the Home icon
            <Ionicons
              name="home" // Icon name
              size={size} // Icon size
              color={color} // Icon color
            />
          ),
        }}
      />


<Tab.Screen
        name="Course"
        component={Course}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            // Using Ionicons for the Home icon
            <MaterialCommunityIcons
              name="account-details-outline" // Icon name
              size={size} // Icon size
              color={color} // Icon color
            />
          ),
        }}
      /> 

<Tab.Screen
        name="Tutorial"
        component={Tutorial}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            // Using Ionicons for the Home icon
            <MaterialIcons
              name="open-book"
              size={size} 
              color={color} 
            />
          ),
        }}
      /> 
      <Tab.Screen
        name="Exam"
        component={Exam}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            // Using Ionicons for the Home icon
            <MaterialIcons
              name="open-book" 
              size={size} 
              color={color} 
            />
          ),
        }}
      /> 

          {/* <Tab.Screen
            name="mosque"
            component={New_Mobile_Safe}
            options={{headerShown: false}}
          /> */}
          {/* <Tab.Screen
            name="open-book"
            component={Hide_App_Icon}
            options={{headerShown: false}}
          /> */}
        </Tab.Navigator>
      {/* </NavigationContainer> */}
    </>
  );
};

export default BottomComponent;

const styles = StyleSheet.create({});