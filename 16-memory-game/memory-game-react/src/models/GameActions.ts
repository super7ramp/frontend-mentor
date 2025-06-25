export interface GameActions {
    scheduleTimeout: () => void;
    recordPlayerMove: (id: number) => void;
    recordPlayerFoundAPair: (id: number) => void;
    recordTurnFinished: (playerId: number, nextPlayerId: number) => void;
    recordGameFinished: () => void;
    resetStats: () => void;
}
