import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';

const BandList = () => {
  const [bands, setBands] = useState([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on('current-bands', (payload) => {
      setBands(payload);
    });

    return () => socket.off('current-bands');
  }, [socket]);

  const handleChangeName = (event, id) => {
    const newName = event.target.value;
    if (newName.length > 0) {
      setBands((bands) =>
        bands.map((band) => {
          if (band.id === id) {
            band.name = newName;
          }

          return band;
        })
      );
    }
  };

  const onLostFocus = (id, name) => {
    socket.emit('change-band-name', { id, name });
  };

  const vote = (id) => {
    if (!id) return;
    socket.emit('vote-band', { id });
  };

  const deleteBand = (id) => {
    if (!id) return;
    socket.emit('delete-band', { id });
  };

  const createBandRows = () => {
    return bands.map((band) => (
      <tr key={band.id}>
        <td>
          <button onClick={() => vote(band.id)} className='btn btn-primary'>
            +1
          </button>
        </td>
        <td>
          <input
            type='text'
            className='form-control'
            value={band.name}
            onChange={(event) => handleChangeName(event, band.id)}
            onBlur={() => onLostFocus(band.id, band.name)}
          />
        </td>
        <td>
          <h3>{band.votes}</h3>
        </td>
        <td>
          <button
            onClick={() => deleteBand(band.id)}
            className='btn btn-danger'>
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <h3 className='text-center'>Band list</h3>
      <table className='table table-stripped'>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Votes</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{createBandRows()}</tbody>
      </table>
    </>
  );
};

export default BandList;
