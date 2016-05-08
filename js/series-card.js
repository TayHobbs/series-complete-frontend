import React from 'react';

export default React.createClass({
  render() {
    var render = [];
    for (var i=0; i < this.props.data.series.length; i++) {
      if (this.props.data.series[i].checked) {
        render.push(<div key={this.props.data.series[i].name}><input type="checkbox" checked /> {this.props.data.series[i].name}</div>);
      } else {
        render.push(<div key={this.props.data.series[i].name}><input type="checkbox" /> {this.props.data.series[i].name}</div>)
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
