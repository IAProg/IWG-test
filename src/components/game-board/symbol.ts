import { AnimatedSprite, BitmapText, Container, Point, Sprite, TextStyle } from "pixi.js";
import { gameConfig } from "../../config";
import { ticketModel } from "../../ticket-model";
import { asyncTween, delay, formatCurrency } from "../../utils";
import { getAnimationFrames, getTexture } from "../../asset-loader";
import gsap from "gsap";
import { ISizeRef } from "../../types";

export type SymbolClickCallback = (index: number) => Promise<void>;

/**
 * The game board represents the playable surface of the game. It is responsible for controlling child components and telling the application when play has ended
 */
export class GameSymbol extends Container {
    public readonly id: number;

    private _chestAnim: AnimatedSprite;
    private _glow: Sprite;
    private _prizeValue: BitmapText;
    
    
    constructor( id: number, onClickCallback: SymbolClickCallback ){
        super();
        this.id = id;

        const { glowPos, prizeValueStyle, prizevaluePos} = gameConfig.symbol;

        this._chestAnim = new AnimatedSprite(getAnimationFrames("chest"));
        this._chestAnim.anchor.set(0.5);
        this._chestAnim.loop = false;

        this._glow = new Sprite(getTexture("chestGlow.png"));
        this._glow.anchor.set(0.5);
        this._glow.position.copyFrom(glowPos);
        this._glow.alpha = 0;

        this._prizeValue = new BitmapText("", prizeValueStyle);
        this._prizeValue.anchor.set(0.5);
        this._prizeValue.position.copyFrom(prizevaluePos)

        this.addChild(this._chestAnim, this._glow, this._prizeValue);

        this.on("pointerdown", () => onClickCallback(this.id) );

        const teaseTween = gsap.fromTo(this, { rotation: -0.05 }, { rotation: +0.05, repeat: -1, yoyo: true, duration: 4, ease: "power1.inOut" } );
        teaseTween.progress( Math.random() );
    }

    public async preconfigure(): Promise<void>{
        this._prizeValue.alpha = 0;
    }

    public async setFade(isOn: boolean): Promise<void>{
        const newAlpha = isOn ? 1 : 0;
        return asyncTween(this, { duration: 1, alpha: newAlpha });
    }

    public async reveal(): Promise<void>{
        await this.playPromise();

        this._prizeValue.text = formatCurrency( 10 );

        await Promise.all([
            asyncTween(this._glow, { alpha: 1 }),
            asyncTween(this._prizeValue, { alpha: 1 })
        ])
        await delay(250);
        await asyncTween(this._glow, { alpha: 0 });
    }

    private playPromise(): Promise<void>{
        return new Promise( resolve => {
            this._chestAnim.onComplete = resolve;
            this._chestAnim.gotoAndPlay(0);
        })
    }
}