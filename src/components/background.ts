import { Container, Sprite } from "pixi.js";
import { getTexture } from "../asset-loader";
import { ISizeRef } from "../types";

/**
 * A simple background - this is used to fill the space behind the foreground components.
 */

export class Background extends Container {
    private _sprite: Sprite;
    private size: ISizeRef;
    
    constructor(){
        super();
        this._sprite = new Sprite(getTexture("background.png"));
        this._sprite.anchor.set(0.50);
        this.addChild(this._sprite);

        this.size = {
            width: this.width,
            height: this.height
        };
    }

    /**
     * resize handler
     * scales to fill the game stage
     * @param width - width of the game screen
     * @param height - width of the game screen
     */
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