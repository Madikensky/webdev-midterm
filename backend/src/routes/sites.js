const express = require('express');
const pool = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sites ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const siteId = Number(req.params.id);
    if (!Number.isInteger(siteId)) {
      return res.status(400).json({ error: 'Invalid id' });
    }
    const result = await pool.query('SELECT * FROM sites WHERE id = $1', [
      siteId,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Site not found' });
    }
    return res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, address, city, status = 'active' } = req.body;
    if (typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ error: 'name is required' });
    }
    const result = await pool.query(
      `INSERT INTO sites (name, address, city, status)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name.trim(), address, city, status]
    );
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const siteId = Number(req.params.id);
    if (!Number.isInteger(siteId)) {
      return res.status(400).json({ error: 'Invalid id' });
    }
    const { name, address, city, status = 'active' } = req.body;
    if (typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ error: 'name is required' });
    }
    const result = await pool.query(
      `UPDATE sites
       SET name = $1, address = $2, city = $3, status = $4
       WHERE id = $5
       RETURNING *`,
      [name.trim(), address, city, status, siteId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Site not found' });
    }
    return res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const siteId = Number(req.params.id);
    if (!Number.isInteger(siteId)) {
      return res.status(400).json({ error: 'Invalid id' });
    }
    const result = await pool.query(
      'DELETE FROM sites WHERE id = $1 RETURNING id',
      [siteId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Site not found' });
    }
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
