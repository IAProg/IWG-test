import { Container, Sprite } from "pixi.js";
import { gameConfig } from "../../config";
import { asyncTween, delay } from "../../utils";
import { getTexture } from "../../asset-loader";
import { GameSymbol } from "./symbol";
import { ISizeRef } from "../../types";
import gsap from "gsap";


/**
 * The game board represents the playable surface of the game. It is responsible for controlling child components and telling the application when play has ended
 */
export class Gameboard extends Container {

    private _backdrop: Sprite;
    private _waterRipple: Sprite;
    private _logo: Sprite;

    private _symbols: Array<GameSymbol>;

    private size: ISizeRef;
    
    constructor(){
        super();

        const { logoPos, symbolPositions, padding, ripple } = gameConfig.gameboard;

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

        this._symbols = symbolPositions.map( ( pos ) => new GameSymbol( pos ));

        this.addChild(this._waterRipple, this._backdrop, this._logo, ...this._symbols);

        this.size = {
            width:  padding * this._backdrop.width,
            height: padding * this._backdrop.height
        }

        this.alpha = 1;
    }

    public async preconfigure(): Promise<void>{
        //
    }

    public async setFade(isOn: boolean): Promise<void>{
        const newAlpha = isOn ? 1 : 0;
        return asyncTween(this, { duration: 1, alpha: newAlpha });
    }

    public async play(): Promise<number>{
        return
    }

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
}