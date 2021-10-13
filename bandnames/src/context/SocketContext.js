import { useSocket } from '../hooks/useSocket';

const { createContext } = require('react');

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const { socket, online } = useSocket('http://localhost:8080');
  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
