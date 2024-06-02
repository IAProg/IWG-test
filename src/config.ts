import { IApplicationOptions } from "pixi.js";

/**
 * A game config allows for components of the game to be fine tuned from a single location with no changes need in the code structure
 * An attempt has been made throughout the code to emulate how I think components are positioned at Roxor.
 */
export const gameConfig = {
    canvas:{
        width: 2040,
        height: 1280,
        antialiasing: true,
        autoDensity: true,
        resolution: 2

    } as IApplicationOptions,
    gameboard:{
        padding: 1.00,
        textPos:     { x: 0.00, y: -475.00 },
        discPos:     { x: 0.00, y:   25.00 },
        selectorPos: { x: 0.00, y:  300.00 }
    },
}

