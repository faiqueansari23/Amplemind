const BASE_URL = 'http://192.168.0.139:5000/api';


const ENDPOINTS = {
  STUDENT_LOGIN: `${BASE_URL}/students/login`,
  STUDENT_REGISTER: `${BASE_URL}/students`,
  GET_ALL_STUDENTS: `${BASE_URL}/students`,
  GET_STUDENT_BY_ID: (id) => `${BASE_URL}/students/${id}`,
  CATEGORIES: `${BASE_URL}/categories`,
  GET_SUBCATEGORIES_BY_CATEGORY_ID: (categoryId) => `${BASE_URL}/subcategories/${categoryId}`,
  QUESTIONS: `${BASE_URL}/questions`,
  GET_QUESTION_PAPER_BY_ID: (id) => `${BASE_URL}/questions/question-paper/${id}`, 
};

export default ENDPOINTS;
