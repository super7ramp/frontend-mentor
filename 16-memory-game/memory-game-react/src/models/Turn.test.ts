import {expect, test} from 'vitest'
import Turn from "./Turn.ts";

test.for([
    {playerCount: 1, turns: 0, expectedWhose: 1},
    {playerCount: 1, turns: 1, expectedWhose: 1},
    {playerCount: 1, turns: 2, expectedWhose: 1},
    {playerCount: 1, turns: 42, expectedWhose: 1},

    {playerCount: 2, turns: 0, expectedWhose: 1},
    {playerCount: 2, turns: 1, expectedWhose: 2},
    {playerCount: 2, turns: 2, expectedWhose: 1},
    {playerCount: 2, turns: 3, expectedWhose: 2},
    {playerCount: 2, turns: 42, expectedWhose: 1},

    {playerCount: 3, turns: 0, expectedWhose: 1},
    {playerCount: 3, turns: 1, expectedWhose: 2},
    {playerCount: 3, turns: 2, expectedWhose: 3},
    {playerCount: 3, turns: 3, expectedWhose: 1},
    {playerCount: 3, turns: 4, expectedWhose: 2},
    {playerCount: 3, turns: 42, expectedWhose: 1},

    {playerCount: 4, turns: 0, expectedWhose: 1},
    {playerCount: 4, turns: 1, expectedWhose: 2},
    {playerCount: 4, turns: 2, expectedWhose: 3},
    {playerCount: 4, turns: 3, expectedWhose: 4},
    {playerCount: 4, turns: 4, expectedWhose: 1},
    {playerCount: 4, turns: 5, expectedWhose: 2},
    {playerCount: 4, turns: 42, expectedWhose: 3},

])('$playerCount P - After $turns turns', ({playerCount, turns, expectedWhose}) => {

    const gameAfterTurns = play(Turn.initial(playerCount as 1 | 2 | 3 | 4), turns)
    const whose = gameAfterTurns.whose()
    expect(whose).toBe(expectedWhose)

})

function play(turn: Turn, times: number) {
    let currentTurn = turn
    for (let i = 0; i < times; i++) {
        currentTurn = currentTurn.played()
    }
    return currentTurn
}