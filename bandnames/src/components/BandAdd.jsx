import React, { useState, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';

const BandAdd = () => {
  const [value, setValue] = useState('');
  const { socket } = useContext(SocketContext);

  const onSubmit = (event) => {
    event.preventDefault();
    if (value.trim().length > 0) {
      socket.emit('create-band', { name: value });

      setValue('');
    }
  };

  return (
    <>
      <h3>Add Band</h3>
      <form onSubmit={onSubmit}>
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className='form-control'
          placeholder='New Band Name'
        />
      </form>
    </>
  );
};

export default BandAdd;
