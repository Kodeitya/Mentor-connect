const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mentorSchema = require('./schema/mentor');
const menteeSchema = require('./schema/mentee');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;
const JWT_SECRET = 'mentorconnect#123';

app.use(cors());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded());

app.use(bodyParser.urlencoded({ extended: false }));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mentorConnect')
  .then(() => {
    console.log('Connected to MongoDB');
  });

const Mentor = mongoose.model('Mentor', mentorSchema);
const Mentee = mongoose.model('Mentee', menteeSchema);

app.get('/api/mentors', async (req, res) => {
  const allMentors = await Mentor.find({});
  console.log(allMentors);
  res.json(allMentors);
});

app.get('/api/mentorByMail/:email', async (req, res ) => {
  console.log("aagyi req")
  const mentor = await Mentor.find({email: req.params.email});
  // res.send(`hyjvgyuyu ${req.params.email}`)
  res.json(mentor);
});

app.post('/api/mentors', async (req, res) => {
  console.log("POST REQ CAME");
  console.log(req.body);

  const newMentor = await Mentor.create(req.body);

  res.json(newMentor);
});

app.post('/api/mentees', async(req, res)=>{
  console.log("POST REQ CAME");
  console.log(req.body);
  const newMentee = await Mentee.create(req.body);
  res.json(newMentee);
})

app.post('/api/login', async (req, res) => {
  const { email, password, role } = req.body;

  console.log(email);

  const user = role === 'mentor' ? await Mentor.findOne({ email }) : await Mentee.findOne({ email });

  console.log(user);

  if (!user) {
    return res.json({ status: 'error', error: 'Invalid email/password' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.json({ status: 'error', error: 'Invalid email/password' });
  }

  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);

  res.json({ status: 'ok', data: token });

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});