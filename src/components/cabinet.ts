import { BitmapText, Container, IPointData, Point, Sprite } from "pixi.js";
import { getTexture } from "../asset-loader";
import { gameConfig } from "../config";
import { asyncTween, formatCurrency } from "../utils";
import { ISizeRef } from "../types";
import { Button } from "./button";
import { playerModel } from "../playerModel";
import { Sound, sound } from "@pixi/sound";

/**
 * The game board represents the playable surface of the game. It is responsible for controlling child components and telling the application when play has ended
 */
export class Cabinet extends Container {
    private _onPos: IPointData;
    private _offPos: IPointData;
    private _isShown: boolean = true;

    private _stakeText: BitmapText;
    private _btnPlus: Button;
    private _btnMinus: Button;
    private _btnPlay: Sprite;

    private size: ISizeRef;
    
    constructor( playCallback: () => void ){
        super();

        const { size, topPanelY, botPanelY, setBetY, plusButton, minusButton, stakeTextStyle, staketextPos, playPos} = gameConfig.cabinet;

        const panelTop = new Sprite(getTexture("panelVS1.png"));
        panelTop.anchor.set(0.5);
        panelTop.y = topPanelY;

        const panelMid = new Sprite(getTexture("panelVS2.png"));
        panelMid.anchor.set(0.5);

        const panelBottom = new Sprite(getTexture("panelVS3.png"));
        panelBottom.anchor.set(0.5);
        panelBottom.y += botPanelY;

        const setBet = new Sprite(getTexture("chooseBet.png"))
        setBet.anchor.set(0.5)
        setBet.y = setBetY;

        this._btnPlus = new Button( plusButton.textureConfig , () => { 
            playerModel.incrementStake();
            this.updateStakeDisplay();
            sound.play("click");
        } );
        this._btnPlus.position.copyFrom(plusButton.pos);

        this._btnMinus = new Button( minusButton.textureConfig , () => { 
            playerModel.decrementStake();
            this.updateStakeDisplay();
            sound.play("click");
        } );
        this._btnMinus.position.copyFrom(minusButton.pos);

        this._stakeText = new BitmapText("", stakeTextStyle);
        this._stakeText.anchor.set(0.5);
        this._stakeText.position.copyFrom(staketextPos);

        this._btnPlay = new Sprite(getTexture("playButton.png"));
        this._btnPlay.anchor.set(0.5);
        this._btnPlay.position.copyFrom(playPos);
        this._btnPlay.interactive = true;
        this._btnPlay.on("pointerdown", () => {
            sound.play("click");
            playCallback();
        });

        this.addChild(panelTop, panelMid, panelBottom, setBet, this._btnPlus, this._btnMinus, this._stakeText, this._btnPlay);

        this.size = size;

        this.updateStakeDisplay();
    }

    /**
     * show or hide component by tweening to position
     * @param mode - flag for show or hide
     */
    public async setShown( mode: boolean ): Promise<void>{
        this._isShown = mode;

        const { showHideTweenProps } = gameConfig.cabinet;

        const targetPos = this._isShown? this._onPos : this._offPos;
        await asyncTween(this, { x: targetPos.x, y: targetPos.y, ...showHideTweenProps });
    }

    /**
     * resize handler.
     * scales to fit the games tage
     * @param width - width of the game screen
     * @param height - width of the game screen
     */
    public resize(width: number, height: number): void{
        const setScale = Math.min(
            width  / this.size.width,
            height / this.size.height
        );
        this.scale.set(setScale);

        const calculatedWidth = this.size.width * setScale

        const xPort = width * 0.5;
        const xLand = calculatedWidth * 0.50;
        const xPos = width > height ? xLand : xPort;

        this._onPos = new Point(
            xPos,
            +height * 0.50 
        );

        this._offPos = new Point(
            xPos,
            -height * 0.50 
        );

        this.position.copyFrom( this._isShown ? this._onPos : this._offPos );
    }

    /**
     * update stake control elements to reflect current stake 
     */
    private updateStakeDisplay(): void{
        this._stakeText.text = formatCurrency(playerModel.currentStake, playerModel.currencySettings);
        this._btnMinus.setEnabled(!playerModel.isMinStake);
        this._btnPlus.setEnabled(!playerModel.isMaxStake);
    }
}