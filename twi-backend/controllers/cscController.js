const Csc = require('../models/Csc'); // Adjust the path as necessary

// Create a new CSC record
exports.createCsc = async (req, res) => {
  try {
    const { country, state, city } = req.body;
    const newCsc = new Csc({ country, state, city });
    const savedCsc = await newCsc.save();
    res.status(201).json(savedCsc);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create CSC record' });
  }
};

// Get all CSC records
exports.getAllCscs = async (req, res) => {
  try {
    const cscs = await Csc.find();
    res.status(200).json(cscs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch CSC records' });
  }
};

// Get a single CSC record by ID
exports.getCscById = async (req, res) => {
  try {
    const csc = await Csc.findById(req.params.id);
    if (!csc) return res.status(404).json({ error: 'CSC not found' });
    res.status(200).json(csc);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch CSC record' });
  }
};

// Update a CSC record by ID
exports.updateCsc = async (req, res) => {
  try {
    const { country, state, city } = req.body;
    const updatedCsc = await Csc.findByIdAndUpdate(
      req.params.id,
      { country, state, city },
      { new: true }
    );
    if (!updatedCsc) return res.status(404).json({ error: 'CSC not found' });
    res.status(200).json(updatedCsc);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update CSC record' });
  }
};

// Delete a CSC record by ID
exports.deleteCsc = async (req, res) => {
  try {
    const deletedCsc = await Csc.findByIdAndDelete(req.params.id);
    if (!deletedCsc) return res.status(404).json({ error: 'CSC not found' });
    res.status(200).json({ message: 'CSC deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete CSC record' });
  }
};
