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

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1>Dashboard Mindwave Mobile </h1>
				</header>
				<div className="App-h1-center">
					<h1>{this.state.data} </h1>
				</div>
			</div>
		);
	}
}

export default App;
