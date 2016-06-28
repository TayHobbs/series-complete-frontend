import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import SeriesCard from '../js/series-card';
import SeriesCards from '../js/series-cards';


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

  it('adds a new title when form submitted', () => {
    var data = {
      title: '',
      series: [],
      seriesList: []
    };
    const wrapper = mount(<SeriesCards />);
    wrapper.setState({title: 'Lord of the Rings', series: 'Fellowship'});
    wrapper.find('form').simulate('submit');
    console.log(wrapper.state().seriesSets[0].series);
    expect(wrapper.state().seriesSets[0].title).to.equal('Lord of the Rings');
    expect(wrapper.state().seriesSets[0].series).to.have.length(1);
    expect(wrapper.state().seriesSets[0].series).to.eql([{name: 'Fellowship', completed: false}]);
  });

  it('splits titles on comma when form submitted', () => {
    var data = {
      title: '',
      series: [],
      seriesList: []
    };
    const wrapper = mount(<SeriesCards />);
    wrapper.setState({title: 'Lord of the Rings', series: 'Fellowship,Two Towers'});
    wrapper.find('form').simulate('submit');
    expect(wrapper.state().seriesSets[0].series).to.have.length(2);
    expect(wrapper.state().seriesSets[0].series).to.have.eql([{name: 'Fellowship', completed: false}, {name: 'Two Towers', completed: false}]);
  });
});
