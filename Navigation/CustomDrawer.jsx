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

// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import Svg, {Path} from 'react-native-svg';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import ENDPOINTS from '../BaseURL/BaseURL';
// import {launchImageLibrary} from 'react-native-image-picker';

// const CustomDrawer = ({navigation}) => {
//   const [user, setUser] = useState({name: '', email: ''});
//   const [profileImage, setProfileImage] = useState(null);

//   // Fetch user data on component mount
//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const storedUser = await AsyncStorage.getItem('userDetails');
//         console.log('Stored User:', storedUser);
//         const parsedUser = JSON.parse(storedUser);
//         console.log(
//           'Fetching from:',
//           ENDPOINTS.GET_STUDENT_BY_ID(parsedUser.id),
//         );

//         if (parsedUser && parsedUser.id) {
//           const response = await axios.get(
//             ENDPOINTS.GET_STUDENT_BY_ID(parsedUser.id),
//           );

//           console.log('API Response:', response.data);

//           setUser({
//             name: response.data.student.student_name,
//             email: response.data.student.email,
//             Course: response.data.student.Course,
//           });
//         }
//       } catch (error) {
//         console.error('Error fetching user details:', error);
//         Alert.alert('Error', 'Unable to load user info.');
//       }
//     };

//     fetchUserDetails();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await AsyncStorage.removeItem('userDetails');
//       Alert.alert('Success', 'Logout successful! 🚀');
//       navigation.replace('SignUp');
//     } catch (error) {
//       console.error('Logout error:', error);
//       Alert.alert('Error', 'Logout failed, please try again.');
//     }
//   };

//   // Function to open gallery
//   const selectImage = () => {
//     launchImageLibrary({mediaType: 'photo'}, response => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.errorCode) {
//         console.log('ImagePicker Error: ', response.errorMessage);
//       } else {
//         const uri = response.assets[0].uri;
//         setProfileImage(uri);
//         // Optionally save to AsyncStorage here
//       }
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Image
//           source={require('../image/kodingstreet-logo.png')}
//           style={styles.logo}
//           resizeMode="contain"
//         />

//       </View>

//       {/* Profile Section */}
//       <View style={styles.profileSection}>
//         {/* <Image
//           source={require('../images/contactimagee.png')}
//           style={styles.profilePic}
//         /> */}
//         <TouchableOpacity onPress={selectImage}>
//           <Image
//             source={
//               profileImage
//                 ? {uri: profileImage}
//                 : require('../images/contactimagee.png')
//             }
//             style={styles.profilePic}
//           />
//         </TouchableOpacity>
//         <View>
//           <Text style={styles.userName}>{user.name || 'Loading...'}</Text>
//           <Text style={styles.userEmail}>{user.email || 'Loading...'}</Text>
//           <Text style={styles.userEmail}>{user.Course || 'Loading...'}</Text>
//         </View>
//       </View>

//       <ScrollView contentContainerStyle={styles.menu}>
//         <TouchableOpacity
//           style={styles.menuItem}
//           onPress={() => navigation.navigate('Contact')}>
//           <Text style={styles.menuText}>Contact Us</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.menuItem}
//           onPress={() => navigation.navigate('Amplemind', {screen: 'Course'})}>
//           <Text style={styles.menuText}>Course</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.menuItem}
//           onPress={() => navigation.navigate('AboutUs')}>
//           <Text style={styles.menuText}>About Us</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
//           <Text style={styles.menuText}>Logout</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   header: {
//     // backgroundColor: '#fff',
//     paddingTop: 40,
//     alignItems: 'center',
//     borderBottomLeftRadius: 40,
//     borderBottomRightRadius: 40,
//   },
//   logo: {
//     width: 220,
//     height: 45,
//   },
//   // wave: {
//   //   marginTop: -15,
//   // },
//   profileSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     // backgroundColor: '#ffffff',
//     marginLeft: 7,
//     marginRight:20,
//     marginTop:20,
//     marginBottom:20,
//     padding: 5,
//     borderRadius: 16,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: {width: 0, height: 2},
//   },
//   profilePic: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 15,
//   },
//   userName: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#666',
//   },
//   userEmail: {
//     fontSize: 14,
//     color: '#666',
//   },
//   menu: {
//     paddingHorizontal: 20,
//     paddingTop: 10,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#1c1c1e', // Sleek dark tone
//     paddingVertical: 14,
//     paddingHorizontal: 20,
//     borderRadius: 12,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: '#2ec4a5', // Accent border
//     shadowColor: '#2ec4a5',
//     shadowOpacity: 0.2,
//     shadowOffset: {width: 0, height: 4},
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   menuText: {
//     color: '#2ec4a5',
//     fontSize: 16,
//     fontWeight: '700',
//   },
// });

// export default CustomDrawer;

import React, {useEffect, useState} from 'react';
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
import axios from 'axios';
import ENDPOINTS from '../BaseURL/BaseURL';
import {launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

const CustomDrawer = ({navigation}) => {
  const [user, setUser] = useState({id: '', name: '', email: ''}); // 👈 Added id
  const [profileImage, setProfileImage] = useState(null); // 👈 ADDED

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('userDetails');
        // console.log('Stored User:', storedUser);
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;

        if (parsedUser && parsedUser.id) {
          // console.log('Fetching from:', ENDPOINTS.GET_STUDENT_BY_ID(parsedUser.id));
          const response = await axios.get(
            ENDPOINTS.GET_STUDENT_BY_ID(parsedUser.id),
            {
              headers: {
                Authorization: `Bearer ${parsedUser.token}`, 
              },
            },
          );

          // console.log('API Response:', response.data);

          setUser({
            id: parsedUser.id,
            name: response.data.student.student_name,
            email: response.data.student.email,
            Course: response.data.student.Course,
          });

          // Load saved profile image
          const imageUri = await AsyncStorage.getItem(
            `profileImage_${parsedUser.id}`,
          );
          if (imageUri) {
            setProfileImage(imageUri);
          }
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        Alert.alert('Error', 'Unable to load user info.');
      }
    };

    fetchUserDetails();
  }, []);

  // Image Picker Function
  const selectImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        cropperCircleOverlay: true,
        compressImageQuality: 0.8,
      });

      if (image && image.path) {
        setProfileImage(image.path);
        await AsyncStorage.setItem(`profileImage_${user.id}`, image.path);
      }
    } catch (error) {
      console.log('Image pick error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userDetails');
      await AsyncStorage.removeItem(`profileImage_${user.id}`); // 👈 Remove user's saved image
      Alert.alert('Success', 'Logout successful! 🚀');
      navigation.replace('SignUp');
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Logout failed, please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../image/kodingstreet-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={selectImage}>
          <Image
            source={
              profileImage
                ? {uri: profileImage}
                : require('../images/contactimagee.png')
            }
            style={styles.profilePic}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.userName}>{user.name || 'Loading...'}</Text>
          <Text style={styles.userEmail}>{user.email || 'Loading...'}</Text>
          <Text style={styles.userEmail}>{user.Course || 'Loading...'}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Contact')}>
          <Text style={styles.menuText}>Contact Us</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Amplemind', {screen: 'Course'})}>
          <Text style={styles.menuText}>Course</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('AboutUs')}>
          <Text style={styles.menuText}>About Us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
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
    paddingTop: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  logo: {
    width: 220,
    height: 45,
  },
  profileSection: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10,
    padding: 15,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
  },
  profilePic: {
    width: 75,
    height: 75,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#666',
    alignSelf: 'center',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    alignSelf: 'center',
  },
  menu: {
    // paddingHorizontal: 20,
    paddingTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#1c1c1e',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#2ec4a5',
    borderRadius: 0, // Optional: Remove rounding if not needed
    marginBottom: 12,
    width: '100%', // 👈 Full width
    // shadowColor: '#2ec4a5',
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
