import { Application } from "pixi.js";
import { gameConfig } from "./config";
import { Background } from "./components/background";
import { Gameboard } from "./components/game-board";
import { Foreground } from "./components/foreground";
import { requestTicketData } from "./requests";
import { gameModel } from "./game-model";
import { delay } from "./utils";
import { EndCard, PlayerChoice } from "./components/end-card";
import { playerModel } from "./player-model";
import { Cabinet } from "./components/cabinet";
import { RevealAll } from "./components/reveal-all";


/**
 * The core of the application. 
 * The application is responsible for managing sub components of the game and conducting high level game flow
 */
export class IWGApp extends Application {
    private _background: Background;
    private _gameBoard: Gameboard;
    private _foreground: Foreground;
    private _cabinet: Cabinet;
    private _revealAll: RevealAll;
    private _endCard: EndCard;

    private _firstPurchase: boolean = true;

    constructor(){
        super(gameConfig.canvas)
        this._background = new Background();
        this._gameBoard = new Gameboard();
        this._foreground = new Foreground();
        this._cabinet = new Cabinet( this.play.bind(this) );
        this._revealAll = new RevealAll(() => this._gameBoard.revealAll());
        this._endCard = new EndCard();

        this.stage.addChild(this._background, this._revealAll, this._gameBoard, this._foreground, this._cabinet, this._revealAll, this._endCard);

        // handle resize - wait for frame so we resize after renderer
        window.addEventListener("resize", () => 
            requestAnimationFrame(() => {
                this.scaleContent(this.screen.width, this.screen.height);
            })
        );

        this.scaleContent(this.screen.width, this.screen.height);
    }

    /**
     * play the intro sequence
     */
    public async playIntro(): Promise<void>{
        await this._cabinet.setShown(true)
    }

    /**
     * call resize handler on game components 
     */
    public scaleContent(width: number, height: number): void{
        this._background.resize(width, height);
        this._gameBoard.resize(width, height);
        this._foreground.resize(width, height);
        this._cabinet.resize(width, height);
        this._revealAll.resize(width, height);
        this._endCard.resize(width, height);
    }

    /**
     * main game loop
     * plays through all scenarios in game model and then shows end game options
    */
    private async play(): Promise<void>{
        gameModel.setData(await requestTicketData(playerModel.requestPayload));

        await this._cabinet.setShown(false);
        this._revealAll.setShown(true);
        
        while( !gameModel.gameComplete ){
            await this._gameBoard.preconfigure( this._firstPurchase );
            this._revealAll.setEnabled(true);
            await this._gameBoard.play();
            await delay(1000);
            gameModel.onScenarioComplete();
            this._firstPurchase = false;
        }
        
        this._revealAll.setShown(false);
        
        const choice = await this._endCard.display(gameModel.totalWin);
        if ( choice === PlayerChoice.Play ) {
            this.play();
        } else {
            this._cabinet.setShown(true);
        }
    }
}