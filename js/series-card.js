import React from 'react';

export default React.createClass({
  render() {
    var render = [];
    const seriesComplete = this.props.data.installments.map((installment) => installment.complete).every((i) => i === true);
    this.props.data.installments.forEach((installment, idx) => {
      var editButton, editingInputState;
      if (installment.editing) {
        editButton = <input type="button" className="save-button" onClick={() => this.props.handleEditToggle(this.props.idx, idx, installment)} value="Save" />;
        editingInputState = <input type="text" className="edit-input" onChange={(event) => this.props.handleNameEdit(this.props.idx, idx, event)} value={installment.name}/>;
      } else {
        editButton = <input type="button" className="edit-button" onClick={() => this.props.handleEditToggle(this.props.idx, idx, installment)} value="Edit" />;
        editingInputState =  installment.name;
      }

      render.push(
        <div id={installment.name.replace(/ /, '-').toLowerCase()} key={installment.name}>
          <input type="checkbox" defaultChecked={installment.complete} onChange={() => this.props.handleComplete(installment)}/>
          {editingInputState}
          <input type="button" className="delete-button" onClick={() => this.props.handleDelete(installment, 'installment', this.props.idx, idx)} value="Delete" />
          {editButton}
        </div>
      );
    });
    return (
      <div>
        <div className='series-card'>
          <div id='title'>{this.props.data.title}</div>
          <div className='complete'>{seriesComplete && this.props.data.installments.length ? 'Complete' : ''}</div>
          <input type="button" className="series-delete-button" onClick={() => this.props.handleDelete(this.props.data, 'series', this.props.idx)} value="Delete Series"/>
          <br />
          {render}
          Add Installment:
          <input type="text" id="add-input" onChange={(event) => this.props.handleInputChange('newInstallment', event)} />
          <input type="button" id="add-button" onClick={() => this.props.addInstallment(this.props.idx)} value="Save"/>
        </div>
      </div>
    )
  }
});
