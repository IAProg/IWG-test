import { ICurrencySettings, IPlayerRequestPayload, ITicketResponse } from "./types";

/**
 * Stores and formats player data recieved from a game server to the client. 
 * Handles stake and currency settings
 */
class PlayerModel {
    private _stakeIndex: number = 0; 
    private _stakes: Array<number>;
    private _currencySettings: ICurrencySettings;

    /**
     * process and store response from server
     * @param data - response data from server
     */
    public init( data: ITicketResponse ): void{
        this._currencySettings = {
            currency: data.currency,
            locale: data.localle
        };
        this._stakes = data.stakes;
    }

    public incrementStake(): void{
        this._stakeIndex = Math.min( this._stakeIndex + 1, this._stakes.length - 1 );
    }

    public decrementStake(): void{
        this._stakeIndex = Math.max( this._stakeIndex - 1, 0 );
    }

    public get requestPayload(): IPlayerRequestPayload{
        return {
            stake: this.currentStake
        } as IPlayerRequestPayload
    }

    public get currencySettings(): ICurrencySettings{
        return this._currencySettings;
    }

    public get currentStake(): number{
        return this._stakes[this._stakeIndex];
    }

    public get isMaxStake(): boolean{
        return this._stakeIndex === this._stakes.length - 1;
    }

    public get isMinStake(): boolean{
        return this._stakeIndex === 0;
    }


}

export const playerModel = new PlayerModel();