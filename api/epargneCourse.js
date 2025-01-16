import axios from "axios";


export const getAllCourse = axios.get('http://127.0.0.1:8000/').then(response=>response.data)