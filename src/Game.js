import React, { useState, useEffect } from 'react';

// Global Variables
let gameboard = document.querySelector("#GameBoard")
let lastFrameTime = 0
const DIRECTIONS = {
    UP: { x: -1, y: 0 },
    DOWN: { x: 1, y: 0 },
    RIGHT: { x: 0, y: 1 },
    LEFT: { x: 0, y: -1 }
}
let currentDirection = null
let snakeArray = [{ x: 17, y: 12 }, { x: 16, y: 12 }]
let apple = { x: 10, y: 5 }
let gameOver = false
let speed = 5
let applesEaten = 0
let maxApples = 10
let grid = { x: 36, y: 18 }
let appleSpawnPadding = 2

const gameLoop = function () {
    const gameEngine = function () {
        function updateSnake(currentDirection) {
            snakeArray.unshift({ x: snakeArray[0].x + currentDirection.x, y: snakeArray[0].y + currentDirection.y })
            snakeArray.pop()
        }
        checkCollision()
        if (currentDirection && (!gameOver) && (!(applesEaten >= maxApples))) updateSnake(currentDirection)
    }


    const frameTime = useFrameTime()
    if ((frameTime - lastFrameTime) / 1000 < 1 / speed) {
        return
    }
    lastFrameTime = frameTime
    gameEngine()
}

const gameSetup = function () {
    window.addEventListener('keydown', e => {
        switch (e.key) {
            case "ArrowUp":
                if (currentDirection !== DIRECTIONS.DOWN)
                    currentDirection = DIRECTIONS.UP
                console.log("ArrowUp")
                break;

            case "ArrowDown":
                if (currentDirection !== DIRECTIONS.UP)
                    currentDirection = DIRECTIONS.DOWN
                console.log("ArrowUp")
                break;

            case "ArrowLeft":
                if (currentDirection !== DIRECTIONS.RIGHT)
                    currentDirection = DIRECTIONS.LEFT
                console.log("ArrowLeft")
                break;

            case "ArrowRight":
                if (currentDirection !== DIRECTIONS.LEFT)
                    currentDirection = DIRECTIONS.RIGHT
                console.log("ArrowRight")
                break;
            default:
                break;
        }

    });
}

const scorePoint = function () {
    applesEaten += 1
    console.log(applesEaten)
    if (applesEaten >= maxApples) {
        return
    } else {
        snakeArray.unshift({
            x: snakeArray[0].x + currentDirection.x,
            y: snakeArray[0].y + currentDirection.y
        })
        let boundsX = { lower: appleSpawnPadding, upper: grid.x - appleSpawnPadding }
        let boundsY = { lower: appleSpawnPadding, upper: grid.y - appleSpawnPadding }
        apple = {
            x: boundsX.lower + Math.floor(Math.random() * (boundsX.upper - boundsX.lower)),
            y: boundsY.lower + Math.floor(Math.random() * (boundsY.upper - boundsY.lower))
        }
        speed += speed * 0.1
    }
}

const checkCollision = function () {
    if (snakeArray[0].x === apple.x && snakeArray[0].y === apple.y) {
        scorePoint()
        return
    }
    let head = snakeArray[0]
    for (let i = 1; i < snakeArray.length; i++) {
        let curr = snakeArray[i]
        if (curr.x === head.x && curr.y === head.y) {
            gameOver = true
            return
        }
    }
    if (head.x <= 0 || head.y <= 0 || head.x >= 36 || head.y >= 18) {
        gameOver = true
        return
    }
}

const resetGame = function () {
    gameOver = false
    currentDirection = null
    snakeArray = [{ x: 17, y: 12 }, { x: 16, y: 12 }]
    apple = { x: 10, y: 5 }
    gameOver = false
    speed = 5
    applesEaten = 0
}

const useFrameTime = () => {
    const [frameTime, setFrameTime] = React.useState(performance.now())
    React.useEffect(() => {
        let frameId
        const frame = (time) => {
            setFrameTime(time)
            frameId = requestAnimationFrame(frame)
        }
        requestAnimationFrame(frame)
        return () => cancelAnimationFrame(frameId)
    }, [])
    return frameTime
}

const getApple = () => apple
const getSnakeArray = () => snakeArray
const getGameOver = () => gameOver
const getGridValues = () => grid
const getMaxApples = () => maxApples
const getApplesEaten = () => applesEaten

export {
    gameLoop,
    DIRECTIONS,
    getApple,
    getSnakeArray,
    gameSetup,
    getGameOver,
    resetGame,
    getGridValues,
    getMaxApples,
    getApplesEaten,
}