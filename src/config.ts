import { IApplicationOptions, IBitmapTextStyle, ITextStyle, Point } from "pixi.js";
import { IButtonTextureConfig } from "./types";

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
        logoPos: { x: 0, y: -150 },
        symbolPositions: [
            { x: -375,   y: 0   },
            { x: -175,   y: 0   },
            { x: +10,    y: 0   },
            { x: +200,   y: 0   },
            { x: -375,   y: 150 },
            { x: -175,   y: 150 },
            { x: +10,    y: 150 },
            { x: +200,   y: 150 },
            { x: +400,   y: 150 }
        ] as Array<Point>
    },
    cabinet: {
        size: {
            width: 500,
            height: 842
        },
        showHideTweenProps: {
            duration: 2
        },
        plusButton:{
            pos: {
                x: +100,
                y: 25
            },
            textureConfig: {
                base: "plus.png",
                enabled: "plusHighlight.png",
                disabled: "plusShadow.png"
            } as IButtonTextureConfig
        },
        minusButton: {
            pos: {
                x: -100,
                y: 25
            },
            textureConfig: {
                base: "minus.png",
                enabled: "minusHighlight.png",
                disabled: "minusShadow.png"
            } as IButtonTextureConfig
        },
        playPos: {
            x: 0,
            y: 175
        },
        stakeTextStyle: {
            fontName: "worksans-orange-export",
            align: "center"
        } as Partial<IBitmapTextStyle>,
        staketextPos:{
            x: 0,
            y: -50
        },
        topPanelY: -365,
        botPanelY: 175,
        setBetY: -180
    }
}

