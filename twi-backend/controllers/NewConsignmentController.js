const TransportDetails = require('../models/NewConsignment'); // Update the path if needed

// Create a new transport detail
exports.createTransportDetail = async (req, res) => {
  try {
    const transportDetail = new TransportDetails(req.body);
    await transportDetail.save();
    res.status(201).json({
      success: true,
      message: 'Transport detail created successfully',
      data: transportDetail,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating transport detail',
      error: error.message,
    });
  }
};

// Get all transport details
exports.getAllTransportDetails = async (req, res) => {
  try {
    const transportDetails = await TransportDetails.find();
    res.status(200).json({
      success: true,
      data: transportDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching transport details',
      error: error.message,
    });
  }
};

// Get a specific transport detail by ID
exports.getTransportDetailById = async (req, res) => {
  try {
    const { id } = req.params;
    const transportDetail = await TransportDetails.findById(id);

    if (!transportDetail) {
      return res.status(404).json({
        success: false,
        message: 'Transport detail not found',
      });
    }

    res.status(200).json({
      success: true,
      data: transportDetail,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching transport detail',
      error: error.message,
    });
  }
};

// Update a transport detail by ID
exports.updateTransportDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTransportDetail = await TransportDetails.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTransportDetail) {
      return res.status(404).json({
        success: false,
        message: 'Transport detail not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Transport detail updated successfully',
      data: updatedTransportDetail,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating transport detail',
      error: error.message,
    });
  }
};

// Delete a transport detail by ID
exports.deleteTransportDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTransportDetail = await TransportDetails.findByIdAndDelete(id);

    if (!deletedTransportDetail) {
      return res.status(404).json({
        success: false,
        message: 'Transport detail not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Transport detail deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting transport detail',
      error: error.message,
    });
  }
};
