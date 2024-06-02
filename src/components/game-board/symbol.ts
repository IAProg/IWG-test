import { AnimatedSprite, Container, Point, Sprite } from "pixi.js";
import { gameConfig } from "../../config";
import { ticketModel } from "../../ticket-model";
import { asyncTween, delay } from "../../utils";
import { getAnimationFrames, getTexture } from "../../asset-loader";
import gsap from "gsap";
import { ISizeRef } from "../../types";


/**
 * The game board represents the playable surface of the game. It is responsible for controlling child components and telling the application when play has ended
 */
export class GameSymbol extends Container {

    private _chestAnim: AnimatedSprite;
    private _glow: Sprite;

    private size: ISizeRef;
    
    constructor( pos: Point ){
        super();

        this._chestAnim = new AnimatedSprite(getAnimationFrames("chest"));
        this._chestAnim.anchor.set(0.5);
        
        this.addChild(this._chestAnim);

        this.size = {
            width:  this.width,
            height: this.height
        }

        this.position.set(pos.x, pos.y);

        const teaseTween = gsap.fromTo(this, { rotation: -0.05 }, { rotation: +0.05, repeat: -1, yoyo: true, duration: 4, ease: "power1.inOut" } );
        teaseTween.progress( Math.random() );
    }

    public async preconfigure(): Promise<void>{
        //
    }

    public async setFade(isOn: boolean): Promise<void>{
        const newAlpha = isOn ? 1 : 0;
        return asyncTween(this, { duration: 1, alpha: newAlpha });
    }

    public async open(): Promise<number>{
        return
    }
}