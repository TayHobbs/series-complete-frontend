import React from 'react';

export default React.createClass({
  render() {
    var render = [];
    this.props.data.installments.forEach((installment) => {
      let seriesId = `${this.props.data.title.replace(/ /, '-').toLowerCase()}-series-${installment.id}`;
      render.push(<div id={seriesId} key={installment.name}><input type="checkbox" checked={installment.checked} /> {installment.name}</div>);
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
