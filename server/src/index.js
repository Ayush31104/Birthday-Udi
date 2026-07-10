const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./middleware/db');
const exampleRoutes = require('./routes/example');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/example', exampleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
