//cutDeck takes in a dist value and creates, shuffles, and cuts the deck depending on the value of dist
export function cutDeck(dist, num) {
  //creates deck
  const RANK = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "A",
    "J",
    "Q",
    "K",
  ];
  const SUIT = ["C", "D", "H", "S"];
  let deck = [];

  for (let r in RANK) {
    for (let s in SUIT) {
      deck.push(`${RANK[r]}${SUIT[s]}`);
    }
  }
  deck = shuffle(shuffle(deck));
  //cuts deck
  switch (dist) {
    case "r":
      while (getRank(deck[0]) !== 14) {
        deck.push(deck.shift());
      }
      const ALL_ACES = [
        deck.indexOf("AC"),
        deck.indexOf("AD"),
        deck.indexOf("AH"),
        deck.indexOf("AS"),
      ].sort((a, b) => a - b);
      return num === 2
        ? [
            shuffle(deck.slice(0, ALL_ACES[2])),
            shuffle(deck.slice(ALL_ACES[2], 52)),
          ]
        : [
            shuffle(deck.slice(0, ALL_ACES[1])),
            shuffle(deck.slice(ALL_ACES[1], ALL_ACES[2])),
            shuffle(deck.slice(ALL_ACES[2], ALL_ACES[3])),
            shuffle(deck.slice(ALL_ACES[3], 52)),
          ];
    case "u":
      return num === 2
        ? [deck.slice(0, 26), deck.slice(26, 52)]
        : [
            deck.slice(0, 13),
            deck.slice(13, 26),
            deck.slice(26, 39),
            deck.slice(39, 52),
          ];
    default:
      break;
  }
}

export function shuffle(deck) {
  for (let i in deck) {
    let j = Math.floor(Math.random() * deck.length);
    let cardOut = deck[j];
    deck[j] = deck[i];
    deck[i] = cardOut;
  }
  return deck;
}

function getRank(card) {
  if (card === undefined) {
    return 0;
  }
  switch (card[0]) {
    case "2":
      return 2;
    case "3":
      return 3;
    case "4":
      return 4;
    case "5":
      return 5;
    case "6":
      return 6;
    case "7":
      return 7;
    case "8":
      return 8;
    case "9":
      return 9;
    case "J":
      return 11;
    case "Q":
      return 12;
    case "K":
      return 13;
    case "A":
      return 14;
    default:
      return 10;
  }
}

export function getWinners(players, warInProgress) {
  //find the highest card and players of those cards
  let currHighestRank = 0;
  let winners = [];
  switch (warInProgress) {
    case true:
      players.forEach((player) => {
        if (player.inWar) {
          let playerRank = getRank(player.deck[0]);
          if (playerRank > currHighestRank && playerRank !== 0) {
            winners = [player];
            currHighestRank = playerRank;
          } else if (playerRank === currHighestRank) {
            winners.push(player);
          }
        }
      });
      break;
    case false:
      players.forEach((player) => {
        if (player.deck.length > 0) {
          let playerRank = getRank(player.deck[0]);
          if (playerRank > currHighestRank && playerRank !== 0) {
            winners = [player];
            currHighestRank = playerRank;
          } else if (playerRank === currHighestRank) {
            winners.push(player);
          }
        }
      });
      break;
    default:
      break;
  }
  return winners;
}

export function noMoreCards(players) {
  let condition = true;
  for (let player of players) {
    if (player.deck.length > 0) {
      condition = false;
      break;
    }
  }
  return condition;
}

export function findWinner(players, name) {
  let winner = "";
  players.forEach((player) => {
    if (player.name === name) {
      winner = player;
    }
  });
  return winner;
}

export function checkHands(players) {
  players.forEach((player, x) => {
    if (player.deck.length === 0) {
      player.inWar = false;
      players.splice(x, 0);
    }
  });
  return players;
}

export function message() {
  return [
    "Your objective is simple; win all 52 cards.",

    "Each player is given a number of face down cards at the beginning of the game. " +
      "Each round, players will flip the card at the top of their deck face up. " +
      "The player who plays the card with the highest rank wins all of the cards " +
      "that were played and any cards that may be in the war pile, and will add them " +
      "to the bottom of their deck face down.",

    "In the event of a tie for highest rank, all players who tied for highest rank will go to ",

    "war",

    ".",

    "Only players who tied participate in war but all players must put the card " +
      "they played prior to war in the war pile. During war, the players who tied " +
      "will play 3 cards face down and 1 card face up. These cards will be recorded in " +
      "the war pile which will be displayed under the game buttons. The player who plays " +
      "the highest face up card wins all cards that were played and will add them to the " +
      "bottom of their deck face down. In the event of another tie, more wars will follow " +
      "until there is a winner. Any player participating in war who does not have enough " +
      "cards to play the round automatically loses and must surrender any cards they have " +
      "to the war pile.",

    "Click anywhere to begin or hit Enter...",
  ];
}
