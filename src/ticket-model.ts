import { IScenarioData, ITicketResponse } from "./types";

/**
 * Stores and formats game data recieved from a game server to the client. 
 */
class TicketModel{
    private _scenarios: Array<IScenarioData> = [];
    private _prizeTable: Array<number>;

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


    public setData(responseData: ITicketResponse): void{
        this._scenarios = responseData.scenarioData;
        this._prizeTable = responseData.prizeTable;
    }
}

export const ticketModel = new TicketModel();