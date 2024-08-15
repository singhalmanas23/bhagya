const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5003;

app.use(cors({
  origin: [
    'https://areen-bk9q.vercel.app',  // Production domain
    'http://localhost:5174'           // Local development
  ]
}));


app.use(express.json());

mongoose.connect('mongodb+srv://singhalmanas20:Rummy123@cluster0.lttbs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const itemSchema = new mongoose.Schema({
  Date: Date,
  Time: String,
  MA: String,
  MB: String,
  MC: String,
  MD: String,
  ME: String,
  MF: String,
  MG: String,
  MH: String,
  MI: String,
  MJ: String,
});

const Item = mongoose.model('items', itemSchema);

app.get('/api/all-items', async (req, res) => {
  try {
    const items = await Item.find();
    console.log("Items fetched from DB:", items);  
    res.json(items);
  } catch (error) {
    res.status(500).send(error.message);
  }
});



app.get('/', (req, res) => {
  res.send('Test route is working!');
});

app.get('/api/items', async (req, res) => {
  try {
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).send('Invalid date format');
    }

    console.log("Received Dates:", startDate, endDate);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    console.log("Query:", {
      Date: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    const items = await Item.find({
      Date: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    console.log("Items fetched from DB:", items);
    res.json(items);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send(error.message);
  }
});


app.post('api/data', async (req, res) => {
  try {
    const formData = req.body;

    formData.Date = new Date(formData.Date);

    const newItem = new Item(formData);
    await newItem.save();
    res.status(201).send('Data uploaded successfully');
  } catch (error) {
    console.error('Data submission failed', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
