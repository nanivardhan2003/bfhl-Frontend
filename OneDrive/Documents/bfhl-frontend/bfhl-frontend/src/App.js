import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css'; // Import the CSS file for styling

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' },
  ];

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const res = await axios.post('https://bhfl-backend-app-fb6620fa181a.herokuapp.com/bfhl', parsedJson);
      setResponse(res.data);
    } catch (error) {
      alert('Invalid JSON or server error!');
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };
  const renderResponse = () => {
    if (!response) return null;
    const filteredResponse = selectedOptions.reduce((acc, option) => {
      acc[option.value] = response[option.value];
      return acc;
    }, {});
    return <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>;
  };

  return (
    <div className="App">
      <h1>BHFL TASK</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON input here...'
      />
      <br/>
      <button onClick={handleSubmit}>Submit</button>
      <br/>
      {response && (
        <div className="dropdown-container">
          <Select
            options={options}
            isMulti
            onChange={handleSelectChange}
            placeholder="Select fields to display..."
          />
        </div>
      )}
      <div className="response-container">
        {renderResponse()}
      </div>
    </div>
  );
}

export default App;
