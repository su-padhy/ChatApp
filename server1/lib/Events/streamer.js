const EventEmitter = require('events');
const messagesMethods = require('./message.methods');

class StreamerClass extends EventEmitter {}

const Streamer = new StreamerClass();
Streamer.on('create.message', (...args) => {

  
  messagesMethods.createMessage(args[0]);
});
Streamer.on('create.user', (...args) => {

  
  messagesMethods.createMessage(args[0]);
});
//Streamer.emit('event');

module.exports = Streamer;

