import { loadAssets } from "./asset-loader";
import { IWGApp } from "./application";
import { playerModel } from "./player-model";
import { recoverTicketData } from "./requests";
import { gameModel } from "./game-model";

// a very simple loading process - the assets are loaded before the game 
loadAssets()
.then(() => recoverTicketData())
.then((data) => {
    playerModel.init(data);
    gameModel.setData(data);
})
.then(() => {
    const app = new IWGApp();
    document.body.appendChild(app.view);
    app.playIntro();
});
