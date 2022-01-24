import React, { Component } from "react"
import "./Summary.css"
import { getWinners, noMoreCards } from "./WarFunctions.js"

class Summary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      beginCalled: false,
      summarySet: false,
      autoplay: false,
    }
    this.setSummary = this.setSummary.bind(this)
    this.setWarText = this.setWarText.bind(this)
  }

  componentDidUpdate() {
    if (this.props.reset) {
      return this.setState({
        beginCalled: false,
        summarySet: false,
        autoplay: false,
      })
    }
    if (this.props.autoplay && !this.state.autoplay) {
      return this.setState({ autoplay: true })
    }
    if (!this.props.gameStarted && !this.state.summarySet) {
      this.setState({ reset: false, summarySet: true })
      document.getElementById("summary").innerText = "Let's get this started!"
    } else if (
      this.props.gameStarted &&
      !this.props.flip &&
      this.state.summarySet
    ) {
      document.getElementById("summary").innerText = ""
      this.setState({ summarySet: false })
    } else if (
      this.props.gameStarted &&
      this.props.flip &&
      !this.state.summarySet &&
      !this.props.warInProgress
    ) {
      this.setSummary()
      this.setState({ summarySet: true })
    } else if (
      this.props.warInProgress &&
      this.props.flip &&
      !this.state.summarySet
    ) {
      this.setWarText()
      this.setState({ summarySet: true })
    }
  }

  setSummary() {
    const PLAYERS = [
      this.props.user,
      this.props.comp1,
      this.props.comp2,
      this.props.comp3,
    ]
    let WINNERS = getWinners(PLAYERS, this.props.warInProgress)

    let summary = document.getElementById("summary")
    switch (this.props.warInProgress) {
      case true:
        if (WINNERS.length === 1) {
          this.props.handleWinner(WINNERS[0])
          summary.innerText = `${WINNERS[0].name} wins this round.`
        } else {
          WINNERS = getWinners(WINNERS, this.props.warInProgress)
          if (!noMoreCards(WINNERS)) {
            summary.innerText = "There must be another war!"
            this.props.handleWar(WINNERS)
          } else if (noMoreCards(WINNERS)) {
            summary.innerText = "This war had no victor. Start the next round."
            this.props.handleWar([])
          }
        }
        break
      case false:
        if (WINNERS.length === 1) {
          this.props.handleWinner(WINNERS[0])
          summary.innerText = `${WINNERS[0].name} wins this round.`
        } else {
          WINNERS.forEach((winner) => {
            winner.inWar = true
          })
          switch (true) {
            case WINNERS.length === 2:
              switch (this.props.numPlayers) {
                case 2:
                  this.props.handleWar(WINNERS)
                  summary.innerText =
                    "Both players will go to war in the next round."
                  break
                case 4:
                  this.props.handleWar(WINNERS)
                  summary.innerText = `${WINNERS[0].name} and ${WINNERS[1].name} will go to war in the next round.`
                  break
                default:
                  break
              }
              break
            case WINNERS.length === 3:
              this.props.handleWar(WINNERS)
              summary.innerText = `${WINNERS[0].name}, ${WINNERS[1].name}, and ${WINNERS[2].name} will go to war in the next round.`
              break
            case WINNERS.length === 4:
              this.props.handleWar(WINNERS)
              summary.innerText = `All players will go to war in the next round.`
              break
            default:
              break
          }
        }
        break
      default:
        break
    }
    //make sure to have something for if there's an ongoing war
  }

  setWarText() {
    //This should be all that's needed at this moment 5/28 7:45 PM
    document.getElementById("draw").setAttribute("disabled", "disabled")
    let summary = document.getElementById("summary")
    let time = this.state.autoplay ? 0 : 1000
    setTimeout(() => {
      summary.textContent = "I "
      setTimeout(() => {
        summary.textContent += "DE"
        setTimeout(() => {
          summary.textContent += "CLARE "
          setTimeout(() => {
            summary.textContent += "WAR!"
            setTimeout(() => {
              this.setSummary()
              document.getElementById("draw").removeAttribute("disabled")
            }, time * 2)
          }, time)
        }, time)
      }, time)
    }, time)
  }

  render() {
    return (
      <div className="sumcont">
        <div id="summary"></div>
      </div>
    )
  }
}

export default Summary
