import { IScenarioData, ITicketResponse } from "./types";

/**
 * Stores and formats game data recieved from a game server to the client. 
 */
class GameModel{
    private _scenarios: Array<IScenarioData> = [];
    private _prizeTable: Array<number>;
    private _totalWin: number = 0;
    private _maxWin: number;


    /**
     * shift the current scenario out
     * called when game has displayed screnario
     */
    public onScenarioComplete(): void{
        this._scenarios.shift();
    }

    public get gameComplete(): boolean{
        return this._scenarios.length === 0;
    }

    public get prizeTable(): Array<number>{
        return this._prizeTable;
    }

    public get currentScenario(): IScenarioData{
        return this._scenarios[0]
    }

    public get winningIndexes(): Array<number>{
        return this._scenarios[0].winningIndexes;
    }

    public get totalWin(): number{
        return this._totalWin;
    }

    public get maxWin(): number{
        return this._maxWin;
    }

    /**
     * process and store response from server
     * @param responseData - response data from server
     */
    public setData(responseData: ITicketResponse): void{
        this._scenarios = responseData.scenarioData;
        this._prizeTable = responseData.prizeTable;
        this._maxWin = responseData.maxWin;

        // calculate total win of all scenarios provided
        // assumes only one win per prize value is possible
        this._totalWin = 0;
        for( const scenario of this._scenarios ) {
            const scenarioPrizes: Array<boolean> = [];
            for( const index of scenario.winningIndexes ) {
                const prizeIndex = scenario.prizeIndexes[index];
                const prizevalue = this._prizeTable[prizeIndex];
                if ( scenarioPrizes[prizevalue] === undefined ) {
                    scenarioPrizes[prizevalue] = true;
                    this._totalWin += prizevalue;
                }
                
            }
        }
    }

}

export const gameModel = new GameModel();