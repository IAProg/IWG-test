import { IPlayerRequestPayload, ITicketResponse } from "./types";
/**
 * An API call to request a game ticket
 * player payload would be used to send the players state (e.g stake) which could be used in generating a response
 */
export async function requestTicketData( playerPayload: IPlayerRequestPayload ): Promise<ITicketResponse>{
    const response = await fetch("gameInfo.json");
    const data: ITicketResponse = await response.json(); 
    if ( response.status === 200 ){
        return data;
    }
    throw data;
}

/**
 * Attempt to recover a previous game 
 * Server would provide an in-play, or finished previous game
 * Here we assume the previous game finished and use the response for configuration 
 */
export async function recoverTicketData(): Promise<ITicketResponse>{
    const response = await fetch("gameInfo.json");
    const data: ITicketResponse = await response.json(); 
    if ( response.status === 200 ){
        return data;
    }
    throw data;
}

