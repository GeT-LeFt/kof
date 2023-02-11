import { GameMap } from "/static/js/game_map/base.js";
import { Kyo } from "/static/js/player/kyo.js";

class KOF {
    constructor(id) {
        this.$kof = $("#" + id);
        this.game_map = new GameMap(this);
        this.players = [
            new Kyo(this, {
                id: 0,
                x: 212,
                y: 0,
                width: 50,
                height: 130,
                color: "blue",
            }),
            new Kyo(this, {
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
