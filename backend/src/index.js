const dotenv = require('dotenv');
const express = require('express');

dotenv.config();

const apiRouter = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
