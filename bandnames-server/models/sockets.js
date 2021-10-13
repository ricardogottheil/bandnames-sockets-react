const BandList = require('./band-list');

class Sockets {
  constructor(io) {
    this.io = io;

    this.bandList = new BandList();

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on('connection', (socket) => {
      console.log('Client connected');

      // Emitir al cliente conectado, todas las bandas actuales
      socket.emit('current-bands', this.bandList.getBands());

      // Votar banda
      socket.on('vote-band', (payload) => {
        this.bandList.increaseVotes(payload.id);
        this.io.emit('current-bands', this.bandList.getBands());
      });

      // Delete band
      socket.on('delete-band', (payload) => {
        this.bandList.removeBand(payload.id);
        this.io.emit('current-bands', this.bandList.getBands());
      });

      // Change band name
      socket.on('change-band-name', (payload) => {
        this.bandList.changeName(payload.id, payload.name);
        this.io.emit('current-bands', this.bandList.getBands());
      });

      // Create band
      socket.on('create-band', (payload) => {
        this.bandList.addBand(payload.name);
        this.io.emit('current-bands', this.bandList.getBands());
      });
    });
  }
}

module.exports = Sockets;
