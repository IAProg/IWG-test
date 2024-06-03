import { loadAssets } from "./asset-loader";
import { IWGApp } from "./components/application";
import { playerModel } from "./playerModel";
import { requestTicketData } from "./requests";

// a very simple loading process - the assets are loaded before the game 
loadAssets()
.then(() => requestTicketData())
.then((data) => playerModel.init(data))
.then(() => {
    const app = new IWGApp();
    document.body.appendChild(app.view);
    app.playIntro();
});
