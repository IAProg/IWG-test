import { Container, IPointData, Point, Sprite } from "pixi.js";
import { ISizeRef } from "../types";
import { getTexture } from "../asset-loader";
import { sound } from "@pixi/sound";
import { gameConfig } from "../config";
import { asyncTween } from "../utils";


/**
 * The game board represents the playable surface of the game. It is responsible for controlling child components and telling the application when play has ended
 */
export class RevealAll extends Container {
    private _onPos: IPointData;
    private _offPos: IPointData;
    private _isShown: boolean = false;

    private _btnRevealAll: Sprite;

    private size: ISizeRef;
    
    constructor( revealAllCallback: () => void ){
        super();

        const { size, backdropPos, revealAllButtonPos } = gameConfig.revealAll;

        const backDrop = new Sprite(getTexture("panelRevealAll.png"));
        backDrop.anchor.set(0.5);
        backDrop.position.copyFrom(backdropPos);

        this._btnRevealAll = new Sprite(getTexture("revealAllButton.png"));
        this._btnRevealAll.anchor.set(0.5);
        this._btnRevealAll.interactive = true;
        this._btnRevealAll.position.copyFrom(revealAllButtonPos);
        this._btnRevealAll.on("pointerdown", () => {
            this._btnRevealAll.interactive = false;
            sound.play("click");
            revealAllCallback();
        });

        this.addChild(backDrop, this._btnRevealAll);
        this.size = size;
    }

    public setEnabled( mode: boolean ){
        this._btnRevealAll.interactive = mode;
    }

    public async setShown( mode: boolean ): Promise<void>{
        this._isShown = mode;

        const { showHideTweenProps } = gameConfig.revealAll;
        const targetPos = this._isShown? this._onPos : this._offPos;
        await asyncTween(this, { x: targetPos.x, y: targetPos.y, ...showHideTweenProps });
    }

    public resize(width: number, height: number): void{
        const setScale = Math.min(
            width  / this.size.width,
            height / this.size.height
        )

        this.scale.set(setScale);

        const calculatedWidth = this.size.width * setScale
        this._onPos = new Point(
            calculatedWidth * 0.50,
            +height * 0.50 
        );

        this._offPos = new Point(
            calculatedWidth * 0.50,
            -height * 0.50 
        );

        this.position.copyFrom( this._isShown ? this._onPos : this._offPos );
    }
}