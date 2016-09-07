import React from 'react';
import Select from 'react-select';

import SeriesCard from './series-card.js';

export default React.createClass({
  getInitialState() {
    return {
      title: '',
      series: [],
      seriesSets: []
    };
  },
  componentDidMount() {
    this.ajax = $.get('/series', (result) => this.setState({seriesSets: result}));
  },
  componentWillUnmount() {
    this.ajax.abort();
  },

  addSeries(e) {
    e.preventDefault();
    let seriesSets = this.state.seriesSets;
    seriesSets.push(
      {
        title: this.state.title,
        series: this.state.series.split(',').map((instalment) => { return {name: instalment, completed: false}; })
      }
    );
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/series',
      contentType: 'application/json',
      data: JSON.stringify({
        series: {
          title: this.state.title,
          complete: false,
          installments: this.state.series.split(',').map((instalment) => { return {name: instalment, complete: false}; })
        }
      })
    });
    this.setState({seriesSets: seriesSets});
  },
  handleTitle: function(event) {
    this.setState({title: event.target.value.substr(0, 140)});
  },
  handleSeries: function(event) {
    this.setState({series: event.target.value.substr(0, 140)});
  },
  handleType(val) {
    this.setState({type: val});
  },

  render() {
    const options = [
      {value: 'movie', label: 'Movie'},
      {value: 'game', label: 'Game'},
      {value: 'book', label: 'Book'},
    ];
    var render = [];
    for (var i=0; i < this.state.seriesSets.length; i++) {
      render.push(<SeriesCard key={this.state.seriesSets[i].id} data={this.state.seriesSets[i]} />);
    }
    return (
      <div>
        {render}
        <div>
          <h3>Create a New Series</h3>
          <form onSubmit={this.addSeries}>
            <label for='title'>Title:</label>
            <input type='text' id='title' onChange={this.handleTitle} value={this.state.title} placeholder='Title' />
            <label for='type'>Type:</label>
            <Select
              name='type'
              value={this.state.type}
              options={options}
              onChange={this.handleType}
              />
            <label for='series'>Series: (seperated by comma)</label>
            <input type='text' id='series' onChange={this.handleSeries} value={this.state.series} placeholder='Series' />
            <button id='submit' type='submit'>Submit</button>
          </form>
        </div>
      </div>
    )
  }
});
