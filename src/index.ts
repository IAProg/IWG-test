import { loadAssets } from "./asset-loader";
import { IWGApp } from "./components/application";
import { playerstate } from "./playerState";

// a very simple loading process - the assets are loaded before the game 
loadAssets()
.then(() => playerstate.init())
.then(() => {
    const app = new IWGApp();
    document.body.appendChild(app.view);
    app.playIntro();
});
