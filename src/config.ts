import { IApplicationOptions, IBitmapTextStyle, Point } from "pixi.js";
import { IButtonTextureConfig } from "./types";

/**
 * A game config allows for components of the game to be fine tuned from a single location with no changes need in the code structure
 */
export const gameConfig = {
    canvas:{
        width: 1020,
        height: 640,
        antialiasing: true,
        autoDensity: true,
        resolution: 2,
        resizeTo: window

    } as IApplicationOptions,
    gameboard:{
        padding: 1.00,
        scratchAllDelay: 0.5,
        logoPos: { x: 0, y: -215 },
        winUpToPos: { x: 0, y: -125 },
        maxPrizePos: { x: 0, y: -100 },
        maxPrizeStyle: {
            fontSize: 38,
            fontName: "skranji-interface-export",
            align: "center"
        } as Partial<IBitmapTextStyle>,
        ripple: {
            pos: { x: 0, y: 130 },
            scaleFrom: { x: 0.8, y: 0.8 },
            scaleTo: { x: 1.5, y: 1.5, duration: 4 },
            alphaFrom: { alpha: 1 },
            alphaTo: { alpha: 0, duration: 1 },
        },
        symbolPositions: [
            { x: -375,   y: 0   },
            { x: -175,   y: 0   },
            { x: +10,    y: 10  },
            { x: +200,   y: 0   },
            { x: -375,   y: 150 },
            { x: -175,   y: 150 },
            { x: +10,    y: 160 },
            { x: +200,   y: 150 },
            { x: +380,   y: 130 }
        ] as Array<Point>
    },
    symbol:{
        glowPos:{
            x: 0,
            y: -24
        },
        prizeValue:{
            style: {
                align: "center",
                fontSize: 30
            } as Partial<IBitmapTextStyle>,
            winFont: "skranji-yellow-export" ,
            defaultFont: "skranji-white-export",
            pos: {
                x: 0,
                y: -45
            }
        }
    },
    cabinet: {
        size: {
            width: 400,
            height: 842
        },
        showHideTweenProps: {
            duration: 1
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
        topPanelPos: {
            x: 0,
            y: -365
        },
        botPanelPos: {
            x: 0,
            y: 175
        },
        setBetPos: {
            x: 0,
            y: -180
        }
    },
    revealAll: {
        size: {
            width: 400,
            height: 842
        },
        showHideTweenProps: {
            duration: 1
        },
        backdropPos:{
            x: 0,
            y: -400
        },
        revealAllbutton:{
            pos: {
                x: -5,
                y: -228
            },
            textureConfig: {
                base: "revealAllButton.png",
                enabled: "revealAllLight.png",
                disabled: "revealAllDark.png"
            } as IButtonTextureConfig
        },
    },
    endCard: {
        size: {
            width: 400,
            height: 842
        },
        showHideTweenProps: {
            duration: 1
        },
        backdropPos:{
            x: 0,
            y: -400
        },
        playButtonPos:{
            x: -125,
            y: -190
        },
        stakeButtonPos:{
            x: +125,
            y: -190
        },
        prizeValue:{
            pos: {
                x: 0,
                y: -267
            },
            style: {
                fontName: "worksans-orange-export",
                align: "center"
            } as Partial<IBitmapTextStyle>,
        },
        winMessagePos:{
            x: 0,
            y: -240
        }
    },
    foreground: {
        treeSpacing: 600,
        treeTween: { rotation: +0.05, repeat: -1, yoyo: true, duration: 5, ease: "power1.inOut" },
        size: {
            width: 1000,
            height: 200
        }
    }
}

