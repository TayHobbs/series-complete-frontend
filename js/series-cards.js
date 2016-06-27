import React from 'react';
import Select from 'react-select';

import SeriesCard from './series-card.js';

export default React.createClass({
  getInitialState() {
    return {
      title: '',
      series: [],
      seriesList: []
    };
  },
  componentDidMount() {
    this.ajax = $.get('/series', (result) => this.setState({seriesList: result}));
  },
  componentWillUnmount() {
    this.ajax.abort();
  },

  addSeries(e) {
    e.preventDefault();
    let seriesList = this.state.seriesList;
    seriesList.push({title: this.state.title, series: this.state.series});
    this.setState({seriesList: seriesList});
  },
  handleTitle: function(event) {
    this.setState({title: event.target.value.substr(0, 140)});
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
    for (var i=0; i < this.state.seriesList.length; i++) {
      render.push(<SeriesCard key={i} data={this.state.seriesList[i]} />);
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
            <button id='submit' type='submit'>Submit</button>
          </form>
        </div>
      </div>
    )
  }
});
