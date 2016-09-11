import React from 'react';

import Select from 'react-select';
import SeriesCards from './series-cards.js';
import Navigation from './navigation.js';
import NewSeries from './new-series.js';

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
