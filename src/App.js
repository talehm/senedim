import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/Navbar';
import Main from './components/Main';


class App extends Component {
  render() {
    return (
       <Provider store={store}>
       <h1>Hello</h1>
        <div className="App" >
         <Navbar />
         <Main />
        </div>
      </Provider>
    );
  }
}

export default App;
