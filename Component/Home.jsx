import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import Svg, {Path} from 'react-native-svg';
const Industry = require('../images/IT-Training.jpg'); // Replace with your actual image paths
const Teaching = require('../image/teaching.jpg');
const Images = require('../images/compressive-curriculum.jpg');
const Placement = require('../images/placement-assistance.jpg');


const TechCategories = () => {
  // const navigation = useNavigation();

  const categories = [
    {name: 'Full-Stack MERN', route: 'Mernstack'},
    {name: 'Python', route: 'Python'},
    {name: 'Data Analytics', route: 'Dataanlytics'},
    {name: 'Data Science', route: 'Datascience'},
    {name: 'Java', route: 'Java'},
    {name: 'DevOps', route: 'Devops'},
    {name: 'Software Testing', route: 'SoftwareTesting'},
    {name: 'Node JS', route: 'NodeJS'},
    {name: 'Salesforce', route: 'Salesforce'},
    {name: 'Angular', route: 'Angular'},
    {name: 'React', route: 'React'},
  ];

}


function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Top Section */}
        <LinearGradient
          colors={['#000', '#000']}
          style={styles.headerContainer}>
          <View style={styles.rowContainer}>    
            {/* Left: Text Content */}
            <View style={styles.textContainer}>
              <Text style={styles.heading}>Are you Looking For Internship ?</Text>
              <Text style={styles.subText}>Begin your career with us!</Text>
              <Text style={styles.smallText}>
                Full Stack MERN | JAVA 
              </Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Contact Us</Text>
              </TouchableOpacity>
            </View>

            {/* Right: Image */}
            <View style={styles.imageContainer}>
              <Image
                source={require('../image/bannerimg.png')}
                style={styles.image1}
              />
            </View>
          </View>
          
          {/* Wavy Design */}
          <Svg
            height="100"
            width="100%"
            viewBox="0 0 1440 320"
            style={styles.wave}>
            <Path
              fill="#F4F4F4"
              d="M0,224L80,208C160,192,320,160,480,160C640,160,800,192,960,192C1120,192,1280,160,1360,144L1440,128V320H0Z"
            />
          </Svg>
          
        </LinearGradient>

        {/* Lower Section */}
        
    
 
      {/* First Row */}
      <View style={styles.row}>
        <View style={styles.card}>
          <Image source={Industry} style={styles.image} />
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Industry-Relevant Training</Text>
            <Text style={styles.cardText}>
              Qaswa Tech IT Institute as well as IT Company as well which is located in Nagpur.
              We specialize in providing up-to-date and industry-relevant training programs.
              We design their courses to equip students with the skills and knowledge required by employers in the IT sector.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Image source={Teaching} style={styles.image} />
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Experienced and Qualified Trainer</Text>
            <Text style={styles.cardText}>
              Qaswa Tech often has a team of experienced and qualified instructors who are experts
              in their respective fields. These instructors bring real-world industry experience to the classroom,
              enabling them to provide practical insights, guidance, and mentorship.
            </Text>
          </View>
        </View>
      </View>

      {/* Second Row */}
      <View style={styles.row}>
        <View style={styles.card}>
          <Image source={Images} style={styles.image} />
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Comprehensive Curriculum</Text>
            <Text style={styles.cardText}>
            Qaswa Tech offers comprehensive and structured curriculum that cover various aspects of IT.
              We provide a well-rounded education that includes both theoretical knowledge and practical skills.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Image source={Placement} style={styles.image} />
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Placement Assistance</Text>
            <Text style={styles.cardText}>
              We offer 100% placement assistance to their students. We have partnerships with local businesses,
              IT companies, and recruitment agencies, which can facilitate job placement opportunities for their graduates.
            </Text>
          </View>
        </View>
      </View>


      
      </ScrollView>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    
    backgroundColor: '#F4F4F4'},
  headerContainer: {paddingBottom: 60, position: 'relative'},
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Spaces text and image
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  textContainer: {
    flex: 1, // Takes up available space
    paddingRight: 10,
  },
  heading: {color: '#2ec4a5', fontSize: 18, fontWeight: 'bold'},
  subText: {color: '#AAA', fontSize: 12, marginTop: 10},
  smallText: {color: '#666', fontSize: 14, marginVertical: 5},
  button: {
    marginTop: 15,
    backgroundColor: '#2ec4a5',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  buttonText: {color: '#000', fontWeight: 'bold'},
  imageContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  image: {
    height: 400,
    width: 500,
    // resizeMode: 'contain',
  },
  image1: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
  },
  wave: {position: 'absolute', bottom: -10, left: 0},
  lowerSection: {padding: 20, backgroundColor: '#F4F4F4'},
  lowerImage: {width: '100%', height: 200, resizeMode: 'contain'},
  row: {
    marginBottom: 20, // Space between rows
  },
  card: {
    width: '90%', // Card takes up the full width of the row
    borderRadius: 10,
    marginLeft:20,
    marginTop:40,
    // height:400,
    overflow: 'hidden',
    backgroundColor: '#f8f8f8',
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardBody: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  cardText: {
    fontSize: 19,
    color: '#444',
    lineHeight:25
  },
});

export default Home;


