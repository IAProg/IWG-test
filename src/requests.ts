import { ITicketResponse } from "./types";
/**
 * A simple API call to demonstrate asynchronous calls. The response is formatted with a custom type and returned.
 */
export async function requestTicktData(): Promise<ITicketResponse>{
    const response = await fetch("gameInfo.json");
    const data: ITicketResponse = await response.json(); 
    if ( response.status === 200 ){
        return data;
    }
    throw data;
}
