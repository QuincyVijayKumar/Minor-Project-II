import React, { useState } from 'react';

const Sender = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [fileInfo, setFileInfo] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Extract file information
    const { name, size, type } = selectedFile;
    setFileInfo({ name, size, type });

    // Reset message
    setMessage('');
  };

  const sendFile = () => {
    if (file) {
      // Simulating sending the file (assuming success)
      setMessage('File sent successfully!');
      // Show pop-up message for success
      alert('File sent successfully!');
    } else {
      setMessage('Please select a file to send.');
      // Show pop-up message for failure
      alert('Please select a file to send.');
    }
  };

  return (
    <div>
      <h2>Sender</h2>
      <input type="file" onChange={handleFileChange} />
      {fileInfo && (
        <div>
          <h3>File Information:</h3>
          <p>Name: {fileInfo.name}</p>
          <p>Size: {fileInfo.size} bytes</p>
          <p>Type: {fileInfo.type}</p>
        </div>
      )}
      <button onClick={sendFile}>Send File</button>
      <p>{message}</p>
    </div>
  );
};

export default Sender;
