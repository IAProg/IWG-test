import { Application } from "pixi.js";
import { gameConfig } from "../config";
import { Background } from "./background";
import { Gameboard } from "./game-board";
import { Cabinet } from "./cabinet";
import { Foreground } from "./foreground";
import { requestTicketData } from "../requests";
import { ticketModel } from "../ticket-model";
import { delay } from "../utils";
import { RevealAll } from "./reveal-all";
import { EndCard, PlayerChoice } from "./end-card";
import { playerModel } from "../playerModel";

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

        window.addEventListener("resize", () => {
            this.scaleContent(this.screen.width, this.screen.height);
        });

        this.scaleContent(this.screen.width, this.screen.height);
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
        this._foreground.resize(width, height);
        this._cabinet.resize(width, height);
        this._revealAll.resize(width, height);
        this._endCard.resize(width, height);
    }

    // the main gameloop
    private async play(): Promise<void>{
        ticketModel.setData(await requestTicketData(playerModel.requestPayload));

        await this._cabinet.setShown(false);
        this._revealAll.setShown(true);
        
        while( !ticketModel.gameComplete ){
            await this._gameBoard.preconfigure( this._firstPurchase );
            this._revealAll.setEnabled(true);
            await this._gameBoard.play();
            await delay(1000);
            ticketModel.onScenarioComplete();
            this._firstPurchase = false;
        }
        
        this._revealAll.setShown(false);
        
        const choice = await this._endCard.display(ticketModel.totalWin);
        if ( choice === PlayerChoice.Play ) {
            this.play();
        } else {
            this._cabinet.setShown(true);
        }
    }
}