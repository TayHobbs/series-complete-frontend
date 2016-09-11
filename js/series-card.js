import React from 'react';

export default React.createClass({
  render() {
    var render = [];
    for (var i=0; i < this.props.data.installments.length; i++) {
      let seriesId = `${this.props.data.title.replace(/ /, '-').toLowerCase()}-series-${i}`;
      if (this.props.data.installments[i].checked) {
        render.push(<div id={seriesId} key={this.props.data.installments[i].name}><input type="checkbox" checked /> {this.props.data.installments[i].name}</div>);
      } else {
        render.push(<div id={seriesId} key={this.props.data.installments[i].name}><input type="checkbox" /> {this.props.data.installments[i].name}</div>)
      }
    }
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
