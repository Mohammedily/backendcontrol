//import package//
const express = require('express');

const app = express();

const cors = require('cors');

const mongoose = require('mongoose');

const dotenv = require('dotenv');
const userrouter = require('./routes/user');
const authrouter = require('./routes/auth');

dotenv.config();

mongoose
  .connect(process.env.MONGO || "mongodb+srv://iasfs:ilyas123ily@cluster0.voxguwv.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log('MongDB Is Connected'))
  .catch((error) => console.log(error));

app.use(express.json());
app.use(cors());

//middleware
app.use(userrouter);
app.use(authrouter);


app.get('/', async (req, res) => {
  return await res.send('HI');
});

const port = process.env.PORT  || 1000 ;

app.listen(port, () => {
  console.log(`PORT AT ${port}`);
});
