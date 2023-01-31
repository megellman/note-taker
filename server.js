const express = require('express');
const path = require('path');
const router = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

// Initializing express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

app.use(express.static('public'));

// Notes will return notes html
app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Catch-all, anything not specified returns public index file
app.get('*', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://0.0.0.0:${PORT} 🚀`)
);