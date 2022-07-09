import React from 'react';
import ReactDOM from 'react-dom';
import './resources/styles.css';

import Header from './components/header_footer/Header.jsx';
import Main from './components/core/Main.jsx';

class App extends React.Component {
    render() {
      return (
        <div className="App">
            <Header/>
            <Main />
       
        </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
