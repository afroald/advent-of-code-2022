enum HandShape {
  Rock = 1,
  Paper = 2,
  Scissors = 3,
}

const MAP_WITH_DATA_ON_WHAT_BEATS_WHAT = new Map([
  [HandShape.Rock, HandShape.Scissors],
  [HandShape.Scissors, HandShape.Paper],
  [HandShape.Paper, HandShape.Rock],
]);

const MAP_WITH_DATA_ON_WHAT_LOSES_TO_WHAT = new Map([
  [HandShape.Rock, HandShape.Scissors].reverse() as [HandShape, HandShape],
  [HandShape.Scissors, HandShape.Paper].reverse() as [HandShape, HandShape],
  [HandShape.Paper, HandShape.Rock].reverse() as [HandShape, HandShape],
]);

function parseInput(input: string) {
  const map: { [input: string]: HandShape } = {
    A: HandShape.Rock,
    B: HandShape.Paper,
    C: HandShape.Scissors,
    X: HandShape.Rock,
    Y: HandShape.Paper,
    Z: HandShape.Scissors,
  };

  return map[input];
}

function scoreGame(opponentHandShape: HandShape, myHandShape: HandShape) {
  let score = 0;

  score += myHandShape;

  if (opponentHandShape === MAP_WITH_DATA_ON_WHAT_BEATS_WHAT.get(myHandShape)) {
    score += 6;
  } else if (opponentHandShape === myHandShape) {
    score += 3;
  }

  return score;
}

export function solve1(input: string) {
  let score = 0;

  for (const game of input.trim().split('\n')) {
    const [opponentHandShape, myHandShape] = game.split(' ').map(parseInput);
    score += scoreGame(opponentHandShape, myHandShape);
  }

  return score;
}

export function solve2(input: string) {
  let score = 0;

  for (const game of input.trim().split('\n')) {
    const [opponentInput, desiredOutcome] = game.split(' ');
    const opponentHandShape = parseInput(opponentInput);

    switch (desiredOutcome) {
      case 'X':
        // lose
        const losingHandshape = MAP_WITH_DATA_ON_WHAT_BEATS_WHAT.get(
          opponentHandShape,
        ) as HandShape; // who needs null checks anyway
        score += scoreGame(opponentHandShape, losingHandshape);
        break;
      case 'Y':
        // draw
        score += scoreGame(opponentHandShape, opponentHandShape);
        break;
      case 'Z':
        // win
        const winningHandShape = MAP_WITH_DATA_ON_WHAT_LOSES_TO_WHAT.get(
          opponentHandShape,
        ) as HandShape; // who needs null checks anyway
        score += scoreGame(opponentHandShape, winningHandShape);
        break;
    }
  }

  return score;
}
