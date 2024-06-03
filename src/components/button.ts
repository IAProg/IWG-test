import { BLEND_MODES, Container, Sprite, Texture } from "pixi.js";
import { getTexture, playSound } from "../asset-loader";
import { IButtonTextureConfig, ISizeRef } from "../types";


/**
 * A simple button handler class - toggles between off and on textures depending on state 
 */
export class Button extends Container {
    private _baseSprite: Sprite;
    private _enabledCover: Sprite;
    private _disabledCover: Sprite;
    
    constructor( texConfig: IButtonTextureConfig, callback: () => void, initEnabled: boolean = true ){
        super(  );
        this.interactive = initEnabled;

        this._baseSprite = new Sprite(getTexture(texConfig.base));
        this._baseSprite.anchor.set(0.5);

        this._enabledCover = new Sprite(getTexture(texConfig.enabled));
        this._enabledCover.anchor.set(0.5);
        this._enabledCover.blendMode = BLEND_MODES.MULTIPLY;
        this._enabledCover.alpha = 0.50;

        this._disabledCover = new Sprite(getTexture(texConfig.disabled));
        this._disabledCover.anchor.set(0.5);
        this._disabledCover.blendMode = BLEND_MODES.MULTIPLY;
        this._disabledCover.alpha = 0.50;
        
        this.addChild(this._baseSprite, this._enabledCover, this._disabledCover );

        this.setEnabled(initEnabled);

        this.on("pointerdown", () => {
            callback();
        } );
    }

    /**
     * set the state of the button
     * @param isEnabled - flag to set symbol to enabled or disabled state
     */
    public setEnabled( isEnabled: boolean ): void{
        this.interactive = isEnabled;
        this._enabledCover.visible = isEnabled;
        this._disabledCover.visible = !isEnabled;
    }
}