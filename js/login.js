import React from 'react';

export default React.createClass({
  getInitialState() {
    return {
      email: '',
      password: ''
    };
  },

  handleInputChange(key, event) {
    this.setState({[key]: event.target.value.substr(0, 140)});
  },

  submit(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/login',
      contentType: 'application/json',
      data: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password
        }
      }),
      success: function(a, b, c) {
        localStorage.setItem('token', a.auth_token);
      }
    });
  },

  render() {
    return (
      <div>

      <form onSubmit={this.submit}>
        <label htmlFor='email'>Email:</label>
        <input type='text' id='email' onChange={(event) => this.handleInputChange('email', event)} value={this.state.email} placeholder='Email' />
        <label htmlFor='password'>Password:</label>
        <input type='password' id='password' onChange={(event) => this.handleInputChange('password', event)} value={this.state.password} placeholder='Password' />
        <button id='submit' type='submit'>Submit</button>
      </form>
      </div>
    )
  }
})
