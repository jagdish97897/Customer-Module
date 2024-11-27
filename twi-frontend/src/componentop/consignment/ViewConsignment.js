import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import moment from 'moment';
import { FaPrint } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';

const ViewConsignment = () => {
  const [consignment, setConsignment] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const itemsPerPage = 5;

  useEffect(() => {
    fetchConsignment();
  }, []);

  const fetchConsignment = async () => {
    try {
      const response = await axios.get('http://localhost:5000/transport-details');
      console.log(response.data); // Check this in the console
      if (Array.isArray(response.data.data)) {
        setConsignment(response.data.data); // Adjusted for nested 'data' key
      } else {
        setErrorMessage('Invalid data format. Please check the API response.');
      }
    } catch (error) {
      console.error('Error fetching consignment:', error);
      setErrorMessage('Error fetching consignment data. Please try again.');
    }
  };

  const handlePrint = (consignmentId) => {
    const selectedConsignment = consignment.find((cons) => cons._id === consignmentId);
    if (!selectedConsignment) {
      setErrorMessage('Consignment not found.');
      return;
    }

    const pdfTemplate = `
  <div class="font-sans p-4 border">


      <!-- Header Section -->
   <div class="bg-green-600 p-4 pt-0 text-center rounded-xl shadow-lg">
    <h2 class="text-xl font-bold text-white">Consignment</h2>
   </div>


   <!-- Company Info Section -->
 <div class="flex bg-gray-100 p-4 rounded-xl shadow-md">
    <img src="/twcpl.png" class="h-24 w-24 mr-4 rounded-full shadow-md">
    <div class="text-center flex-1">
        <h2 class="text-lg font-bold">TRANSPORT WINGS (CAL) PVT LTD</h2>
        <p class="text-xs font-semibold text-green-600 italic">Professional Carrier With Personal Care - Since 1956</p>
        <p class="text-xs">ISO 9001:2008 Certified | ISO 14001:2007 Certified | AN IBA APPROVED CARRIER</p>
        <p class="text-xs">REGISTERED OFFICE - 10, PHEARS LANE, KOLKATA - 700012, WEST BENGAL</p>
        <p class="text-xs">Phone: +91-33-22291848 | Fax: +91-33-22430631</p>
        <p class="text-xs">Email: customercare@twcpl.in | Website: www.twcpl.in</p>
    </div>
    <div class="flex flex-col text-left ml-4">
        <p class="text-xs"><strong class="text-gray-700">Date:</strong> ${moment(selectedConsignment.date).format('DD-MM-YYYY')}</p>
        <p class="text-xs"><strong class="text-gray-700">GR No:</strong> ${selectedConsignment.grNo}</p>
    </div>
</div>

  
      <!-- Consignor Section -->
        <div class="bg-black-300 flex p-4 justify-between h-full w-full">
        <p><strong class="font-bold">Pan No:</strong>AABCT2033Q</p>
        <p><strong class="font-bold">GSTIN:</strong>19ABCT2033Q1Z1</p>
        <p><strong class="font-bold">CIN:</strong>U60210WB1988PTC044123</p>

      </div>


      <div class="flex text-black border border-black p-4 mb-4">
  <!-- Consignor Section with Vertical Line -->
  <div class="mb-2 flex-1 pr-4">
    <strong class="text-gray-700">Consignor</strong>   
    <!-- Horizontal Line Below Consignor -->
    <hr class="border-t-2 border-gray-300 mt-2">

    <div>
      <p><strong class="text-gray-700">Name:</strong> ${selectedConsignment.consignor.name}</p>
      <p><strong class="text-gray-700">Address:</strong> ${selectedConsignment.consignor.address}</p>
    </div>
 
  </div>
  
  <!-- Vertical Line Separator -->
  <div class="border-l-2 border-gray-300 mx-4"></div>

  <!-- Consignee Section -->
  <div class="flex-1 pl-4">
    <strong class="text-gray-700">Consignee</strong> 
       <!-- Horizontal Line Below Consignee -->
    <hr class="border-t-2 border-gray-300 mt-2">
    <div>
      <p><strong class="text-gray-700">Name:</strong> ${selectedConsignment.consignee.name}</p>
      <p><strong class="text-gray-700">Address:</strong> ${selectedConsignment.consignee.address}</p>
    </div>

  </div>
</div>
<div style="display: flex; padding: 16px; justify-content: space-between; width: 100%; border: 1px solid #000;">
  <div style="width: 48%; border-right: 1px solid #000; padding: 8px;">

                            <p><strong style="color: #4a4a4a;">Invoice No:</strong> ${selectedConsignment.invoice.no}</p>
                                    <p><strong style="color: #4a4a4a;">Invoice Date:</strong> ${moment(selectedConsignment.invoice.date).format('DD-MM-YYYY')}</p>
                                            <p><strong style="color: #4a4a4a;">Invoice Value:</strong> ₹${selectedConsignment.invoice.value}</p>
                                      
                                                            <p><strong style="color: #4a4a4a;">From:</strong> ${selectedConsignment.from}</p>
                                                                    <p><strong style="color: #4a4a4a;">To:</strong> ${selectedConsignment.to}</p>
        <p><strong style="color: #4a4a4a;">Mode:</strong> ${selectedConsignment.mode}</p>
        <p><strong style="color: #4a4a4a;">Vehicle No:</strong> ${selectedConsignment.vehicleNo}</p>
            <p><strong style="color: #4a4a4a;">Vehicle Type:</strong> ${selectedConsignment.vehicleType}</p>

    <p><strong style="color: #4a4a4a;">Vehicle Type:</strong> ${selectedConsignment.vehicleType}</p>

    <!-- Repeat for other fields -->
  </div>

  <div style="width: 48%; padding: 8px;">

                      <p><strong style="color: #4a4a4a;">E-Way Bill No:</strong> ${selectedConsignment.eWayBillNo}</p>
                      <p><strong style="color: #4a4a4a;">E-Way Bill Date:</strong>${moment(selectedConsignment.eWayBillDate).format('DD-MM-YYYY')}</p>
                      <p><strong style="color: #4a4a4a;">Valid Upto:</strong>${moment(selectedConsignment.validUpto).format('DD-MM-YYYY')}</p>
                      <p><strong style="color: #4a4a4a;">Quantity:</strong> ${selectedConsignment.quantity}</p>
                    <p><strong style="color: #4a4a4a;">No of Packages:</strong> ${selectedConsignment.noOfPackages}</p>
        <p><strong style="color: #4a4a4a;">Type of Packages:</strong> ${selectedConsignment.typeOfPackages}</p>
        <p><strong style="color: #4a4a4a;">Contents:</strong> ${selectedConsignment.contents}</p>

        <p><strong style="color: #4a4a4a;">Weight:</strong> ${selectedConsignment.weight} kg</p>
        <p><strong style="color: #4a4a4a;">Dimensional Weight:</strong> ${selectedConsignment.dimensionalWeight} kg</p>
    <!-- Repeat for other fields -->
  </div>
</div>

<div style="width: 100%; border: 1px solid #000; padding: 16px; margin-top: 16px;">
  <div style="display: flex;">
    <div style="width: 50%; border-right: 1px solid #000; padding-right: 8px;">
      <p><strong style="color: #4a4a4a;">Payment Terms</strong></p>
      <div style="display: flex; justify-content: space-between;">
        <div>
          <p>Cash</p><p>To Pay</p><p>To Be</p>
        </div>
        <div>
          <p style="text-align: center;">✓</p>
        </div>
        <p>${selectedConsignment.paymentTerms}</p>
      </div>
    </div>
    <div style="width: 50%; padding-left: 8px;">
      <p><strong style="color: #4a4a4a;">GST Type:</strong> ${selectedConsignment.gstType}</p>
    </div>
  </div>
</div>


                           
        <!-- Terms and Conditions -->
              <div class="border-t border-black pt-0 text-xs">
                  <div class="container mx-auto px-4 py-4">
                      <h3 class="font-semibold text-sm text-center mb-4">Terms and Conditions</h3>
                      <ol class="list-decimal pl-6 space-y-3 text-xs">
                          <li class="flex items-start">
                              <span class="mr-2">1.</span>
                              <span>The freight accepted for transport by Air, Road & Rail entirely at the risk and responsibility of the Owners and/or Consignee and/or Consignee and/or consignor thereof</span>
                          </li>
                          <li class="flex items-start">
                              <span class="mr-2">2.</span>
                              <span>The company will not receive gold, silver, precious stones, pearls, jewelleries, valuable documents and other varieties of precious cargo and the officers and servants of the company are unauthorized to receive any such consignment for carriage. If any such property is in fact booked, the company will be under no responsibility in respect thereof.</span>
                          </li>
                          <li class="flex items-start">
                              <span class="mr-2">3.</span>
                              <span>The company will not receive or carry goods and articles contraband by law or of an explosive, inflammable, damaging & dangerous nature unless permitted by the Government and being properly secured and packed. A previous notice of the nature of such goods shall be given to the company, otherwise such goods and articles will be dealt with as the company may think fit and the consignor shall be bound to make good to the company any loss or damage that may occur.</span>
                          </li>
                          <li class="flex items-start">
                              <span class="mr-2">4.</span>
                              <span>The company will not be responsible for any loss or damage to goods arising from acts of God, unexpected and unavoidable emergencies, riots, civil commotion, robbers, heat, fire, rain, leakage, or any kind of accident whatsoever.</span>
                          </li>
                          <li class="flex items-start">
                              <span class="mr-2">5.</span>
                              <span>The company reserves the right to itself, without assigning any reason, for delay, detention of transport, and delay in delivery at destination.</span>
                          </li>
                          <li class="flex items-start">
                              <span class="mr-2">6.</span>
                              <span>The company will not be responsible for any claim, loss, or damage to the Owner's Risk Consignment, as it does not reserve the right to repudiate the claim without assigning any reason.</span>
                          </li>
                          <li class="flex items-start">
                              <span class="mr-2">7.</span>
                              <span>Our liability is restricted to a maximum of 5% of the freight value or INR 5000/-, whichever is lower.</span>
                          </li>
                      </ol>
                  </div>
              </div>

             <div class="text-sm bg-black-300 p-2 w-full flex flex-col justify-between border-t border-black">
               <div class="text-right mb-4">TRANSPORT WINGS (CAL) PVT LTD</div>
               <div class="flex justify-between pb-4">
                <div class="underline">PREPARED BY:</div>
                <div class="underline">APPROVED BY:</div>
                 <div class="underline">AUTHORISED SIGNATORY</div>
               </div>
             </div>

      
      </div>
  `;
  
  html2pdf().from(pdfTemplate).save();
  
  };
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentConsignment = consignment.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(consignment.length / itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-indigo-800">Consignment</h1>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">Consignor Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">Consignee Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">Invoice No</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">GR No</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">From</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">To</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentConsignment.map((cons) => (
              <tr key={cons._id}>
                <td className="px-4 py-4 whitespace-nowrap">{cons.consignor.name}</td>
                <td className="px-4 py-4 whitespace-nowrap">{cons.consignee.name}</td>
                <td className="px-4 py-4 whitespace-nowrap">{cons.invoice.no}</td>
                <td className="px-4 py-4 whitespace-nowrap">{cons.grNo}</td>
                <td className="px-4 py-4 whitespace-nowrap">{cons.from}</td>
                <td className="px-4 py-4 whitespace-nowrap">{cons.to}</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <button onClick={() => handlePrint(cons._id)} className="text-green-600 hover:text-green-900 flex items-center">
                    <FaPrint className="mr-1" /> Print
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ReactPaginate
        previousLabel={
          <span className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition">
            Previous
          </span>
        }
        nextLabel={
          <span className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition">
            Next
          </span>
        }
        breakLabel={
          <span className="px-3 py-2 rounded-md bg-gray-200 text-gray-600">...</span>
        }
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={
          'flex justify-center items-center space-x-2 bg-white py-4 border-t border-gray-300'
        }
        activeClassName={
          'bg-indigo-600 text-white border border-indigo-600'
        }
        pageClassName={
          'rounded-md border border-gray-300 hover:bg-indigo-100 text-gray-700 transition'
        }
        pageLinkClassName={'px-4 py-2'}
        disabledClassName={'opacity-50 cursor-not-allowed'}
      />
    </div>
  );
};

export default ViewConsignment;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import html2pdf from 'html2pdf.js';
// import moment from 'moment';
// import { FaPrint } from 'react-icons/fa';
// import ReactPaginate from 'react-paginate';

// const ViewConsignment = () => {
//   const [consignment, setConsignment] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();
//   const itemsPerPage = 5;

//   useEffect(() => {
//     fetchConsignment();
//   }, []);

//   const fetchConsignment = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/transport-details');
//       console.log(response.data); // Check this in the console
//       if (Array.isArray(response.data)) {
//         setConsignment(response.data);
//       } else {
//         setErrorMessage('Expected an array but received an object. Check API response.');
//       }
//     } catch (error) {
//       console.error('Error fetching consignment:', error);
//       setErrorMessage('Error fetching consignment data. Please try again.');
//     }
//   };
  

//   const handlePrint = (consignmentId) => {
//     const selectedConsignment = consignment.find((cons) => cons._id === consignmentId);
//     if (!selectedConsignment) {
//       setErrorMessage('Consignment not found.');
//       return;
//     }

//     const pdfTemplate = `
//       <div class="font-sans p-4 border">
//         <div class="bg-green-500 p-4 text-center">
//           <h2 class="text-2xl font-bold text-black mb-4">Consignment Details</h2>
//         </div>
//         <div class="flex bg-gray-300 p-6">
//           <img src="/twcpl.png" class="h-60 w-60 mr-4">
//           <div class="ml-8">
//             <h4 class="text-2xl font-bold text-black mb-4">TRANSPORT WINGS (CAL) PVT LTD</h4>
//             <p class="text-black mb-4">REGISTERED OFFICE - 10, Phears Lane, Kolkata -700012, West Bengal.</p>
//             <p class="text-black mb-4">KOLKATA, West Bengal - 700012</p>
//             <p class="text-black mb-4">Phone: 011-27357591(6 LINES) Mobile:</p>
//             <p class="text-black mb-4">Fax: +91-11-27357596</p>
//             <p class="text-black mb-4">E-Mail: customercare@twcpl.in Website: www.twcpl.in</p>
//           </div>
//         </div>

//         <div class="bg-gray-200 p-4">
//           <h3 class="font-bold text-xl mb-2">Consignor Details</h3>
//           <p><strong>Name:</strong> ${selectedConsignment.consignor.name}</p>
//           <p><strong>Address:</strong> ${selectedConsignment.consignor.address}</p>
//         </div>

//         <div class="bg-gray-200 p-4">
//           <h3 class="font-bold text-xl mb-2">Consignee Details</h3>
//           <p><strong>Name:</strong> ${selectedConsignment.consignee.name}</p>
//           <p><strong>Address:</strong> ${selectedConsignment.consignee.address}</p>
//         </div>

//         <div class="p-4">
//           <h3 class="font-bold text-xl mb-2">Invoice Details</h3>
//           <p><strong>Invoice No:</strong> ${selectedConsignment.invoice.no}</p>
//           <p><strong>Invoice Date:</strong> ${moment(selectedConsignment.invoice.date).format('DD-MM-YYYY')}</p>
//           <p><strong>Invoice Value:</strong> ₹${selectedConsignment.invoice.value}</p>
//         </div>

//         <div class="p-4">
//           <h3 class="font-bold text-xl mb-2">Transport Details</h3>
//           <p><strong>GR No:</strong> ${selectedConsignment.grNo}</p>
//           <p><strong>From:</strong> ${selectedConsignment.from}</p>
//           <p><strong>To:</strong> ${selectedConsignment.to}</p>
//           <p><strong>Mode:</strong> ${selectedConsignment.mode}</p>
//           <p><strong>Vehicle No:</strong> ${selectedConsignment.vehicleNo}</p>
//           <p><strong>Vehicle Type:</strong> ${selectedConsignment.vehicleType}</p>
//           <p><strong>Quantity:</strong> ${selectedConsignment.quantity}</p>
//           <p><strong>No of Packages:</strong> ${selectedConsignment.noOfPackages}</p>
//           <p><strong>Type of Packages:</strong> ${selectedConsignment.typeOfPackages}</p>
//           <p><strong>Contents:</strong> ${selectedConsignment.contents}</p>
//           <p><strong>Weight:</strong> ${selectedConsignment.weight} kg</p>
//           <p><strong>Dimensional Weight:</strong> ${selectedConsignment.dimensionalWeight} kg</p>
//           <p><strong>Total Amount:</strong> ₹${selectedConsignment.totalAmount}</p>
//           <p><strong>Freight:</strong> ₹${selectedConsignment.freight}</p>
//           <p><strong>Payment Terms:</strong> ${selectedConsignment.paymentTerms}</p>
//         </div>

//         <div class="bg-gray-300 p-4 w-full flex flex-col justify-between border-t border-black">
//           <div class="text-right mb-4">TRANSPORT WINGS (CAL) PVT LTD</div>
//           <div class="flex justify-between pb-8">
//             <div class="underline">PREPARED BY:</div>
//             <div class="underline">APPROVED BY:</div>
//             <div class="underline">AUTHORISED SIGNATORY</div>
//           </div>
//         </div>
//       </div>
//     `;

//     html2pdf().from(pdfTemplate).save();
//   };

//   const handlePageClick = (data) => {
//     setCurrentPage(data.selected);
//   };

//   const offset = currentPage * itemsPerPage;
//   const currentConsignment = consignment.slice(offset, offset + itemsPerPage);
//   const pageCount = Math.ceil(consignment.length / itemsPerPage);

//   return (
//     <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
//       <h1 className="text-2xl font-bold mb-4 text-indigo-800">Consignment</h1>
//       {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//       <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">Consignor Name</th>
//               <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">Consignee Name</th>
//               <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">Invoice No</th>
//               <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">GR No</th>
//               <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">From</th>
//               <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">To</th>
//               <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">Action</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {currentConsignment.map((cons) => (
//               <tr key={cons._id}>
//                 <td className="px-4 py-4 whitespace-nowrap">{cons.consignor.name}</td>
//                 <td className="px-4 py-4 whitespace-nowrap">{cons.consignee.name}</td>
//                 <td className="px-4 py-4 whitespace-nowrap">{cons.invoice.no}</td>
//                 <td className="px-4 py-4 whitespace-nowrap">{cons.grNo}</td>
//                 <td className="px-4 py-4 whitespace-nowrap">{cons.from}</td>
//                 <td className="px-4 py-4 whitespace-nowrap">{cons.to}</td>
//                 <td className="px-4 py-4 whitespace-nowrap">
//                   <button onClick={() => handlePrint(cons._id)} className="text-green-600 hover:text-green-900 flex items-center">
//                     <FaPrint className="mr-1" /> Print
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <ReactPaginate
//         previousLabel={'Previous'}
//         nextLabel={'Next'}
//         breakLabel={'...'}
//         pageCount={pageCount}
//         marginPagesDisplayed={2}
//         pageRangeDisplayed={5}
//         onPageChange={handlePageClick}
//         containerClassName={'flex justify-center py-4'}
//         activeClassName={'bg-blue-500 text-white'}
//       />
//     </div>
//   );
// };

// export default ViewConsignment;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import html2pdf from 'html2pdf.js';
// import moment from 'moment';
// import { FaEdit, FaPrint } from 'react-icons/fa';
// import ReactPaginate from 'react-paginate';

// const ViewConsignment = () => {
//   const [consignment, setConsignment] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();
//   const itemsPerPage = 5;

//   useEffect(() => {
//     fetchConsignment();
//   }, []);

  

//   const fetchConsignment = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/transport-details');
//       setConsignment(response.data); // Assuming response.data is an array
//     } catch (error) {
//       console.error('Error fetching consignment:', error);
//       setErrorMessage('Error fetching consignment');
//     }
//   };


//   const handlePrint = (consignmentId) => {
//     const selectedConsignment = consignment.find((cons) => cons._id === consignmentId);
  
//     const pdfTemplate = `
//       <div class="font-sans p-4 border">
//         <div class="bg-green-500 p-4 text-center">
//           <h2 class="text-2xl font-bold text-black mb-4">Consignment Details</h2>
//         </div>
//         <div class="flex bg-black-300 p-6">
//           <img src="/twcpl.png" class="h-60 w-60 mr-4">
//           <div class="ml-8">
//             <h4 class="text-2xl font-bold text-black mb-4">TRANSPORT WINGS (CAL) PVT LTD</h4>
//             <p class="text-black mb-4">REGISTERED OFFICE - 10, Phears Lane, Kolkata -700012, West Bengal.</p>
//             <p class="text-black mb-4">KOLKATA, West Bengal - 700012</p>
//             <p class="text-black mb-4">Phone: 011-27357591(6 LINES) Mobile:</p>
//             <p class="text-black mb-4">Fax: +91-11-27357596</p>
//             <p class="text-black mb-4">E-Mail: customercare@twcpl.in Website: www.twcpl.in</p>
//           </div>
//         </div>
  
//         <div class="bg-gray-200 p-4">
//           <h3 class="font-bold text-xl mb-2">Consignor Details</h3>
//           <p><strong>Name:</strong> ${selectedConsignment.consignor.name}</p>
//           <p><strong>Address:</strong> ${selectedConsignment.consignor.address}</p>
//         </div>
  
//         <div class="bg-gray-200 p-4">
//           <h3 class="font-bold text-xl mb-2">Consignee Details</h3>
//           <p><strong>Name:</strong> ${selectedConsignment.consignee.name}</p>
//           <p><strong>Address:</strong> ${selectedConsignment.consignee.address}</p>
//         </div>
  
//         <div class="p-4">
//           <h3 class="font-bold text-xl mb-2">Invoice Details</h3>
//           <p><strong>Invoice No:</strong> ${selectedConsignment.invoice.no}</p>
//           <p><strong>Invoice Date:</strong> ${moment(selectedConsignment.invoice.date).format('DD-MM-YYYY')}</p>
//           <p><strong>Invoice Value:</strong> ₹${selectedConsignment.invoice.value}</p>
//         </div>
  
//         <div class="p-4">
//           <h3 class="font-bold text-xl mb-2">Transport Details</h3>
//           <p><strong>GR No:</strong> ${selectedConsignment.grNo}</p>
//           <p><strong>From:</strong> ${selectedConsignment.from}</p>
//           <p><strong>To:</strong> ${selectedConsignment.to}</p>
//           <p><strong>Mode:</strong> ${selectedConsignment.mode}</p>
//           <p><strong>Vehicle No:</strong> ${selectedConsignment.vehicleNo}</p>
//           <p><strong>Vehicle Type:</strong> ${selectedConsignment.vehicleType}</p>
//           <p><strong>Quantity:</strong> ${selectedConsignment.quantity}</p>
//           <p><strong>No of Packages:</strong> ${selectedConsignment.noOfPackages}</p>
//           <p><strong>Type of Packages:</strong> ${selectedConsignment.typeOfPackages}</p>
//           <p><strong>Contents:</strong> ${selectedConsignment.contents}</p>
//           <p><strong>Weight:</strong> ${selectedConsignment.weight} kg</p>
//           <p><strong>Dimensional Weight:</strong> ${selectedConsignment.dimensionalWeight} kg</p>
//           <p><strong>Total Amount:</strong> ₹${selectedConsignment.totalAmount}</p>
//           <p><strong>Freight:</strong> ₹${selectedConsignment.freight}</p>
//           <p><strong>Payment Terms:</strong> ${selectedConsignment.paymentTerms}</p>
//         </div>
  
//         <div class="bg-black-300 p-4 w-full flex flex-col justify-between border-t border-black">
//           <div class="text-right mb-4">TRANSPORT WINGS (CAL) PVT LTD</div>
//           <div class="flex justify-between pb-8">
//             <div class="underline">PREPARED BY:</div>
//             <div class="underline">APPROVED BY:</div>
//             <div class="underline">AUTHORISED SIGNATORY</div>
//           </div>
//         </div>
//       </div>
//     `;
  
//     html2pdf().from(pdfTemplate).save();
//   };
  

//   const handlePageClick = (data) => {
//     setCurrentPage(data.selected);
//   };

//   const offset = currentPage * itemsPerPage;
//   const currentConsignment = consignment.slice(offset, offset + itemsPerPage);
//   const pageCount = Math.ceil(consignment.length / itemsPerPage);

//   return (
//     <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
//       <h1 className="text-2xl font-bold mb-4 text-indigo-800">Consignment</h1>
//       {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//       <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">Consignor Name</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">Consignee Name</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">Invoice No</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">GR No</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">From</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">To</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">Action</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {currentConsignment.map((consignment) => (
//               <tr key={consignment._id}>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{consignment.consignee.name}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{consignment.consignee.name}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{consignment.invoice.no}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{consignment.grNo}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{consignment.from}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{consignment.to}</td>
              
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">

//                   <button onClick={() => handlePrint(consignment._id)} className="ml-4 text-green-600 hover:text-green-900">
//                     <FaPrint className="mr-1" />Print
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <ReactPaginate
//         previousLabel={'Previous'}
//         nextLabel={'Next'}
//         breakLabel={'...'}
//         pageCount={pageCount}
//         marginPagesDisplayed={2}
//         pageRangeDisplayed={5}
//         onPageChange={handlePageClick}
//         containerClassName={'flex justify-center py-4'}
//         pageClassName={'mx-1'}
//         pageLinkClassName={'px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100'}
//         previousClassName={'mx-1'}
//         previousLinkClassName={'px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100'}
//         nextClassName={'mx-1'}
//         nextLinkClassName={'px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100'}
//         breakClassName={'mx-1'}
//         breakLinkClassName={'px-3 py-2 border border-gray-300 rounded-md text-gray-700'}
//         activeClassName={'bg-blue-500 text-white'}
//       />
//     </div>
//   );
// };

// export default ViewConsignment;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import html2pdf from 'html2pdf.js';
// import moment from 'moment';
// import { FaEdit, FaPrint } from 'react-icons/fa';
// import ReactPaginate from 'react-paginate';

// const ViewConsignment = () => {
//   const [consignment, setConsignment] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();
//   const itemsPerPage = 5;

//   useEffect(() => {
//     fetchConsignment();
//   }, []);

//   const fetchConsignment = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/goods-receipts');
//       setConsignment(response.data); // Assuming response.data is an array
//     } catch (error) {
//       console.error('Error fetching consignment:', error);
//       setErrorMessage('Error fetching consignment');
//     }
//   };

//   const handleEdit = (consignmentId) => {
//     navigate(`/protected/componentop/sidebarop/Sidebarop/bookingoperation/updateconsignment/${consignmentId}`);
//   };

//   const handleEdit1 = (consignmentId) => {
//     navigate(`/protected/componentop/sidebarop/Sidebarop/bookingoperation/AddNewDataInConsignment/${consignmentId}`);
//   };

//   const handlePrint = (consignmentId) => {
//     const selectedConsignment = consignment.find((cons) => cons._id === consignmentId);

//     const pdfTemplate = `
//       <div class="font-sans p-4 border">
//         <div class="bg-green-500 p-4 text-center">
//           <h2 class="text-2xl font-bold text-black mb-4">Consignment Details</h2>
//         </div>
//         <div class="flex bg-black-300 p-6">
//           <img src="/twcpl.png" class="h-60 w-60 mr-4">
//           <div class="ml-8">
//             <h4 class="text-2xl font-bold text-black mb-4">TRANSPORT WINGS (CAL) PVT LTD</h4>
//             <p class="text-black mb-4">REGISTERED OFFICE - 10, Phears Lane, Kolkata -700012, West Bengal.</p>
//             <p class="text-black mb-4">KOLKATA, West Bengal - 700012</p>
//             <p class="text-black mb-4">Phone: 011-27357591(6 LINES) Mobile:</p>
//             <p class="text-black mb-4">Fax: +91-11-27357596</p>
//             <p class="text-black mb-4">E-Mail: customercare@twcpl.in Website: www.twcpl.in</p>
//           </div>
//         </div>
//         <div class="bg-black-300 flex p-4 justify-between h-full w-full">
//           <p><strong class="font-bold">Consignment No:</strong> ${selectedConsignment.consignmentno}</p>
//           <p><strong class="font-bold">Date:</strong> ${moment(selectedConsignment.orderDate.$date).format('DD-MM-YYYY')}</p>
//         </div>
//         <div class="bg-black-300 flex p-4 justify-between h-full w-full">
//           <div class="flex flex-col text-black border border-black pb-4 h-full w-1/2">
//             <div class="w-full pl-2">
//               <p><strong class="font-bold">Customer:</strong> ${selectedConsignment.customer}</p>
//               <p><strong class="font-bold">Customer GSTIN:</strong> ${selectedConsignment.customerGSTIN}</p>
//               <p><strong class="font-bold">Customer Address:</strong> ${selectedConsignment.customerAddress}</p>
//               <p><strong class="font-bold">Consignor:</strong> ${selectedConsignment.consignor}</p>
//               <p><strong class="font-bold">Consignor GSTIN:</strong> ${selectedConsignment.consignorGSTIN}</p>
//               <p><strong class="font-bold">Consignor Address:</strong> ${selectedConsignment.consignorAddress}</p>
//               <p><strong class="font-bold">Employee:</strong> ${selectedConsignment.employee}</p>
//             </div>
//           </div>
//           <div class="flex flex-col text-black border border-black pb-4 h-full w-1/2">
//             <div class="w-full pl-2">
//               <p><strong class="font-bold">Consignee:</strong> ${selectedConsignment.consignee}</p>
//               <p><strong class="font-bold">Consignee GSTIN:</strong> ${selectedConsignment.consigneeGSTIN}</p>
//               <p><strong class="font-bold">Consignee Address:</strong> ${selectedConsignment.consigneeAddress}</p>
//               <p><strong class="font-bold">Order No:</strong> ${selectedConsignment.orderNo}</p>
//               <p><strong class="font-bold">Order Mode:</strong> ${selectedConsignment.orderMode}</p>
//               <p><strong class="font-bold">Service Mode:</strong> ${selectedConsignment.serviceMode}</p>
//               <p><strong class="font-bold">Expected Date:</strong> ${moment(selectedConsignment.expectedDate.$date).format('DD-MM-YYYY')}</p>
//             </div>
//           </div>
//         </div>
//         <div class="bg-black-300 p-4 w-full">
//           <h3 class="text-xl font-bold text-black mb-4">Details</h3>
//           <table class="min-w-full divide-y divide-black-200">
//             <thead class="bg-black-50">
//               <tr>
//                 <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">From</th>
//                 <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">To</th>
//                 <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">Dimensions</th>
//                 <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">Weight(KG)</th>
//                 <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">Quantum Rate</th>
//                 <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">Effective Rate</th>
//                 <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">Cost</th>
//               </tr>
//             </thead>
//             <tbody class="bg-white divide-y divide-black-200">
//               <tr>
//                 <td class="border px-2 py-1 text-xs">${selectedConsignment.from}</td>
//                 <td class="border px-2 py-1 text-xs">${selectedConsignment.to}</td>
//                 <td class="border px-2 py-1 text-xs">${selectedConsignment.dimensions}</td>
//                 <td class="border px-2 py-1 text-xs">${selectedConsignment.weight}</td>
//                 <td class="border px-2 py-1 text-xs">${selectedConsignment.quantumrate}</td>
//                 <td class="border px-2 py-1 text-xs">${selectedConsignment.effectiverate}</td>
//                 <td class="border px-2 py-1 text-xs">${selectedConsignment.cost}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//         <div class="bg-black-300 flex justify-between items-end h-24 w-full">
//           <div class="text-left mb-4 ml-4">Remark: </div>
//         </div>
//         <div class="bg-black-300 p-4 h-48 w-full flex flex-col justify-between border-t border-black">
//           <div class="text-right">TRANSPORT WINGS (CAL) PVT LTD</div>
//           <div class="flex justify-between pb-8">
//             <div class="underline">PREPARED BY:-</div>
//             <div class="underline">APPROVED BY</div>
//             <div class="underline">AUTHORISED SIGNATORY</div>
//           </div>
//         </div>
//       </div>
//     `;
//     html2pdf().from(pdfTemplate).save();
//   };

//   const handlePageClick = (data) => {
//     setCurrentPage(data.selected);
//   };

//   const offset = currentPage * itemsPerPage;
//   const currentConsignment = consignment.slice(offset, offset + itemsPerPage);
//   const pageCount = Math.ceil(consignment.length / itemsPerPage);

//   return (
//     <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
//       <h1 className="text-2xl font-bold mb-4 text-indigo-800">Consignment</h1>
//       {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//       <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">Consignment No</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">Job Order No</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">Customer</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">Order No</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">Order Date</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">Order Mode</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">Service Mode</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">Expected Date</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">Employee</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">Action</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {currentConsignment.map((consignment) => (
//               <tr key={consignment._id}>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{consignment.consignmentno}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{consignment.jobOrder_no}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{consignment.customer}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{consignment.orderNo}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{moment(consignment.orderDate).format('DD-MM-YYYY')}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{consignment.orderMode}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{consignment.serviceMode}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{moment(consignment.expectedDate).format('DD-MM-YYYY')}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{consignment.employee}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">
//                   <button onClick={() => handleEdit(consignment._id)} className="text-indigo-600 hover:text-indigo-900">
//                     <FaEdit className="mr-1" />Edit
//                   </button>
//                   <button onClick={() => handleEdit1(consignment._id)} className="text-indigo-600 hover:text-indigo-900">
//                     <FaEdit className="mr-1" />Edit
//                   </button>
//                   <button onClick={() => handlePrint(consignment._id)} className="ml-4 text-green-600 hover:text-green-900">
//                     <FaPrint className="mr-1" />Print
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <ReactPaginate
//         previousLabel={'Previous'}
//         nextLabel={'Next'}
//         breakLabel={'...'}
//         pageCount={pageCount}
//         marginPagesDisplayed={2}
//         pageRangeDisplayed={5}
//         onPageChange={handlePageClick}
//         containerClassName={'flex justify-center py-4'}
//         pageClassName={'mx-1'}
//         pageLinkClassName={'px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100'}
//         previousClassName={'mx-1'}
//         previousLinkClassName={'px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100'}
//         nextClassName={'mx-1'}
//         nextLinkClassName={'px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100'}
//         breakClassName={'mx-1'}
//         breakLinkClassName={'px-3 py-2 border border-gray-300 rounded-md text-gray-700'}
//         activeClassName={'bg-blue-500 text-white'}
//       />
//     </div>
//   );
// };

// export default ViewConsignment;



