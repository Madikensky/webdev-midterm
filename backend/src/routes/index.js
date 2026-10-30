const express = require('express');
const sitesRouter = require('./sites');

const router = express.Router();

router.use('/sites', sitesRouter);

module.exports = router;
