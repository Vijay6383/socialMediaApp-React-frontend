import axios from "axios";

const API = axios.create({baseURL: "https://socialmedia-api-v7ye.onrender.com"})

export const uploadImage = (data) => API.post('/upload/', data)
export const uploadVideo = (data) => API.post('/upload/', data)
export const uploadPost = (data) => API.post('/posts', data)