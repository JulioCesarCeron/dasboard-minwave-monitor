import React, { Component } from 'react';
import './App.css';
import { subscribeToTimer } from './api';

class App extends Component {
	state = {
		data: 'no data yet'
	};

	constructor(props) {
		super(props);

		subscribeToTimer((err, data) => {
			this.setState({
				data: data
			});
		});
	}

	renderDataFromArduino() {

        

		return (
			<div className="App-h1-center">
				<h1>SINAL: {this.state.data} </h1>
				<h1>ATENÇÃO: {this.state.data} </h1>
				<h1>MEDITAÇÃO: {this.state.data} </h1>
			</div>
		);
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1>Dashboard Mindwave Mobile </h1>
				</header>
				{this.renderDataFromArduino()}
			</div>
		);
	}
}

export default App;
