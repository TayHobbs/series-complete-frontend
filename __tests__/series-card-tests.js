'use strict';

jest.unmock('../js/series-card');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import SeriesCard from '../js/series-card';

describe('SeriesCard', () => {

  it('renders the series title from the passed data', () => {
    var data = {
      title: 'Harry Potter',
      series: [
        {name: 'Philosopher Stone', completed: true},
        {name: 'Deathly Hallows', completed: false}
      ]
    };
    const seriesCard = TestUtils.renderIntoDocument(
      <SeriesCard data={data} />
    );
    const seriesCardNode = ReactDOM.findDOMNode(seriesCard);
    expect(seriesCardNode.textContent).toContain('Harry Potter');
  });

  it('renders the list of series from the passed data', () => {
    var data = {
      title: 'Harry Potter',
      series: [
        {name: 'Philosopher Stone', completed: true},
        {name: 'Deathly Hallows', completed: false}
      ]
    };
    const seriesCard = TestUtils.renderIntoDocument(
      <SeriesCard data={data} />
    );
    const seriesCardNode = ReactDOM.findDOMNode(seriesCard);
    expect(seriesCardNode.textContent).toContain('Philosopher Stone');
    expect(seriesCardNode.textContent).toContain('Deathly Hallows');
  });

});
