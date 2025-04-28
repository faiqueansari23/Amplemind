import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Contact = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Contact Details Section */}
      <View style={styles.contactSection}>
        <Image
          source={require('../images/contactimagee.png')}
          style={styles.logo}
        />
        <Text style={styles.contactText}>
          H.N 635C, Behind Babbu Galaxy Restaurant Katol Road, Chhaoni Rd,
          Nagpur, Maharashtra 440013
        </Text>
        <Text style={styles.contactText}>qaswatechnology@gmail.com</Text>
        <Text style={styles.contactText}>9326197423</Text>

        {/* Social Media Icons */}
        <View style={styles.iconRow}>
          <TouchableOpacity>
            <FontAwesome name="facebook" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="whatsapp" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome5 name="instagram" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="linkedin" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Form Section */}
      <View style={styles.formSection}>
        <Text style={styles.title}>Get in touch!</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#666"
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile No."
          placeholderTextColor="#666"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#666"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          placeholderTextColor="#666"
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Message"
          placeholderTextColor="#666"
          multiline
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* Google Map Section */}
      <View style={styles.mapSection}>
        <Text style={styles.mapTitle}>Find us here!</Text>
        {/* Google Map Embed in WebView */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contactSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  contactText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginTop: 10,
  },
  icon: {
    fontSize: 30,
    color: '#000',
  },
  formSection: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#2ec4a5',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  mapSection: {
    marginTop: 20,
  },
  mapTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default Contact;
