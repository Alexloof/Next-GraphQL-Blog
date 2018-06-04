import React, { Component } from 'react'

export const Context = React.createContext()

class ContextProvider extends Component {
  state = {
    user: {
      _id: '',
      email: '',
      name: '',
      googleId: ''
    }
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'))
    this.setState(prevState => ({
      user: { ...prevState.user, ...user }
    }))
  }

  setUser = user => {
    this.setState(prevState => ({
      user: { ...prevState.user, ...user }
    }))
  }

  clearUser = () => {
    this.setState({
      user: {
        _id: '',
        email: '',
        name: '',
        googleId: ''
      }
    })
  }

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          actions: { setUser: this.setUser, clearUser: this.clearUser }
        }}
      >
        {this.props.children}
      </Context.Provider>
    )
  }
}

export default ContextProvider
