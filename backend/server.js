const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
// const Post = require('./models/Post');

app.use(cors());
app.use(express.json());  // to parse JSON bodies

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/blogApp', { useNewUrlParser: true, useUnifiedTopology: true });

// Routes (CRUD operations)
app.get('/api/posts', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 }); // Reverse chronological order
  res.json(posts);
});

app.post('/api/posts', async (req, res) => {
  const { title, content } = req.body;
  const newPost = new Post({ title, content });
  await newPost.save();
  res.json(newPost);
});

app.get('/api/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
});

app.put('/api/posts/:id', async (req, res) => {
  const { title, content } = req.body;
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
  res.json(updatedPost);
});

app.delete('/api/posts/:id', async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: 'Post deleted successfully' });
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
