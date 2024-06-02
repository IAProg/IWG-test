import { Container, Sprite } from "pixi.js";
import { getTexture } from "../asset-loader";
import { ISizeRef } from "../types";
import { gameConfig } from "../config";
import gsap from "gsap";

/**
 * A simple background - this is used to fill the space behind the foreground components.
 */

export class Foreground extends Container {
    private _palmL: Sprite;
    private _palmR: Sprite;
    private size: ISizeRef;
    
    constructor(){
        super();

        const { treeSpacing, treeTween } = gameConfig.foreground;

        this._palmL = new Sprite(getTexture("palmL.png"));
        this._palmL.anchor.set(0.5);
        this._palmL.x = -treeSpacing;

        this._palmR = new Sprite(getTexture("palmR.png"));
        this._palmR.anchor.set(0.5);
        this._palmR.x = +treeSpacing;

        this.addChild(this._palmL, this._palmR);

        this.size = {
            width: this.width,
            height: this.height
        }

        gsap.to(this._palmL, treeTween ).progress(Math.random());
        gsap.to(this._palmR, treeTween ).progress(Math.random());
    }

    public resize(width: number, height: number): void{
        this.scale.set(Math.max(
            width  / this.size.width,
            height / this.size.height
        ));

        this.position.set(
            width * 0.50,
            height * 0.50
        );
    }
}