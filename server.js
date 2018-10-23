var SerialPort = require('serialport');
var express = require('express');
var app = express();

//Inicia conexão com a porta serial
var serial = new SerialPort('/dev/ttyACM0', { baudRate: 9600 });

//Página inicial
app.get('/', function(req, res) {
	res.status(200).send({
		title: 'Dasboard Robotic Hand',
		version: '1.0.0'
	});
});

app.get('/dedao', (req, res) => {
	const params = req;
	console.log('indicador');
	moveFinger(1);
	res.status(200).send({
		message: 'send data to move figer 1'
	});
});

app.get('/indicador', (req, res) => {
	const params = req;
	console.log('indicador');
	moveFinger(2);
	res.status(200).send({
		message: 'send data to move figer 2'
	});
});

app.get('/meio', (req, res) => {
	const params = req;
	console.log('indicador');
	moveFinger(3);
	res.status(200).send({
		message: 'send data to move figer 3'
	});
});

app.get('/anelar', (req, res) => {
	const params = req;
	console.log('indicador');
	moveFinger(4);
	res.status(200).send({
		message: 'send data to move figer 4'
	});
});

app.get('/mindinho', (req, res) => {
	const params = req;
	console.log('indicador');
	moveFinger(5);
	res.status(200).send({
		message: 'send data to move figer 5'
	});
});

//Rota que recebe comandos e executa comunição com o Arduino
app.post('/led/:index', function(req, res) {
	//Recebe parametros
	var params = req.params;

	if (params) {
		console.log('params', params);
	}
});

//Inicia o servidor
app.listen(8080, () => {
	console.log('Server ready on http://localhost:8080');
});

//Método responsável por escrever os dados no arduino
function moveFinger(n) {
	const buff = Buffer(n.toString());
	console.log('Buffer(n.toString())', JSON.stringify(buff));
	serial.write(new Buffer(n.toString()));
}
