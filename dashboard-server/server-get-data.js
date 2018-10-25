const SERVER_PORT = 8080;

let SerialPort = require('serialport');
let express = require('express');
let app = express();

let data_from_arduino = 'no data';

const Readline = SerialPort.parsers.Readline;

//Inicia conexão com a porta serial
let serial = new SerialPort('/dev/ttyACM0', {
	baudRate: 57600,
	parser: new Readline('/n')
});


const onData = (data) => {
    console.log('////////////////////////////////////////////SERIAL PORT DATA');
	console.log(data.toString('utf8'));
	data_from_arduino = data.toString('utf8');
};

/*serial.on('open', onOpen);
serial.on('data', onData);*/

serial.on('open', () => {
    console.log('open')
    serial.on('data', (data) => {
        data_from_arduino = data.toString('utf8');
        console.log('data', data.toString('utf8'));
    })
})

// //Página inicial
app.get('/', function(req, res) {
	res.status(200).send({
		title: 'Dasboard Robotic Hand',
		version: '1.0.0'
	});
});

//Inicia o servidor
app.listen(8000, () => {
	console.log('Server ready on http://localhost:8000');
});

//SOCKET.IO
let io = require('socket.io')();

io.on('connection', (client) => {
	client.on('subscribeToTimer', () => {
		console.log('client is subscribing to data_from_arduino');
		setInterval(() => {
			client.emit('data_from_arduino', data_from_arduino);
		}, 1000);
	});
});

io.listen(SERVER_PORT);
//SOCKET.IO
