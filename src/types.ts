export interface IAssetDefinition {
    name: string;
    url: string;
}

export interface ISizeRef {
    width: number;
    height: number;
}

export interface IResponseData {
    colours: Array<number>;
}

export interface IButtonTextureConfig{
    base: string
    enabled: string
    disabled: string
}

export interface ICurrencySettings{
    currency: string
    locale: Intl.LocalesArgument
}

export interface IScenarioData{
    winner: true,
    prizeIndexes: Array<number>,
    winningIndexes: Array<number>
}

export interface ITicketResponse{
    gameId: string,
	currency: string,
    localle: string,
    maxWin: number,
	stakes: Array<number>,
	prizeTable: Array<number>,
	scenarioData: Array<IScenarioData>
}

export interface IPlayerRequestPayload{
    stake: number
}