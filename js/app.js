import React from 'react';
import SeriesCard from './series-card.js';
import Navigation from './navigation.js';

$.fauxjax.new({
  request: {
    method: 'GET',
    url: '/series',
  },
  response: {
    content: {
      title: 'Harry Potter',
      series: [
        {'name': 'Philosopher\'s Stone', 'completed': true},
        {'name': 'Deathly Hallows', 'completed': false}
      ]
    }
  }
});

export default React.createClass({
  getInitialState() {
    return {
      title: '',
      series: [],
    };
  },

  componentDidMount() {
    this.ajax = $.get('/series', (result) => this.setState(result));
  },

  componentWillUnmount() {
    this.ajax.abort();
  },

  render() {
    return (
      <div>
        <Navigation />
        Series:
        <SeriesCard data={this.state} />
      </div>
    )
  }
})
