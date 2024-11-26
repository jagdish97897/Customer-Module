const mongoose = require('mongoose');

const transportDetailsSchema = new mongoose.Schema({
  pan: { type: String, required: false },
  gst: { type: String, required: false },
  cin: { type: String, required: false },
  grNo: { type: String, required: false },
  date: { type: Date, required: false },
  from: { type: String, required: false },
  to: { type: String, required: false },
  mode: { type: String, enum: ['Road', 'Rail', 'Air', 'Sea'], required: false },
  vehicleNo: { type: String, required: false },
  vehicleType: { type: String, required: false },
  eWayBillNo: { type: String, required: false },
  eWayBillDate: { type: Date, required: false },
  validUpto: { type: Date, required: false },
  consignor: {
    name: { type: String, required: false },
    address: { type: String, required: false },
  },
  consignee: {
    name: { type: String, required: false },
    address: { type: String, required: false },
  },
  quantity: { type: Number, required: false },
  noOfPackages: { type: Number, required: false },
  typeOfPackages: { type: String, required: false },
  contents: { type: String, required: false },
  invoice: {
    no: { type: String, required: false },
    date: { type: Date, required: false },
    value: { type: Number, required: false },
  },
  rate: { type: Number, required: false },
  freight: { type: Number, required: false },
  weight: { type: Number, required: false },
  dimensionalWeight: { type: Number },
  totalAmount: { type: Number, required: false },
  paymentTerms: { type: String, required: false },
  gstType: { type: String, enum: ['CGST', 'SGST', 'IGST'], required: false },
}, { timestamps: true });

module.exports = mongoose.model('TransportDetails', transportDetailsSchema);
