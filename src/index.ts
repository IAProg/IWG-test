import { loadAssets } from "./asset-loader";
import { IWGApp } from "./components/application";

// a very simple loading process - the assets are loaded before the game 
loadAssets().then(() => {
    const app = new IWGApp();
    document.body.appendChild(app.view);
});
