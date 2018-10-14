import React, { Component } from "react";
import styled from "styled-components";
import "./App.css";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  width: 300px;
  height: 300px;
`;

const Box = styled.div`
  border-right: 1px solid red;
  border-bottom: 1px solid red;
  height: 100px;
  width: 100px;
  &:nth-child(3n) {
    border-right: 0;
  }
  &:nth-child(n + 7):nth-child(-n + 9) {
    border-bottom: 0;
  }
`;

// const huPlayer = "O";
// const aiPlayer = "X";
// const winCombos = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [0, 4, 8],
//   [6, 4, 2]
// ];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pauseGame: false,
      origBoard: Array.from(Array(9).keys())
    };
    this.startGame = this.startGame.bind(this);
  }
  takeTurn(number) {
    console.log(number);
  }
  startGame() {
    this.setState({
      pauseGame: false,
      origBoard: Array.from(Array(9).keys())
    });
  }
  render() {
    return (
      <Container className="App">
        {this.state.origBoard.map((number, index) => {
          return (
            <Box key={index} onClick={() => this.takeTurn(index + 1)}>
              {number}
            </Box>
          );
        })}
      </Container>
    );
  }
}

export default App;
