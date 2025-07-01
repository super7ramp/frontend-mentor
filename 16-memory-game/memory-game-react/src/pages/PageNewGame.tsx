import style from "./PageNewGame.module.scss"
import ButtonPrimary from "../components/ButtonPrimary.tsx";
import ButtonSelection from "../components/ButtonSelection.tsx";
import GameSettings from "../models/GameSettings.ts";

import {type ReactNode} from "react";
import {useNavigate} from "react-router";

/**
 * PageNewGame component allows users to set up a new game by selecting the theme, number of players, and grid size.
 * @constructor
 */
function PageNewGame({gameSettings, setGameSettings}: {
    gameSettings: GameSettings,
    setGameSettings: (gs: GameSettings) => void
}) {
    const navigate = useNavigate();

    const startGame = (e: any) => {
        e.preventDefault()
        navigate("/play")
    }

    return (
        <div className={style.pageNewGame}>
            <header>
                <h1>memory</h1>
            </header>
            <main>
                <form onSubmit={startGame}>
                    <SelectTheme gameSettings={gameSettings} setGameSettings={setGameSettings}/>
                    <SelectPlayers gameSettings={gameSettings} setGameSettings={setGameSettings}/>
                    <SelectGrid gameSettings={gameSettings} setGameSettings={setGameSettings}/>
                    <ButtonPrimary type="submit">Start Game</ButtonPrimary>
                </form>
            </main>
        </div>
    )
}

function SelectTheme({gameSettings, setGameSettings}: {
    gameSettings: GameSettings,
    setGameSettings: (gs: GameSettings) => void
}) {
    const setTheme = (theme: "Icons" | "Numbers") => {
        setGameSettings(gameSettings.withTheme(theme));
    }
    return (
        <FieldSet legend="Select Theme">
            <ButtonSelection label="Numbers"
                             groupName="theme"
                             selected={gameSettings.theme === "Numbers"}
                             setSelected={() => setTheme("Numbers")}/>
            <ButtonSelection label="Icons"
                             groupName="theme"
                             selected={gameSettings.theme === "Icons"}
                             setSelected={() => setTheme("Icons")}/>
        </FieldSet>
    )
}

function SelectPlayers({gameSettings, setGameSettings}: {
    gameSettings: GameSettings,
    setGameSettings: (gs: GameSettings) => void
}) {
    const setPlayers = (players: 1 | 2 | 3 | 4) => {
        setGameSettings(gameSettings.withPlayers(players));
    }
    return (
        <FieldSet legend="Numbers of Players">
            <ButtonSelection label="1"
                             groupName="players"
                             selected={gameSettings.players === 1}
                             setSelected={() => setPlayers(1)}/>
            <ButtonSelection label="2"
                             groupName="players"
                             selected={gameSettings.players === 2}
                             setSelected={() => setPlayers(2)}/>
            <ButtonSelection label="3"
                             groupName="players"
                             selected={gameSettings.players === 3}
                             setSelected={() => setPlayers(3)}/>
            <ButtonSelection label="4"
                             groupName="players"
                             selected={gameSettings.players === 4}
                             setSelected={() => setPlayers(4)}/>
        </FieldSet>
    )
}

function SelectGrid({gameSettings, setGameSettings}: {
    gameSettings: GameSettings,
    setGameSettings: (gs: GameSettings) => void
}) {
    const setGridSize = (gridSize: "4x4" | "6x6") => {
        setGameSettings(gameSettings.withGridSize(gridSize))
    }
    return (
        <FieldSet legend="Grid Size">
            <ButtonSelection label="4x4"
                             groupName="grid"
                             selected={gameSettings.gridSize === "4x4"}
                             setSelected={() => setGridSize("4x4")}/>
            <ButtonSelection label="6x6"
                             groupName="grid"
                             selected={gameSettings.gridSize === "6x6"}
                             setSelected={() => setGridSize("6x6")}/>
        </FieldSet>
    )
}

function FieldSet({legend, children}: { legend: string, children: ReactNode }) {
    return (
        <fieldset>
            <legend>{legend}</legend>
            <div className={style.inputs}>
                {children}
            </div>
        </fieldset>
    )
}

export default PageNewGame