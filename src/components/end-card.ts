import { BitmapText, Container, IPointData, Point, Sprite } from "pixi.js";
import { ISizeRef } from "../types";
import { getTexture } from "../asset-loader";
import { sound } from "@pixi/sound";
import { gameConfig } from "../config";
import { asyncTween, formatCurrency } from "../utils";
import { playerModel } from "../playerModel";

export enum PlayerChoice {
    Play,
    ChangeStake
}

/**
 * The game board represents the playable surface of the game. It is responsible for controlling child components and telling the application when play has ended
 */
export class EndCard extends Container {
    private _onPos: IPointData;
    private _offPos: IPointData;
    private _isShown: boolean = false;

    private _btnPlay: Sprite;
    private _btnStake: Sprite;
    private _prizeText: BitmapText;

    private _resolveChoice: (value: PlayerChoice) => void

    private size: ISizeRef;
    
    constructor( ){
        super();

        const { size, backdropPos, playButtonPos, stakeButtonPos, prizeValueStyle, prizeValuePos, winMessagePos } = gameConfig.endCard;

        const backDrop = new Sprite(getTexture("panelEndMessage.png"));
        backDrop.anchor.set(0.5);
        backDrop.position.copyFrom(backdropPos);

        const winMessage = new Sprite(getTexture("winMessage.png"));
        winMessage.anchor.set(0.5);
        winMessage.position.copyFrom(winMessagePos);

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

        this._prizeText = new BitmapText("$10", prizeValueStyle);
        this._prizeText.anchor.set(0.5);
        this._prizeText.position.copyFrom(prizeValuePos)

        this.addChild(backDrop, this._btnPlay, this._btnStake, this._prizeText, winMessage);
        this.size = size;
    }

    public async displayWin( prize: number ): Promise<void>{
        this._prizeText.text = formatCurrency(prize, playerModel.currencySettings);

        await this.setShown(true);
    }

    public async awaitPlayerChoice(): Promise<PlayerChoice>{
        return new Promise((resolve) => {
            this._resolveChoice = resolve;
        });
    }

    public async setShown( mode: boolean ): Promise<void>{
        this._isShown = mode;

        const { showHideTweenProps } = gameConfig.endCard;

        const targetPos = this._isShown? this._onPos : this._offPos;
        await asyncTween(this, { x: targetPos.x, y: targetPos.y, ...showHideTweenProps });
    }

    public resize(width: number, height: number): void{
        const setScale = Math.min(
            width  / this.size.width,
            height / this.size.height
        )

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

    private _handleChoice( choice: PlayerChoice ): void{
        this._resolveChoice && this._resolveChoice(choice);
        sound.play("click");
        this.setShown(false);
    }
}