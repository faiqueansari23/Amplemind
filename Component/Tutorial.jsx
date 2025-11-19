// import React, { useEffect } from 'react';
// import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// // Import Images
// import LanguageTech from '../course_img/LanguageTech.png';
// import mern from '../course_img/MERN.png';
// import java from '../course_img/java.png';
// import datascience from '../course_img/data_science.png';
// import dataanalytics from '../course_img/data_analytics.png';
// import devops from '../course_img/devops.png';
// import civil from '../course_img/civil.jpg';
// import electrical from '../course_img/electrical.jpg';
// import mechanical from '../course_img/mechanical.jpg';

// function Course() {
//   const navigation = useNavigation();

//   useEffect(() => {
//     console.log("Courses Component Loaded");
//   }, []);

//   return (
//     <ScrollView style={styles.container}>
//       {/* IT Courses Section */}
//       <View style={styles.sectionContainer}>
//         <Text style={styles.headerText}>Examination</Text>
//         <View style={styles.cardRow}>
//           <CourseCard
//             imageSource={LanguageTech}
//             title="Language Technologies"
//             onPress={() => navigation.navigate('LanguageTechnologies')}
//           />
//           <CourseCard
//             imageSource={mern}
//             title="FULL STACK DEVELOPMENT"
//             onPress={() => navigation.navigate('Mernstack')}
//           />
//           <CourseCard
//             imageSource={java}
//             title="JAVA"
//             onPress={() => navigation.navigate('Java')}
//           />
//           <CourseCard
//             imageSource={datascience}
//             title="DATA SCIENCE"
//             onPress={() => navigation.navigate('Datascience')}
//           />
//           <CourseCard
//             imageSource={dataanalytics}
//             title="DATA ANALYTICS"
//             onPress={() => navigation.navigate('Dataanalytics')}
//           />
//           <CourseCard
//             imageSource={devops}
//             title="DEVOPS"
//             onPress={() => navigation.navigate('Devops')}
//           />
//         </View>
//       </View>

//       {/* Non-IT Courses Section */}
//       {/* <View style={styles.sectionContainer}>
//         <Text style={styles.headerText}>Non-IT Courses</Text>
//         <View style={styles.cardRow}>
//           <CourseCard imageSource={civil} title="CIVIL CADD" />
//           <CourseCard imageSource={electrical} title="ELECTRICAL CADD" />
//           <CourseCard imageSource={mechanical} title="MECHANICAL CADD" />
//         </View>
//       </View> */}


      
//     </ScrollView>
//   );
// }

// function CourseCard({ imageSource, title, onPress }) {
//   return (
//     <TouchableOpacity style={styles.card} onPress={onPress}>
//       <Image source={imageSource} style={styles.cardImage} />
//       <Text style={styles.cardText}>{title}</Text>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000000', // Black Background
//   },
//   sectionContainer: {
//     marginVertical: 20,
//     paddingHorizontal: 15, // Added padding for better alignment
//   },
//   headerText: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 25,
//     color: '#FFD700', // Yellow Color
//     textTransform: 'uppercase', // Header in uppercase
//     letterSpacing: 1.5, // More spacing for better look
//   },
//   cardRow: {
//     flexDirection: 'column', // Cards are stacked vertically
//     alignItems: 'center', // Center each card in the row
//   },
//   card: {
//     width: '90%', // Make the card take almost full width
//     height: 250, // Increase card height
//     backgroundColor: '#111111', // Dark Gray
//     borderRadius: 20, // Larger radius for modern look
//     marginVertical: 15, // More spacing between cards
//     alignItems: 'center',
//     justifyContent: 'center',
//     elevation: 20, // Deeper shadow
//     shadowColor: '#FFD700', // Bright Yellow Glow
//     shadowOffset: { width: 6, height: 6 }, // Shadow on bottom and right only
//     shadowOpacity: 0.6, // Increased shadow visibility
//     shadowRadius: 15, // Larger radius for a more diffused glow
//   },
//   cardImage: {
//     width: '80%', // Use more of the card space for image
//     height: 120,
//     resizeMode: 'contain',
//     borderRadius: 12,
//     marginBottom: 15,
//   },
//   cardText: {
//     fontSize: 18, // Larger font size for better readability
//     fontWeight: '700',
//     color: '#FFD700', // Yellow Text
//     textAlign: 'center',
//   },
// });

// export default Course



// import React from 'react';
// import { StyleSheet, View } from 'react-native';
// import { WebView } from 'react-native-webview';  
// const Tutorial = () => {
//   return (
//     <View style={styles.container}>
//       <WebView 
//         source={{ uri: 'http://kodingstreet.com/tutorial/' }} 
//         style={{ flex: 1 }} 
//       />
//     </View>
//   );
// };

// export default Tutorial;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });


import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Tutorial = () => {
  return (
    <View>
      <Text>Tutorial</Text>
    </View>
  )
}

export default Tutorial

const styles = StyleSheet.create({})