//import package//
const express = require('express');

const app = express();

const cors = require('cors');

const mongoose = require('mongoose');

const dotenv = require('dotenv');
const userrouter = require('./routes/user');

dotenv.config();

app.use(express.json());
app.use(cors());

//middleware
app.use(userrouter);


app.get('/', async (req, res) => {
  return await res.send('HI');
});



const port = process.env.PORT;

app.listen(port, () => {
  console.log(`PORT AT ${port}`);
});
