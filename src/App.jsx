import React, { useState, useEffect } from 'react';
import './App.css';
import teal from "./assets/graphics/teal.svg"
import blue from "./assets/graphics/blue.svg"
import upKey from "./assets/keys/up.svg"
import downKey from "./assets/keys/down.svg"
import rightKey from "./assets/keys/right.svg"
import leftKey from "./assets/keys/left.svg"
import apple from "./assets/apple.svg"
import * as Game from "./Game"

const App = () => {
  let [gameStarted, setGameStarted] = useState(false)
  useEffect(() => {
    if (gameStarted) {
      Game.gameSetup()
    }
  }, [gameStarted])
  Game.gameLoop()

  return (
    <>
      <img src={teal} className="BackgroundGraphic" id="TealGraphic" alt="Teal Background" />
      <img src={blue} className="BackgroundGraphic" id="BlueGraphic" alt="Blue Background" />
      <div className="App">
        <div className="GameBoardContainer">
          <GameBoard
            apple={Game.getApple()}
            snakeArray={Game.getSnakeArray()}
            gameStarted={gameStarted}
            setGameStarted={setGameStarted}
          />
        </div>
        <div className="GameInfoContainer">
          <Instructions />
          <AppleIndicator />
        </div>
      </div></>
  );
};

const Instructions = () => {
  return (
    <div className="InstructionsContainer">
      <div className="InstructionText">
        // use keyboard
      </div>
      <div className="InstructionText">
      // arrows to play
      </div>
      <div className="KeysContainer">
        <div className="KeyRow">
          <img src={upKey} className="Key" id="UpKey" alt="Key Up" />
        </div>
        <div className="KeyRow">
          <img src={leftKey} className="Key" id="DownKeyLeftKey" alt="Key Left" />
          <img src={downKey} className="Key" id="DownKey" alt="Key Down" />
          <img src={rightKey} className="Key" id="RightKey" alt="Key Right" />
        </div>
      </div>
    </div>
  )
}

const AppleIndicator = () => {
  return (
    <div className="AppleIndicatorContainer">
      <div className="InstructionText">
    // arrows to play
      </div>
      <div className="ApplesContainer" style={{
        display: "grid",
        gridTemplateRows: `repeat(${(Game.getMaxApples() / 5)}, 1fr)`,
        gridTemplateColumns: `repeat(${5}, 1fr)`
      }}>
        {getAppleElements()}
      </div>
    </div>
  )
}

const getAppleElements = function () {
  let apples = []
  let maxApples = Game.getMaxApples()
  let applesLeft = Game.getMaxApples() - Game.getApplesEaten()
  for (let i = 0; i < maxApples; i++) {
    let x = Math.floor(i / (maxApples / 2))
    let y = Math.floor(i % (maxApples / 2))
    let opacity = (i + 1) <= applesLeft ? 1 : 0.3
    apples.push(<img key={`apple-${i}`} src={apple} style={{
      transform: "scale(2)",
      padding: "20px   0px",
      marginTop: "10px",
      opacity: opacity
    }} alt="Key Right" />)
  }
  return (
    <>
      {apples}
    </>
  )
}

const GameBoard = (props) => {
  let { snakeArray, apple, gameStarted, setGameStarted } = props
  const getSnakeElement = function () {
    let snake = []
    snakeArray.forEach((e, index) => {
      snake.push(getSnakeSegment(e, index))
    })
    return snake;
  }
  const getSnakeSegment = function (e, index) {
    let head = index === 0;
    let opacity = (snakeArray.length - index) / snakeArray.length
    return (
      <div key={Math.random() * 100000} className={head ? "head snake" : "snake"} style={{
        gridRowStart: e.x,
        gridColumnStart: e.y,
        opacity: `${opacity}`
      }} />
    )
  }
  const getAppleElement = function () {
    return (
      <div className="apple" style={{
        gridRowStart: apple.x,
        gridColumnStart: apple.y
      }} />
    )
  }

  const StartGame = function () {

  }

  return (
    <div id="GameBoard" style={{
      display: "grid",
      gridTemplateRows: `repeat(${Game.getGridValues().x}, 1fr)`,
      gridTemplateColumns: `repeat(${Game.getGridValues().y}, 1fr)`
    }}>
      {snakeArray && getSnakeElement()}
      {apple && getAppleElement()}
      <div id="GameOverContainer">
        {Game.getGameOver() &&
          <>
            <div id='StartOverText'>GAME OVER!</div>
            <div id="StartOverButton" onClick={Game.resetGame}>start-again</div>
          </>}
        {(Game.getApplesEaten() >= Game.getMaxApples()) &&
          <>
            <div id='StartOverText'>WELL DONE!</div>
            <div id="StartOverButton" onClick={Game.resetGame}>play-again</div>
          </>}
        {!gameStarted &&
          <div className="StartGameButtonContainer">
            <div className="StartGameButton" onClick={() => setGameStarted(true)}>
              Start Game
            </div>
          </div>}
      </div>
    </div>
  )
};

export default App;