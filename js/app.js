import React from 'react';

import Select from 'react-select';
import SeriesCards from './series-cards.js';
import Navigation from './navigation.js';
import NewSeries from './new-series.js';

$.fauxjax.new({
  request: {
    method: 'GET',
    url: '/series',
  },
  response: {
    content: [{
      id: 6789,
      title: 'Harry Potter',
      series: [
        {'name': 'Philosopher\'s Stone', 'completed': true},
        {'name': 'Deathly Hallows', 'completed': false}
      ]
    }]
  }
});

export default React.createClass({
  render() {
    return (
      <div>
        <Navigation />
        Series:
        <SeriesCards />
      </div>
    )
  }
})
