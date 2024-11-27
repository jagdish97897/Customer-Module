import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ConsignmentForm() {
  const navigate = useNavigate();
  // Initialize form data with default values
  const [formData, setFormData] = useState({
    pan: '',
    gst: '',
    cin: '',
    grNo: '',
    date: '',
    from: '',
    to: '',
    mode: '',
    vehicleNo: '',
    vehicleType: '',
    eWayBillNo: '',
    eWayBillDate: '',
    validUpto: '',
    consignor: { name: '', address: '' },
    consignee: { name: '', address: '' },
    quantity: '',
    noOfPackages: '',
    typeOfPackages: '',
    contents: '',
    invoice: { no: '', date: '', value: '' },
    rate: '',
    freight: '',
    weight: '',
    dimensionalWeight: '',
    totalAmount: '',
    paymentTerms: '',
    gstType: ''
  });

  const [submitted, setSubmitted] = useState(false);

  // Handle form field changes, including nested objects
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convert specific fields to uppercase
    const upperCaseFields = ['pan', 'gst', 'vehicleNo'];
    const transformedValue = upperCaseFields.includes(name) ? value.toUpperCase() : value;

    if (name.includes('.')) {  // For nested objects
      const [parent, child] = name.split('.');
      setFormData((prevData) => ({
        ...prevData,
        [parent]: { ...prevData[parent], [child]: transformedValue },
      }));
    } else {
      setFormData({ ...formData, [name]: transformedValue });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.pan || !formData.gst) {
      alert('Please fill all required fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/transport-details', formData);
      console.log('API Response:', response.data);

      // Redirect or handle response after successful submission
      setSubmitted(true);
      // navigate('/protected/componentop/sidebarop/bookingoperation/viewconsignment');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('An error occurred while submitting the form. Please try again.');
    }
  };

  const handleListClick = () => {
    navigate('/protected/componentop/sidebarop/Sidebarop/bookingoperation/viewconsignment');
  };

  return (
    <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
      {!submitted ? (
        <>
          <h1 className="text-3xl font-bold mb-4 text-indigo-800">Consignment / Create</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Buttons */}
            <div className="flex justify-between mb-4">
              {/* Submit Button */}
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
              >
                Submit
              </button>

              {/* List View Button */}
              <button
                type="button"
                onClick={handleListClick}
                className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
              >
                List View
              </button>
            </div>


            {/* Form Fields */}
            <div className="bg-white p-6 rounded-lg shadow-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'PAN', name: 'pan', maxLength: 10, pattern: '[A-Z]{5}[0-9]{4}[A-Z]', title: 'PAN should be 10 characters: 5 letters, 4 digits, 1 letter' },
                { label: 'GST', name: 'gst', maxLength: 15, pattern: '[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}', title: 'GST should be 15 characters' },
                { label: 'CIN', name: 'cin', maxLength: 21, title: 'CIN should be up to 21 characters' },
                { label: 'GR No.', name: 'grNo', maxLength: 20, title: 'GR No. should be up to 20 characters' },
                { label: 'Date', name: 'date', type: 'date' },
                { label: 'From', name: 'from' },
                { label: 'To', name: 'to' },
                { label: 'Mode', name: 'mode', type: 'select', options: ['Road', 'Rail', 'Air', 'Sea'] },
                { label: 'Vehicle No.', name: 'vehicleNo', maxLength: 10, pattern: '[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}', title: 'Vehicle No. should follow format: e.g., AA00BB0000' },
                { label: 'Vehicle Type', name: 'vehicleType' },
                { label: 'E-Way Bill No.', name: 'eWayBillNo' },
                { label: 'E-Way Bill Date', name: 'eWayBillDate', type: 'date' },
                { label: 'Valid Upto', name: 'validUpto', type: 'date' },
                { label: 'Consignor Name', name: 'consignor.name', maxLength: 50 },
                { label: 'Consignor Address', name: 'consignor.address', maxLength: 100 },
                { label: 'Consignee Name', name: 'consignee.name', maxLength: 50 },
                { label: 'Consignee Address', name: 'consignee.address', maxLength: 100 },
                { label: 'Quantity', name: 'quantity', type: 'number', min: 1, max: 99999 },
                { label: 'No. of Packages', name: 'noOfPackages', type: 'number', min: 1, max: 999 },
                { label: 'Contents', name: 'contents' },
                { label: 'Invoice No.', name: 'invoice.no' },
                { label: 'Invoice Date', name: 'invoice.date', type: 'date' },
                { label: 'Invoice Value', name: 'invoice.value', type: 'number', min: 1, step: 1 },
                { label: 'Rate', name: 'rate', type: 'number', min: 1, step: 1 },
                { label: 'Freight', name: 'freight', type: 'number', min: 1, step: 1 },
                { label: 'Weight', name: 'weight', type: 'number', min: 1, step: 1 },
                { label: 'Dimensional Weight', name: 'dimensionalWeight', type: 'number', min: 1, step: 1 },
                { label: 'Total Amount', name: 'totalAmount', type: 'number', min: 1, step: 1 },
                { label: 'Payment Terms', name: 'paymentTerms' }
              ].map((field, index) => (
                <div key={index} className="mb-4">
                  <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-md shadow-sm p-2"
                    >
                      <option value="">Select {field.label}</option>
                      {field.options.map((option, idx) => (
                        <option key={idx} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type || 'text'}
                      id={field.name}
                      name={field.name}
                      value={field.name.includes('.') ? formData[field.name.split('.')[0]][field.name.split('.')[1]] : formData[field.name]}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm p-2"
                      maxLength={field.maxLength}
                      pattern={field.pattern}
                      title={field.title}
                      min={field.min}
                      max={field.max}
                      step={field.step}
                    />
                  )}
                </div>
              ))}

              {/* GST Type Dropdown */}
              <div className="mb-4">
                <label htmlFor="gstType" className="block text-sm font-medium text-gray-700">GST Type</label>
                <select
                  id="gstType"
                  name="gstType"
                  value={formData.gstType}
                  onChange={handleChange}
                  required={true}
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="">Select GST Type</option>
                  <option value="CGST">CGST</option>
                  <option value="SGST">SGST</option>
                  <option value="IGST">IGST</option>
                </select>
              </div>
            </div>
          </form>
        </>
      ) : (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-green-600">Consignment created successfully!</h1>
        </div>
      )}
    </div>
  );
}

export default ConsignmentForm;
