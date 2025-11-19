import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import ENDPOINTS from '../BaseURL/BaseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExamScreen = () => {
  const route = useRoute();
  const {categoryId} = route.params;

  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('userDetails');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;

        if (parsedUser?.token && categoryId) {
          const response = await axios.get(
            ENDPOINTS.GET_QUESTION_PAPER_BY_ID(categoryId),
            {
              headers: {
                Authorization: `Bearer ${parsedUser.token}`,
              },
            },
          );
          setQuestions(response.data);
        }
      } catch (error) {
        console.error('Error fetching questions:', error.message);
      }
    };

    fetchQuestions();
  }, [categoryId]);

  const handleOptionSelect = (questionId, selectedOption) => {
    if (submitted) return;
    setSelectedOptions(prev => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = () => {
    let total = 0;
    questions.forEach(q => {
      if (selectedOptions[q.id] === q.correct_answer) {
        total += q.marks;
      }
    });
    setScore(total);
    setSubmitted(true);
    Alert.alert('Exam Submitted', `You scored ${total} marks!`);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Exam Paper</Text>

      {questions.map((q, index) => (
        <View key={q.id} style={styles.card}>
          <Text style={styles.questionText}>
            {index + 1}. {q.question}
          </Text>

          {['option1', 'option2', 'option3', 'option4'].map((optKey, idx) => {
            const optionValue = q[optKey];
            const isSelected = selectedOptions[q.id] === optionValue;
            const isCorrect = q.correct_answer === optionValue;

            let optionStyle = styles.optionButton;
            if (submitted) {
              if (isCorrect) optionStyle = styles.correctOption;
              else if (isSelected && !isCorrect)
                optionStyle = styles.wrongOption;
            } else if (isSelected) {
              optionStyle = styles.selectedOption;
            }

            return (
              <TouchableOpacity
                key={idx}
                style={optionStyle}
                onPress={() => handleOptionSelect(q.id, optionValue)}>
                <Text style={styles.optionText}>{optionValue}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}

      {!submitted ? (
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>🎯 You scored {score} marks</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  title: {
    color: '#FFD700',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  card: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 15,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#FFD700',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  questionText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  optionButton: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#222',
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  selectedOption: {
    backgroundColor: '#FFD700',
    padding: 12,
    borderRadius: 10,
    marginVertical: 6,
  },
  correctOption: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 10,
    marginVertical: 6,
  },
  wrongOption: {
    backgroundColor: '#dc3545',
    padding: 12,
    borderRadius: 10,
    marginVertical: 6,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  submitBtn: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 12,
    marginVertical: 20,
    alignItems: 'center',
  },
  submitText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  resultBox: {
    backgroundColor: '#111',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
  },
});

export default ExamScreen;
