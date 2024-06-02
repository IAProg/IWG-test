import { Container, Sprite } from "pixi.js";
import { gameConfig } from "../../config";
import { ticketModel } from "../../ticket-model";
import { asyncTween, delay } from "../../utils";
import { getTexture } from "../../asset-loader";
import { GameSymbol } from "./symbol";


/**
 * The game board represents the playable surface of the game. It is responsible for controlling child components and telling the application when play has ended
 */
export class Gameboard extends Container {

    private _backdrop: Sprite;
    private _logo: Sprite;

    private _symbols: Array<GameSymbol>;

    private size: {
        width: number,
        height: number
    };
    
    constructor(){
        super();

        const { logoPos, symbolPositions, padding } = gameConfig.gameboard;

        this._backdrop = new Sprite(getTexture("islandMiddle.png"));
        this._backdrop.anchor.set(0.5);
        
        this._logo = new Sprite(getTexture("logo.png"));
        this._logo.anchor.set(0.5);
        this._logo.position.set(logoPos.x, logoPos.y);

        this._symbols = symbolPositions.map( ( pos ) => new GameSymbol( pos ));

        this.addChild(this._backdrop, this._logo, ...this._symbols);

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