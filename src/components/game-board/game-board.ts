import { Container, Sprite } from "pixi.js";
import { gameConfig } from "../../config";
import { ticketModel } from "../../ticket-model";
import { asyncTween, delay } from "../../utils";
import { getTexture } from "../../asset-loader";


/**
 * The game board represents the playable surface of the game. It is responsible for controlling child components and telling the application when play has ended
 */
export class Gameboard extends Container {

    private _backdrop: Sprite;

    private size: {
        width: number,
        height: number
    };
    
    constructor(){
        super();

        this._backdrop = new Sprite(getTexture("islandMiddle.png"));
        this._backdrop.anchor.set(0.5);

        const { selectorPos, textPos, discPos, padding } = gameConfig.gameboard;

        this.addChild(this._backdrop);

        this.size = {
            width:  padding * this.width,
            height: padding * this.height
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