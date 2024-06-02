import { Application } from "pixi.js";
import { gameConfig } from "../config";
import { Background } from "./background";
import { Gameboard } from "./game-board";

/**
 * The core of the application. 
 * The application is responsible for managing sub components of the game and conducting high level game flow
 */
export class IWGApp extends Application {
    private _background: Background;
    private _gameBoard: Gameboard;

    constructor(){
        super(gameConfig.canvas)
        this._background = new Background();
        this._gameBoard = new Gameboard();

        this.stage.addChild(this._background, this._gameBoard);

        this.scaleContent(gameConfig.canvas.width, gameConfig.canvas.height);
    }

    /**
     * While not demonstrated in this demo the components are constructed to support multiple aspect ratios
    */
    public scaleContent(width: number, height: number): void{
        this._background.resize(width, height);
        this._gameBoard.resize(width, height);
    }

    // the main gameloop
    private async play(): Promise<void>{
        return;
    }
}