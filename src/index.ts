import { loadAssets } from "./asset-loader";
import { IWGApp } from "./application";
import { playerModel } from "./player-model";
import { recoverTicketData } from "./requests";
import { gameModel } from "./game-model";

/**
 * basic loading system
 * Load assets, recover data, then launch the game
 */
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
