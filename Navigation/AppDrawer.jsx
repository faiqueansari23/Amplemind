import React from 'react';
import {View, Text, Image} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomComponent from './BottomNavigation';
import CustumDrawer from './CustomDrawer';

const Drawer = createDrawerNavigator();

function AppDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustumDrawer {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: 'white',
        headerTitle: () => (
          <Image
            source={require('../image/kodingstreet-logo.png')}
            style={{width: 180, height: 190, resizeMode: 'contain'}}
          />
        ),
      }}>
      <Drawer.Screen name="Amplemind" component={BottomComponent} />
    </Drawer.Navigator>
  );
}
export default AppDrawer;
