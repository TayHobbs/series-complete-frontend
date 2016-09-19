import React from 'react';

export default React.createClass({
  render() {
    var render = [];
    this.props.data.installments.forEach((installment, idx) => {
      let seriesId = `${this.props.data.title.replace(/ /, '-').toLowerCase()}-series-${installment.id}`;
      render.push(
        <div id={seriesId} key={installment.name}>
          <input type="checkbox" defaultChecked={installment.complete} onChange={() => this.props.handleComplete(installment)}/>
          {installment.name}
          <input type="button" id="delete-button" onClick={() => this.props.handleDelete(this.props.idx, installment, idx)} value="Delete" />
        </div>
      );
    });
    return (
      <div>
        <div className='series-card'>
          <div id='title'>{this.props.data.title}</div>
          <br />
          {render}
        </div>
      </div>
    )
  }
});
