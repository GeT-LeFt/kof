import { AcGameObjects } from "/static/js/ac_game_object/base.js";
import { Controller } from "/static/js/controller/base.js";

export class Player extends AcGameObjects {
    constructor(root, info) {
        super();

        // 存入root
        this.root = root;
        // 区分玩家
        this.id = info.id;
        // 记录玩家位置、横纵速度信息
        this.x = info.x;
        this.y = info.y;
        this.vx = 0;
        this.vy = 0;
        // 记录玩家长宽颜色方向等信息
        this.width = info.width;
        this.height = info.height;
        this.color = info.color;
        this.direction = 1; // 右为1左为-1
        // 记录玩家水平速度、起跳初始速度
        this.speedx = 400;
        this.speedy = -1000;
        // 从root索引ctx
        this.ctx = this.root.game_map.ctx;
        // 从controller获取按着的键
        this.pressed_keys = this.root.game_map.controller.pressed_keys;
        // 定义重力
        this.gravity = 30;
        // 定义角色状态机：0-idle空闲，1-向前，2-向后，3-跳跃，4-攻击，5-被打，6-死亡
        this.status = 3;
    }

    // 初始执行一次
    start() {}

    update_move() {
        // 实现重力逻辑
        this.vy += this.gravity;

        this.x += (this.vx * this.timedelta) / 1000;
        this.y += (this.vy * this.timedelta) / 1000;

        if (this.y > 200) {
            this.y = 200;
            this.vy = 0;
            this.status = 0;
        }

        if (this.x < 0) {
            this.vx = 0;
            this.vy = 0;
            this.x = 0;
            this.status = 0;
        } else if (this.x + this.width > this.root.game_map.$canvas.width()) {
            this.vx = 0;
            this.vy = 0;
            this.x = this.root.game_map.$canvas.width() - this.width;
            this.status = 0;
        }
        console.log(this.x);
    }

    update_control() {
        let w, a, d, space;
        if (this.id === 0) {
            w = this.pressed_keys.has("w");
            a = this.pressed_keys.has("a");
            d = this.pressed_keys.has("d");
            space = this.pressed_keys.has(" ");
        } else {
            w = this.pressed_keys.has("ArrowUp");
            a = this.pressed_keys.has("ArrowLeft");
            d = this.pressed_keys.has("ArrowRight");
            space = this.pressed_keys.has(" ");
        }

        // 0和1的状态，静止和移动状态开始操作
        if (this.status === 0 || this.status === 1) {
            if (w) {
                if (d) {
                    // 右上方跳，组合键：wd
                    this.vx = this.speedx;
                } else if (a) {
                    // 左上方跳，组合键：wa
                    this.vx = -this.speedx;
                } else {
                    // 垂直跳，键：w
                    this.vx = 0;
                }
                this.vy = this.speedy;
                this.status = 3;
            } else if (d) {
                // 右移，键：d
                this.vx = this.speedx;
                this.status = 1;
            } else if (a) {
                // 左移，键：a
                this.vx = -this.speedx;
                this.status = 1;
            } else {
                this.vx = 0;
                this.status = 0;
            }
        }
    }

    // 每一帧执行一次（除了第一帧之外）
    update() {
        this.update_control();
        this.update_move();
        this.render();
    }

    render() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}