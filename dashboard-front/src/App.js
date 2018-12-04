import React, { Component } from 'react';
import './App.css';
import { subscribeToTimer } from './api';

class App extends Component {
	state = {
		poor_signal: 0,
		attention: 0,
		meditation: 0
	};

	componentDidMount() {
		subscribeToTimer((err, data) => {
			this.identifyValues(data);
		});
	}

	identifyValues = (data) => {
		//P:0A:56M:83

		if (data.indexOf('P:') !== -1) {
			const poor = data.substring(0, data.indexOf('A')).replace('P:', '');
			this.setState({
				poor_signal: poor
			});
		}

		if (data.indexOf('A:') !== -1) {
			const attention = data.substring(data.indexOf('A:'), data.indexOf('M')).replace('A:', '');
			this.setState({
				attention: attention
			});
        }
        
        if (data.indexOf('M:') !== -1) {
			const meditation = data.substring(data.indexOf('M:'), data.length).replace('M:', '');
			this.setState({
				meditation: meditation
			});
		}
	};

	renderDataFromArduino() {
		return (
			<div className="App-h1-center">
				<h1>SINAL: {this.state.poor_signal} </h1>
				<h1 style={ this.state.attention >= 60 ? {color: 'green'} : {color: 'white'}} >ATENÇÃO: {this.state.attention} </h1>
				<h1>MEDITAÇÃO: {this.state.meditation} </h1>
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
