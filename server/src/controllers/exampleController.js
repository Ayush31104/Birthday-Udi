const Example = require('../models/Example');

const getAll = async (req, res) => {
  try {
    const items = await Example.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const item = await Example.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getAll, create };
