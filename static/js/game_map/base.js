import { AcGameObjects } from "/static/js/ac_game_object/base.js";
import { Controller } from "/static/js/controller/base.js";

export class GameMap extends AcGameObjects {
    constructor(root) {
        super();

        this.root = root;
        this.$canvas = $(
            '<canvas width="752" height="360" tabindex=0></canvas>'
        );
        // 通过ctx操作canvas
        this.ctx = this.$canvas[0].getContext("2d");
        this.root.$kof.append(this.$canvas);
        this.$canvas.focus();

        // 创建Controller实例
        this.controller = new Controller(this.$canvas);
    }

    // 初始执行一次
    start() {}

    // 每一帧执行一次（除了第一帧之外）
    update() {
        this.render();
    }

    render() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.$canvas.width(), this.$canvas.height());
    }
}
