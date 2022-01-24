import React, { Component } from "react"
import Header from "./Header"
import ScoreBoard from "./ScoreBoard"
import Summary from "./Summary"
import WarZone from "./WarZone"
import Welcome from "./Welcome"
import Button from "./Button"
import WarPile from "./WarPile"
import { cutDeck, shuffle, findWinner } from "./WarFunctions.js"

class App extends Component {
  constructor() {
    super()
    this.user = {
      name: "USER",
      deck: [],
      inWar: false,
    }
    this.comp1 = {
      name: "COMP1",
      deck: [],
      inWar: false,
    }
    this.comp2 = {
      name: "COMP2",
      deck: [],
      inWar: false,
    }
    this.comp3 = {
      name: "COMP3",
      deck: [],
      inWar: false,
    }
    this.playersInWar = []
    this.winner = ""
    this.state = {
      numplayers: 4,
      color: "army-green",
      dist: "",
      draw: "START GAME",
      end: "END GAME",
      gameStarted: false,
      flip: false,
      warInProgress: false,
      warpile: "",
      autoplay: false,
      endingGame: false,
      gameOver: false,
      reset: false,
    }
    this.chooseColor = this.chooseColor.bind(this)
    this.pickNumPlayers = this.pickNumPlayers.bind(this)
    this.deckDist = this.deckDist.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleFlips = this.handleFlips.bind(this)
    this.toWarpile = this.toWarpile.bind(this)
    this.handleRound = this.handleRound.bind(this)
    this.handleWar = this.handleWar.bind(this)
    this.handleWinner = this.handleWinner.bind(this)
    this.endGame = this.endGame.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  componentDidUpdate() {
    if (this.state.autoplay && !this.state.endingGame) {
      this.setState({ endingGame: true })
      this.endGame()
    }
  }

  chooseColor(color) {
    this.setState({ color: color, reset: false })
  }

  pickNumPlayers(num) {
    this.setState({ numplayers: num })
  }

  deckDist(dist) {
    this.setState({ dist: dist })
    let deck = cutDeck(dist, this.state.numplayers)
    if (this.state.numplayers === 4) {
      this.user = {
        ...this.user,
        deck: deck[0],
      }
      this.comp1 = {
        ...this.comp1,
        deck: deck[1],
      }
      this.comp2 = {
        ...this.comp2,
        deck: deck[2],
      }
      this.comp3 = {
        ...this.comp3,
        deck: deck[3],
      }
    } else {
      this.user = {
        ...this.user,
        deck: deck[0],
      }
      this.comp1 = {
        ...this.comp1,
        deck: deck[1],
      }
    }
  }

  handleClick(id) {
    switch (id) {
      case "start":
        this.setState({ gameStarted: true })
        break
      case "flip":
        if (this.state.warInProgress) {
          switch (Boolean(this.state.warpile)) {
            case true:
              this.handleFlips()
              this.setState({ flip: true })
              break
            case false:
              this.handleFlips()
              this.setState({ flip: true, warpile: [] })
              break
            default:
              break
          }
        } else {
          this.setState({ flip: true })
        }
        break
      case "startnextround":
        this.handleRound()
        this.setState({ flip: false })
        break
      case "end":
        document.getElementById("end").setAttribute("disabled", "disabled")
        this.setState({ autoplay: true })
        break
      case "yes":
        document.getElementById("end").classList.remove("hide")
        Array.from(document.querySelectorAll(".score")).forEach((score) => {
          if (score.innerText !== "0") {
            score.innerText = "0"
          }
        })
        this.user.inWar = false
        this.comp1.inWar = false
        this.comp2.inWar = false
        this.comp3.inWar = false
        this.user.deck = []
        this.comp1.deck = []
        this.comp2.deck = []
        this.comp3.deck = []
        this.playersInWar = []
        this.winner = ""
        this.setState(
          {
            numplayers: 4,
            color: document.querySelector("body").classList[0],
            dist: "",
            draw: "START GAME",
            end: "END GAME",
            gameStarted: false,
            flip: false,
            warInProgress: false,
            warpile: "",
            autoplay: false,
            endingGame: false,
            gameOver: false,
            reset: true,
          },
          () => {
            this.setState({ reset: false })
          }
        )
        break
      default:
        break
    }
  }

  endGame() {
    const drawBtn = document.getElementById("draw")
    const endBtn = document.getElementById("end")
    drawBtn.classList.add("no-pointer-events")
    endBtn.classList.add("no-pointer-events")
    let interval = setInterval(() => {
      drawBtn.click()
      if (!this.state.gameStarted) {
        clearInterval(interval)
        drawBtn.classList.remove("no-pointer-events")
        endBtn.classList.remove("no-pointer-events")
        drawBtn.removeAttribute("disabled")
        endBtn.removeAttribute("disabled")
        this.setState({
          autoplay: false,
          endingGame: false,
          gameOver: true,
        })
      }
    }, 0)
  }

  handleReset() {
    this.setState({ reset: false })
  }

  toWarpile() {
    let warpile = this.state.warpile ? [...this.state.warpile] : []
    this.playersInWar.forEach((player) => {
      if (player.deck.length > 0) {
        warpile.push(player.deck.shift())
      }
    })
    this.setState({ warpile: warpile })
  }

  handleFlips() {
    let time = this.state.autoplay ? 0 : 1000
    setTimeout(() => {
      this.toWarpile()
      setTimeout(() => {
        this.toWarpile()
        setTimeout(() => {
          this.toWarpile()
        }, time)
      }, time)
    }, time)
  }

  handleRound() {
    const PLAYERS = [this.user, this.comp1, this.comp2, this.comp3]
    switch (this.state.warInProgress) {
      case true:
        if (this.winner) {
          const WINNER = findWinner(PLAYERS, this.winner)
          if (this.state.warpile) {
            let warpile = this.state.warpile ? [...this.state.warpile] : []
            WINNER.deck = WINNER.deck.concat(shuffle(warpile))
            if (WINNER.deck.length === 52) {
              document.getElementById(
                "summary"
              ).innerText = `${WINNER.name} has won the game.\r\n Would you like to play again?`
              this.setState({
                gameStarted: false,
                gameOver: true,
                warInProgress: false,
                warpile: "",
              })
              let cards = document.getElementsByClassName("card")
              PLAYERS.forEach((player, x) => {
                if (player !== WINNER && cards[x] !== undefined) {
                  cards[x].style.opacity = "0"
                }
              })
            }
          }
          this.playersInWar.forEach((player) => {
            if (player.deck.length > 1) {
              WINNER.deck.push(player.deck.shift())
              player.inWar = false
              player.deck = shuffle(player.deck)
            } else if (player.deck.length === 1) {
              WINNER.deck.push(player.deck.shift())
              player.inWar = false
            } else {
              player.inWar = false
            }
            this.winner = ""
            this.setState({
              warpile: "",
              warInProgress: false,
            })
          })
        } else if (!this.playersInWar) {
          this.setState({ warInProgress: false })
        } else {
          let warpile = this.state.warpile ? [...this.state.warpile] : []
          this.playersInWar.forEach((player) => {
            warpile.push(player.deck.shift())
          })
          this.setState({ warpile: warpile })
        }
        break
      case false:
        if (this.winner) {
          const WINNER = findWinner(PLAYERS, this.winner)
          PLAYERS.forEach((player) => {
            if (player.deck.length > 1) {
              WINNER.deck.push(player.deck.shift())
              player.inWar = false
              player.deck = shuffle(player.deck)
            } else if (player.deck.length === 1) {
              WINNER.deck.push(player.deck.shift())
              player.inWar = false
            } else {
              player.inWar = false
            }
          })
          if (this.state.warpile) {
            let warpile = this.state.warpile ? [...this.state.warpile] : []
            WINNER.deck = WINNER.deck.concat(shuffle(warpile))
          }
          if (WINNER.deck.length === 52) {
            document.getElementById(
              "summary"
            ).innerText = `${WINNER.name} has won the game.\r\n Would you like to play again?`
            this.setState({
              gameStarted: false,
              gameOver: true,
              warInProgress: false,
              warpile: "",
            })
            let cards = document.getElementsByClassName("card")
            PLAYERS.forEach((player, x) => {
              if (player !== WINNER && cards[x] !== undefined) {
                cards[x].style.opacity = "0"
              }
            })
          }
          this.winner = ""
          this.setState({ warpile: "" })
        } else {
          let warpile = this.state.warpile ? [...this.state.warpile] : []
          PLAYERS.forEach((player) => {
            if (player.deck.length > 0) {
              warpile.push(player.deck.shift())
            }
          })
          this.setState({ warInProgress: true, warpile: warpile })
        }
        break
      default:
        break
    }
  }

  handleWar(players) {
    if (players.length > 0) {
      this.playersInWar = players
    } else {
      this.playersInWar = ""
    }
  }

  handleWinner(winner) {
    this.winner = winner.name
  }

  render() {
    return (
      <>
        <Welcome
          reset={this.state.reset}
          pickNumPlayers={this.pickNumPlayers}
          deckDist={this.deckDist}
          chooseColor={this.chooseColor}
        />
        <Header color={this.state.color} />
        <ScoreBoard
          num={this.state.numplayers}
          color={this.state.color}
          user={this.user}
          comp1={this.comp1}
          comp2={this.comp2}
          comp3={this.comp3}
          reset={this.state.reset}
          gameStarted={this.state.gameStarted}
        />
        <Summary
          numPlayers={this.state.numplayers}
          dist={this.state.dist}
          user={this.user}
          comp1={this.comp1}
          comp2={this.comp2}
          comp3={this.comp3}
          gameStarted={this.state.gameStarted}
          flip={this.state.flip}
          handleWar={this.handleWar}
          handleWinner={this.handleWinner}
          warInProgress={this.state.warInProgress}
          autoplay={this.state.autoplay}
          reset={this.state.reset}
          handleReset={this.handleReset}
        />
        <WarZone
          num={this.state.numplayers}
          color={this.state.color}
          user={this.user}
          comp1={this.comp1}
          comp2={this.comp2}
          comp3={this.comp3}
          flip={this.state.flip}
          warInProgress={this.state.warInProgress}
          gameStarted={this.state.gameStarted}
          reset={this.state.reset}
        />
        <div className="buttonswrapper">
          <Button
            id="draw"
            label={this.state.draw}
            color={this.state.color}
            gameOver={this.state.gameOver}
            handleClick={this.handleClick}
            reset={this.state.reset}
          />
          <Button
            id="end"
            label={this.state.end}
            color={this.state.color}
            gameOver={this.state.gameOver}
            handleClick={this.handleClick}
            reset={this.state.reset}
          />
        </div>
        <WarPile warpile={this.state.warpile} />
      </>
    )
  }
}
export default App
