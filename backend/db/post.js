import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Fetch all posts
const fetchPosts = async () => {
  const response = await api.get('/posts');
  return response.data;
};

// Create a new post
const createPost = async (postData) => {
  const response = await api.post('/posts', postData);
  return response.data;
};

// Edit an existing post
const editPost = async (id, updatedData) => {
  const response = await api.put(`/posts/${id}`, updatedData);
  return response.data;
};

// Delete a post
const deletePost = async (id) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};
