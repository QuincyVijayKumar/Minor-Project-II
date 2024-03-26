import React, { useState } from 'react';

const Receiver = () => {
  const [receivedFile, setReceivedFile] = useState(null);
  const [message, setMessage] = useState('');
  const [fileInfo, setFileInfo] = useState(null);

  const receiveFile = () => {
    // Simulating receiving the file (assuming success)
    const receivedFileObject = { name: 'example.txt', size: '10KB', type: 'text/plain' }; // Placeholder for received file

    if (receivedFileObject) {
      setReceivedFile(receivedFileObject);
      setFileInfo(receivedFileObject);
      setMessage('File received successfully!');
      // Show pop-up message for success
      alert('File received successfully!');
    } else {
      setMessage('No file received.');
      // Show pop-up message for failure
      alert('No file received.');
    }
  };

  return (
    <div>
      <h2>Receiver</h2>
      <button onClick={receiveFile}>Receive File</button>
      <p>{message}</p>
      {fileInfo && (
        <div>
          <h3>Received File Information:</h3>
          <p>Name: {fileInfo.name}</p>
          <p>Size: {fileInfo.size} bytes</p>
          <p>Type: {fileInfo.type}</p>
        </div>
      )}
    </div>
  );
};

export default Receiver;
