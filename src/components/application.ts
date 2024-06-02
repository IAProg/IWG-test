import { Application } from "pixi.js";
import { gameConfig } from "../config";
import { Background } from "./background";
import { Gameboard } from "./game-board";
import { Cabinet } from "./cabinet";

/**
 * The core of the application. 
 * The application is responsible for managing sub components of the game and conducting high level game flow
 */
export class IWGApp extends Application {
    private _background: Background;
    private _gameBoard: Gameboard;
    private _cabinet: Cabinet;

    constructor(){
        super(gameConfig.canvas)
        this._background = new Background();
        this._gameBoard = new Gameboard();
        this._cabinet = new Cabinet( this.play.bind(this) );

        this.stage.addChild(this._background, this._gameBoard, this._cabinet);

        this.scaleContent(gameConfig.canvas.width, gameConfig.canvas.height);
    }

    public async playIntro(): Promise<void>{
        await this._cabinet.setShown(true)
    }

    /**
     * While not demonstrated in this demo the components are constructed to support multiple aspect ratios
    */
    public scaleContent(width: number, height: number): void{
        this._background.resize(width, height);
        this._gameBoard.resize(width, height);
        this._cabinet.resize(width, height);
    }

    // the main gameloop
    private async play(): Promise<void>{
        await this._cabinet.setShown(false);
        return;
    }
}