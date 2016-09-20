import React from 'react';

export default React.createClass({
  render() {
    var render = [];
    this.props.data.installments.forEach((installment, idx) => {
      var editButton;
      let seriesId = `${this.props.data.title.replace(/ /, '-').toLowerCase()}-series-${installment.id}`;
      if (installment.editing) {
        editButton = <input type="button" className="save-button" onClick={() => this.props.handleSave(this.props.idx, idx, this.editValue)} value="Save" />
      } else {
        editButton = <input type="button" className="edit-button" onClick={() => this.props.handleEdit(this.props.idx, idx, installment)} value="Edit" />
      }

      render.push(
        <div id={seriesId} key={installment.name}>
          <input type="checkbox" defaultChecked={installment.complete} onChange={() => this.props.handleComplete(installment)}/>
          {installment.editing ? <input type="text" className="edit-input" onChange={(event) => this.props.handleNameEdit(this.props.idx, idx, event)} value={installment.name}/> : installment.name }
          <input type="button" className="delete-button" onClick={() => this.props.handleDelete(this.props.idx, installment, idx)} value="Delete" />
          {editButton}
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
