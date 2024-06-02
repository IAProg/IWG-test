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

export interface IPlayerStateConfig{
    currency: string
    stakes: Array<number>
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