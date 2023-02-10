let AC_GAME_OBJECTS = []; // 存下所有对象

class AcGameObjects {
    constructor() {
        AC_GAME_OBJECTS.push(this); // 生成实例的时候存入

        // 存入的值
        this.timedelta = 0; // 距离上一帧的时间差
        this.has_call_start = false; // 标记start了没有
    }

    // 初始执行一次
    start() {}

    // 每一帧执行一次（除了第一帧之外）
    update() {}

    // 删除当前对象
    destory() {
        for (let i in AC_GAME_OBJECTS) {
            if (AC_GAME_OBJECTS[i] === this) {
                AC_GAME_OBJECTS.splice(i, 1);
                break;
            }
        }
    }
}

let last_timestamp;
let AC_GAME_OBJECTS_FRAME = (timestamp) => {
    for (let obj of AC_GAME_OBJECTS) {
        if (!obj.has_call_start) {
            obj.start();
            obj.has_call_start = true;
        } else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }

    last_timestamp = timestamp; // 更新时间
    requestAnimationFrame(AC_GAME_OBJECTS_FRAME);
};

// 递归调用
requestAnimationFrame(AC_GAME_OBJECTS_FRAME);

export { AcGameObjects };
