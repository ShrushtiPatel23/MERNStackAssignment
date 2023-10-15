const express = require('express');
const bodyParser = require('body-parser');
const dataRoutes = require('./routes/data');
const cors = require('cors');
const connectToMongo = require('./config/db.js');

connectToMongo();
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use(cors())
app.use('/data', dataRoutes);

app.get('/', (req,res) => res.send('Hello User'));

app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));