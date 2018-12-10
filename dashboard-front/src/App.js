import React, { Component } from 'react';
import './App.css';
import { subscribeToTimer } from './api';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';
import { ResponsiveLine } from '@nivo/line';

class App extends Component {
	state = {
		key: 10,
		poor_signal: 0,
		attention: 0,
		meditation: 0,
		poor_signal_sparks: [],
		attention_sparks: [],
		meditation_sparks: [],
		data: [
			{
				id: 'SINAL',
				color: 'red',
				data: [
					{
						x: '1',
						y: 0,
					},
					{
						x: '2',
						y: 0,
					},
					{
						x: '3',
						y: 0,
					},
					{
						x: '4',
						y: 0,
					},
					{
						x: '5',
						y: 0,
					},
					{
						x: '6',
						y: 0,
					},
					{
						x: '7',
						y: 0,
					},
					{
						x: '8',
						y: 0,
					},
					{
						x: '9',
						y: 0,
					},
					{
						x: '10',
						y: 0,
					},
				],
			},
			{
				id: 'ATENÇÃO',
				color: 'blue',
				data: [
					{
						x: '1',
						y: 0,
					},
					{
						x: '2',
						y: 0,
					},
					{
						x: '3',
						y: 0,
					},
					{
						x: '4',
						y: 0,
					},
					{
						x: '5',
						y: 0,
					},
					{
						x: '6',
						y: 0,
					},
					{
						x: '7',
						y: 0,
					},
					{
						x: '8',
						y: 0,
					},
					{
						x: '9',
						y: 0,
					},
					{
						x: '10',
						y: 0,
					},
				],
			},
			{
				id: 'MEDITAÇÃO',
				color: '#dc9fe8',
				data: [
					{
						x: '1',
						y: 0,
					},
					{
						x: '2',
						y: 0,
					},
					{
						x: '3',
						y: 0,
					},
					{
						x: '4',
						y: 0,
					},
					{
						x: '5',
						y: 0,
					},
					{
						x: '6',
						y: 0,
					},
					{
						x: '7',
						y: 0,
					},
					{
						x: '8',
						y: 0,
					},
					{
						x: '9',
						y: 0,
					},
					{
						x: '10',
						y: 0,
					},
				],
			},
		],
	};

	componentDidMount() {
		subscribeToTimer((err, data) => {
			this.identifyValues(data);
		});
	}

	verifyLength = (arr_sparks, length) => {
		if (arr_sparks.length > length) {
			arr_sparks.shift();
		}
		return arr_sparks;
	};

	refeshDataChart = (key, valuesY) => {
		let data_chart = Object.assign(this.state.data);
		valuesY.forEach((value, index) => {
			let signal_data = data_chart[index];
			signal_data.data.push({ x: key, y: value });
			signal_data.data = this.verifyLength(signal_data.data, 10);
			data_chart[index] = signal_data;
		});
		return data_chart;
	};

	identifyValues = (data) => {
		//P:0A:56M:83

		const key = String(this.state.key + 1);
		let data_chart = [];

		if (data.indexOf('P:') !== -1) {
			const poor = data.substring(0, data.indexOf('A')).replace('P:', '');
			let poor_spark = this.state.poor_signal_sparks;
			poor_spark.push(poor);

			data_chart.push(poor);

			this.setState({
				poor_signal: poor,
				poor_signal_sparks: this.verifyLength(poor_spark, 21),
			});
		}

		if (data.indexOf('A:') !== -1) {
			const attention = data.substring(data.indexOf('A:'), data.indexOf('M')).replace('A:', '');
			let attention_spark = this.state.attention_sparks;
			attention_spark.push(attention);

			data_chart.push(attention);

			this.setState({
				attention: attention,
				attention_spark: this.verifyLength(attention_spark, 21),
			});
		}

		if (data.indexOf('M:') !== -1) {
			const meditation = data.substring(data.indexOf('M:'), data.length).replace('M:', '');
			let meditation_spark = this.state.meditation_sparks;
			meditation_spark.push(meditation);

			data_chart.push(meditation);

			this.setState({
				meditation: meditation,
				meditation_sparks: this.verifyLength(meditation_spark, 21),
			});
		}

		if (data_chart.length === 3) {
			this.refeshDataChart(key, data_chart);
		}

		/*this.refeshDataChart(0, key, poor);
        this.refeshDataChart(1, key, attention)
        this.refeshDataChart(2, key, meditation);*/

		this.setState({
			key: Number(key),
		});
	};

	renderDataFromArduino() {
		return (
			<div className="App-h1-center">
				<div className="container-sparks">
					<h3 className="signal-title">SINAL: {this.state.poor_signal} </h3>
					<Sparklines data={this.state.poor_signal_sparks}>
						<SparklinesLine color="#1c6aac" />
						<SparklinesSpots />
					</Sparklines>
				</div>

				<div className="container-sparks">
					<h3
						className="signal-title"
						style={this.state.attention >= 60 ? { color: 'green' } : { color: 'black' }}
					>
						ATENÇÃO: {this.state.attention}
					</h3>
					<Sparklines data={this.state.attention_sparks}>
						<SparklinesLine color={this.state.attention >= 60 ? 'green' : '#1c6aac'} />
						<SparklinesSpots />
					</Sparklines>
				</div>

				<div className="container-sparks">
					<h3 className="signal-title">MEDITAÇÃO: {this.state.meditation} </h3>
					<Sparklines data={this.state.meditation_sparks}>
						<SparklinesLine color="#1c6aac" />
						<SparklinesSpots />
					</Sparklines>
				</div>
			</div>
		);
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h2>Mindwave Mobile Neurosky Monitor</h2>
				</header>
				<div className="container">
					{this.renderDataFromArduino()}
					<div style={{ height: 464, background: 'white' }}>
						<ResponsiveLine
							data={this.state.data}
							margin={{
								top: 50,
								right: 110,
								bottom: 50,
								left: 60,
							}}
							xScale={{
								type: 'point',
							}}
							yScale={{
								type: 'linear',
								stacked: false,
								min: '0',
								max: '200',
							}}
							minY="auto"
							maxY="auto"
							stacked={false}
							curve="monotoneX"
							axisTop={null}
							axisRight={null}
							axisBottom={null}
							axisLeft={{
								orient: 'left',
								tickSize: 5,
								tickPadding: 5,
								tickRotation: 0,
								legend: 'Intensidade do Sinal',
								legendOffset: -40,
								legendPosition: 'middle',
							}}
							lineWidth={3}
							colorBy={function(e) {
								return e.color;
							}}
							dotSize={10}
							dotColor="inherit:darker(0.3)"
							dotBorderWidth={2}
							dotBorderColor="#ffffff"
							enableDotLabel={true}
							dotLabel="y"
							dotLabelYOffset={-7}
							animate={true}
							motionStiffness={90}
							motionDamping={15}
							legends={[
								{
									anchor: 'bottom-right',
									direction: 'column',
									justify: false,
									translateX: 100,
									translateY: 0,
									itemsSpacing: 0,
									itemDirection: 'left-to-right',
									itemWidth: 80,
									itemHeight: 20,
									itemOpacity: 0.75,
									symbolSize: 12,
									symbolShape: 'circle',
									symbolBorderColor: 'rgba(0, 0, 0, .5)',
									effects: [
										{
											on: 'hover',
											style: {
												itemBackground: 'rgba(0, 0, 0, .03)',
												itemOpacity: 1,
											},
										},
									],
								},
							]}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
