import {StyleSheet, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Tutorial from '../Component/Tutorial';
import Course from '../Component/Course';
import Exam from '../Component/Exam';
import Home from '../Component/Home';

const Tab = createBottomTabNavigator();
const BottomComponent = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconComponent;
          },
          tabBarActiveTintColor: '#2ec4a5',
          tabBarInactiveTintColor: '#0D0D0D',
          tabBarStyle: {
            borderTopWidth: 0,
          },
        })}>
        <Tab.Screen
          name="HOME"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Course"
          component={Course}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="account-details-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Tutorial"
          component={Tutorial}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="open-book" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Exam"
          component={Exam}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="open-book" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default BottomComponent;

const styles = StyleSheet.create({});
