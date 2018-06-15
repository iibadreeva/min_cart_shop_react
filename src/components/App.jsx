import React, { Component } from 'react';
import ArticleList from './ArticleList'
// import Counter from './Counter'

class App extends Component {
  static propTypes = {}

  state = {
    selection: null
  }

  render() {
    return (
      <div className="table-responsive">        
        <ArticleList />
      </div>
    );
  }


}

export default App;
