import { useMemo, useState, useEffect } from 'react';
import io from 'socket.io-client';

const useSocket = (serverUri) => {
  const socket = useMemo(
    () =>
      io.connect(serverUri, {
        transports: ['websocket'],
      }),
    [serverUri]
  );

  const [online, setOnline] = useState(false);

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true);
    });

    // return () => socket.disconnect();
  }, [socket]);

  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline(false);
    });
  }, [socket]);

  return {
    socket,
    online,
  };
};

export { useSocket };
