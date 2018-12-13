import * as React from 'react';
import Home from './pages/Home/Home';
import { fetchData } from './helpers/api/api';

import './App.css';

interface State {
  fetched: boolean,
  matrix: number[][][],
}

class App extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      fetched: false,
      matrix: [[]],
    };
  }

  public componentDidMount = async () => {
    const matrix = await fetchData();
    this.setState({ matrix });
  }

  public renderMatrix = () => {
    const { matrix } = this.state;
    if (!matrix) { return null; }

    return (
      <>
        <Home matrix={matrix[0]} />
        <Home matrix={matrix[1]} />
      </>
    )
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Click the cells to change their status.
        </p>
        {this.renderMatrix()}
      </div>
    );
  }
}

export default App;
