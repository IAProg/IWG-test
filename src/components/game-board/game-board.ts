import { BitmapText, Container, Sprite } from "pixi.js";
import { gameConfig } from "../../config";
import { asyncTween, delay, formatCurrency } from "../../utils";
import { getTexture } from "../../asset-loader";
import { GameSymbol } from "./symbol";
import { ISizeRef } from "../../types";
import gsap from "gsap";
import { ticketModel } from "../../ticket-model";
import { sound } from "@pixi/sound";
import { playerModel } from "../../playerModel";


/**
 * The game board represents the playable surface of the game. It is responsible for controlling child components and telling the application when play has ended
 */
export class Gameboard extends Container {

    private _backdrop: Sprite;
    private _waterRipple: Sprite;
    private _logo: Sprite;
    private _winUpTo: Sprite;
    private _maxPrizeText: BitmapText;

    private _symbols: Array<GameSymbol>;
    private _symbolPool: Array<number>;
    private _revealCount: number;

    private _playResolve: () => void;

    private size: ISizeRef;
    
    constructor(){
        super();

        const { logoPos, winUpToPos, maxPrizePos, maxPrizeStyle, symbolPositions, padding, ripple } = gameConfig.gameboard;

        this._waterRipple = new Sprite(getTexture("waterRipple.png"));
        this._waterRipple.anchor.set(0.5);
        this._waterRipple.position.copyFrom(ripple.pos);
        const rippleTL = gsap.timeline({ repeat: -1 });
        rippleTL.add(gsap.fromTo(this._waterRipple.scale, ripple.scaleFrom, ripple.scaleTo), 0);
        rippleTL.add(gsap.fromTo(this._waterRipple, ripple.alphaFrom, ripple.alphaTo), 3);

        this._backdrop = new Sprite(getTexture("islandMiddle.png"));
        this._backdrop.anchor.set(0.5);
        
        this._logo = new Sprite(getTexture("logo.png"));
        this._logo.anchor.set(0.5);
        this._logo.position.copyFrom(logoPos);

        this._winUpTo = new Sprite(getTexture("winUpTo.png"));
        this._winUpTo.anchor.set(0.5);
        this._winUpTo.position.copyFrom(winUpToPos);

        const maxWinString = formatCurrency( ticketModel.maxWin, playerModel.currencySettings );
        this._maxPrizeText = new BitmapText(maxWinString, maxPrizeStyle);
        this._maxPrizeText.anchor.set(0.5);
        this._maxPrizeText.position.copyFrom(maxPrizePos);

        this._symbols = [];
        symbolPositions.forEach( ( pos, i ) => {
            const gameSymbol = new GameSymbol( i, this.onSymbolPress.bind(this) );
            gameSymbol.position.copyFrom(pos);
            this._symbols[i] = gameSymbol;
        });

        this.addChild(this._waterRipple, this._backdrop, this._logo, this._winUpTo, this._maxPrizeText, ...this._symbols);

        this.size = {
            width:  padding * this._backdrop.width,
            height: padding * this._backdrop.height
        };
    }

    /**
     * configure the game board for a new round
     * @param isFirstPurchase - flag to show if this is the first game or not
     */
    public async preconfigure( isFirstPurchase: boolean ): Promise<void>{
        this._revealCount = 0;
        this._symbolPool = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        this._symbols.forEach( symbol => symbol.preconfigure(isFirstPurchase) );
    }

    /**
     * play through current scenario
     */
    public async play(): Promise<void>{
        await this.awaitAllOpened();
        await this.animateWinningSymbols();
    }

    /**
     * automatically reveal symbols until none remain
     */
    public async revealAll(): Promise<void>{
        if (this._symbolPool.length > 0 ) {
            this.revealRandom();
            gsap.delayedCall(gameConfig.gameboard.scratchAllDelay, this.revealAll.bind(this));
        }
    }

    /**
     * resize handler.
     * scales to fit the game stage
     * @param width - width of the game screen
     * @param height - width of the game screen
     */
    public resize(width: number, height: number): void{
        this.scale.set(Math.min(
            width  / this.size.width,
            height / this.size.height
        ));

        this.position.set(
            width * 0.50,
            height * 0.50
        )
    }

    /**
     * handle the reveal of one a selected symbol
     * plays animation and resolves play promise if game is completed
     * @param symbolIndex - index of pressed symbol
     */
    private async onSymbolPress( symbolIndex: number ): Promise<void>{
        this._symbolPool.splice(this._symbolPool.indexOf(symbolIndex), 1);
        const clickedSymbol = this._symbols[symbolIndex];

        const prizeIndex = ticketModel.currentScenario.prizeIndexes[symbolIndex]
        const symbolValue = ticketModel.prizeTable[prizeIndex];

        await clickedSymbol.reveal(symbolValue);
        
        this._revealCount++;
        if ( this._revealCount >= this._symbols.length ) {
            this._playResolve();
        }
    }

    /**
     * returns a promise which is resolved when all symbols have been revealed
     */
    private async awaitAllOpened(): Promise<void>{
        return new Promise((resolve) => {
            this._playResolve = resolve;
        });
    }

    /**
     * play glow animation on all winning symbols
     * returns a promise which resolves when glow animations complete
     */
    private async animateWinningSymbols(): Promise<void>{
        const endSound = ticketModel.currentScenario.winner ? "endWin" : "endLose";
        sound.play(endSound);

        const proms = [];
        for ( const winningIndex of ticketModel.currentScenario.winningIndexes ) {
            proms.push(this._symbols[winningIndex].showGlow());
        }
        await Promise.all(proms);
    }

    /**
     * reveal a random symbol in the pool
     */
    private async revealRandom(): Promise<void> {
        if (this._symbolPool.length > 0) {
            return this.onSymbolPress(this._symbolPool[Math.floor(Math.random() * this._symbolPool.length)]);
        }
    }
}