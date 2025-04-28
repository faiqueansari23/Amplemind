import React from 'react';
import { View, Text, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomComponent from './BottomNavigation';
import CustumDrawer from './CustomDrawer';

const Drawer = createDrawerNavigator();



function AppDrawer() {
  return (
   
      <Drawer.Navigator   drawerContent={props => <CustumDrawer{...props}/>}
      screenOptions={{
        headerStyle: {
          backgroundColor: 'black',  // Set the header background color to black
        },
        headerTintColor: 'white',  // Optional: Set the text/icon color to white for contrast
        headerTitle: () => (
          <Image
            source={require('../image/kodingstreet-logo.png')}  // Replace with your image path
            style={{ width: 180, height: 190, resizeMode: 'contain' }} // Adjust size as needed
          />
        ),
      }}
      
      >
  
           {/* Logic omponent */}

           

        <Drawer.Screen name="Amplemind" component={BottomComponent}  />
        
        {/* <Drawer.Screen name="Profile" component={ProfileScreen} /> */}
      </Drawer.Navigator>
    
  );
}
export default AppDrawer