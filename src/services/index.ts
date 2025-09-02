import { createApi } from './api';
import { API_BASE_URLS } from './apiConfig';

export const authApi = createApi(API_BASE_URLS.auth);
export const deviceApi = createApi(API_BASE_URLS.device);
export const chatbotApi = createApi(API_BASE_URLS.chatbot);
