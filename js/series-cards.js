import React from 'react';
import Select from 'react-select';
import update from 'react-addons-update';

import SeriesCard from './series-card.js';

export default React.createClass({
  getInitialState() {
    return {
      title: '',
      installments: [],
      seriesSets: []
    };
  },
  componentDidMount() {
    this.ajax = $.get('http://localhost:3000/series', (result) => this.setState({seriesSets: result.series}));
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
        installments: this.state.installments.split(',').map((instalment) => { return {name: instalment, complete: false}; })
      }
    );
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/series',
      contentType: 'application/json',
      data: JSON.stringify({
        series: {
          title: this.state.title,
          installments: this.state.installments.split(',').map((instalment) => { return {name: instalment, complete: false}; })
        }
      })
    });
    this.setState({seriesSets: seriesSets});
  },

  handleInputChange(key, event) {
    this.setState({[key]: event.target.value.substr(0, 140)});
  },

  handleTitle(event) {
    this.setState({title: event.target.value.substr(0, 140)});
  },

  handleType(val) {
    this.setState({type: val});
  },

  handleComplete(installment) {
    $.ajax({
      method: 'PATCH',
      url: `http://localhost:3000/installments/${installment.id}`,
      contentType: 'application/json',
      data: JSON.stringify({
        installment: {
          id: installment.id,
          complete: !installment.complete
        }
      })
    });
  },

  handleDelete(model, type, seriesIdx, installmentIdx) {
    let seriesSets;
    if (type === 'installment') {
      seriesSets = update(this.state.seriesSets, {[seriesIdx]: {installments: {$splice: [[installmentIdx, 1]]}}});
    } else {
      seriesSets = update(this.state.seriesSets, {$splice: [[seriesIdx, 1]]});
    }
    this.setState({seriesSets: seriesSets});
    $.ajax({
      method: 'DELETE',
      url: `http://localhost:3000/${type}/${model.id}`,
      contentType: 'application/json'
    });
  },

  handleEditToggle(seriesIdx, installmentIdx, installment) {
    var editInstallment = update(
      this.state.seriesSets,
      {[seriesIdx]: {installments: {[installmentIdx]: {editing: {$set: !installment.editing}}}}}
    );
    this.setState({seriesSets: editInstallment});
  },

  handleNameEdit(seriesIdx, installmentIdx, event) {
    var editInstallment = update(
      this.state.seriesSets,
      {[seriesIdx]: {installments: {[installmentIdx]: {$set: {name: event.target.value}}}}}
    );
    this.setState({seriesSets: editInstallment});
  },

  handleNewInput(event) {
    this.setState({newInstallment: event.target.value})
  },

  addInstallment(seriesIdx) {
    var newInstallmentState = update(
      this.state.seriesSets,
      {[seriesIdx]: {installments: {$push: [{name: this.state.newInstallment, complete: false}]}}}
    );
    this.setState({seriesSets: newInstallmentState});
  },

  render() {
    const options = [
      {value: 'movie', label: 'Movie'},
      {value: 'game', label: 'Game'},
      {value: 'book', label: 'Book'},
    ];
    var render = [];
    for (var i=0; i < this.state.seriesSets.length; i++) {
      render.push(
        <SeriesCard
          key={this.state.seriesSets[i].id}
          idx={i}
          data={this.state.seriesSets[i]}
          handleInputChange={this.handleInputChange}
          addInstallment={this.addInstallment}
          handleNameEdit={this.handleNameEdit}
          handleEditToggle={this.handleEditToggle}
          handleDelete={this.handleDelete}
          handleComplete={this.handleComplete}
        />
      );
    }
    return (
      <div>
        {render}
        <div>
          <h3>Create a New Series</h3>
          <form onSubmit={this.addSeries}>
            <label htmlFor='title'>Title:</label>
            <input type='text' id='title' onChange={(event) => this.handleInputChange('title', event)} value={this.state.title} placeholder='Title' />
            <label htmlFor='type'>Type:</label>
            <Select
              name='type'
              value={this.state.type}
              options={options}
              onChange={this.handleType}
              />
            <label htmlFor='series'>Installments: (seperated by comma)</label>
            <input type='text' id='installment' onChange={(event) => this.handleInputChange('installments', event)} value={this.state.installments} placeholder='Installments' />
            <button id='submit' type='submit'>Submit</button>
          </form>
        </div>
      </div>
    )
  }
});
