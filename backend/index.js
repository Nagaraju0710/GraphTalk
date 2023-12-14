// server.js
const express = require('express');
const mongoose = require('mongoose');
const dataRoutes = require('./routes/dataRoutes');
const cors = require('cors')



const app = express();
app.use(cors());
const port = 8080;

// Connect to MongoDB
mongoose.connect('mongodb+srv://nani1210:Nani1210@cluster0.lyqhbhu.mongodb.net/GraphTalk', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware to parse JSON
app.use(express.json());

// Use routes
app.use('/maindata', dataRoutes);

app.listen(port, () => {
    console.log("connected to db");
  console.log(`Server is running at http://localhost:${port}`);
});


