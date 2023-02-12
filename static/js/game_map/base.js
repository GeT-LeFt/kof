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

        // 创建血条和计时器
        this.root.$kof.append(
            $(`<div class="kof-head">
        <div class="kof-head-hp-0"><div></div></div>
        <div class="kof-head-timer">60</div>
        <div class="kof-head-hp-1"><div></div></div>
    </div>`)
        );

        this.time_left = 60000; // 单位：ms
        this.$timer = this.root.$kof.find(".kof-head-timer");
    }

    // 初始执行一次
    start() {}

    // 每一帧执行一次（除了第一帧之外）
    update() {
        this.time_left -= this.timedelta;
        if (this.time_left < 0) {
            this.time_left = 0;

            let [a, b] = this.root.players;
            if (a.status !== 6 && b.status !== 6) {
                a.status = b.status = 6;
                a.frame_current_cnt = b.frame_current_cnt = 0;
                a.vx = b.vx = 0;
            }
        }
        this.$timer.text(parseInt(this.time_left / 1000));
        this.render();
    }

    render() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}
