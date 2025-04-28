import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert,
  Linking,
  PermissionsAndroid
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
// logout
import AsyncStorage from '@react-native-async-storage/async-storage';
// Permisssion
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
// import Geolocation from 'react-native-geolocation-service';
// import messaging from '@react-native-firebase/messaging'
import API_ENDPOINTS from './BaseURL/BaseURL';



const SignInRegister = ({ navigation }) => {
  // ye state konsa page show karna hai uske liye hai 
  const [isSignIn, setIsSignIn] = useState(true);

  // LOGIN
  const [mobilelogin, setMobilelogin] = useState('');
  const [password, setPassword] = useState('');
  const [mobileloginError, setMobileloginError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleLogin = async () => {
    let valid = true;
    const errors = {}; // Define errors object
    setMobileloginError('');
    setPasswordError('');

    if (!mobilelogin) {
      errors.mobilelogin = 'Phone number is required.';
      setMobileloginError(errors.mobilelogin);
      valid = false;
    }

    if (!password) {
      errors.password = 'Password is required.';
      setPasswordError(errors.password);
      valid = false;
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
      setPasswordError(errors.password);
      valid = false;
    }

    if (valid) {
      console.log(`Email: ${mobilelogin}, Password: ${password}`);
      setMobilelogin('');
      setPassword('');
    }

    // Only proceed with POST if no errors
    if (Object.keys(errors).length === 0) {
      try {
        const requestData = {
          phone: mobilelogin,
          password: password,
        };

        const response = await axios.post(
          API_ENDPOINTS.LOGIN, // Login API
          requestData,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          }
        );

        if (response.data.status) {
          console.log(response.data.message);
          console.log(response.data.data.name);

          try {
           
            await AsyncStorage.setItem(
              'userDetails',
              JSON.stringify({
                id: response.data.data.id,
                name: response.data.data.name,
                phone: response.data.data.phone,
                status: response.data.data.status, // Assuming status comes from the API
                key_status: response.data.data.key_status, // Backend se milne wala key_status
              })
            );
            

            Alert.alert('Success', 'Login successful! 🚀');
            navigation.navigate('AppDrawer');
          } catch (error) {
            console.error('Error saving user details:', error);
          }
        }
        else {
          Alert.alert('Login Failed', response.data.message || 'Invalid credentials, please try again.');
        }
      } catch (error) {
        console.error(error);
        if (error.response) {
          Alert.alert('Error', `Server Error: ${error.response.data.message || 'Kuchh galat ho gaya.'}`);
        } else if (error.request) {
          Alert.alert('Error', 'Server se koi response nahi mila, check your internet connection.');
        } else {
          Alert.alert('Error', 'Request failed, please try again.');
        }
      }
    }
  };



 // SIGNUP
  const [fullName, setFullName] = useState('');
  const [emailRegister, setEmailRegister] = useState('');
  const [mobile, setMobile] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');
  const [isCheckedRegister, setIsCheckedRegister] = useState(false);
  const [registerErrors, setRegisterErrors] = useState({});



  const handleSignup = async () => {
    let valid = true;
    const errors = {}; // Errors object for validation

    setRegisterErrors({}); // Reset any previous errors

    // Validation checks
    if (!fullName) {
      errors.fullName = 'Full name is required';
      valid = false;
    }

    if (!emailRegister) {
      errors.emailRegister = 'Email is required';
      valid = false;
    }

    if (!mobile) {
      errors.mobile = 'Phone number is required';
      valid = false;
    }

    if (!passwordRegister) {
      errors.passwordRegister = 'Password is required';
      valid = false;
    }

    if (passwordRegister.length < 6) {
      errors.passwordRegister = 'Password must be at least 6 characters';
      valid = false;
    }

    setRegisterErrors(errors);

    if (valid) {
      const formData = new FormData();
      formData.append('name', fullName);
      formData.append('email', emailRegister);
      formData.append('phone', mobile);
      formData.append('password', passwordRegister);

      try {
        const response = await axios.post(
          API_ENDPOINTS.SIGNUP,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        // Handle successful signup response

        // if (response.data?.status === true || response.data?.message === 'Success') 
        if (response.data.status) {

          console.log(response.data.data);
          setFullName('');
          setEmailRegister('');
          setMobile('');
          setPasswordRegister('');
          Alert.alert('Sign Up Successful', 'You have signed up successfully!');
          setIsSignIn(true);  //signIn par navigate karne ke liye
        } else {
          Alert.alert(`Error: ${response.data.message || 'Registration failed.'}`);
        }
      } catch (error) {
        console.error('AxiosError:', error.response?.data || error.message);
        Alert.alert('Error', 'An error occurred while signing up. Please try again.');
      }
    }
  };

  // Forgot
  const handleForgotPassword = () => {
    Alert.alert('Forgot Password, Redirecting to Password Recovery...');
  };


const toggleCheckboxRegister = () => setIsCheckedRegister(!isCheckedRegister);




   // ==============Location aur Notification ka permission code ek sath ==========

  //const [locationEnabled, setLocationEnabled] = useState(false); // location ko hold karne ke liye

  // Function to check and request location permission
  // const AskForPermission = async (permissionType) => {
  //   try {
  //     const result = await check(permissionType);
  //     if (result === RESULTS.DENIED) {
  //       const requestResult = await request(permissionType);
  //       if (requestResult === RESULTS.GRANTED) {
  //         console.log('Location Permission Granted');
  //         return true;
  //       } else {
  //         console.log('Location Permission Denied');
  //         return false;
  //       }
  //     } else if (result === RESULTS.GRANTED) {
  //       console.log('Location Permission Already Granted');
  //       return true;
  //     } else {
  //       console.log('Location Permission Unavailable');
  //       return false;
  //     }
  //   } catch (error) {
  //     console.error('Permission Error:', error);
  //     return false;
  //   }
  // };

  // Function to check if location services are enabled
  // const checkLocation = () => {
  //   Geolocation.getCurrentPosition(
  //     (position) => {
  //       console.log('Location is enabled', position);
  //       setLocationEnabled(true); // Location is enabled
  //     },
  //     (error) => {
  //       if (error.code === 2) {
  //         console.log('Location services are off');
  //         setLocationEnabled(false); // Location is disabled
  //         promptEnableLocation(); // Prompt user to enable location
  //       } else {
  //         console.log('Error getting location', error.message);
  //       }
  //     },
  //     {
  //       enableHighAccuracy: true,
  //       timeout: 15000,
  //       maximumAge: 10000,
  //     }
  //   );
  // };

  // Prompt user to enable location services
  // const promptEnableLocation = () => {
  //   Alert.alert(
  //     'Location Required',
  //     'Please turn on your location services to proceed.',
  //     [
  //       {
  //         text: 'Cancel',
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'Open Settings',
  //         onPress: () => {
  //           Linking.openSettings().catch(() => console.log('Cannot open settings'));
  //         },
  //       },
  //     ]
  //   );
  // };

  //========= Function to request notification permission============
  // const requestNotificationPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  //       {
  //         title: 'Notification Permission',
  //         message: 'This app needs notification permissions to send you important alerts.',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       }
  //     );

  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('Notification permission granted.');
  //       return true;
  //     } else {
  //       console.log('Notification permission denied.');
  //       Alert.alert(
  //         'Permission Denied',
  //         'Without notification permission, you might miss important alerts.'
  //       );
  //       return false;
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //     return false;
  //   }
  // };

  // Function to request FCM permission and retrieve the token
  // const requestFCMPermissionAndToken = async () => {
  //   try {
  //     const authStatus = await messaging().requestPermission();
  //     const enabled =
  //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //     if (enabled) {
  //       console.log('Authorization status:', authStatus);
  //       const token = await messaging().getToken();
  //       console.log('FCM Token:', token);
  //     } else {
  //       console.log('User did not grant messaging permissions.');
  //     }
  //   } catch (error) {
  //     console.error('FCM Permission Error:', error);
  //   }
  // };

  // Main useEffect to handle permissions sequentially
  // useEffect(() => {
  //   const handlePermissions = async () => {
  //     const permissionType =
  //       Platform.OS === 'ios'
  //         ? PERMISSIONS.IOS.LOCATION_ALWAYS
  //         : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  //     // Step 1: Request Location Permission
  //     const locationGranted = await AskForPermission(permissionType);
  //     if (locationGranted) {
  //       checkLocation(); // Check if location services are enabled
  //     }

  //     // Step 2: Request Notification Permission
  //     const notificationGranted = await requestNotificationPermission();
  //     if (notificationGranted) {
  //       await requestFCMPermissionAndToken(); // Request FCM permission and get token
  //     }
  //   };

  //   handlePermissions();
  // }, []);

 // ==========Location aur Notification ka permission code ek sath End =========
  

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            
            <View style={styles.ImageContainer}>
              <Image source={require('../image/kodingstreet-logo.png')} style={styles.profileImage} />
              
            </View>

            <View style={styles.SignInRegisterContainer}>
              <TouchableOpacity onPress={() => setIsSignIn(true)}>
                <Text style={[styles.TopSignInButtonText, isSignIn && styles.activeTab]}>LOGIN</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsSignIn(false)}>
                <Text style={[styles.registerButtonText, !isSignIn && styles.activeTab]}>REGISTER</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
              {isSignIn ? (
                <View style={styles.container}>
                 <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Mobile"
                      value={mobilelogin}
                      onChangeText={setMobilelogin}
                      placeholderTextColor={'#7B7B7B'}
                      keyboardType="numeric"
                    />
                  </View>
                  {mobileloginError ? <Text style={styles.errorText}>{mobileloginError}</Text> : null}

                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Password"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                      placeholderTextColor="#7B7B7B"
                    />
                  </View>
                  {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}



                  {/* <View style={styles.checkBoxContainer}>
                    <Checkbox status={isChecked ? 'checked' : 'unchecked'} onPress={() => setIsChecked(!isChecked)} color="#8374FF" />
                    <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
                      <Text style={styles.text}>Stay signed in</Text>
                    </TouchableOpacity>
                  </View> */}

                  <TouchableOpacity style={styles.SigInButton} onPress={handleLogin}>
                    <Text style={styles.SigInButtonText}>SIGN IN</Text>
                  </TouchableOpacity>

                  {/* Forgot Password Link */}
                  <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forget Password?</Text>
                  </TouchableOpacity>

                </View>

              ) : (

                <View style={styles.container}>
                  
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        value={fullName}
                        onChangeText={setFullName}
                        placeholderTextColor="#7B7B7B"
                      />
                    </View>
                    {registerErrors.fullName && <Text style={styles.errorText}>{registerErrors.fullName}</Text>}

                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={emailRegister}
                        onChangeText={setEmailRegister}
                        placeholderTextColor="#7B7B7B"
                        keyboardType="email-address"
                      />
                    </View>
                    {registerErrors.emailRegister && <Text style={styles.errorText}>{registerErrors.emailRegister}</Text>}

                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="Mobile"
                        value={mobile}
                        onChangeText={setMobile}
                        placeholderTextColor="#7B7B7B"
                        keyboardType="numeric"
                      />
                    </View>
                    {registerErrors.mobile && <Text style={styles.errorText}>{registerErrors.mobile}</Text>}

                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={passwordRegister}
                        onChangeText={setPasswordRegister}
                        secureTextEntry
                        placeholderTextColor="#7B7B7B"
                      />
                    </View>
                    {registerErrors.passwordRegister && <Text style={styles.errorText}>{registerErrors.passwordRegister}</Text>}

                    {/* <View style={styles.checkBoxContainer}>
                      <Checkbox
                        status={isCheckedRegister ? 'checked' : 'unchecked'}
                        onPress={toggleCheckboxRegister}
                        color="#8374FF"
                      />
                      <Text style={styles.text}>I have read and agree to Terms & Conditions</Text>
                    </View> */}

                    <TouchableOpacity style={styles.SignButton} onPress={handleSignup}>
                      <Text style={styles.SignButtonText}>REGISTER NOW</Text>
                    </TouchableOpacity>

                      {/* Already have an account */}
                      <View style={styles.accountContainerForSignIn}>
                        <Text style={styles.accountText}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => setIsSignIn(true)}>
                         <Text style={styles.BottomSignInLink}>SIGN IN</Text>
                        </TouchableOpacity>
                      </View>
                      
                 
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#000',
  },
  ImageContainer: {
    alignItems: 'center',
    marginTop: 25,
  },
  profileImage: {
    width: 300,
    height: 35,
    marginVertical:50
  },
  profileImageText: {
    width: 212,
    height: 53,
    marginBottom: 25,
  },
  SignInRegisterContainer: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  TopSignInButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2ec4a5',
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: 38,
    borderRadius: 80,
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderColor: '#ddd',
    // Shadow for inputContainer
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 13,
    color: '#7B7B7B', // Darker gray for readability
    fontFamily: 'Poppins-Regular',
  },
  InputImagePassword: {
    width: 29,
    height: 29
  },
  SigInButton: {
    backgroundColor: '#2ec4a5',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 80,
    width: '90%',
    height: 38,
    marginBottom: 15,
    marginTop: 50,
    shadowColor: '#000',          // Black shadow
    shadowOffset: { width: 0, height: 4 }, // Slight offset
    shadowOpacity: 0.2,           // Shadow opacity
    shadowRadius: 8,              // Shadow spread
    elevation: 4,                 // Elevation for Android shadow
  },
  SigInButtonText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Poppins-Light', // Standardized
    fontWeight: '500',
    textAlign: 'center',
  },
//   forgotPassword: {
//     marginTop: 40,
//   },
  forgotPasswordText: {
    color: '#ACACAC',
    fontSize: 13,
    fontFamily: 'Poppins-Light', // Unified
    marginBottom: 30,
    fontWeight: '500',
    textAlign: 'center'
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    alignSelf: 'flex-start', // Added for left alignment
    marginLeft: 10, // Added margin to align content from the left
  },
  text: {
    fontSize: 10,
    fontWeight: '500',
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  SignButton: {
    backgroundColor: '#2ec4a5',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 80,
    width: '90%',
    height: 38,
    marginTop: 50,
    // Adding shadow to SignButton
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  SignButtonText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Poppins-Light', // Standardized
    fontWeight: '500',
    textAlign: 'center',
  },
  accountContainerForSignIn: {
    flexDirection: 'row',
    alignItems: 'center',        
    justifyContent: 'center',     
    marginTop: 15,               
    paddingHorizontal: 10,        
    width: '100%',                
  },
  accountText: {
    color: '#7B7B7B',           
    fontSize: 14,
    marginRight: 5,
  },
  BottomSignInLink: {
    color: '#2ec4a5',
    fontSize: 13,
    fontFamily: 'Poppins-Light', // Unified
    fontWeight: '500'
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 0,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  FaiqinputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    height: 38,
    borderRadius: 80,
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderColor: '#ddd',
    // Shadow for inputContainer
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  picker: {
    height: 50,
    width: '100%',
    fontSize: 10,
    color: '#7B7B7B',
    fontFamily: 'Poppins-Regular',
  },
});

export default SignInRegister 