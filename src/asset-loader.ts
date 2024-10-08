import { Loader, Texture } from "pixi.js";
import { IAssetDefinition } from "./types";
import { sound } from "@pixi/sound";

/**
 * asset manifest, lists all assets to be loaded
 */
const assetManifest = [
    { name: "background.png", url: "textures/background.png"},
    { name: "logo.png", url: "textures/logo.png"},
    { name: "buttonCoverLight.png", url: "textures/buttonCoverLight.png"},
    { name: "buttonCoverDark.png", url: "textures/buttonCoverDark.png"},

    { name: "backgroundElements", url: "spritesheets/backgroundElements.json"},
    { name: "language", url: "spritesheets/language.json"},
    { name: "chest", url: "spritesheets/chest.json"},
    { name: "ui", url: "spritesheets/ui.json"},

    { name: "skranji-white-export", url: "fonts/skranji-white-export.xml"},
    { name: "worksans-orange-export", url: "fonts/worksans-orange-export.xml"},
    { name: "skranji-interface-export", url: "fonts/skranji-interface-export.xml"},
    { name: "skranji-white-interface-export", url: "fonts/skranji-white-interface-export.xml"},
    { name: "skranji-yellow-export", url: "fonts/skranji-yellow-export.xml"},

    { name: "chestOpen", url: "audio/SND_Chest_Open.{ogg, mp3}"},
    { name: "click", url: "audio/SND_Click.{ogg, mp3}"},
    { name: "endWin", url: "audio/SND_End_Game_Win.{ogg, mp3}"},
    { name: "endLose", url: "audio/SND_End_Game_Lose.{ogg, mp3}"},
    { name: "winReveal", url: "audio/SND_Win_Revealed.{ogg, mp3}"}
] as Array<IAssetDefinition>

/**
 * animation configs - with the correct texture packer set up this data could instead be pulled from sprite sheets 
 */
const animationConfigs = {
    chest: [
        "chest_animation0001.png",
        "chest_animation0002.png",
        "chest_animation0003.png",
        "chest_animation0004.png",
        "chest_animation0005.png",
        "chest_animation0006.png",
        "chest_animation0007.png",
        "chest_animation0008.png",
        "chest_animation0009.png",
        "chest_animation0010.png",
        "chest_animation0011.png",
        "chest_animation0012.png",
        "chest_animation0013.png",
        "chest_animation0014.png",
        "chest_animation0015.png",
        "chest_animation0016.png",
        "chest_animation0017.png",
        "chest_animation0018.png",
        "chest_animation0019.png",
        "chest_animation0020.png",
        "chest_animation0021.png",
        "chest_animation0022.png",
        "chest_animation0023.png",
        "chest_animation0024.png",
        "chest_animation0025.png",
        "chest_animation0026.png",
        "chest_animation0027.png",
        "chest_animation0028.png",
        "chest_animation0029.png",
        "chest_animation0030.png",
        "chest_animation0031.png",
        "chest_animation0032.png",
        "chest_animation0033.png",
        "chest_animation0034.png",
        "chest_animation0035.png"
    ]
} as { [key: string]: Array<string> | undefined };

/**
 * object to hold all known textures - this is necessary because the supplied assets mix animations with other textures
 */
const textureCache = {} as { [key: string]: Texture };

/**
 * A simple asset loader. Loading assets from a config allows for some changes to be made without touching the code
 */
export function loadAssets(): Promise<void>{
    const loader = Loader.shared;
    loader.baseUrl = "assets/";

    return new Promise((resolve) => {
        loader.add(assetManifest);

        loader.onLoad.add(( loader, resource ) => {
            // handle sprite sheet
            if ( resource.spritesheet?.textures ) {
                Object.assign( textureCache, resource.spritesheet?.textures );
            }
            // handle texture 
            else if ( resource.texture ) {
                textureCache[resource.name] = resource.texture;
            }
        } );

        loader.load(() => resolve());
    });
}
/**
 * A wrapper method used to access textures on the loader, if the requested texture does not exist an error is thrown
 */
export function getTexture(textureName: string): Texture{
    const texture = textureCache[textureName];
    if (texture){
        return texture;
    }
    throw `could not find texture ${textureName}`
}

/**
 * A wrapper method used to fetch frames for an animation 
 */
export function getAnimationFrames(animationName: string): Array<Texture>{

    const animConfig = animationConfigs[animationName];
    if ( animConfig ){
        return animConfig.map( ( frame ) => getTexture(frame) );
    }
    throw `could not find animation config ${animationName}`
}

/**
 * A wrapper method to play sounds
 */
export function playSound(soundName: string): void{
    sound.play(soundName)
}
