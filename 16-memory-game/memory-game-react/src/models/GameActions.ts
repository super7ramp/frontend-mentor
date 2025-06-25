export interface GameActions {
    scheduleTimeout: () => void;
    recordPlayerMove: (id: number) => void;
    recordPlayerFoundAPair: (id: number) => void;
    recordGameFinished: () => void;
    resetStats: () => void;
}
