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

const PORT = Number(process.env.PORT || 5000);

function startServer(port) {
  const server = app.listen(port, () => console.log(`Server running on port ${port}`));

  server.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE') {
      console.warn(`Port ${port} is busy, trying ${port + 1}...`);
      startServer(port + 1);
      return;
    }

    throw err;
  });
}

startServer(PORT);
