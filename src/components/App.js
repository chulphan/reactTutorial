import React from 'react';
import Contact from './Contact';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: ''
    }
  }
  render() {

    return (
      <div>
        <Contact/>
      </div>
    );
  }
}

export default App;
// module.export = App;
