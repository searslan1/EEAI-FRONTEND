//API isteklerini tek bir noktada yöneten servis.
import axios from 'axios';

// .env dosyasından baseURL'yi alın
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Axios örneği oluşturun
const API = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Çerezler için gerekli
});

export default API;



