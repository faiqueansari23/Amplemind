import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import ENDPOINTS from '../BaseURL/BaseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Exam() {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);

   useEffect(() => {
  const fetchCategoriesWithToken = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('userDetails');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;

      if (parsedUser && parsedUser.token) {
        const response = await axios.get(ENDPOINTS.CATEGORIES, {
          headers: {
            Authorization: `Bearer ${parsedUser.token}`,
          },
        });

        console.log('Fetched Categories:', response.data);
        setCategories(response.data);
      } else {
        console.error('User token not found');
      }
    } catch (error) {
      console.error('API Error:', error.message);
    }
  };

  fetchCategoriesWithToken();
}, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.sectionContainer}>
        <Text style={styles.headerText}>Examination</Text>
        <View style={styles.cardRow}>
          {categories.map(category => (
            <CourseCard
              key={category.id}
              imageSource={{uri: category.category_image_url}}
              title={category.category_name}
              onPress={() => {
                navigation.navigate('Subcategories', {categoryId: category.id});
              }}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

function CourseCard({imageSource, title, onPress}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={imageSource} style={styles.cardImage} />
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  sectionContainer: {
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#FFD700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  cardRow: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    height: 250,
    backgroundColor: '#111111',
    borderRadius: 20,
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 20,
    shadowColor: '#FFD700',
    shadowOffset: {width: 6, height: 6},
    shadowOpacity: 0.6,
    shadowRadius: 15,
  },
  cardImage: {
    width: '80%',
    height: 120,
    resizeMode: 'contain',
    borderRadius: 12,
    marginBottom: 15,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFD700',
    textAlign: 'center',
  },
});

export default Exam;
