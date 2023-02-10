import { GameMap } from "/static/js/game_map/base.js";
import { Player } from "/static/js/player/base.js";

class KOF {
    constructor(id) {
        this.$kof = $("#" + id);
        this.game_map = new GameMap(this);
        this.players = [
            new Player(this, {
                id: 0,
                x: 212,
                y: 0,
                width: 50,
                height: 130,
                color: "blue",
            }),
            new Player(this, {
                id: 1,
                x: 500,
                y: 0,
                width: 50,
                height: 130,
                color: "red",
            }),
        ];
    }
}

export { KOF };
