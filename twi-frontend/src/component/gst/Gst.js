import React, { useState } from 'react';
import axios from 'axios';
import { Country, State, City } from 'country-state-city';

const Gst = () => {
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/csc', {
        country,
        state,
        city,
      });
      
      if (response.status === 201) {
        setMessage('Data submitted successfully!');
      } else {
        setMessage('Submission failed, please try again.');
      }

      // Clear the form fields after submission
      setCountry('');
      setState('');
      setCity('');
    } catch (error) {
      setMessage('Error submitting data');
      console.error('Submission error:', error);
    }
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setState('');
    setCity('');
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
    setCity('');
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Location Data</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Country:</label>
          <select
            value={country}
            onChange={handleCountryChange}
            className="border p-2 rounded w-full"
            required
          >
            <option value="">Select Country</option>
            {Country.getAllCountries().map((country) => (
              <option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">State:</label>
          <select
            value={state}
            onChange={handleStateChange}
            className="border p-2 rounded w-full"
            required
            disabled={!country}
          >
            <option value="">Select State</option>
            {country && State.getStatesOfCountry(country).map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">City:</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border p-2 rounded w-full"
            required
            disabled={!state}
          >
            <option value="">Select City</option>
            {state && City.getCitiesOfState(country, state).map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default Gst;


// import React, { useState } from 'react';
// import axios from 'axios';

// const CscForm = () => {
//   const [country, setCountry] = useState('');
//   const [state, setState] = useState('');
//   const [city, setCity] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5000/csc', {
//         country,
//         state,
//         city,
//       });
      
//       if (response.status === 201) {
//         setMessage('Data submitted successfully!');
//       } else {
//         setMessage('Submission failed, please try again.');
//       }

//       // Clear the form fields after submission
//       setCountry('');
//       setState('');
//       setCity('');
//     } catch (error) {
//       setMessage('Error submitting data');
//       console.error('Submission error:', error);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Add Location Data</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium mb-1">Country:</label>
//           <input
//             type="text"
//             value={country}
//             onChange={(e) => setCountry(e.target.value)}
//             className="border p-2 rounded w-full"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-1">State:</label>
//           <input
//             type="text"
//             value={state}
//             onChange={(e) => setState(e.target.value)}
//             className="border p-2 rounded w-full"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-1">City:</label>
//           <input
//             type="text"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             className="border p-2 rounded w-full"
//             required
//           />
//         </div>
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//           Submit
//         </button>
//       </form>
//       {message && <p className="mt-4 text-green-600">{message}</p>}
//     </div>
//   );
// };

// export default CscForm;

// import React from 'react';

// const Gst = () => {
//     return (
//         <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//             <div className="text-6xl mb-4">☹</div>
//             <h1 className="text-3xl font-semibold mb-2"> Gst Not Available</h1>
//             <p className="text-lg mb-2">The Gst you are looking for is currently not available.</p>
//         </div>
//     );
// };

// export default Gst;


// import React from 'react'

// function Gst() {
//   return (
//     <div>
//       gst
//     </div>
//   )
// }

// export default Gst
