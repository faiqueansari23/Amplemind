import React, {useState, useEffect} from 'react';
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
  Alert,
} from 'react-native';
import axios from 'axios';
// logout
import AsyncStorage from '@react-native-async-storage/async-storage';
// Permisssion
import ENDPOINTS from '../BaseURL/BaseURL';

const SignInRegister = ({navigation}) => {
  // LOGIN
  const [emaillogin, setEmaillogin] = useState('');
  const [password, setPassword] = useState('');
  const [emailloginError, setEmailloginError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = async () => {
    let valid = true;
    const errors = {}; // Define errors object
    setEmailloginError('');
    setPasswordError('');

    if (!emaillogin) {
      errors.emaillogin = 'email is required.';
      setEmailloginError(errors.emaillogin);
      valid = false;
    }

    if (!password) {
      errors.password = 'Password is required.';
      setPasswordError(errors.password);
      valid = false;
    } else if (password.length < 5) {
      errors.password = 'Password must be at least 5 characters.';
      setPasswordError(errors.password);
      valid = false;
    }

    if (valid) {
      setEmailloginError('');
      setPassword('');
    }

    // Only proceed with POST if no errors
    if (Object.keys(errors).length === 0) {
      try {
        const requestData = {
          email: emaillogin,
          password: password,
        };

        const response = await axios.post(
          ENDPOINTS.STUDENT_LOGIN, // Login API
          requestData,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },
        );

        if (response.data.status) {
          try {
            await AsyncStorage.setItem(
              'userDetails',
              JSON.stringify({
                id: response.data.student.student_id,
                name: response.data.student.student_name,
                email: response.data.student.email,
                course: response.data.student.course,
                token: response.data.token,
              }),
            );

            Alert.alert('Success', 'Login successful! 🚀');
            navigation.navigate('AppDrawer');
          } catch (error) {
            console.error('Error saving user details:', error);
          }
        } else {
          Alert.alert(
            'Login Failed',
            response.data.message || 'Invalid credentials, please try again.',
          );
        }
      } catch (error) {
        console.error(error);
        if (error.response) {
          Alert.alert(
            'Error',
            `Server Error: ${
              error.response.data.message || 'Kuchh galat ho gaya.'
            }`,
          );
        } else if (error.request) {
          Alert.alert(
            'Error',
            'Server se koi response nahi mila, check your internet connection.',
          );
        } else {
          Alert.alert('Error', 'Request failed, please try again.');
        }
      } finally {
        // Clear inputs always
        setEmaillogin('');
        setPassword('');
      }
    }
  };

  // Forgot
  const handleForgotPassword = () => {
    Alert.alert('Forgot Password, Redirecting to Password Recovery...');
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.ImageContainer}>
              <Image
                source={require('../image/kodingstreet-logo.png')}
                style={styles.profileImage}
              />
            </View>

            <View style={styles.formContainer}>
              <View style={styles.container}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={emaillogin}
                    onChangeText={setEmaillogin}
                    placeholderTextColor={'#7B7B7B'}
                    keyboardType="email-address"
                  />
                </View>
                {emailloginError ? (
                  <Text style={styles.errorText}>{emailloginError}</Text>
                ) : null}

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
                {passwordError ? (
                  <Text style={styles.errorText}>{passwordError}</Text>
                ) : null}

                <TouchableOpacity
                  style={styles.SigInButton}
                  onPress={handleLogin}>
                  <Text style={styles.SigInButtonText}>Login</Text>
                </TouchableOpacity>

                {/* Forgot Password Link */}
                <TouchableOpacity
                  onPress={handleForgotPassword}
                  style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>
                    Forget Password?
                  </Text>
                </TouchableOpacity>
              </View>
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
    marginBottom: 50,
  },
  profileImage: {
    width: 300,
    height: 35,
    marginVertical: 50,
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
    shadowOffset: {width: 0, height: 2},
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

  SigInButton: {
    backgroundColor: '#2ec4a5',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 80,
    width: '90%',
    height: 38,
    marginBottom: 15,
    marginTop: 50,
    shadowColor: '#000', // Black shadow
    shadowOffset: {width: 0, height: 4}, // Slight offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 8, // Shadow spread
    elevation: 4, // Elevation for Android shadow
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
    textAlign: 'center',
  },

  text: {
    fontSize: 10,
    fontWeight: '500',
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 0,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
});

export default SignInRegister;
