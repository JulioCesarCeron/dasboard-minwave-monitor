import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8080');

export const subscribeToTimer = (cb) => {
	socket.on('data_from_arduino', (data) => cb(null, data));
	socket.emit('subscribeToTimer', 1000);
};
