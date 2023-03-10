
const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// body parser Enabler
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//frontend in public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/openai', require('./routes/openairoutes'));

app.listen(port, () => console.log(`Server started on port ${port}`));
