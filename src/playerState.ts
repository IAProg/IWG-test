class PlayerState {
    private _stakeIndex: number = 0; 
    private _stakes: Array<number>;


    public async init(): Promise<void>{
        const response = await fetch("gameInfo.json");
        const gameInfo = await response.json();

        this._stakes = gameInfo.stakes;
    }

    public incrementStake(): void{
        this._stakeIndex = Math.min( this._stakeIndex + 1, this._stakes.length - 1 );
    }

    public decrementStake(): void{
        this._stakeIndex = Math.max( this._stakeIndex - 1, 0 );
    }

    public get currentStake(): number{
        return this._stakes[this._stakeIndex];
    }


}

export const playerstate = new PlayerState();