import { loadAssets } from "./asset-loader";
import { IWGApp } from "./components/application";
import { playerModel } from "./playerModel";
import { recoverTicketData } from "./requests";

// a very simple loading process - the assets are loaded before the game 
loadAssets()
.then(() => recoverTicketData())
.then((data) => playerModel.init(data))
.then(() => {
    const app = new IWGApp();
    document.body.appendChild(app.view);
    app.playIntro();
});
