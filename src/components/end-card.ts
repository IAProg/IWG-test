import { BitmapText, Container, IPointData, Point, Sprite } from "pixi.js";
import { ISizeRef } from "../types";
import { getTexture } from "../asset-loader";
import { sound } from "@pixi/sound";
import { gameConfig } from "../config";
import { asyncTween, formatCurrency } from "../utils";
import { playerModel } from "../player-model";

export enum PlayerChoice {
    Play,
    ChangeStake
}

/**
 * The end card container
 * Displays the total prize won for a purchase and player options (play again & change stake)
 */
export class EndCard extends Container {
    private _onPos: IPointData;
    private _offPos: IPointData;
    private _isShown: boolean = false;

    private _backDrop: Sprite;
    private _winMessage: Sprite;
    private _btnPlay: Sprite;
    private _btnStake: Sprite;
    private _prizeText: BitmapText;

    private _resolveChoice: (value: PlayerChoice) => void;

    private size: ISizeRef;
    
    constructor( ){
        super();
        const { size, backdropPos, playButtonPos, stakeButtonPos, prizeValue, winMessagePos } = gameConfig.endCard;

        this._backDrop = new Sprite(getTexture("panelEndMessage.png"));
        this._backDrop.anchor.set(0.5);
        this._backDrop.position.copyFrom(backdropPos);

        this._winMessage = new Sprite(getTexture("winMessage.png"));
        this._winMessage.anchor.set(0.5);
        this._winMessage.position.copyFrom(winMessagePos);

        this._btnPlay = new Sprite(getTexture("playButton.png"));
        this._btnPlay.anchor.set(0.5);
        this._btnPlay.interactive = true;
        this._btnPlay.position.copyFrom(playButtonPos);
        this._btnPlay.on("pointerdown", () => this._handleChoice(PlayerChoice.Play) );

        this._btnStake = new Sprite(getTexture("changeBetButton.png"));
        this._btnStake.anchor.set(0.5);
        this._btnStake.interactive = true;
        this._btnStake.position.copyFrom(stakeButtonPos);
        this._btnStake.on("pointerdown", () => this._handleChoice(PlayerChoice.ChangeStake) );

        this._prizeText = new BitmapText("$10", prizeValue.style);
        this._prizeText.anchor.set(0.5);
        this._prizeText.position.copyFrom(prizeValue.pos);

        this.addChild(this._backDrop, this._btnPlay, this._btnStake, this._prizeText, this._winMessage);
        this.size = size;
    }

    public async display( prize: number ): Promise<PlayerChoice>{
        this._prizeText.text = formatCurrency(prize, playerModel.currencySettings);

        await this.setShown(true);
        return this._awaitPlayerChoice();
    }

    /**
     * show or hide component by tweening to position
     * @param mode - flag for show or hide
     */
    public async setShown( mode: boolean ): Promise<void>{
        this._isShown = mode;

        const { showHideTweenProps } = gameConfig.endCard;

        const targetPos = this._isShown? this._onPos : this._offPos;
        await asyncTween(this, { x: targetPos.x, y: targetPos.y, ...showHideTweenProps });
    }

    /**
     * resize handler.
     * scales to fit the game stage
     * @param width - width of the game screen
     * @param height - width of the game screen
     */
    public resize(width: number, height: number): void{
        const setScale = Math.min(
            width  / this.size.width,
            height / this.size.height
        );
        this.scale.set(setScale);

        this._onPos = new Point(
            width * 0.50,
            +height * 0.50 
        );

        this._offPos = new Point(
            width * 0.50,
            -height * 0.50 
        );

        this.position.copyFrom( this._isShown ? this._onPos : this._offPos );
    }

    /**
     * resolve choice promise with provided value
     */
    private _handleChoice( choice: PlayerChoice ): void{
        this._resolveChoice && this._resolveChoice(choice);
        this.setShown(false);
        sound.play("click");
    }

    private async _awaitPlayerChoice(): Promise<PlayerChoice>{
        return new Promise((resolve) => {
            this._resolveChoice = resolve;
        });
    }
}