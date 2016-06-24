import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import SeriesCard from '../js/series-card';

describe('<SeriesCard/>', function () {

  it('renders the series title from the passed data', function () {
    var data = {
      title: 'Harry Potter',
      series: [
        {name: 'Philosopher Stone', completed: true},
        {name: 'Deathly Hallows', completed: false}
      ]
    };
    const wrapper = mount(<SeriesCard data={data}/>);
    expect(wrapper.props().data).to.be.defined;
    expect(wrapper.props().data.title).to.equal('Harry Potter');
    expect(wrapper.find('#title').text()).to.equal('Harry Potter');
  });

  it('gives each series a unique id using the title', () => {
    var data = {
      title: 'Harry Potter',
      series: [
        {name: 'Philosopher Stone', completed: true},
        {name: 'Deathly Hallows', completed: false}
      ]
    };
    const wrapper = mount(<SeriesCard data={data}/>);
    expect(wrapper.find('#harry-potter-series-0')).to.have.length(1);
    expect(wrapper.find('#harry-potter-series-1')).to.have.length(1);
  });

  it('renders the list of series from the passed data', () => {
    var data = {
      title: 'Harry Potter',
      series: [
        {name: 'Philosopher Stone', completed: true},
        {name: 'Deathly Hallows', completed: false}
      ]
    };
    const wrapper = mount(<SeriesCard data={data}/>);
    expect(wrapper.find('#harry-potter-series-0').text().trim()).to.equal('Philosopher Stone');
    expect(wrapper.find('#harry-potter-series-1').text().trim()).to.equal('Deathly Hallows');
  });

});
