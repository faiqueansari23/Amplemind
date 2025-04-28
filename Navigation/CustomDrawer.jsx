// import React from 'react';
// import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
// import Svg, { Path } from 'react-native-svg';

// const CustomDrawer = ({ navigation }) => {
//   return (
//     <View style={styles.drawerContainer}>
//       {/* Header Section with Image */}
//       <View style={styles.headerContainer}>
//         <Image
//           source={require('../image/kodingstreet-logo.png')}
//           style={styles.image}
//         />
//         {/* <Text style={styles.drawerHeader}>Amplemind Solution</Text> */}
//         <View style={styles.waveContainer}>
//           <Svg height="40" width="100%" viewBox="0 0 1440 320">
//             <Path
//               fill="#000000" // Black wave
//               d="M0,160L48,165.3C96,171,192,181,288,176C384,171,480,149,576,138.7C672,128,768,128,864,144C960,160,1056,192,1152,186.7C1248,181,1344,139,1392,117.3L1440,96L1440,320L0,320Z"
//             />
//           </Svg>
//         </View>
//       </View>

//       {/* Menu Options */}
//       <TouchableOpacity onPress={() => navigation.navigate('LogIn')} style={styles.drawerButton}>
//         <Text style={styles.drawerItem}>Home</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.drawerButton}>
//         <Text style={styles.drawerItem}>Contact Us</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.drawerButton}>
//         <Text style={styles.drawerItem}>Course</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.drawerButton}>
//         <Text style={styles.drawerItem}>AboutUs</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.drawerButton}>
//         <Text style={styles.drawerItem}>Logout</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   drawerContainer: {
//     backgroundColor: '#000000',
//     height: "100%",
//   },
//   headerContainer: {
//     alignItems: 'center',
//     paddingVertical: 20,
//     width: '80%',
//     marginLeft:10,
//     borderBottomLeftRadius: 40,
//     borderBottomRightRadius: 40,
//     elevation: 5,
//   },
//   // waveContainer: {
//   //   backgroundColor: '#00FF00',
//   //   // Any additional wave styling can be added here
//   // },
//   image: {
//     width: 210,
//     height: 25,
//     // borderWidth: 1,
//     // borderColor: '#fff',
//   },
//   drawerHeader: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#000000',
//     marginTop: 30,
//   },
//   drawerButton: {
//     backgroundColor: '#2ec4a5', // Green buttons
//     borderRadius: 20, // Curved button corners
//     paddingVertical: 15,
//     marginVertical: 10,
//     marginTop:20,
//     marginHorizontal: 20,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 4,
//   },
//   drawerItem: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#FFF', // Black text
//   },
// });

// export default CustomDrawer;

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawer = ({navigation}) => {
  // Logout
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userDetails');
      Alert.alert('Success', 'Logout successful! 🚀');
      navigation.replace('SignUp');
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Logout failed, please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with Logo */}
      <View style={styles.header}>
        <Image
          source={require('../image/kodingstreet-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        {/* <Svg height="60" width="100%" viewBox="0 0 1440 320" style={styles.wave}>
          <Path
            fill="#2ec4a5"
            d="M0,64L60,85.3C120,107,240,149,360,154.7C480,160,600,128,720,106.7C840,85,960,75,1080,96C1200,117,1320,171,1380,197.3L1440,224V320H0Z"
          />
        </Svg> */}
      </View>

      {/* User Profile */}
      <View style={styles.profileSection}>
        <Image
          source={require('../images/contactimagee.png')}
          style={styles.profilePic}
        />
        <View>
          <Text style={styles.userName}>Salman Khan</Text>
          <Text style={styles.userEmail}>kodingstreet@gmail.com</Text>
        </View>
      </View>

      {/* Drawer Buttons */}
      <ScrollView contentContainerStyle={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('LogIn')}>
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Contact')}>
          <Text style={styles.menuText}>Contact Us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Course</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>About Us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
         style={styles.menuItem}
         onPress={() => navigation.navigate('SignUp')}
         >
          <Text style={styles.menuText}>SignUp</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    // backgroundColor: '#fff',
    paddingTop: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  logo: {
    width: 220,
    height: 45,
  },
  // wave: {
  //   marginTop: -15,
  // },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#ffffff',
    margin: 20,
    padding: 15,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#666',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  menu: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1e', // Sleek dark tone
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2ec4a5', // Accent border
    shadowColor: '#2ec4a5',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 6,
    elevation: 3,
  },
  menuText: {
    color: '#2ec4a5',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default CustomDrawer;
