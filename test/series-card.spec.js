import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import SeriesCard from '../js/series-card';
import SeriesCards from '../js/series-cards';


describe('<SeriesCard/>', function () {

  it('renders the series title from the passed data', function () {
    var data = {
      title: 'Harry Potter',
      installments: [
        {name: 'Philosopher Stone', complete: true},
        {name: 'Deathly Hallows', complete: false}
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
      installments: [
        {id: 1, name: 'Philosopher Stone', complete: true},
        {id: 2, ame: 'Deathly Hallows', complete: false}
      ]
    };
    const wrapper = mount(<SeriesCard data={data}/>);
    expect(wrapper.find('#harry-potter-series-1')).to.have.length(1);
    expect(wrapper.find('#harry-potter-series-2')).to.have.length(1);
  });

  it('renders the list of series from the passed data', () => {
    var data = {
      title: 'Harry Potter',
      installments: [
        {id: 1, name: 'Philosopher Stone', complete: true},
        {id: 2, name: 'Deathly Hallows', complete: false}
      ]
    };
    const wrapper = mount(<SeriesCard data={data}/>);
    expect(wrapper.find('#harry-potter-series-1').text().trim()).to.equal('Philosopher Stone');
    expect(wrapper.find('#harry-potter-series-2').text().trim()).to.equal('Deathly Hallows');
  });

  it('adds a new title when form submitted', () => {
    var data = {
      title: '',
      installments: [],
    };
    const wrapper = mount(<SeriesCards />);
    wrapper.setState({title: 'Lord of the Rings', installments: 'Fellowship'});
    wrapper.find('form').simulate('submit');
    expect(wrapper.state().seriesSets[0].title).to.equal('Lord of the Rings');
    expect(wrapper.state().seriesSets[0].installments).to.have.length(1);
    expect(wrapper.state().seriesSets[0].installments).to.eql([{name: 'Fellowship', complete: false}]);
  });

  it('splits titles on comma when form submitted', () => {
    var data = {
      title: '',
      installments: [],
    };
    const wrapper = mount(<SeriesCards />);
    wrapper.setState({title: 'Lord of the Rings', installments: 'Fellowship,Two Towers'});
    wrapper.find('form').simulate('submit');
    expect(wrapper.state().seriesSets[0].installments).to.have.length(2);
    expect(wrapper.state().seriesSets[0].installments).to.have.eql([{name: 'Fellowship', complete: false}, {name: 'Two Towers', complete: false}]);
  });

  it('removes installment from list when delete button clicked', () => {
    var data = {
      title: '',
      installments: [],
    };
    const wrapper = mount(<SeriesCards />);
    wrapper.setState({seriesSets: [{title: 'Lord of the Rings', installments: [{name: 'Fellowship', complete: false, id: 1}]}]});
    expect(wrapper.state().seriesSets[0].installments).to.have.length(1);
    wrapper.find('.delete-button').simulate('click');
    expect(wrapper.state().seriesSets[0].installments).to.have.length(0);
  });

  it('changes installment name when edited', () => {
    var data = {
      title: '',
      installments: [],
    };
    const wrapper = mount(<SeriesCards />);
    wrapper.setState({seriesSets: [{title: 'Lord of the Rings', installments: [{name: 'Fellowhip', complete: false, id: 1}]}]});
    expect(wrapper.state().seriesSets[0].installments).to.have.length(1);
    wrapper.find('.edit-button').simulate('click');
    wrapper.find('.edit-input').simulate('change', {target: {value: 'Fellowship'}});
    expect(wrapper.state().seriesSets[0].installments[0].name).to.have.eql('Fellowship');
  });

});
