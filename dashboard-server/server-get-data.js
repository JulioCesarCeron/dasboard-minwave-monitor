let SerialPort = require('serialport');
let express = require('express');
let app = express();

const Readline = SerialPort.parsers.Readline;

//Inicia conexão com a porta serial
let serial = new SerialPort('/dev/ttyACM0', {
	baudRate: 57600,
	parser: new Readline('/n')
});

const onOpen = () => {
	console.log('Serial port open');
};

const onData = (data) => {
	//console.log('SERIAL PORT DATA');
	console.log(data.toString('utf8'));
};

serial.on('open', onOpen);
serial.on('data', onData);

//Página inicial
app.get('/', function(req, res) {
	res.status(200).send({
		title: 'Dasboard Robotic Hand',
		version: '1.0.0'
	});
});

//Inicia o servidor
app.listen(8080, () => {
	console.log('Server ready on http://localhost:8080');
});

//Método responsável por escrever os dados no arduino
// function moveFinger(n) {
// 	const buff = Buffer(n.toString());
// 	console.log('Buffer(n.toString())', JSON.stringify(buff));
// 	serial.write(new Buffer(n.toString()));
// }
