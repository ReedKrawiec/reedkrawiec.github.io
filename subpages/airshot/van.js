/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/van.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game/objects/box.ts":
/*!*********************************!*\
  !*** ./src/game/objects/box.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.VertBox = exports.Box = void 0;
const platformer_obj_1 = __webpack_require__(/*! ./platformer_obj */ "./src/game/objects/platformer_obj.ts");
class Box extends platformer_obj_1.platformer_obj {
    constructor(x, y, id = undefined) {
        super();
        this.sprite_url = "./sprites/box.png";
        this.collision = true;
        this.height = 64;
        this.width = 500;
        this.gravity = false;
        this.enemy = true;
        this.tags = ["static"];
        if (id != undefined) {
            this.id = id;
        }
        this.state = {
            position: {
                x,
                y
            },
            velocity: {
                x: 0,
                y: 0
            },
            health: 1000
        };
    }
}
exports.Box = Box;
class VertBox extends Box {
    constructor() {
        super(...arguments);
        this.sprite_url = "./sprites/box2.png";
        this.width = 64;
        this.height = 500;
    }
}
exports.VertBox = VertBox;


/***/ }),

/***/ "./src/game/objects/bullet.ts":
/*!************************************!*\
  !*** ./src/game/objects/bullet.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Rocket = exports.Bullet = void 0;
const object_1 = __webpack_require__(/*! ../../lib/object */ "./src/lib/object.ts");
const van_1 = __webpack_require__(/*! ../../van */ "./src/van.ts");
class Bullet extends object_1.obj {
    constructor(x, angle, id = undefined) {
        super();
        this.sprite_url = "./sprites/bullet.png";
        this.height = 20;
        this.width = 10;
        this.gravity = false;
        this.max_distance = 2000;
        this.tags = ["bullet"];
        if (id != undefined) {
            this.id = id;
        }
        this.state = {
            position: {
                x: x[0],
                y: x[1]
            },
            velocity: {
                x: 0,
                y: 0
            },
            speed: 10,
            rotation: angle,
            distance: 0,
            damage: 5
        };
        this.rotation = angle;
    }
    statef(time) {
        this.state.velocity = object_1.rotation_length(this.state.speed, this.state.rotation);
        this.state.distance += this.state.speed;
        if (this.state.distance > this.max_distance) {
            this.delete();
        }
    }
    register_controls() {
    }
}
exports.Bullet = Bullet;
class Rocket extends Bullet {
    constructor(x, angle) {
        super(x, angle);
        this.sprite_url = "./sprites/folder/rocket.png";
        this.height = 67;
        this.width = 16;
        this.particle_timer = 0;
        this.particle_frequency = 5;
        this.tags = ["Rocket"];
        this.hitbox = {
            x_offset: 0,
            y_offset: 0,
            width: 16,
            height: 16
        };
        this.state.speed = 15;
        this.state.damage = 20;
    }
    register_audio() {
        this.audio.add("explosion", "./sounds/explosion2.mp3");
    }
    statef(time) {
        super.statef(time);
        if (this.particle_timer == 0) {
            let offset = object_1.rotation_length(30, this.rotation + 180);
            this.emit_particle("smoke", offset, 400, 12);
        }
        this.particle_timer += time;
        if (this.particle_timer > this.particle_frequency) {
            this.particle_timer = 0;
        }
        let room = van_1.getGame().state.current_room;
        let collisions = room.check_collisions(this.create_collision_box(), ["gun", "player"]);
        if (collisions.length > 0) {
            for (let collision of collisions) {
                let st = collision.state;
                if (collision.enemy) {
                    st.health -= this.state.damage;
                }
                if (collision.tags.indexOf("dummy") > -1) {
                    let dummy = collision;
                    if (dummy.state.jumping) {
                        dummy.state.times_airshot++;
                    }
                }
            }
            this.state.distance = this.max_distance;
            this.delete();
            let explosion_collisions = room.check_collisions({
                x: this.state.position.x,
                y: this.state.position.y,
                width: 64,
                height: 64
            }, ["static"]);
            for (let collider of explosion_collisions) {
                let distance = this.distance(collider);
                let multiplyer = 1 - distance / 32;
                let o_state = collider.state;
                let velocities = object_1.rotation_length(multiplyer * 40, 180 + this.angleTowards(collider));
                o_state.velocity.x += velocities.x;
                o_state.velocity.y += velocities.y;
            }
            this.emit_particle("explosion", { x: 0, y: 0 }, 500, 0);
            this.audio.play("explosion", 0.2);
        }
    }
}
exports.Rocket = Rocket;


/***/ }),

/***/ "./src/game/objects/goomba.ts":
/*!************************************!*\
  !*** ./src/game/objects/goomba.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.StandingGoomba = exports.ControlledPlayer = exports.Goomba = exports.Cursor = exports.Gun = exports.BigStanding = void 0;
const state_1 = __webpack_require__(/*! ../../lib/state */ "./src/lib/state.ts");
const sprite_1 = __webpack_require__(/*! ../../lib/sprite */ "./src/lib/sprite.ts");
const object_1 = __webpack_require__(/*! ../../lib/object */ "./src/lib/object.ts");
const platformer_obj_1 = __webpack_require__(/*! ./platformer_obj */ "./src/game/objects/platformer_obj.ts");
const controls_1 = __webpack_require__(/*! ../../lib/controls */ "./src/lib/controls.ts");
const van_1 = __webpack_require__(/*! ../../van */ "./src/van.ts");
var direction;
(function (direction) {
    direction[direction["left"] = 0] = "left";
    direction[direction["right"] = 1] = "right";
})(direction || (direction = {}));
class BigStanding extends object_1.composite_obj {
    constructor(a) {
        super();
        this.collision = true;
        this.enemy = true;
        this.gracity = true;
        this.statics.push({
            x: 0,
            y: 0,
            obj: new StandingGoomba(0, 0)
        });
        this.statics.push({
            x: 250,
            y: 0,
            obj: new StandingGoomba(0, 0)
        });
    }
    statef(t) {
    }
}
exports.BigStanding = BigStanding;
class Gun extends platformer_obj_1.platformer_obj {
    constructor() {
        super();
        this.sprite_url = "./sprites/folder/gun.png";
        this.height = 50;
        this.width = 20;
        this.collision = false;
        this.render = true;
        this.tags = ["gun"];
        this.id = "gun";
        this.state = {
            position: state_1.position_init().position,
            velocity: state_1.position_init().velocity,
            rotation: -1
        };
    }
    statef(t) {
        if (!this.player) {
            let room = van_1.getGame().getRoom();
            this.player = room.getObj("player");
            this.cursor = room.getObj("cursor");
        }
        let angle = this.player.angleTowards(this.cursor);
        let rot = object_1.rotation_length(50, angle);
        this.rotation = angle;
        this.state.rotation = angle;
        this.state.position = {
            x: rot.x + this.player.state.position.x,
            y: rot.y + this.player.state.position.y
        };
    }
}
exports.Gun = Gun;
class Cursor extends platformer_obj_1.platformer_obj {
    constructor(id) {
        super();
        this.sprite_url = "./sprites/cursor.png";
        this.height = 64;
        this.width = 64;
        this.collision = true;
        this.render = true;
        this.id = id;
        this.state = {
            position: {
                x: 0,
                y: 0
            },
            velocity: {
                x: 0,
                y: 0
            }
        };
    }
    statef() {
    }
}
exports.Cursor = Cursor;
class Goomba extends platformer_obj_1.platformer_obj {
    constructor(x, y, id = undefined) {
        super();
        this.sprite_url = "./sprites/folder/robot.png";
        this.height = 149;
        this.width = 149;
        this.tags = ["dummy"];
        this.collision = true;
        if (id != undefined) {
            this.id = id;
        }
        this.state = {
            direction: direction.left,
            position: {
                x,
                y
            },
            velocity: {
                x: 0,
                y: 0
            },
            jumping: false,
            health: 100,
            times_airshot: 0,
            max_times_airshot: 0
        };
        this.animations.play("walk1");
    }
    register_animations() {
        let sprites = sprite_1.sprite_gen(this.sprite_sheet, this.width, this.height);
        this.animations.add("walk1", [
            [0, sprites[0][0]],
            [100, sprites[0][1]],
            [400, sprites[0][0]],
            [500, sprites[0][2]]
        ], 800);
        this.animations.add("walk2", [
            [0, sprites[0][5]],
            [100, sprites[0][4]],
            [400, sprites[0][5]],
            [500, sprites[0][3]]
        ], 800);
        this.animations.add("idleleft", [
            [0, sprites[0][0]]
        ], 1);
        this.animations.add('idleright', [
            [0, sprites[0][5]]
        ], 1);
        this.animations.add('fallleft', [
            [0, sprites[0][6]]
        ], 1);
        this.animations.add('fallright', [
            [0, sprites[0][7]]
        ], 1);
    }
    register_audio() {
        this.audio.add("slime", "./sounds/goomba/slimeball.wav");
        this.audio.add("explosion", "./sounds/explosion.mp3");
    }
    renderf(t) {
        if (this.state.jumping) {
            let animation = this.state.direction == direction.left ? "fallleft" : "fallright";
            this.animations.play(animation);
        }
        else if (this.state.velocity.x == 0 && this.state.velocity.y == 0) {
            let animation = this.state.direction == direction.left ? "idleleft" : "idleright";
            this.animations.play(animation);
        }
        return super.renderf(t);
    }
    statef(time) {
        let room = van_1.getGame().getRoom();
        let cursor = room.getObj("cursor");
        if (room.check_collisions({
            width: this.width,
            height: 1,
            x: this.state.position.x,
            y: this.state.position.y - this.height / 2 - 1,
        }).length > 0) {
            this.state.jumping = false;
            this.state.max_times_airshot = Math.max(this.state.times_airshot, this.state.max_times_airshot);
            console.log(this.state.max_times_airshot);
            this.state.times_airshot = 0;
        }
        else {
            this.state.jumping = true;
        }
        if (this.state.velocity.y > 0) {
            this.state.velocity.y = this.state.velocity.y - 0.4 * 16 / time;
            ;
            if (this.state.velocity.y < 0)
                this.state.velocity.y = 0;
        }
        if (this.state.velocity.y < 0) {
            this.state.velocity.y = this.state.velocity.y + 0.4 * 16 / time;
            if (this.state.velocity.y > 0)
                this.state.velocity.y = 0;
        }
        if (this.state.velocity.x > 0) {
            this.state.velocity.x = this.state.velocity.x - 0.4 * 16 / time;
            ;
            if (this.state.velocity.x < 0) {
                this.state.velocity.x = 0;
            }
        }
        else if (this.state.velocity.x < 0) {
            this.state.velocity.x = this.state.velocity.x + 0.4 * 16 / time;
            ;
            if (this.state.velocity.x > 0) {
                this.state.velocity.x = 0;
            }
        }
    }
}
exports.Goomba = Goomba;
class ControlledPlayer extends Goomba {
    constructor() {
        super(...arguments);
        this.tags = ["player"];
    }
    register_controls() {
        this.bind_control("KeyA", controls_1.exec_type.repeat, () => {
            if (this.state.velocity.x > -10) {
                this.state.velocity.x = this.state.velocity.x - 1;
            }
        });
        this.bind_control("KeyW", controls_1.exec_type.once, () => {
            if (this.state.direction == direction.left) {
                this.animations.play("walk1");
            }
            else
                this.animations.play("walk2");
            this.state.velocity.y = this.state.velocity.y + 0.2;
        });
        this.bind_control("KeyS", controls_1.exec_type.once, () => {
            if (this.state.direction == direction.left)
                this.animations.play("walk1");
            else
                this.animations.play("walk2");
            this.state.velocity.y = this.state.velocity.y - 0.1;
        });
        this.bind_control("KeyA", controls_1.exec_type.once, () => {
            this.animations.play("walk1");
            this.state.direction = direction.left;
            this.state.velocity.x = this.state.velocity.x - 0.1;
        });
        this.bind_control("mouse0down", controls_1.exec_type.repeat, () => {
            this.audio.play("explosion", 0.4);
        }, 400);
        this.bind_control("KeyD", controls_1.exec_type.repeat, () => {
            if (this.state.velocity.x < 10) {
                this.state.velocity.x = this.state.velocity.x + 1;
            }
        });
        this.bind_control("KeyD", controls_1.exec_type.once, () => {
            this.animations.play("walk2");
            this.state.direction = direction.right;
            this.state.velocity.x = this.state.velocity.x + 0.1;
        });
        this.bind_control("Space", controls_1.exec_type.once, () => {
            if (!this.state.jumping) {
                this.state.velocity.y += 25;
                this.audio.play("slime", 0.1);
            }
        });
    }
}
exports.ControlledPlayer = ControlledPlayer;
class StandingGoomba extends platformer_obj_1.platformer_obj {
    constructor(x, y, id = undefined) {
        super();
        this.sprite_url = "http://localhost/src/game/objects/goomba.png";
        this.height = 64;
        this.width = 64;
        this.collision = true;
        this.enemy = true;
        if (id) {
            this.id = id;
        }
        this.state = {
            direction: direction.left,
            position: {
                x,
                y
            },
            velocity: {
                x: 0,
                y: 0
            },
            jumping: false,
            health: 100,
            times_airshot: 0,
            max_times_airshot: 0
        };
    }
    statef(time) {
        if (this.state.jumping) {
            let mouse_position = controls_1.Poll_Mouse();
            if (mouse_position.y > mouse_position.last.y) {
                if (this.collision_check({
                    x: this.state.position.x,
                    y: this.state.position.y + this.height,
                    width: this.width,
                    height: 1
                }).length == 0) {
                    this.state.position.y = mouse_position.y - this.height / 2;
                }
            }
            else if (mouse_position.y < mouse_position.last.y) {
                if (this.collision_check({
                    x: this.state.position.x,
                    y: this.state.position.y - 1,
                    width: this.width,
                    height: 1
                }).length == 0) {
                    this.state.position.y = mouse_position.y - this.height / 2;
                }
            }
            if (mouse_position.x < mouse_position.last.x) {
                if (this.collision_check({
                    x: this.state.position.x - 1,
                    y: this.state.position.y,
                    width: 1,
                    height: this.height
                }).length == 0) {
                    this.state.position.x = mouse_position.x - this.width / 2;
                }
            }
            else if (mouse_position.x > mouse_position.last.x) {
                if (this.collision_check({
                    x: this.state.position.x + this.width,
                    y: this.state.position.y,
                    width: 1,
                    height: this.height
                }).length == 0) {
                    this.state.position.x = mouse_position.x - this.width / 2;
                }
            }
        }
        super.statef(time);
    }
}
exports.StandingGoomba = StandingGoomba;


/***/ }),

/***/ "./src/game/objects/platformer_obj.ts":
/*!********************************************!*\
  !*** ./src/game/objects/platformer_obj.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.platformer_obj_composite = exports.platformer_obj = void 0;
const object_1 = __webpack_require__(/*! ../../lib/object */ "./src/lib/object.ts");
class platformer_obj extends object_1.gravity_obj {
    constructor() {
        super();
        this.enemy = false;
    }
    statef(a) {
        let state = this.state;
        if (state.health <= 0) {
            this.delete();
        }
    }
}
exports.platformer_obj = platformer_obj;
class platformer_obj_composite extends object_1.composite_obj {
    constructor() {
        super();
        this.enemy = false;
    }
    statef(a) {
        let state = this.state;
        if (state.health <= 0) {
            this.delete();
        }
    }
}
exports.platformer_obj_composite = platformer_obj_composite;


/***/ }),

/***/ "./src/game/objects/target.ts":
/*!************************************!*\
  !*** ./src/game/objects/target.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Target = void 0;
const sprite_1 = __webpack_require__(/*! ../../lib/sprite */ "./src/lib/sprite.ts");
const platformer_obj_1 = __webpack_require__(/*! ./platformer_obj */ "./src/game/objects/platformer_obj.ts");
class Target extends platformer_obj_1.platformer_obj {
    constructor(a) {
        super();
        this.sprite_url = "./sprites/target.png";
        this.height = 64;
        this.width = 64;
        this.collision = true;
        this.gravity = false;
        this.render = true;
        this.enemy = true;
        this.state = {
            position: {
                x: a[0],
                y: a[1]
            },
            velocity: {
                x: 0,
                y: 0
            },
            health: 20,
            breaking: false
        };
    }
    register_audio() {
        this.audio.add("break", "./sounds/target/hitsound_274.mp3");
    }
    register_animations() {
        let sprites = sprite_1.sprite_gen(this.sprite_sheet, this.width, this.height);
        this.animations.add("break", [
            [0, sprites[0][1]],
            [50, sprites[0][2]],
            [100, sprites[0][3]],
            [150, sprites[0][4]]
        ], 200);
    }
    statef() {
        if (this.state.health <= 0 && !this.state.breaking) {
            this.state.breaking = true;
            this.animations.play("break", () => {
                this.delete();
            });
            this.audio.play("break", 0.1);
        }
    }
}
exports.Target = Target;


/***/ }),

/***/ "./src/game/rooms/overworld.ts":
/*!*************************************!*\
  !*** ./src/game/rooms/overworld.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Overworld = void 0;
const room_1 = __webpack_require__(/*! ../../lib/room */ "./src/lib/room.ts");
const goomba_1 = __webpack_require__(/*! ../objects/goomba */ "./src/game/objects/goomba.ts");
const box_1 = __webpack_require__(/*! ../objects/box */ "./src/game/objects/box.ts");
const collision_1 = __webpack_require__(/*! ../../lib/collision */ "./src/lib/collision.ts");
const object_1 = __webpack_require__(/*! ../../lib/object */ "./src/lib/object.ts");
const controls_1 = __webpack_require__(/*! ../../lib/controls */ "./src/lib/controls.ts");
const hud_1 = __webpack_require__(/*! ../../lib/hud */ "./src/lib/hud.ts");
const van_1 = __webpack_require__(/*! ../../van */ "./src/van.ts");
const bullet_1 = __webpack_require__(/*! ../objects/bullet */ "./src/game/objects/bullet.ts");
const target_1 = __webpack_require__(/*! ../objects/target */ "./src/game/objects/target.ts");
class Overworld_HUD extends hud_1.HUD {
    constructor() {
        super();
        this.text_elements.push(new hud_1.Text({
            position: {
                x: 10,
                y: 910
            },
            size: 44,
            font: "Alata",
            color: "white",
            align: "left"
        }, () => {
            let x = van_1.getGame().getRoom().getObjByTag("dummy")[0];
            return `Times Airshot:${x.state.times_airshot}`;
        }));
        this.text_elements.push(new hud_1.Text({
            position: {
                x: 10,
                y: 950
            },
            size: 44,
            font: "Alata",
            color: "white",
            align: "left"
        }, () => {
            let x = van_1.getGame().getRoom().getObjByTag("dummy")[0];
            return `Max Times Airshot:${Math.max(x.state.times_airshot, x.state.max_times_airshot)}`;
        }));
    }
}
class Overworld extends room_1.room {
    constructor() {
        super();
        this.background_url = "./sprites/imD41l.jpg";
        this.objects = [new goomba_1.ControlledPlayer(700, 150, "player"), new goomba_1.Goomba(550, 150), new box_1.Box(600, 0, "platform"), new goomba_1.Gun(), new target_1.Target([200, 100]), new target_1.Target([200, 200]), new target_1.Target([1000, 100]), new target_1.Target([1000, 200]), new goomba_1.Cursor("cursor")];
        this.state = {
            player: undefined,
            paused: false,
            locked_bullet: null
        };
        for (let a = 0; a < 10; a++) {
            this.objects.push(new box_1.VertBox(320, 250 + a * 500));
            this.objects.push(new box_1.VertBox(900, 250 + a * 500));
        }
    }
    registerHUD() {
        return new Overworld_HUD();
    }
    register_controls() {
        this.bindControl("Escape", controls_1.exec_type.once, () => {
            van_1.setDebug(!van_1.DEBUG);
        });
        this.bindControl("mouse0down", controls_1.exec_type.repeat, () => {
            let gun = this.getObj("gun");
            if (gun) {
                let muzzle = object_1.rotation_length(30, gun.state.rotation);
                let position = {
                    x: gun.state.position.x + muzzle.x,
                    y: gun.state.position.y + muzzle.y
                };
                let bullets = [];
                for (let a = 0; a < 1; a++) {
                    bullets.push(new bullet_1.Rocket([position.x, position.y], gun.state.rotation));
                }
                if (this.state.locked_bullet == null)
                    this.state.locked_bullet = bullets[0];
                this.addItems(bullets);
            }
        }, 400);
        let camera3 = van_1.getGame().state.cameras[1];
        this.bindControl("ArrowLeft", controls_1.exec_type.repeat, () => {
            camera3.state.position.x -= 10;
        }, 10);
        this.bindControl("ArrowRight", controls_1.exec_type.repeat, () => {
            camera3.state.position.x += 10;
        }, 10);
        this.bindControl("ArrowDown", controls_1.exec_type.repeat, () => {
            camera3.state.position.y -= 10;
        }, 10);
        this.bindControl("ArrowUp", controls_1.exec_type.repeat, () => {
            camera3.state.position.y += 10;
        }, 10);
    }
    registerParticles() {
        this.particles["smoke"] = {
            sprite: "./sprites/folder/smoke.png",
            height: 64,
            width: 64
        };
        this.particles["explosion"] = {
            sprite: "./sprites/folder/explosion.png",
            height: 64,
            width: 64
        };
    }
    statef(time) {
        if (!this.state.paused) {
            for (let a = 0; a < this.objects.length; a++) {
                room_1.apply_gravity(this.objects[a], -1, -15);
                collision_1.velocity_collision_check(this.objects[a], this.objects);
                this.objects[a].statef(time);
            }
            for (let particle of this.particles_arr) {
                particle.statef(time);
            }
            let player = this.getObj("player");
            let target = this.getObjByTag("dummy")[0];
            let cursor = this.getObj("cursor");
            let cameras = van_1.getGame().state.cameras;
            if (player) {
                cameras[0].x = player.state.position.x;
                cameras[0].y = player.state.position.y + (cameras[0].state.dimensions.height / 2 - player.height / 2 - 100);
            }
            cameras[1].state.position.x = target.state.position.x;
            cameras[1].state.position.y = target.state.position.y;
            if (cursor) {
                cursor.collision = false;
                cursor.gravity = false;
                let mouse = controls_1.Poll_Mouse();
                cursor.state.position.x = mouse.x;
                cursor.state.position.y = mouse.y;
                cameras[2].state.position.x = mouse.x;
                cameras[2].state.position.y = mouse.y;
            }
        }
    }
}
exports.Overworld = Overworld;


/***/ }),

/***/ "./src/lib/audio.ts":
/*!**************************!*\
  !*** ./src/lib/audio.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.audio = void 0;
class audio {
    constructor() {
        this.sounds = {};
    }
    add(name, s) {
        this.sounds[name] = new Audio(s);
    }
    load() {
        let keys = Object.keys(this.sounds);
        let promises = keys.map((key) => {
            return new Promise((resolve, reject) => {
                this.sounds[key].addEventListener("canplaythrough", (e) => {
                    resolve();
                });
            });
        });
        return Promise.all(promises);
    }
    play(name, volume) {
        let a = this.sounds[name];
        a.pause();
        a.currentTime = 0;
        a.volume = volume;
        a.play();
    }
}
exports.audio = audio;


/***/ }),

/***/ "./src/lib/collision.ts":
/*!******************************!*\
  !*** ./src/lib/collision.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.velocity_collision_check = exports.check_collisions = exports.check_all_collisions = exports.check_all_objects = void 0;
const object_1 = __webpack_require__(/*! ../lib/object */ "./src/lib/object.ts");
var direction;
(function (direction) {
    direction[direction["left"] = 0] = "left";
    direction[direction["right"] = 1] = "right";
    direction[direction["up"] = 2] = "up";
    direction[direction["down"] = 3] = "down";
})(direction || (direction = {}));
function check_all_objects(c, objs, exemption = []) {
    return objs.filter((a) => (!exemption.some((b) => a.tags.indexOf(b) !== -1) && a.collides_with_box(c)));
}
exports.check_all_objects = check_all_objects;
function check_all_collisions(c, objs, exemption = []) {
    let matched = [];
    for (let a of objs) {
        if (!exemption.some((b) => a.tags.indexOf(b) !== -1) && a.collision && a.collides_with_box(c)) {
            matched.push(a);
        }
    }
    return matched;
}
exports.check_all_collisions = check_all_collisions;
//Checks up to the first collision
function check_collisions(c, objs, exemption) {
    for (let a of objs) {
        if (a.id !== exemption && a.collision && a.collides_with_box(c)) {
            return a;
        }
    }
    return null;
}
exports.check_collisions = check_collisions;
function velocity_max(velocity, box, objs, exemption, dir) {
    let collision = check_collisions(box, objs, exemption);
    if (collision == null) {
        return velocity;
    }
    else {
        let collider = collision;
        let origin = object_1.getId(objs, exemption);
        let orig_st = origin.state;
        let collider_st = collider.state;
        if (dir == direction.left) {
            return (orig_st.position.x - origin.width / 2) - (collider_st.position.x + collider.width / 2);
        }
        else if (dir == direction.right) {
            return (collider_st.position.x - collider.width / 2) - (orig_st.position.x + origin.width / 2);
        }
        else if (dir == direction.down) {
            return (orig_st.position.y - origin.height / 2) - (collider_st.position.y + collider.height / 2);
        }
        else if (dir == direction.up) {
            return (collider_st.position.y - collider.height / 2) - (orig_st.position.y + origin.height / 2);
        }
    }
}
function velocity_collision_check(object, list) {
    list = [...list];
    let ob = object;
    let st = object.state;
    let x_vel = st.velocity.x;
    let y_vel = st.velocity.y;
    if (!ob.collision) {
        ob.state.position.x += ob.state.velocity.x;
        ob.state.position.y += ob.state.velocity.y;
        return;
    }
    if (x_vel > 0) {
        let box = {
            x: st.position.x + ob.width / 2 + x_vel / 2,
            y: st.position.y,
            width: x_vel,
            height: ob.height
        };
        let vel = velocity_max(st.velocity.x, box, list, ob.id, direction.right);
        if (vel > 0) {
            st.position.x += vel;
        }
        else {
            st.velocity.x = 0;
        }
    }
    else if (x_vel < 0) {
        let box = {
            x: x_vel / 2 + st.position.x - ob.width / 2,
            y: st.position.y,
            width: -1 * x_vel,
            height: ob.height
        };
        let vel = velocity_max(st.velocity.x, box, list, ob.id, direction.left);
        if (vel < 0) {
            st.position.x += vel;
        }
        else {
            st.velocity.x = 0;
        }
    }
    if (y_vel > 0) {
        let box = {
            x: st.position.x,
            y: st.position.y + ob.height / 2 + y_vel / 2,
            width: ob.width,
            height: y_vel
        };
        let vel = velocity_max(st.velocity.y, box, list, ob.id, direction.up);
        if (vel > 0) {
            st.position.y += vel;
        }
        else {
            st.velocity.y = 0;
        }
    }
    else if (y_vel < 0) {
        let box = {
            x: st.position.x,
            y: y_vel / 2 + st.position.y - ob.height / 2,
            width: ob.width,
            height: -1 * y_vel
        };
        let vel = velocity_max(st.velocity.y, box, list, ob.id, direction.down);
        if (vel < 0) {
            st.position.y += vel;
        }
        else {
            st.velocity.y = 0;
        }
    }
}
exports.velocity_collision_check = velocity_collision_check;


/***/ }),

/***/ "./src/lib/controls.ts":
/*!*****************************!*\
  !*** ./src/lib/controls.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Bind = exports.exec_type = exports.Unbind = exports.ExecuteRepeatBinds = exports.Poll_Mouse = void 0;
const van_1 = __webpack_require__(/*! ../van */ "./src/van.ts");
let target = document.getElementById("target");
target.addEventListener("click", (e) => {
    let mouse = Poll_Mouse();
    let box = {
        x: mouse.x,
        y: mouse.y,
        height: 1,
        width: 1
    };
    let d = [...all_binds];
    for (let a = 0; a < d.length; a++) {
        let selected = d[a];
        if (selected.type === btype.mouse && selected.key === "mouse1" && selected.execute == exec_type.once) {
            if (selected.obj !== undefined) {
                if (selected.obj.collides_with_box(box)) {
                    selected.function();
                }
            }
            else {
                selected.function();
            }
        }
    }
});
target.addEventListener("mousedown", (e) => {
    e.preventDefault();
    let d = [...all_binds];
    for (let a = 0; a < all_binds.length; a++) {
        let selected = d[a];
        if (selected.type === btype.mouse && selected.key === ("mouse" + e.button + "down") && !selected.executed) {
            if (selected.execute === exec_type.once) {
                selected.function();
            }
            else if (selected.execute === exec_type.repeat) {
                selected.repeat_timer.active = true;
            }
            selected.executed = true;
        }
    }
});
target.addEventListener("mouseup", (e) => {
    let d = [...all_binds];
    for (let a = 0; a < all_binds.length; a++) {
        let selected = d[a];
        if (selected.type === btype.mouse && (selected.key === e.type) && selected.executed && selected.execute === exec_type.once) {
            selected.executed = false;
        }
        else if (selected.type === btype.mouse && (selected.key === ("mouse" + e.button + "down") || selected.key == "mousedown") && selected.executed && selected.execute === exec_type.repeat) {
            let g = [...repeat_binds];
            for (let a = 0; a < g.length; a++) {
                if (g[a].bind.id === selected.id) {
                    selected.executed = false;
                    g[a].active = false;
                    break;
                }
            }
        }
    }
});
window.addEventListener("keydown", (e) => {
    let d = [...all_binds];
    for (let a = 0; a < all_binds.length; a++) {
        let selected = d[a];
        if (selected.type === btype.keyboard && selected.key === e.code && !selected.executed) {
            if (selected.execute === exec_type.once) {
                selected.function();
            }
            else if (selected.execute === exec_type.repeat) {
                for (let c of repeat_binds) {
                    if (c.bind.id == selected.id) {
                        c.active = true;
                        break;
                    }
                }
            }
            selected.executed = true;
        }
    }
});
window.addEventListener("keyup", (e) => {
    let d = [...all_binds];
    for (let a = 0; a < all_binds.length; a++) {
        let selected = d[a];
        if (selected.type === btype.keyboard && selected.key === e.code && selected.executed) {
            if (selected.execute === exec_type.once) {
                selected.executed = false;
            }
            else if (selected.execute === exec_type.repeat) {
                let g = [...repeat_binds];
                for (let a = 0; a < g.length; a++) {
                    if (g[a].bind.id === selected.id) {
                        selected.executed = false;
                        g[a].active = false;
                        break;
                    }
                }
            }
        }
    }
});
let tracker = document.getElementById("target");
tracker.addEventListener("mousemove", (e) => {
    var rect = e.target.getBoundingClientRect();
    last_x = x;
    last_y = y;
    x = e.clientX - rect.left; //x position within the element.
    y = e.clientY - rect.top; //y position within the element.
});
var btype;
(function (btype) {
    btype[btype["mouse"] = 0] = "mouse";
    btype[btype["keyboard"] = 1] = "keyboard";
})(btype || (btype = {}));
let x = 0;
let y = 0;
let last_x = 0;
let last_y = 0;
let binds = {};
let mouseBinds = {};
let bind_count = 0;
let all_binds = [];
let repeat_binds = [];
function Poll_Mouse() {
    let height = van_1.GetViewportDimensions().height;
    let canvas = van_1.getGame().state.canvas;
    let wratio = parseFloat(window.getComputedStyle(canvas).width) / van_1.GetViewportDimensions().width;
    let vratio = parseFloat(window.getComputedStyle(canvas).height) / van_1.GetViewportDimensions().height;
    let camera = van_1.getGame().state.cameras[0];
    return ({
        x: (x / wratio / camera.state.scaling + camera.state.position.x - camera.state.dimensions.width / 2),
        y: ((height - y / vratio) / camera.state.scaling + camera.state.position.y - camera.state.dimensions.height / 2),
        last: {
            x: (x / wratio / camera.state.scaling + camera.state.position.x),
            y: ((height - y / vratio) / camera.state.scaling + camera.state.position.y)
        }
    });
}
exports.Poll_Mouse = Poll_Mouse;
function ExecuteRepeatBinds(b) {
    for (let a of repeat_binds) {
        if (a.bind.execute === exec_type.repeat && a.timer == 0 && a.active) {
            a.bind.function();
        }
        if (a.active || (!a.active && a.timer != 0))
            a.timer += b;
        if (a.timer > a.interval) {
            a.timer = 0;
        }
    }
}
exports.ExecuteRepeatBinds = ExecuteRepeatBinds;
function Unbind(bind_id) {
    for (let a = 0; a < all_binds.length; a++) {
        if (all_binds[a].id == bind_id) {
            all_binds.splice(a, 1);
            break;
        }
    }
}
exports.Unbind = Unbind;
var exec_type;
(function (exec_type) {
    exec_type[exec_type["once"] = 0] = "once";
    exec_type[exec_type["repeat"] = 1] = "repeat";
})(exec_type = exports.exec_type || (exports.exec_type = {}));
let id = 0;
function Bind(keyname, func, type, interval, object) {
    if (keyname.slice(0, 5) === "mouse") {
        let b = {
            key: keyname,
            type: btype.mouse,
            id,
            function: func,
            obj: object,
            execute: type,
            executed: false,
            interval
        };
        if (type == exec_type.repeat) {
            b.repeat_timer = {
                bind: b,
                timer: 0,
                interval,
                active: false
            };
            repeat_binds.push(b.repeat_timer);
        }
        all_binds.push(b);
    }
    else {
        let b = {
            key: keyname,
            type: btype.keyboard,
            id,
            function: func,
            execute: type,
            executed: false,
            interval
        };
        if (type == exec_type.repeat) {
            b.repeat_timer = {
                bind: b,
                timer: 0,
                interval,
                active: false
            };
            repeat_binds.push(b.repeat_timer);
        }
        all_binds.push(b);
    }
    id++;
    return id - 1;
}
exports.Bind = Bind;


/***/ }),

/***/ "./src/lib/hud.ts":
/*!************************!*\
  !*** ./src/lib/hud.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = exports.HUD = void 0;
class HUD {
    constructor() {
        this.graphic_elements = [];
        this.text_elements = [];
    }
    statef(a) {
        for (let x of this.graphic_elements) {
            x.statef(a);
        }
        for (let x of this.text_elements) {
            x.statef(a);
        }
    }
}
exports.HUD = HUD;
class Text {
    constructor(a, b) {
        if (!a.align) {
            a.align = "center";
        }
        this.state = a;
        if (!this.state.text) {
            this.state.text = "";
        }
        this.get_func = b;
    }
    statef(a) {
        this.state.text = this.get_func();
    }
    renderf(a) {
        let { size, color, font, text, max_width, align } = this.state;
        return {
            size,
            color,
            font,
            text,
            max_width,
            align
        };
    }
}
exports.Text = Text;


/***/ }),

/***/ "./src/lib/object.ts":
/*!***************************!*\
  !*** ./src/lib/object.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gravity_obj = exports.static_obj = exports.composite_obj = exports.obj = exports.getId = exports.rotation_length = void 0;
const van_1 = __webpack_require__(/*! ../van */ "./src/van.ts");
const controls_1 = __webpack_require__(/*! ./controls */ "./src/lib/controls.ts");
const audio_1 = __webpack_require__(/*! ./audio */ "./src/lib/audio.ts");
function rotation_length(length, degree) {
    let a_len = length * Math.sin(degree * Math.PI / 180);
    let b_len = length * Math.cos(degree * Math.PI / 180);
    return {
        x: a_len,
        y: b_len
    };
}
exports.rotation_length = rotation_length;
function getId(a, id) {
    for (let b = 0; b < a.length; b++) {
        if (a[b].id == id) {
            return a[b];
        }
    }
    return undefined;
}
exports.getId = getId;
let counter = 0;
class animations {
    constructor() {
        this.animations = {};
        this.animation_tracker = 0;
    }
    add(name, s, length) {
        this.animations[name] = [s, length];
    }
    play(name, callback) {
        this.current = name;
        this.callback = callback;
        this.animation_tracker = 0;
    }
    renderf(t) {
        let curr_animation = this.animations[this.current][0];
        let length = this.animations[this.current][1];
        let index;
        for (index = 0; index < curr_animation.length - 1; index++) {
            if (this.animation_tracker >= curr_animation[index][0] && this.animation_tracker < curr_animation[index + 1][0]) {
                this.animation_tracker = this.animation_tracker + t;
                return curr_animation[index][1];
            }
        }
        if (this.callback) {
            this.callback();
        }
        if (this.animation_tracker >= length) {
            this.animation_tracker = 0;
        }
        else {
            this.animation_tracker += t;
        }
        return curr_animation[index][1];
    }
}
class obj {
    constructor() {
        this.sprite_url = "";
        this.collision = false;
        this.tags = [];
        this.rotation = 0;
        this.render = true;
        this.animations = new animations();
        this.audio = new audio_1.audio();
        this.last_render = 0;
        this.id = "" + counter;
        this.binds = [];
        counter++;
        this.register_controls();
        this.register_audio();
    }
    getState() {
        return this.state;
    }
    register_animations() {
    }
    register_audio() {
    }
    load() {
        let _this = this;
        return new Promise((resolve, reject) => {
            let a = new Image();
            a.src = this.sprite_url;
            a.onload = (() => __awaiter(this, void 0, void 0, function* () {
                _this.sprite_sheet = a;
                _this.register_animations();
                yield this.audio.load();
                resolve();
            }));
        });
    }
    distance(a) {
        let o_st = a.state;
        let st = this.state;
        return Math.sqrt(Math.pow(st.position.x - o_st.position.x, 2) + Math.pow(st.position.y - o_st.position.y, 2));
    }
    angleTowards(a) {
        let b = a;
        let state = this.state;
        if (state.position.x < b.state.position.x && state.position.y > b.state.position.y
            || (state.position.x < b.state.position.x && state.position.y < b.state.position.y)) {
            return 90 - Math.atan((b.state.position.y - state.position.y) / (b.state.position.x - state.position.x)) * 180 / Math.PI;
        }
        if (state.position.x > b.state.position.x && state.position.y < b.state.position.y
            || state.position.x > b.state.position.x && state.position.y > b.state.position.y) {
            return 270 - Math.atan((b.state.position.y - state.position.y) / (b.state.position.x - state.position.x)) * 180 / Math.PI;
        }
        return 0;
    }
    bind_control(key, x, func, interval = 1) {
        if (key == "mouse1") {
            let b = controls_1.Bind(key, func, x, interval, this);
            this.binds.push(b);
        }
        else {
            this.binds.push(controls_1.Bind(key, func, x, interval));
        }
    }
    register_controls() {
    }
    delete() {
        for (let a of this.binds) {
            controls_1.Unbind(a);
        }
        van_1.getGame().getRoom().deleteItem(this.id);
    }
    collision_check(a) {
        if (this.collision) {
            let room = van_1.getGame().getRoom();
            return room.check_collisions(a, [this.id]);
        }
        return [];
    }
    statef(time) {
    }
    create_collision_box() {
        let st = this.state;
        if (this.hitbox) {
            return {
                x: st.position.x,
                y: st.position.y,
                width: this.hitbox.width,
                height: this.hitbox.height
            };
        }
        else {
            return {
                x: st.position.x,
                y: st.position.y,
                width: this.width,
                height: this.height
            };
        }
    }
    collides_with_box(a) {
        let st = this.state;
        let hcollides = false, vcollides = false;
        let hbox = this.hitbox;
        if (!this.hitbox) {
            hbox = {
                x_offset: 0,
                y_offset: 0,
                width: this.width,
                height: this.height
            };
        }
        let ob = {
            left: (st.position.x + hbox.x_offset - hbox.width / 2),
            right: (st.position.x + hbox.x_offset + hbox.width / 2),
            top: (st.position.y + hbox.y_offset + hbox.height / 2),
            bottom: (st.position.y + hbox.y_offset - hbox.height / 2)
        };
        let box = {
            left: (a.x - a.width / 2),
            right: (a.x + a.width / 2),
            top: (a.y + a.height / 2),
            bottom: (a.y - a.height / 2)
        };
        if ((ob.left >= box.left && ob.left < box.right) || (box.left > ob.left && box.left < ob.right)) {
            hcollides = true;
        }
        else {
            return false;
        }
        if ((ob.bottom >= box.bottom && ob.bottom < box.top) || (box.bottom > ob.bottom && box.bottom < ob.top)) {
            vcollides = true;
        }
        else {
            return false;
        }
        return hcollides && vcollides;
    }
    emit_particle(name, offset, lifetime, range) {
        let room = van_1.getGame().getRoom();
        let st = this.state;
        let final_position = {
            x: st.position.x + offset.x,
            y: st.position.y + offset.y
        };
        room.emit_particle(name, final_position, lifetime, range);
    }
    render_track(time) {
        let rendered = this.renderf(time - this.last_render);
        this.last_render = time;
        return rendered;
    }
    renderf(time) {
        let st = this.state;
        if (!this.animations.current) {
            let sprite_height = this.height;
            let sprite_width = this.width;
            if (this.height == undefined) {
                sprite_height = this.sprite_sheet.height;
            }
            if (this.width == undefined) {
                sprite_width = this.sprite_sheet.width;
            }
            return {
                sprite: {
                    sprite_sheet: this.sprite_sheet,
                    left: 0,
                    top: 0,
                    sprite_width,
                    sprite_height,
                    opacity: 1
                },
                x: st.position.x,
                y: st.position.y
            };
        }
        return {
            sprite: this.animations.renderf(time),
            x: st.position.x,
            y: st.position.y
        };
    }
}
exports.obj = obj;
class composite_obj extends obj {
    constructor() {
        super(...arguments);
        this.objects = [];
        this.statics = [];
    }
    load() {
        return Promise.all([...this.objects.map((a) => a.load()), ...this.statics.map(a => a.obj.load())]);
    }
    renderf(time) {
        let arr = [];
        for (let obj of this.objects) {
            let rendered = obj.render_track(time);
            if (Array.isArray(rendered)) {
                arr.push(...rendered);
            }
            else {
                arr.push(rendered);
            }
        }
        for (let o of this.statics) {
            let rendered = o.obj.render_track(time);
            if (Array.isArray(rendered)) {
                arr.push(...rendered);
            }
            else {
                arr.push(rendered);
            }
        }
        return arr;
    }
    delete() {
        for (let a of this.objects) {
            a.delete();
        }
        for (let a of this.statics) {
            a.obj.delete();
        }
        super.delete();
    }
    statef(time) {
        for (let obj of this.objects) {
            obj.statef(time);
        }
        for (let a of this.statics) {
            a.obj.statef(time);
            let obj_st = a.obj.state;
            let st = this.state;
            obj_st.position.x = st.position.x + a.x;
            obj_st.position.y = st.position.y + a.y;
        }
    }
    collides_with_box(a) {
        for (let obj of this.objects) {
            if (obj.collides_with_box(a))
                return true;
        }
        for (let o of this.statics) {
            if (o.obj.collides_with_box(a))
                return true;
        }
        return false;
    }
}
exports.composite_obj = composite_obj;
class static_obj {
    constructor() {
        this.sprite_url = "";
    }
}
exports.static_obj = static_obj;
class gravity_obj extends obj {
    constructor() {
        super(...arguments);
        this.gravity = true;
    }
}
exports.gravity_obj = gravity_obj;


/***/ }),

/***/ "./src/lib/rand.ts":
/*!*************************!*\
  !*** ./src/lib/rand.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandInt = void 0;
function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
exports.getRandInt = getRandInt;


/***/ }),

/***/ "./src/lib/render.ts":
/*!***************************!*\
  !*** ./src/lib/render.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.rect_renderer = exports.stroked_rect_renderer = exports.sprite_renderer = exports.text_renderer = exports.renderer = exports.Camera = void 0;
const van_1 = __webpack_require__(/*! ../van */ "./src/van.ts");
class Camera {
    constructor(x, y, width, height, scaling, v) {
        this.state = {
            scaling,
            position: {
                x: x * scaling,
                y: y * scaling
            },
            dimensions: {
                width: width * scaling,
                height: height * scaling
            },
            viewport: v
        };
    }
    set x(x) {
        this.state.position.x = x;
    }
    set y(y) {
        this.state.position.y = y;
    }
    get x() {
        return this.state.position.x;
    }
    get y() {
        return this.state.position.y;
    }
}
exports.Camera = Camera;
var renderer;
(function (renderer) {
    renderer[renderer["text"] = 0] = "text";
    renderer[renderer["sprite"] = 1] = "sprite";
    renderer[renderer["rect"] = 2] = "rect";
    renderer[renderer["stroke_rect"] = 3] = "stroke_rect";
})(renderer = exports.renderer || (exports.renderer = {}));
exports.text_renderer = (r, s) => {
    let vheight = van_1.GetViewportDimensions().height;
    r.context.font = `${s.font.size}px ${s.font.font}`;
    r.context.fillStyle = s.font.color;
    r.context.textAlign = s.font.align;
    if (s.font.max_width) {
        r.context.fillText(s.font.text, s.x, vheight - s.y, s.font.max_width);
    }
    else {
        r.context.fillText(s.font.text, s.x, vheight - s.y);
    }
};
exports.sprite_renderer = (r, s) => {
    let camera = r.camera;
    let vheight = r.camera.state.dimensions.height / r.camera.state.scaling;
    let final_x = ((s.x - camera.state.position.x + camera.state.dimensions.width / 2 - s.sprite.sprite_width / 2) * r.camera.state.scaling);
    let final_y = ((vheight - s.y - camera.state.dimensions.height / 2 - s.sprite.sprite_height / 2 + camera.state.position.y) * r.camera.state.scaling);
    let height = s.sprite.sprite_height * r.camera.state.scaling;
    let width = s.sprite.sprite_width * r.camera.state.scaling;
    let cut_off = 0;
    r.context.save();
    r.context.globalAlpha = s.sprite.opacity;
    r.context.translate(final_x + cut_off + (s.sprite.sprite_width - cut_off) / 2, final_y + s.sprite.sprite_height / 2);
    let radians = s.rotation * (Math.PI / 180);
    r.context.rotate(radians);
    r.context.drawImage(s.sprite.sprite_sheet, s.sprite.left + cut_off, s.sprite.top, (s.sprite.sprite_width - cut_off), s.sprite.sprite_height, -(s.sprite.sprite_width - cut_off) / 2, -s.sprite.sprite_height / 2, width - cut_off, height);
    r.context.restore();
};
exports.stroked_rect_renderer = (context, rect, x, y, color, camera) => {
    let vheight = camera.state.dimensions.height / camera.state.scaling;
    let final_x = ((x - camera.state.position.x + camera.state.dimensions.width / 2 - rect.width / 2) * camera.state.scaling);
    let final_y = ((vheight - y - rect.height / 2 - camera.state.dimensions.height / 2 + camera.state.position.y) * camera.state.scaling);
    let height = rect.height * camera.state.scaling;
    let width = rect.width * camera.state.scaling;
    context.strokeStyle = color;
    context.strokeRect(final_x, final_y, rect.width, height);
};
exports.rect_renderer = (context, rect, x, y, color, camera) => {
    let vheight = camera.state.dimensions.height / camera.state.scaling;
    let final_x = ((x - camera.state.position.x + camera.state.dimensions.width / 2 - rect.width / 2) * camera.state.scaling);
    let final_y = ((vheight - y - rect.height / 2 - camera.state.dimensions.height / 2 + camera.state.position.y) * camera.state.scaling);
    let height = rect.height * camera.state.scaling;
    let width = rect.width * camera.state.scaling;
    context.strokeStyle = color;
    context.fillRect(final_x, final_y, rect.width, height);
};


/***/ }),

/***/ "./src/lib/room.ts":
/*!*************************!*\
  !*** ./src/lib/room.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.room = exports.apply_gravity = void 0;
const sprite_1 = __webpack_require__(/*! ./sprite */ "./src/lib/sprite.ts");
const collision_1 = __webpack_require__(/*! ./collision */ "./src/lib/collision.ts");
const van_1 = __webpack_require__(/*! ../van */ "./src/van.ts");
const controls_1 = __webpack_require__(/*! ./controls */ "./src/lib/controls.ts");
const audio_1 = __webpack_require__(/*! ./audio */ "./src/lib/audio.ts");
function apply_gravity(ob, grav_const, grav_max) {
    let st = ob.state;
    if (ob.gravity && st.velocity.y > grav_max) {
        st.velocity.y += grav_const;
    }
}
exports.apply_gravity = apply_gravity;
class room {
    constructor() {
        this.objects = [];
        this.particles = {};
        this.particles_arr = [];
        this.audio = new audio_1.audio();
    }
    load() {
        let _this = this;
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let a = new Image();
            let to_await = this.objects.map((a) => a.load());
            yield Promise.all(to_await);
            a.src = this.background_url;
            a.onerror = (() => {
                console.log("error loading url:" + this.background_url);
            });
            a.onload = (() => __awaiter(this, void 0, void 0, function* () {
                _this.background = a;
                yield this.audio.load();
                resolve();
            }));
        }));
    }
    addItem(o, list = this.objects) {
        return __awaiter(this, void 0, void 0, function* () {
            yield o.load();
            list.push(o);
        });
    }
    addItems(o, list = this.objects) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(o.map((a) => a.load()));
            list.push(...o);
        });
    }
    deleteItem(id, list = this.objects) {
        for (let a = 0; a < list.length; a++) {
            if (list[a].id === id) {
                list.splice(a, 1);
                a--;
            }
        }
    }
    registerParticles() {
    }
    registerHUD() {
        return undefined;
    }
    bindControl(key, x, func, interval = 1) {
        controls_1.Bind(key, func, x, interval);
    }
    check_collisions(box, exempt) {
        if (van_1.DEBUG) {
            van_1.render_collision_box(box);
        }
        return collision_1.check_all_collisions(box, this.objects, exempt);
    }
    check_objects(box, exempt, list = this.objects) {
        if (van_1.DEBUG) {
            van_1.render_collision_box(box);
        }
        return collision_1.check_all_objects(box, list, exempt);
    }
    register_controls() {
    }
    cleanup() {
    }
    statef(time) {
        for (let a = 0; a < this.objects.length; a++) {
            this.objects[a].statef(time);
        }
    }
    emit_particle(name, pos, lifetime, pos_range) {
        this.addItem(new sprite_1.Particle(this.particles[name], pos, lifetime, pos_range), this.particles_arr);
    }
    getObj(id) {
        for (let a = 0; a < this.objects.length; a++) {
            if (this.objects[a].id == id) {
                return this.objects[a];
            }
        }
        return null;
    }
    getObjByTag(tag) {
        return this.objects.filter((a) => a.tags.indexOf(tag) > -1);
    }
    renderf(time) {
        return {
            sprite_sheet: this.background,
            left: 0,
            top: 0,
            sprite_height: this.background.height,
            sprite_width: this.background.width,
            opacity: 1
        };
    }
}
exports.room = room;


/***/ }),

/***/ "./src/lib/sprite.ts":
/*!***************************!*\
  !*** ./src/lib/sprite.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.sprite_gen = exports.Particle = void 0;
const object_1 = __webpack_require__(/*! ./object */ "./src/lib/object.ts");
const rand_1 = __webpack_require__(/*! ./rand */ "./src/lib/rand.ts");
const van_1 = __webpack_require__(/*! ../van */ "./src/van.ts");
class Particle extends object_1.obj {
    constructor(part, pos, lifetime, random_range) {
        super();
        this.collision = false;
        this.state = {
            lifetime: 0,
            position: {
                x: pos.x + rand_1.getRandInt(-random_range, random_range),
                y: pos.y + rand_1.getRandInt(-random_range, random_range)
            },
            velocity: {
                x: 0,
                y: 0
            }
        };
        this.sprite_url = part.sprite;
        this.height = part.height;
        this.width = part.width;
        this.max_lifetime = lifetime;
        this.random_range = random_range;
    }
    delete() {
        let room = van_1.getGame().getRoom();
        room.deleteItem(this.id, room.particles_arr);
    }
    statef(time) {
        this.state.lifetime += time;
        if (this.state.lifetime > this.max_lifetime) {
            this.delete();
        }
    }
    renderf(time) {
        if (!this.selected_sprite) {
            let sprites = sprite_gen(this.sprite_sheet, this.width, this.height);
            let random_row = rand_1.getRandInt(0, sprites.length);
            let random_col = rand_1.getRandInt(0, sprites[random_row].length);
            this.selected_sprite = sprites[random_row][random_col];
        }
        this.selected_sprite.opacity = 1 - this.state.lifetime / this.max_lifetime;
        return {
            x: this.state.position.x,
            y: this.state.position.y,
            sprite: this.selected_sprite
        };
    }
}
exports.Particle = Particle;
function sprite_gen(sprite_sheet, sprite_width, sprite_height) {
    let width = sprite_sheet.width;
    let height = sprite_sheet.height;
    let sprites = [];
    for (let b = 0; b < height; b += sprite_height) {
        sprites.push([]);
        for (let a = 0; a < width; a += sprite_width) {
            sprites[b].push({
                sprite_sheet,
                left: a,
                top: b * sprite_height,
                sprite_height,
                sprite_width,
                opacity: 1
            });
        }
    }
    return sprites;
}
exports.sprite_gen = sprite_gen;


/***/ }),

/***/ "./src/lib/state.ts":
/*!**************************!*\
  !*** ./src/lib/state.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.position_init = void 0;
function position_init() {
    return {
        position: {
            x: 0,
            y: 0
        },
        velocity: {
            x: 0,
            y: 0
        }
    };
}
exports.position_init = position_init;


/***/ }),

/***/ "./src/van.ts":
/*!********************!*\
  !*** ./src/van.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGame = exports.game = exports.deep = exports.render_collision_box = exports.setDebug = exports.GetViewportDimensions = exports.GetScreenDimensions = exports.DEBUG = void 0;
exports.DEBUG = false;
const render_1 = __webpack_require__(/*! ./lib/render */ "./src/lib/render.ts");
const controls_1 = __webpack_require__(/*! ./lib/controls */ "./src/lib/controls.ts");
const overworld_1 = __webpack_require__(/*! ./game/rooms/overworld */ "./src/game/rooms/overworld.ts");
let canvas_element = document.getElementById("target");
let context = canvas_element.getContext("2d");
let screen_width = window.innerWidth;
let screen_height = window.innerHeight;
let vwidth = canvas_element.width;
let vheight = canvas_element.height;
//How often the game logic loop should run, in milliseconds
let logic_loop_interval = 1000 / 60;
let last_time = new Date();
let last_render_time = 0;
function GetScreenDimensions() {
    return ({
        width: screen_width,
        height: screen_height
    });
}
exports.GetScreenDimensions = GetScreenDimensions;
function GetViewportDimensions() {
    return ({
        height: vheight,
        width: vwidth
    });
}
exports.GetViewportDimensions = GetViewportDimensions;
function setDebug(x) {
    exports.DEBUG = x;
}
exports.setDebug = setDebug;
exports.render_collision_box = (a) => {
    boxes.push(a);
};
let boxes = [];
exports.deep = (a) => {
    return JSON.parse(JSON.stringify(a));
};
class game {
    constructor(ctx, a) {
        this.state = {
            canvas: canvas_element,
            logic: undefined,
            context: ctx,
            cameras: [new render_1.Camera(0, 0, vwidth / 2, vheight, 1, {
                    x: 0,
                    y: 0,
                    width: 0.5,
                    height: 0.5
                }),
                new render_1.Camera(0, 100, vwidth / 2, vheight / 2, 1, {
                    x: vwidth / 2,
                    y: 0,
                    width: 0.5,
                    height: 0.5
                }),
                new render_1.Camera(0, 100, vwidth / 2, vheight / 2, 1, {
                    x: vwidth / 2,
                    y: vheight / 2,
                    width: 0.5,
                    height: 0.5
                })
            ],
            current_room: undefined,
            player_state: {
                power: 0
            }
        };
        this.offscreen_canvas = document.createElement("canvas");
        this.offscreen_context = this.offscreen_canvas.getContext("2d");
        this.loadRoom(a);
    }
    render(t) {
        let time = t - last_render_time;
        last_render_time = t;
        for (let camera of this.state.cameras) {
            this.offscreen_canvas.height = camera.state.dimensions.height;
            this.offscreen_canvas.width = camera.state.dimensions.width;
            this.offscreen_context.clearRect(0, 0, camera.state.dimensions.width, camera.state.dimensions.height);
            this.offscreen_context.fillStyle = "black";
            this.offscreen_context.fillRect(0, 0, camera.state.dimensions.width, camera.state.dimensions.height);
            let camera_box = {
                x: camera.state.position.x,
                y: camera.state.position.y,
                width: camera.state.dimensions.width,
                height: camera.state.dimensions.height
            };
            let particle_collides = this.state.current_room.check_objects(camera_box, [], this.state.current_room.particles_arr);
            let camera_colliders = [...this.state.current_room.check_objects(camera_box), ...particle_collides];
            let render_args = {
                context: this.offscreen_context,
                camera: camera,
            };
            render_1.sprite_renderer(render_args, {
                sprite: this.state.current_room.renderf(time),
                x: 0,
                y: 0,
                rotation: 0
            });
            let hitboxes = [];
            for (let a of camera_colliders.filter((b) => b.render)) {
                let rendered = a.render_track(t);
                if (Array.isArray(rendered)) {
                    for (let positioned_sprite of rendered)
                        render_1.sprite_renderer(render_args, {
                            sprite: positioned_sprite.sprite,
                            x: positioned_sprite.x,
                            y: positioned_sprite.y,
                            rotation: a.rotation
                        });
                }
                else {
                    let positioned_sprite = rendered;
                    render_1.sprite_renderer(render_args, {
                        sprite: positioned_sprite.sprite,
                        x: positioned_sprite.x,
                        y: positioned_sprite.y,
                        rotation: a.rotation
                    });
                }
                if (exports.DEBUG && a.collision) {
                    hitboxes.push(a.create_collision_box());
                }
            }
            if (exports.DEBUG) {
                let box;
                let boxes_copy = [...boxes];
                while (boxes_copy.length > 0) {
                    let box = boxes_copy.pop();
                    let rect = {
                        width: box.width,
                        height: box.height
                    };
                    render_1.stroked_rect_renderer(this.offscreen_context, rect, box.x, box.y, "#FF0000", camera);
                }
                while (hitboxes.length > 0) {
                    let box = hitboxes.pop();
                    let rect = {
                        width: box.width,
                        height: box.height
                    };
                    render_1.stroked_rect_renderer(this.offscreen_context, rect, box.x, box.y, "#008000", camera);
                }
            }
            if (this.state.current_room.hud) {
                let graphics = this.state.current_room.hud.graphic_elements;
                let text_elements = this.state.current_room.hud.text_elements;
                for (let a of graphics) {
                    let rendered = a.render_track(t);
                    if (Array.isArray(rendered) && a.render) {
                        for (let positioned_sprite of rendered) {
                            render_1.sprite_renderer(render_args, {
                                sprite: positioned_sprite.sprite,
                                x: positioned_sprite.x,
                                y: positioned_sprite.y,
                                rotation: a.rotation
                            });
                        }
                    }
                    else if (a.render) {
                        let pos = rendered;
                        render_1.sprite_renderer(render_args, {
                            sprite: pos.sprite,
                            x: pos.x,
                            y: pos.y,
                            rotation: a.rotation
                        });
                    }
                }
                render_args.context = this.state.context;
                for (let a of text_elements) {
                    let st = a.state;
                    render_1.text_renderer(render_args, {
                        x: st.position.x,
                        y: st.position.y,
                        font: a.renderf(t)
                    });
                }
            }
            this.state.context.drawImage(this.offscreen_canvas, camera.state.viewport.x, camera.state.viewport.y);
        }
        if (exports.DEBUG)
            boxes = [];
        requestAnimationFrame((a) => { this.render(a); });
    }
    start_logic(a) {
        return setInterval(() => {
            let new_time = new Date();
            let time_since = new_time.getTime() - last_time.getTime();
            last_time = new_time;
            this.state.current_room.statef(time_since);
            if (this.state.current_room.hud) {
                this.state.current_room.hud.statef(time_since);
            }
            controls_1.ExecuteRepeatBinds(a);
        }, a);
    }
    getRoom() {
        return this.state.current_room;
    }
    loadRoom(x) {
        return __awaiter(this, void 0, void 0, function* () {
            x.hud = x.registerHUD();
            if (this.state.current_room !== undefined) {
                while (this.state.current_room.objects.length > 0) {
                    this.state.current_room.objects[0].delete();
                }
            }
            let new_room = yield x.load();
            x.register_controls();
            x.registerParticles();
            this.state.current_room = x;
            if (this.state.logic != undefined) {
                clearInterval(this.state.logic);
            }
            this.state.logic = this.start_logic(logic_loop_interval);
            this.render(0);
        });
    }
}
exports.game = game;
let game_inst = new game(context, new overworld_1.Overworld());
function getGame() {
    return game_inst;
}
exports.getGame = getGame;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvb2JqZWN0cy9ib3gudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvb2JqZWN0cy9idWxsZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvb2JqZWN0cy9nb29tYmEudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvb2JqZWN0cy9wbGF0Zm9ybWVyX29iai50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9vYmplY3RzL3RhcmdldC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9yb29tcy9vdmVyd29ybGQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9hdWRpby50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2NvbGxpc2lvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2NvbnRyb2xzLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvaHVkLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvb2JqZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvcmFuZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3JlbmRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3Jvb20udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9zcHJpdGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9zdGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JB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QyxFQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RyxDQUFDO0lBQ0QsWUFBWSxDQUFDLENBQWU7UUFDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBbUIsQ0FBQztRQUM1QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBNkIsQ0FBQztRQUMvQyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2VBQzdFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3JGLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFO1NBQ3pIO1FBQ0QsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFR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QUFHLENBQUM7QUFFcEQsU0FBZ0IsT0FBTztJQUNyQixPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDO0FBRkQsMEJBRUMiLCJmaWxlIjoidmFuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvdmFuLnRzXCIpO1xuIiwiaW1wb3J0IHtwbGF0Zm9ybWVyX29iaixwbGF0X3N0YXRlfSBmcm9tIFwiLi9wbGF0Zm9ybWVyX29ialwiO1xyXG5pbXBvcnQge29ial9zdGF0ZX0gZnJvbSBcIi4uLy4uL2xpYi9zdGF0ZVwiO1xyXG5pbXBvcnQgeyBleGVjX3R5cGUgfSBmcm9tIFwiLi4vLi4vbGliL2NvbnRyb2xzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQm94IGV4dGVuZHMgcGxhdGZvcm1lcl9vYmo8cGxhdF9zdGF0ZT57XHJcbiAgc3ByaXRlX3VybCA9IFwiLi9zcHJpdGVzL2JveC5wbmdcIlxyXG4gIGNvbGxpc2lvbiA9IHRydWVcclxuICBoZWlnaHQgPSA2NDtcclxuICB3aWR0aCA9IDUwMDtcclxuICBncmF2aXR5ID0gZmFsc2U7XHJcbiAgZW5lbXkgPSB0cnVlO1xyXG4gIHRhZ3MgPSBbXCJzdGF0aWNcIl1cclxuICBjb25zdHJ1Y3Rvcih4Om51bWJlciwgeTpudW1iZXIsIGlkOnN0cmluZyA9IHVuZGVmaW5lZCl7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgaWYoaWQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgcG9zaXRpb246e1xyXG4gICAgICAgIHgsXHJcbiAgICAgICAgeVxyXG4gICAgICB9LFxyXG4gICAgICB2ZWxvY2l0eTp7XHJcbiAgICAgICAgeDowLFxyXG4gICAgICAgIHk6MFxyXG4gICAgICB9LFxyXG4gICAgICBoZWFsdGg6MTAwMFxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5leHBvcnQgY2xhc3MgVmVydEJveCBleHRlbmRzIEJveHtcclxuICBzcHJpdGVfdXJsID0gXCIuL3Nwcml0ZXMvYm94Mi5wbmdcIjtcclxuICB3aWR0aCA9IDY0O1xyXG4gIGhlaWdodCA9IDUwMDtcclxufSIsImltcG9ydCB7cGxhdGZvcm1lcl9vYmosIHBsYXRfc3RhdGV9IGZyb20gXCIuL3BsYXRmb3JtZXJfb2JqXCI7XHJcbmltcG9ydCB7b2JqX3N0YXRlfSBmcm9tIFwiLi4vLi4vbGliL3N0YXRlXCI7XHJcbmltcG9ydCB7IGV4ZWNfdHlwZSB9IGZyb20gXCIuLi8uLi9saWIvY29udHJvbHNcIjtcclxuaW1wb3J0IHtyb3RhdGlvbl9sZW5ndGgsIG9ian0gZnJvbSBcIi4uLy4uL2xpYi9vYmplY3RcIjtcclxuaW1wb3J0IHtnZXRHYW1lfSBmcm9tIFwiLi4vLi4vdmFuXCI7XHJcbmltcG9ydCB7IEdvb21iYSB9IGZyb20gXCIuL2dvb21iYVwiO1xyXG5cclxuaW50ZXJmYWNlIGJ1bGxldF9zdGF0ZSBleHRlbmRzIG9ial9zdGF0ZXtcclxuICByb3RhdGlvbjpudW1iZXIsXHJcbiAgZGlzdGFuY2U6bnVtYmVyLFxyXG4gIHNwZWVkOm51bWJlcixcclxuICBkYW1hZ2U6bnVtYmVyXHJcbn1cclxuXHJcbmludGVyZmFjZSBwb3NpdGlvbntcclxuICB4Om51bWJlcixcclxuICB5Om51bWJlclxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQnVsbGV0IGV4dGVuZHMgb2JqPGJ1bGxldF9zdGF0ZT57XHJcbiAgc3ByaXRlX3VybCA9IFwiLi9zcHJpdGVzL2J1bGxldC5wbmdcIjtcclxuICBoZWlnaHQgPSAyMDtcclxuICB3aWR0aCA9IDEwO1xyXG4gIGdyYXZpdHkgPSBmYWxzZTtcclxuICBtYXhfZGlzdGFuY2UgPSAyMDAwO1xyXG4gIHRhZ3MgPSBbXCJidWxsZXRcIl07XHJcbiAgY29uc3RydWN0b3IoeDpbbnVtYmVyLG51bWJlcl0sIGFuZ2xlOm51bWJlciwgaWQ6c3RyaW5nID0gdW5kZWZpbmVkKXtcclxuICAgIHN1cGVyKCk7XHJcbiAgICBpZihpZCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBwb3NpdGlvbjp7XHJcbiAgICAgICAgeDp4WzBdLFxyXG4gICAgICAgIHk6eFsxXVxyXG4gICAgICB9LFxyXG4gICAgICB2ZWxvY2l0eTp7XHJcbiAgICAgICAgeDowLFxyXG4gICAgICAgIHk6MFxyXG4gICAgICB9LFxyXG4gICAgICBzcGVlZDoxMCxcclxuICAgICAgcm90YXRpb246YW5nbGUsXHJcbiAgICAgIGRpc3RhbmNlOjAsXHJcbiAgICAgIGRhbWFnZTo1XHJcbiAgICB9XHJcbiAgICB0aGlzLnJvdGF0aW9uID0gYW5nbGU7XHJcbiAgfVxyXG4gIHN0YXRlZih0aW1lOm51bWJlcil7XHJcbiAgICB0aGlzLnN0YXRlLnZlbG9jaXR5ID0gcm90YXRpb25fbGVuZ3RoKHRoaXMuc3RhdGUuc3BlZWQsdGhpcy5zdGF0ZS5yb3RhdGlvbik7XHJcbiAgICB0aGlzLnN0YXRlLmRpc3RhbmNlICs9IHRoaXMuc3RhdGUuc3BlZWQ7XHJcbiAgICBpZih0aGlzLnN0YXRlLmRpc3RhbmNlID4gdGhpcy5tYXhfZGlzdGFuY2Upe1xyXG4gICAgICB0aGlzLmRlbGV0ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZWdpc3Rlcl9jb250cm9scygpe1xyXG5cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSb2NrZXQgZXh0ZW5kcyBCdWxsZXR7XHJcbiAgc3ByaXRlX3VybCA9IFwiLi9zcHJpdGVzL2ZvbGRlci9yb2NrZXQucG5nXCI7XHJcbiAgaGVpZ2h0ID0gNjc7XHJcbiAgd2lkdGggPSAxNjtcclxuICBwYXJ0aWNsZV90aW1lciA9IDA7XHJcbiAgcGFydGljbGVfZnJlcXVlbmN5ID0gNTtcclxuICB0YWdzID0gW1wiUm9ja2V0XCJdXHJcbiAgaGl0Ym94ID0ge1xyXG4gICAgeF9vZmZzZXQ6MCxcclxuICAgIHlfb2Zmc2V0OjAsXHJcbiAgICB3aWR0aDoxNixcclxuICAgIGhlaWdodDoxNlxyXG4gIH1cclxuICBjb25zdHJ1Y3Rvcih4OltudW1iZXIsbnVtYmVyXSxhbmdsZTpudW1iZXIpe1xyXG4gICAgc3VwZXIoeCxhbmdsZSk7XHJcbiAgICB0aGlzLnN0YXRlLnNwZWVkID0gMTU7XHJcbiAgICB0aGlzLnN0YXRlLmRhbWFnZSA9IDIwO1xyXG4gIH1cclxuICByZWdpc3Rlcl9hdWRpbygpe1xyXG4gICAgdGhpcy5hdWRpby5hZGQoXCJleHBsb3Npb25cIixcIi4vc291bmRzL2V4cGxvc2lvbjIubXAzXCIpO1xyXG4gIH1cclxuICBzdGF0ZWYodGltZTpudW1iZXIpe1xyXG4gICAgc3VwZXIuc3RhdGVmKHRpbWUpO1xyXG4gICAgaWYodGhpcy5wYXJ0aWNsZV90aW1lciA9PSAwKXtcclxuICAgICAgbGV0IG9mZnNldCA9IHJvdGF0aW9uX2xlbmd0aCgzMCx0aGlzLnJvdGF0aW9uICsgMTgwKTtcclxuICAgICAgdGhpcy5lbWl0X3BhcnRpY2xlKFwic21va2VcIixvZmZzZXQsIDQwMCwgMTIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5wYXJ0aWNsZV90aW1lciArPSB0aW1lO1xyXG4gICAgaWYodGhpcy5wYXJ0aWNsZV90aW1lciA+IHRoaXMucGFydGljbGVfZnJlcXVlbmN5KXtcclxuICAgICB0aGlzLnBhcnRpY2xlX3RpbWVyID0gMDsgXHJcbiAgICB9XHJcbiAgICBsZXQgcm9vbSA9IGdldEdhbWUoKS5zdGF0ZS5jdXJyZW50X3Jvb207XHJcbiAgICBsZXQgY29sbGlzaW9ucyA9IHJvb20uY2hlY2tfY29sbGlzaW9ucyh0aGlzLmNyZWF0ZV9jb2xsaXNpb25fYm94KCksW1wiZ3VuXCIsXCJwbGF5ZXJcIl0pO1xyXG4gICAgaWYoY29sbGlzaW9ucy5sZW5ndGggPiAwKXtcclxuICAgICAgZm9yKGxldCBjb2xsaXNpb24gb2YgY29sbGlzaW9ucyl7XHJcbiAgICAgICAgbGV0IHN0ID0gY29sbGlzaW9uLnN0YXRlIGFzIHVua25vd24gYXMgcGxhdF9zdGF0ZTtcclxuICAgICAgICBpZigoPHBsYXRmb3JtZXJfb2JqPG9ial9zdGF0ZT4+Y29sbGlzaW9uKS5lbmVteSl7XHJcbiAgICAgICAgICBzdC5oZWFsdGggLT0gdGhpcy5zdGF0ZS5kYW1hZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGNvbGxpc2lvbi50YWdzLmluZGV4T2YoXCJkdW1teVwiKSA+IC0xKXtcclxuICAgICAgICAgIGxldCBkdW1teSA9IGNvbGxpc2lvbiBhcyBHb29tYmE7XHJcbiAgICAgICAgICBpZihkdW1teS5zdGF0ZS5qdW1waW5nKXtcclxuICAgICAgICAgICAgZHVtbXkuc3RhdGUudGltZXNfYWlyc2hvdCsrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0aGlzLnN0YXRlLmRpc3RhbmNlID0gdGhpcy5tYXhfZGlzdGFuY2U7XHJcbiAgICAgIHRoaXMuZGVsZXRlKCk7XHJcbiAgICAgIGxldCBleHBsb3Npb25fY29sbGlzaW9ucyA9IHJvb20uY2hlY2tfY29sbGlzaW9ucyh7XHJcbiAgICAgICAgeDp0aGlzLnN0YXRlLnBvc2l0aW9uLngsXHJcbiAgICAgICAgeTp0aGlzLnN0YXRlLnBvc2l0aW9uLnksXHJcbiAgICAgICAgd2lkdGg6NjQsXHJcbiAgICAgICAgaGVpZ2h0OjY0XHJcbiAgICAgIH0sW1wic3RhdGljXCJdKVxyXG4gICAgICBmb3IobGV0IGNvbGxpZGVyIG9mIGV4cGxvc2lvbl9jb2xsaXNpb25zKXtcclxuICAgICAgICBsZXQgZGlzdGFuY2UgPSB0aGlzLmRpc3RhbmNlKGNvbGxpZGVyKTtcclxuICAgICAgICBsZXQgbXVsdGlwbHllciA9IDEgLSBkaXN0YW5jZS8zMjtcclxuICAgICAgICBsZXQgb19zdGF0ZSA9IGNvbGxpZGVyLnN0YXRlIGFzIG9ial9zdGF0ZTtcclxuICAgICAgICBsZXQgdmVsb2NpdGllcyA9IHJvdGF0aW9uX2xlbmd0aChtdWx0aXBseWVyICogNDAsIDE4MCArIHRoaXMuYW5nbGVUb3dhcmRzKGNvbGxpZGVyKSk7XHJcbiAgICAgICAgb19zdGF0ZS52ZWxvY2l0eS54ICs9IHZlbG9jaXRpZXMueDtcclxuICAgICAgICBvX3N0YXRlLnZlbG9jaXR5LnkgKz0gdmVsb2NpdGllcy55O1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZW1pdF9wYXJ0aWNsZShcImV4cGxvc2lvblwiLHt4OjAseTowfSw1MDAsMCk7XHJcbiAgICAgIHRoaXMuYXVkaW8ucGxheShcImV4cGxvc2lvblwiLDAuMik7XHJcbiAgICB9XHJcbiAgfVxyXG59IiwiaW1wb3J0IHt2ZWxvY2l0eSxvYmpfc3RhdGUscG9zaXRpb25faW5pdCxzdGF0ZV9mdW5jfSBmcm9tIFwiLi4vLi4vbGliL3N0YXRlXCI7XHJcbmltcG9ydCB7c3ByaXRlLHNwcml0ZV9nZW59IGZyb20gXCIuLi8uLi9saWIvc3ByaXRlXCI7XHJcbmltcG9ydCB7b2JqLHJvdGF0aW9uX2xlbmd0aCwgY29tcG9zaXRlX29ian0gZnJvbSBcIi4uLy4uL2xpYi9vYmplY3RcIjtcclxuaW1wb3J0IHtwbGF0Zm9ybWVyX29iaixwbGF0Zm9ybWVyX29ial9jb21wb3NpdGUscGxhdF9zdGF0ZX0gZnJvbSBcIi4vcGxhdGZvcm1lcl9vYmpcIjtcclxuaW1wb3J0IHtQb2xsX01vdXNlLCBleGVjX3R5cGV9IGZyb20gXCIuLi8uLi9saWIvY29udHJvbHNcIjtcclxuaW1wb3J0IHtjb2xsaXNpb25fYm94fSBmcm9tIFwiLi4vLi4vbGliL2NvbGxpc2lvblwiO1xyXG5pbXBvcnQge0JpbmR9IGZyb20gXCIuLi8uLi9saWIvY29udHJvbHNcIjtcclxuXHJcbmltcG9ydCB7T3ZlcndvcmxkfSBmcm9tIFwiLi4vcm9vbXMvb3ZlcndvcmxkXCI7XHJcbmltcG9ydCB7Z2V0R2FtZX0gZnJvbSBcIi4uLy4uL3ZhblwiO1xyXG5cclxuZW51bSBkaXJlY3Rpb257XHJcbiAgbGVmdCxcclxuICByaWdodFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIGdvb21iYV9zdGF0ZSBleHRlbmRzIG9ial9zdGF0ZSxwbGF0X3N0YXRle1xyXG4gIGRpcmVjdGlvbjogZGlyZWN0aW9uLFxyXG4gIHZlbG9jaXR5OnZlbG9jaXR5LFxyXG4gIGp1bXBpbmc6Ym9vbGVhbixcclxuICB0aW1lc19haXJzaG90Om51bWJlcixcclxuICBtYXhfdGltZXNfYWlyc2hvdDpudW1iZXJcclxufVxyXG5cclxuaW50ZXJmYWNlIGd1bl9zdGF0ZSBleHRlbmRzIG9ial9zdGF0ZXtcclxuICByb3RhdGlvbjpudW1iZXIgIFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmlnU3RhbmRpbmcgZXh0ZW5kcyBjb21wb3NpdGVfb2JqPHt9PntcclxuICBjb2xsaXNpb24gPSB0cnVlO1xyXG4gIGVuZW15ID0gdHJ1ZTtcclxuICBncmFjaXR5ID0gdHJ1ZTtcclxuICBjb25zdHJ1Y3RvcihhOltudW1iZXIsbnVtYmVyXSl7XHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIHRoaXMuc3RhdGljcy5wdXNoKHtcclxuICAgICAgeDowLFxyXG4gICAgICB5OjAsXHJcbiAgICAgIG9iajpuZXcgU3RhbmRpbmdHb29tYmEoMCwwKVxyXG4gICAgfSlcclxuICAgIHRoaXMuc3RhdGljcy5wdXNoKHtcclxuICAgICAgeDoyNTAsXHJcbiAgICAgIHk6MCxcclxuICAgICAgb2JqOm5ldyBTdGFuZGluZ0dvb21iYSgwLDApXHJcbiAgICB9KVxyXG4gIH1cclxuICBzdGF0ZWYodDpudW1iZXIpe1xyXG5cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBHdW4gZXh0ZW5kcyBwbGF0Zm9ybWVyX29iajxndW5fc3RhdGU+e1xyXG4gIHNwcml0ZV91cmwgPSBcIi4vc3ByaXRlcy9mb2xkZXIvZ3VuLnBuZ1wiO1xyXG4gIGhlaWdodCA9IDUwO1xyXG4gIHdpZHRoID0gMjA7XHJcbiAgY29sbGlzaW9uID0gZmFsc2U7XHJcbiAgcmVuZGVyID0gdHJ1ZTtcclxuICBwbGF5ZXI6R29vbWJhO1xyXG4gIGN1cnNvcjpDdXJzb3I7XHJcbiAgdGFncyA9IFtcImd1blwiXVxyXG4gIGNvbnN0cnVjdG9yKCl7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5pZCA9IFwiZ3VuXCI7XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBwb3NpdGlvbjpwb3NpdGlvbl9pbml0KCkucG9zaXRpb24sXHJcbiAgICAgIHZlbG9jaXR5OnBvc2l0aW9uX2luaXQoKS52ZWxvY2l0eSxcclxuICAgICAgcm90YXRpb246LTFcclxuICAgIH1cclxuICB9XHJcbiAgc3RhdGVmKHQ6bnVtYmVyKXtcclxuICAgIGlmKCF0aGlzLnBsYXllcil7XHJcbiAgICAgIGxldCByb29tID0gZ2V0R2FtZSgpLmdldFJvb20oKTtcclxuICAgICAgdGhpcy5wbGF5ZXIgPSA8R29vbWJhPnJvb20uZ2V0T2JqKFwicGxheWVyXCIpO1xyXG4gICAgICB0aGlzLmN1cnNvciA9IDxDdXJzb3I+cm9vbS5nZXRPYmooXCJjdXJzb3JcIik7XHJcbiAgICB9XHJcbiAgICBsZXQgYW5nbGUgPSB0aGlzLnBsYXllci5hbmdsZVRvd2FyZHModGhpcy5jdXJzb3IpO1xyXG4gICAgbGV0IHJvdCA9IHJvdGF0aW9uX2xlbmd0aCg1MCxhbmdsZSk7XHJcbiAgICB0aGlzLnJvdGF0aW9uID0gYW5nbGU7XHJcbiAgICB0aGlzLnN0YXRlLnJvdGF0aW9uID0gYW5nbGU7XHJcbiAgICB0aGlzLnN0YXRlLnBvc2l0aW9uID0ge1xyXG4gICAgICB4OnJvdC54ICsgdGhpcy5wbGF5ZXIuc3RhdGUucG9zaXRpb24ueCxcclxuICAgICAgeTpyb3QueSArIHRoaXMucGxheWVyLnN0YXRlLnBvc2l0aW9uLnlcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDdXJzb3IgZXh0ZW5kcyBwbGF0Zm9ybWVyX29iajxvYmpfc3RhdGU+e1xyXG4gIHNwcml0ZV91cmwgPSBcIi4vc3ByaXRlcy9jdXJzb3IucG5nXCI7XHJcbiAgaGVpZ2h0ID0gNjQ7XHJcbiAgd2lkdGggPSA2NDtcclxuICBjb2xsaXNpb24gPSB0cnVlO1xyXG4gIHJlbmRlciA9IHRydWU7XHJcbiAgY29uc3RydWN0b3IoaWQ6c3RyaW5nKXtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBwb3NpdGlvbjp7XHJcbiAgICAgICAgeDowLFxyXG4gICAgICAgIHk6MFxyXG4gICAgICB9LFxyXG4gICAgICB2ZWxvY2l0eTp7XHJcbiAgICAgICAgeDowLFxyXG4gICAgICAgIHk6MFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHN0YXRlZigpe1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEdvb21iYSBleHRlbmRzIHBsYXRmb3JtZXJfb2JqPGdvb21iYV9zdGF0ZT57XHJcbiAgc3ByaXRlX3VybCA9IFwiLi9zcHJpdGVzL2ZvbGRlci9yb2JvdC5wbmdcIjtcclxuICBoZWlnaHQgPSAxNDk7XHJcbiAgd2lkdGggPSAxNDk7XHJcbiAgdGFncyA9IFtcImR1bW15XCJdXHJcbiAgY29sbGlzaW9uID0gdHJ1ZTtcclxuICBjb25zdHJ1Y3Rvcih4Om51bWJlcix5Om51bWJlcixpZDpzdHJpbmcgPSB1bmRlZmluZWQpe1xyXG4gICAgc3VwZXIoKTtcclxuICAgIGlmKGlkICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIH1cclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGRpcmVjdGlvbjpkaXJlY3Rpb24ubGVmdCxcclxuICAgICAgcG9zaXRpb246e1xyXG4gICAgICAgIHgsXHJcbiAgICAgICAgeVxyXG4gICAgICB9LFxyXG4gICAgICB2ZWxvY2l0eTp7XHJcbiAgICAgICAgeDowLFxyXG4gICAgICAgIHk6MFxyXG4gICAgICB9LFxyXG4gICAgICBqdW1waW5nOmZhbHNlLFxyXG4gICAgICBoZWFsdGg6MTAwLFxyXG4gICAgICB0aW1lc19haXJzaG90OjAsXHJcbiAgICAgIG1heF90aW1lc19haXJzaG90OjBcclxuICAgIH1cclxuICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KFwid2FsazFcIik7XHJcbiAgfVxyXG4gIHJlZ2lzdGVyX2FuaW1hdGlvbnMoKXtcclxuICAgIGxldCBzcHJpdGVzID0gc3ByaXRlX2dlbih0aGlzLnNwcml0ZV9zaGVldCx0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KTtcclxuICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoXCJ3YWxrMVwiLFtcclxuICAgICAgWzAsc3ByaXRlc1swXVswXV0sXHJcbiAgICAgIFsxMDAsc3ByaXRlc1swXVsxXV0sXHJcbiAgICAgIFs0MDAsc3ByaXRlc1swXVswXV0sXHJcbiAgICAgIFs1MDAsc3ByaXRlc1swXVsyXV1cclxuICAgIF0sODAwKVxyXG4gICAgdGhpcy5hbmltYXRpb25zLmFkZChcIndhbGsyXCIsW1xyXG4gICAgICBbMCxzcHJpdGVzWzBdWzVdXSxcclxuICAgICAgWzEwMCxzcHJpdGVzWzBdWzRdXSxcclxuICAgICAgWzQwMCxzcHJpdGVzWzBdWzVdXSxcclxuICAgICAgWzUwMCxzcHJpdGVzWzBdWzNdXVxyXG4gICAgXSw4MDApXHJcbiAgICB0aGlzLmFuaW1hdGlvbnMuYWRkKFwiaWRsZWxlZnRcIixbXHJcbiAgICAgIFswLHNwcml0ZXNbMF1bMF1dXHJcbiAgICBdLDEpO1xyXG4gICAgdGhpcy5hbmltYXRpb25zLmFkZCgnaWRsZXJpZ2h0JyxbXHJcbiAgICAgIFswLHNwcml0ZXNbMF1bNV1dIFxyXG4gICAgXSwxKTtcclxuICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoJ2ZhbGxsZWZ0JyxbXHJcbiAgICAgIFswLHNwcml0ZXNbMF1bNl1dXHJcbiAgICBdLDEpO1xyXG4gICAgdGhpcy5hbmltYXRpb25zLmFkZCgnZmFsbHJpZ2h0JyxbXHJcbiAgICAgIFswLHNwcml0ZXNbMF1bN11dXHJcbiAgICBdLDEpXHJcbiAgfVxyXG4gIHJlZ2lzdGVyX2F1ZGlvKCl7XHJcbiAgICB0aGlzLmF1ZGlvLmFkZChcInNsaW1lXCIsXCIuL3NvdW5kcy9nb29tYmEvc2xpbWViYWxsLndhdlwiKTtcclxuICAgIHRoaXMuYXVkaW8uYWRkKFwiZXhwbG9zaW9uXCIsXCIuL3NvdW5kcy9leHBsb3Npb24ubXAzXCIpXHJcbiAgfVxyXG4gIHJlbmRlcmYodDpudW1iZXIpe1xyXG4gICAgaWYodGhpcy5zdGF0ZS5qdW1waW5nKXtcclxuICAgICAgbGV0IGFuaW1hdGlvbiA9IHRoaXMuc3RhdGUuZGlyZWN0aW9uPT1kaXJlY3Rpb24ubGVmdCA/IFwiZmFsbGxlZnRcIiA6IFwiZmFsbHJpZ2h0XCI7XHJcbiAgICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KGFuaW1hdGlvbik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKHRoaXMuc3RhdGUudmVsb2NpdHkueCA9PSAwICYmIHRoaXMuc3RhdGUudmVsb2NpdHkueSA9PSAwKXtcclxuICAgICAgbGV0IGFuaW1hdGlvbiA9IHRoaXMuc3RhdGUuZGlyZWN0aW9uPT1kaXJlY3Rpb24ubGVmdCA/IFwiaWRsZWxlZnRcIiA6IFwiaWRsZXJpZ2h0XCI7XHJcbiAgICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KGFuaW1hdGlvbik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3VwZXIucmVuZGVyZih0KTtcclxuICB9XHJcbiAgc3RhdGVmKHRpbWU6bnVtYmVyKXtcclxuICAgIGxldCByb29tID0gZ2V0R2FtZSgpLmdldFJvb20oKTtcclxuICAgIGxldCBjdXJzb3IgPSByb29tLmdldE9iaihcImN1cnNvclwiKTtcclxuICAgIFxyXG4gICAgaWYocm9vbS5jaGVja19jb2xsaXNpb25zKHtcclxuICAgICAgd2lkdGg6dGhpcy53aWR0aCxcclxuICAgICAgaGVpZ2h0OjEsXHJcbiAgICAgIHg6dGhpcy5zdGF0ZS5wb3NpdGlvbi54LFxyXG4gICAgICB5OnRoaXMuc3RhdGUucG9zaXRpb24ueSAtIHRoaXMuaGVpZ2h0LzIgLSAxLFxyXG4gICAgfSkubGVuZ3RoID4gMCl7XHJcbiAgICAgIHRoaXMuc3RhdGUuanVtcGluZyA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnN0YXRlLm1heF90aW1lc19haXJzaG90ID0gTWF0aC5tYXgodGhpcy5zdGF0ZS50aW1lc19haXJzaG90LHRoaXMuc3RhdGUubWF4X3RpbWVzX2FpcnNob3QpO1xyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlLm1heF90aW1lc19haXJzaG90KTtcclxuICAgICAgdGhpcy5zdGF0ZS50aW1lc19haXJzaG90ID0gMDtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgIHRoaXMuc3RhdGUuanVtcGluZyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZih0aGlzLnN0YXRlLnZlbG9jaXR5LnkgPiAwKXtcclxuICAgICAgdGhpcy5zdGF0ZS52ZWxvY2l0eS55ID0gdGhpcy5zdGF0ZS52ZWxvY2l0eS55IC0gMC40ICogMTYgLyB0aW1lOztcclxuICAgICAgaWYodGhpcy5zdGF0ZS52ZWxvY2l0eS55IDwgMClcclxuICAgICAgICB0aGlzLnN0YXRlLnZlbG9jaXR5LnkgPSAwO1xyXG4gICAgfVxyXG4gICAgaWYodGhpcy5zdGF0ZS52ZWxvY2l0eS55IDwgMCl7XHJcbiAgICAgIHRoaXMuc3RhdGUudmVsb2NpdHkueSA9IHRoaXMuc3RhdGUudmVsb2NpdHkueSArIDAuNCAqIDE2IC8gdGltZTtcclxuICAgICAgaWYodGhpcy5zdGF0ZS52ZWxvY2l0eS55ID4gMClcclxuICAgICAgICB0aGlzLnN0YXRlLnZlbG9jaXR5LnkgPSAwO1xyXG4gICAgfVxyXG4gICAgaWYodGhpcy5zdGF0ZS52ZWxvY2l0eS54ID4gMCApe1xyXG4gICAgICB0aGlzLnN0YXRlLnZlbG9jaXR5LnggPSB0aGlzLnN0YXRlLnZlbG9jaXR5LnggLSAwLjQgKiAxNiAvIHRpbWU7O1xyXG4gICAgICBpZih0aGlzLnN0YXRlLnZlbG9jaXR5LnggPCAwKXtcclxuICAgICAgICB0aGlzLnN0YXRlLnZlbG9jaXR5LnggPSAwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKHRoaXMuc3RhdGUudmVsb2NpdHkueCA8IDApe1xyXG4gICAgICB0aGlzLnN0YXRlLnZlbG9jaXR5LnggPSB0aGlzLnN0YXRlLnZlbG9jaXR5LnggKyAwLjQgKiAxNiAvIHRpbWU7O1xyXG4gICAgICBpZih0aGlzLnN0YXRlLnZlbG9jaXR5LnggPiAwKXtcclxuICAgICAgICB0aGlzLnN0YXRlLnZlbG9jaXR5LnggPSAwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ29udHJvbGxlZFBsYXllciBleHRlbmRzIEdvb21iYXtcclxuICB0YWdzID0gW1wicGxheWVyXCJdXHJcbiAgcmVnaXN0ZXJfY29udHJvbHMoKXtcclxuICAgIHRoaXMuYmluZF9jb250cm9sKFwiS2V5QVwiLGV4ZWNfdHlwZS5yZXBlYXQsKCk9PntcclxuICAgICAgaWYodGhpcy5zdGF0ZS52ZWxvY2l0eS54ID4gLTEwKXtcclxuICAgICAgICB0aGlzLnN0YXRlLnZlbG9jaXR5LnggPSB0aGlzLnN0YXRlLnZlbG9jaXR5LnggLSAxO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMuYmluZF9jb250cm9sKFwiS2V5V1wiLGV4ZWNfdHlwZS5vbmNlLCgpPT57XHJcbiAgICAgIGlmKHRoaXMuc3RhdGUuZGlyZWN0aW9uID09IGRpcmVjdGlvbi5sZWZ0KXtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbnMucGxheShcIndhbGsxXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2VcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbnMucGxheShcIndhbGsyXCIpO1xyXG4gICAgICB0aGlzLnN0YXRlLnZlbG9jaXR5LnkgPSB0aGlzLnN0YXRlLnZlbG9jaXR5LnkgKyAwLjI7XHJcbiAgICB9KVxyXG4gICAgdGhpcy5iaW5kX2NvbnRyb2woXCJLZXlTXCIsZXhlY190eXBlLm9uY2UsKCk9PntcclxuICAgICAgaWYodGhpcy5zdGF0ZS5kaXJlY3Rpb24gPT0gZGlyZWN0aW9uLmxlZnQpXHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25zLnBsYXkoXCJ3YWxrMVwiKTtcclxuICAgICAgZWxzZVxyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KFwid2FsazJcIik7XHJcbiAgICAgIHRoaXMuc3RhdGUudmVsb2NpdHkueSA9IHRoaXMuc3RhdGUudmVsb2NpdHkueSAtIDAuMTtcclxuICAgIH0pXHJcbiAgICB0aGlzLmJpbmRfY29udHJvbChcIktleUFcIixleGVjX3R5cGUub25jZSwoKT0+e1xyXG4gICAgICB0aGlzLmFuaW1hdGlvbnMucGxheShcIndhbGsxXCIpO1xyXG4gICAgICB0aGlzLnN0YXRlLmRpcmVjdGlvbiA9IGRpcmVjdGlvbi5sZWZ0O1xyXG4gICAgICB0aGlzLnN0YXRlLnZlbG9jaXR5LnggPSB0aGlzLnN0YXRlLnZlbG9jaXR5LnggLSAwLjE7XHJcbiAgICB9KVxyXG4gICAgdGhpcy5iaW5kX2NvbnRyb2woXCJtb3VzZTBkb3duXCIsZXhlY190eXBlLnJlcGVhdCwgKCk9PntcclxuICAgICAgdGhpcy5hdWRpby5wbGF5KFwiZXhwbG9zaW9uXCIsMC40KTtcclxuICAgIH0sNDAwKTtcclxuICAgIHRoaXMuYmluZF9jb250cm9sKFwiS2V5RFwiLGV4ZWNfdHlwZS5yZXBlYXQsKCk9PntcclxuICAgICAgaWYodGhpcy5zdGF0ZS52ZWxvY2l0eS54IDwgMTApe1xyXG4gICAgICAgIHRoaXMuc3RhdGUudmVsb2NpdHkueCA9IHRoaXMuc3RhdGUudmVsb2NpdHkueCArIDE7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5iaW5kX2NvbnRyb2woXCJLZXlEXCIsZXhlY190eXBlLm9uY2UsKCk9PntcclxuICAgICAgdGhpcy5hbmltYXRpb25zLnBsYXkoXCJ3YWxrMlwiKTtcclxuICAgICAgdGhpcy5zdGF0ZS5kaXJlY3Rpb24gPSBkaXJlY3Rpb24ucmlnaHQ7XHJcbiAgICAgIHRoaXMuc3RhdGUudmVsb2NpdHkueCA9IHRoaXMuc3RhdGUudmVsb2NpdHkueCArIDAuMTtcclxuICAgIH0pXHJcbiAgICB0aGlzLmJpbmRfY29udHJvbChcIlNwYWNlXCIsZXhlY190eXBlLm9uY2UsKCk9PntcclxuICAgICAgaWYoIXRoaXMuc3RhdGUuanVtcGluZyl7XHJcbiAgICAgICAgdGhpcy5zdGF0ZS52ZWxvY2l0eS55ICs9IDI1O1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheShcInNsaW1lXCIsMC4xKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3RhbmRpbmdHb29tYmEgZXh0ZW5kcyBwbGF0Zm9ybWVyX29iajxnb29tYmFfc3RhdGU+e1xyXG4gIHNwcml0ZV91cmwgPSBcImh0dHA6Ly9sb2NhbGhvc3Qvc3JjL2dhbWUvb2JqZWN0cy9nb29tYmEucG5nXCI7XHJcbiAgaGVpZ2h0ID0gNjQ7XHJcbiAgd2lkdGggPSA2NDtcclxuICBjb2xsaXNpb24gPSB0cnVlO1xyXG4gIGVuZW15ID0gdHJ1ZTtcclxuICBjb25zdHJ1Y3Rvcih4Om51bWJlcix5Om51bWJlcixpZDpzdHJpbmcgPSB1bmRlZmluZWQpe1xyXG4gICAgc3VwZXIoKTtcclxuICAgIGlmKGlkKXtcclxuICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgfSAgICBcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGRpcmVjdGlvbjpkaXJlY3Rpb24ubGVmdCxcclxuICAgICAgcG9zaXRpb246e1xyXG4gICAgICAgIHgsXHJcbiAgICAgICAgeVxyXG4gICAgICB9LFxyXG4gICAgICB2ZWxvY2l0eTp7XHJcbiAgICAgICAgeDowLFxyXG4gICAgICAgIHk6MFxyXG4gICAgICB9LFxyXG4gICAgICBqdW1waW5nOmZhbHNlLFxyXG4gICAgICBoZWFsdGg6MTAwLFxyXG4gICAgICB0aW1lc19haXJzaG90OjAsXHJcbiAgICAgIG1heF90aW1lc19haXJzaG90OjBcclxuICAgIH1cclxuICB9XHJcbiAgc3RhdGVmKHRpbWU6bnVtYmVyKXtcclxuICAgIGlmKHRoaXMuc3RhdGUuanVtcGluZyl7XHJcbiAgICAgIGxldCBtb3VzZV9wb3NpdGlvbiA9IFBvbGxfTW91c2UoKTtcclxuICAgICAgaWYobW91c2VfcG9zaXRpb24ueSA+IG1vdXNlX3Bvc2l0aW9uLmxhc3QueSl7XHJcbiAgICAgICAgaWYodGhpcy5jb2xsaXNpb25fY2hlY2soe1xyXG4gICAgICAgICAgeDp0aGlzLnN0YXRlLnBvc2l0aW9uLngsXHJcbiAgICAgICAgICB5OnRoaXMuc3RhdGUucG9zaXRpb24ueSArIHRoaXMuaGVpZ2h0LFxyXG4gICAgICAgICAgd2lkdGg6dGhpcy53aWR0aCxcclxuICAgICAgICAgIGhlaWdodDoxXHJcbiAgICAgICAgfSkubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgdGhpcy5zdGF0ZS5wb3NpdGlvbi55ID0gbW91c2VfcG9zaXRpb24ueSAtIHRoaXMuaGVpZ2h0LzI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYobW91c2VfcG9zaXRpb24ueSA8IG1vdXNlX3Bvc2l0aW9uLmxhc3QueSl7XHJcbiAgICAgICAgaWYodGhpcy5jb2xsaXNpb25fY2hlY2soe1xyXG4gICAgICAgICAgeDp0aGlzLnN0YXRlLnBvc2l0aW9uLngsXHJcbiAgICAgICAgICB5OnRoaXMuc3RhdGUucG9zaXRpb24ueSAtIDEsXHJcbiAgICAgICAgICB3aWR0aDp0aGlzLndpZHRoLFxyXG4gICAgICAgICAgaGVpZ2h0OjFcclxuICAgICAgICB9KS5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICB0aGlzLnN0YXRlLnBvc2l0aW9uLnkgPSBtb3VzZV9wb3NpdGlvbi55IC0gdGhpcy5oZWlnaHQvMjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYobW91c2VfcG9zaXRpb24ueCA8IG1vdXNlX3Bvc2l0aW9uLmxhc3QueCl7XHJcbiAgICAgICAgaWYodGhpcy5jb2xsaXNpb25fY2hlY2soe1xyXG4gICAgICAgICAgeDp0aGlzLnN0YXRlLnBvc2l0aW9uLnggLSAxLFxyXG4gICAgICAgICAgeTp0aGlzLnN0YXRlLnBvc2l0aW9uLnksXHJcbiAgICAgICAgICB3aWR0aDoxLFxyXG4gICAgICAgICAgaGVpZ2h0OnRoaXMuaGVpZ2h0XHJcbiAgICAgICAgfSkubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgdGhpcy5zdGF0ZS5wb3NpdGlvbi54ID0gbW91c2VfcG9zaXRpb24ueCAtIHRoaXMud2lkdGgvMjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZihtb3VzZV9wb3NpdGlvbi54ID4gbW91c2VfcG9zaXRpb24ubGFzdC54KXtcclxuICAgICAgICBpZih0aGlzLmNvbGxpc2lvbl9jaGVjayh7XHJcbiAgICAgICAgICB4OnRoaXMuc3RhdGUucG9zaXRpb24ueCArIHRoaXMud2lkdGgsXHJcbiAgICAgICAgICB5OnRoaXMuc3RhdGUucG9zaXRpb24ueSxcclxuICAgICAgICAgIHdpZHRoOjEsXHJcbiAgICAgICAgICBoZWlnaHQ6dGhpcy5oZWlnaHRcclxuICAgICAgICB9KS5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICB0aGlzLnN0YXRlLnBvc2l0aW9uLnggPSBtb3VzZV9wb3NpdGlvbi54IC0gdGhpcy53aWR0aC8yO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3VwZXIuc3RhdGVmKHRpbWUpO1xyXG4gIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHtjb21wb3NpdGVfb2JqLCBncmF2aXR5X29ian0gZnJvbSBcIi4uLy4uL2xpYi9vYmplY3RcIjtcclxuaW1wb3J0IHtvYmpfc3RhdGV9IGZyb20gXCIuLi8uLi9saWIvc3RhdGVcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgcGxhdF9zdGF0ZSBleHRlbmRzIG9ial9zdGF0ZXtcclxuICBoZWFsdGg6bnVtYmVyICBcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIHBsYXRmb3JtZXJfb2JqPHQ+IGV4dGVuZHMgZ3Jhdml0eV9vYmo8dD57XHJcbiAgZW5lbXkgPSBmYWxzZTtcclxuICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcbiAgc3RhdGVmKGE6bnVtYmVyKXtcclxuICAgIGxldCBzdGF0ZSA9IHRoaXMuc3RhdGUgYXMgdW5rbm93biBhcyBwbGF0X3N0YXRlO1xyXG4gICAgaWYoc3RhdGUuaGVhbHRoIDw9IDApe1xyXG4gICAgICB0aGlzLmRlbGV0ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIHBsYXRmb3JtZXJfb2JqX2NvbXBvc2l0ZTx0PiBleHRlbmRzIGNvbXBvc2l0ZV9vYmo8dD57XHJcbiAgZW5lbXkgPSBmYWxzZTtcclxuICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcbiAgc3RhdGVmKGE6bnVtYmVyKXtcclxuICAgIGxldCBzdGF0ZSA9IHRoaXMuc3RhdGUgYXMgdW5rbm93biBhcyBwbGF0X3N0YXRlO1xyXG4gICAgaWYoc3RhdGUuaGVhbHRoIDw9IDApe1xyXG4gICAgICB0aGlzLmRlbGV0ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxufSIsImltcG9ydCB7dmVsb2NpdHksb2JqX3N0YXRlLHN0YXRlX2Z1bmN9IGZyb20gXCIuLi8uLi9saWIvc3RhdGVcIjtcclxuaW1wb3J0IHtzcHJpdGUsc3ByaXRlX2dlbn0gZnJvbSBcIi4uLy4uL2xpYi9zcHJpdGVcIjtcclxuaW1wb3J0IHtvYmoscm90YXRpb25fbGVuZ3RofSBmcm9tIFwiLi4vLi4vbGliL29iamVjdFwiO1xyXG5pbXBvcnQge3BsYXRmb3JtZXJfb2JqLHBsYXRfc3RhdGV9IGZyb20gXCIuL3BsYXRmb3JtZXJfb2JqXCI7XHJcbmltcG9ydCB7UG9sbF9Nb3VzZSwgZXhlY190eXBlfSBmcm9tIFwiLi4vLi4vbGliL2NvbnRyb2xzXCI7XHJcbmltcG9ydCB7Y29sbGlzaW9uX2JveH0gZnJvbSBcIi4uLy4uL2xpYi9jb2xsaXNpb25cIjtcclxuaW1wb3J0IHtCaW5kfSBmcm9tIFwiLi4vLi4vbGliL2NvbnRyb2xzXCI7XHJcblxyXG5pbXBvcnQge092ZXJ3b3JsZH0gZnJvbSBcIi4uL3Jvb21zL292ZXJ3b3JsZFwiO1xyXG5pbXBvcnQge2dldEdhbWV9IGZyb20gXCIuLi8uLi92YW5cIjtcclxuXHJcbmludGVyZmFjZSB0YXJnZXRfc3RhdGUgZXh0ZW5kcyBvYmpfc3RhdGV7XHJcbiAgaGVhbHRoOm51bWJlcjtcclxuICBicmVha2luZzpib29sZWFuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUYXJnZXQgZXh0ZW5kcyBwbGF0Zm9ybWVyX29iajx0YXJnZXRfc3RhdGU+e1xyXG4gIHNwcml0ZV91cmwgPSBcIi4vc3ByaXRlcy90YXJnZXQucG5nXCI7XHJcbiAgaGVpZ2h0ID0gNjQ7XHJcbiAgd2lkdGggPSA2NDtcclxuICBjb2xsaXNpb24gPSB0cnVlO1xyXG4gIGdyYXZpdHkgPSBmYWxzZTtcclxuICByZW5kZXIgPSB0cnVlO1xyXG4gIGVuZW15ID0gdHJ1ZTtcclxuICBjb25zdHJ1Y3RvcihhOltudW1iZXIsbnVtYmVyXSl7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgcG9zaXRpb246e1xyXG4gICAgICAgIHg6YVswXSxcclxuICAgICAgICB5OmFbMV1cclxuICAgICAgfSxcclxuICAgICAgdmVsb2NpdHk6e1xyXG4gICAgICAgIHg6MCxcclxuICAgICAgICB5OjBcclxuICAgICAgfSxcclxuICAgICAgaGVhbHRoOjIwLFxyXG4gICAgICBicmVha2luZzpmYWxzZVxyXG4gICAgfVxyXG4gIH1cclxuICByZWdpc3Rlcl9hdWRpbygpe1xyXG4gICAgdGhpcy5hdWRpby5hZGQoXCJicmVha1wiLFwiLi9zb3VuZHMvdGFyZ2V0L2hpdHNvdW5kXzI3NC5tcDNcIik7XHJcbiAgfVxyXG4gIHJlZ2lzdGVyX2FuaW1hdGlvbnMoKXtcclxuICAgIGxldCBzcHJpdGVzID0gc3ByaXRlX2dlbih0aGlzLnNwcml0ZV9zaGVldCx0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KTtcclxuICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoXCJicmVha1wiLFtcclxuICAgICAgWzAsc3ByaXRlc1swXVsxXV0sXHJcbiAgICAgIFs1MCxzcHJpdGVzWzBdWzJdXSxcclxuICAgICAgWzEwMCxzcHJpdGVzWzBdWzNdXSxcclxuICAgICAgWzE1MCxzcHJpdGVzWzBdWzRdXVxyXG4gICAgXSwyMDApXHJcbiAgfVxyXG4gIHN0YXRlZigpe1xyXG4gICAgaWYodGhpcy5zdGF0ZS5oZWFsdGggPD0gMCAmJiAhdGhpcy5zdGF0ZS5icmVha2luZyl7XHJcbiAgICAgIHRoaXMuc3RhdGUuYnJlYWtpbmcgPSB0cnVlO1xyXG4gICAgICB0aGlzLmFuaW1hdGlvbnMucGxheShcImJyZWFrXCIsKCk9PntcclxuICAgICAgICB0aGlzLmRlbGV0ZSgpO1xyXG4gICAgICB9KVxyXG4gICAgICB0aGlzLmF1ZGlvLnBsYXkoXCJicmVha1wiLDAuMSk7XHJcbiAgICB9XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgcm9vbSwgYXBwbHlfZ3Jhdml0eSB9IGZyb20gXCIuLi8uLi9saWIvcm9vbVwiO1xyXG5pbXBvcnQgeyBHdW4sIEdvb21iYSxDdXJzb3IsIENvbnRyb2xsZWRQbGF5ZXIgfSBmcm9tIFwiLi4vb2JqZWN0cy9nb29tYmFcIjtcclxuaW1wb3J0IHsgQm94LCBWZXJ0Qm94IH0gZnJvbSBcIi4uL29iamVjdHMvYm94XCI7XHJcbmltcG9ydCB7IHZlbG9jaXR5X2NvbGxpc2lvbl9jaGVjayB9IGZyb20gXCIuLi8uLi9saWIvY29sbGlzaW9uXCI7XHJcbmltcG9ydCB7IGdyYXZpdHlfb2JqLCByb3RhdGlvbl9sZW5ndGggfSBmcm9tIFwiLi4vLi4vbGliL29iamVjdFwiO1xyXG5pbXBvcnQgeyBQb2xsX01vdXNlLCBleGVjX3R5cGUgfSBmcm9tIFwiLi4vLi4vbGliL2NvbnRyb2xzXCI7XHJcbmltcG9ydCB7IEhVRCwgVGV4dCB9IGZyb20gXCIuLi8uLi9saWIvaHVkXCI7XHJcbmltcG9ydCB7IERFQlVHLCBnZXRHYW1lLCBzZXREZWJ1ZyB9IGZyb20gXCIuLi8uLi92YW5cIjtcclxuaW1wb3J0IHtCdWxsZXQsIFJvY2tldH0gZnJvbSBcIi4uL29iamVjdHMvYnVsbGV0XCI7XHJcbmltcG9ydCB7VGFyZ2V0fSBmcm9tIFwiLi4vb2JqZWN0cy90YXJnZXRcIjtcclxuXHJcblxyXG5pbnRlcmZhY2Ugb3ZlcndvcmxkX2kge1xyXG4gIHBsYXllcjogZ3Jhdml0eV9vYmo8dW5rbm93bj4sXHJcbiAgcGF1c2VkOiBib29sZWFuLFxyXG4gIGxvY2tlZF9idWxsZXQ6QnVsbGV0XHJcbn1cclxuXHJcbmNsYXNzIE92ZXJ3b3JsZF9IVUQgZXh0ZW5kcyBIVUQge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIFxyXG4gICAgdGhpcy50ZXh0X2VsZW1lbnRzLnB1c2gobmV3IFRleHQoe1xyXG4gICAgICBwb3NpdGlvbjoge1xyXG4gICAgICAgIHg6IDEwLFxyXG4gICAgICAgIHk6IDkxMFxyXG4gICAgICB9LFxyXG4gICAgICBzaXplOiA0NCxcclxuICAgICAgZm9udDogXCJBbGF0YVwiLFxyXG4gICAgICBjb2xvcjogXCJ3aGl0ZVwiLFxyXG4gICAgICBhbGlnbjpcImxlZnRcIlxyXG4gICAgfSwgKCkgPT4ge1xyXG4gICAgICBsZXQgeCA9IGdldEdhbWUoKS5nZXRSb29tKCkuZ2V0T2JqQnlUYWcoXCJkdW1teVwiKVswXSBhcyBHb29tYmE7XHJcbiAgICAgIHJldHVybiBgVGltZXMgQWlyc2hvdDoke3guc3RhdGUudGltZXNfYWlyc2hvdH1gO1xyXG4gICAgfSkpO1xyXG4gICAgdGhpcy50ZXh0X2VsZW1lbnRzLnB1c2gobmV3IFRleHQoe1xyXG4gICAgICBwb3NpdGlvbjoge1xyXG4gICAgICAgIHg6IDEwLFxyXG4gICAgICAgIHk6IDk1MFxyXG4gICAgICB9LFxyXG4gICAgICBzaXplOiA0NCxcclxuICAgICAgZm9udDogXCJBbGF0YVwiLFxyXG4gICAgICBjb2xvcjogXCJ3aGl0ZVwiLFxyXG4gICAgICBhbGlnbjogXCJsZWZ0XCJcclxuICAgIH0sICgpID0+IHtcclxuICAgICAgbGV0IHggPSBnZXRHYW1lKCkuZ2V0Um9vbSgpLmdldE9iakJ5VGFnKFwiZHVtbXlcIilbMF0gYXMgR29vbWJhO1xyXG4gICAgICByZXR1cm4gYE1heCBUaW1lcyBBaXJzaG90OiR7TWF0aC5tYXgoeC5zdGF0ZS50aW1lc19haXJzaG90LHguc3RhdGUubWF4X3RpbWVzX2FpcnNob3QpfWA7XHJcbiAgICB9KSk7XHJcbiAgICBcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBPdmVyd29ybGQgZXh0ZW5kcyByb29tPG92ZXJ3b3JsZF9pPntcclxuICBiYWNrZ3JvdW5kX3VybCA9IFwiLi9zcHJpdGVzL2ltRDQxbC5qcGdcIjtcclxuICBvYmplY3RzID0gW25ldyBDb250cm9sbGVkUGxheWVyKDcwMCwgMTUwLCBcInBsYXllclwiKSxuZXcgR29vbWJhKDU1MCwxNTApLG5ldyBCb3goNjAwLDAsXCJwbGF0Zm9ybVwiKSxuZXcgR3VuKCksbmV3IFRhcmdldChbMjAwLDEwMF0pLG5ldyBUYXJnZXQoWzIwMCwyMDBdKSxuZXcgVGFyZ2V0KFsxMDAwLDEwMF0pLG5ldyBUYXJnZXQoWzEwMDAsMjAwXSksbmV3IEN1cnNvcihcImN1cnNvclwiKV1cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBwbGF5ZXI6IHVuZGVmaW5lZCxcclxuICAgICAgcGF1c2VkOiBmYWxzZSxcclxuICAgICAgbG9ja2VkX2J1bGxldDpudWxsXHJcbiAgICB9O1xyXG4gICAgZm9yKGxldCBhID0gMDthPDEwO2ErKyl7XHJcbiAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBWZXJ0Qm94KDMyMCwyNTAgKyBhICogNTAwKSk7XHJcbiAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBWZXJ0Qm94KDkwMCwyNTAgKyBhICogNTAwKSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJlZ2lzdGVySFVEKCkge1xyXG4gICAgcmV0dXJuIG5ldyBPdmVyd29ybGRfSFVEKCk7XHJcbiAgfVxyXG4gIHJlZ2lzdGVyX2NvbnRyb2xzKCkge1xyXG4gICAgdGhpcy5iaW5kQ29udHJvbChcIkVzY2FwZVwiLCBleGVjX3R5cGUub25jZSwgKCkgPT4ge1xyXG4gICAgICBzZXREZWJ1ZyghREVCVUcpO1xyXG4gICAgfSlcclxuICAgIFxyXG4gICAgdGhpcy5iaW5kQ29udHJvbChcIm1vdXNlMGRvd25cIiwgZXhlY190eXBlLnJlcGVhdCwoKSA9PiB7XHJcbiAgICAgIGxldCBndW4gPSB0aGlzLmdldE9iaihcImd1blwiKSBhcyBHdW47XHJcbiAgICAgIGlmKGd1bil7XHJcbiAgICAgICAgbGV0IG11enpsZSA9IHJvdGF0aW9uX2xlbmd0aCgzMCxndW4uc3RhdGUucm90YXRpb24pO1xyXG4gICAgICAgIGxldCBwb3NpdGlvbiA9IHtcclxuICAgICAgICAgIHg6Z3VuLnN0YXRlLnBvc2l0aW9uLnggKyBtdXp6bGUueCxcclxuICAgICAgICAgIHk6Z3VuLnN0YXRlLnBvc2l0aW9uLnkgKyBtdXp6bGUueVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYnVsbGV0cyA9IFtdO1xyXG4gICAgICAgIGZvcihsZXQgYSA9IDA7YSA8IDE7YSArKyl7XHJcbiAgICAgICAgICBidWxsZXRzLnB1c2gobmV3IFJvY2tldChbcG9zaXRpb24ueCxwb3NpdGlvbi55XSxndW4uc3RhdGUucm90YXRpb24pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5zdGF0ZS5sb2NrZWRfYnVsbGV0ID09IG51bGwpXHJcbiAgICAgICAgICB0aGlzLnN0YXRlLmxvY2tlZF9idWxsZXQgPSBidWxsZXRzWzBdO1xyXG4gICAgICAgIHRoaXMuYWRkSXRlbXMoYnVsbGV0cyk7XHJcbiAgICAgIH1cclxuICAgIH0sNDAwKVxyXG4gICAgbGV0IGNhbWVyYTMgPSBnZXRHYW1lKCkuc3RhdGUuY2FtZXJhc1sxXTtcclxuICAgIHRoaXMuYmluZENvbnRyb2woXCJBcnJvd0xlZnRcIixleGVjX3R5cGUucmVwZWF0LCAoKSA9PiB7XHJcbiAgICAgIGNhbWVyYTMuc3RhdGUucG9zaXRpb24ueCAtPSAxMDtcclxuICAgIH0sMTApXHJcbiAgICB0aGlzLmJpbmRDb250cm9sKFwiQXJyb3dSaWdodFwiLGV4ZWNfdHlwZS5yZXBlYXQsICgpID0+IHtcclxuICAgICAgY2FtZXJhMy5zdGF0ZS5wb3NpdGlvbi54ICs9IDEwO1xyXG4gICAgfSwxMClcclxuICAgIHRoaXMuYmluZENvbnRyb2woXCJBcnJvd0Rvd25cIixleGVjX3R5cGUucmVwZWF0LCAoKSA9PiB7XHJcbiAgICAgIGNhbWVyYTMuc3RhdGUucG9zaXRpb24ueSAtPSAxMDtcclxuICAgIH0sMTApXHJcbiAgICB0aGlzLmJpbmRDb250cm9sKFwiQXJyb3dVcFwiLGV4ZWNfdHlwZS5yZXBlYXQsICgpID0+IHtcclxuICAgICAgY2FtZXJhMy5zdGF0ZS5wb3NpdGlvbi55ICs9IDEwO1xyXG4gICAgfSwxMClcclxuICB9XHJcbiAgcmVnaXN0ZXJQYXJ0aWNsZXMoKXtcclxuICAgIHRoaXMucGFydGljbGVzW1wic21va2VcIl0gPSB7XHJcbiAgICAgIHNwcml0ZTpcIi4vc3ByaXRlcy9mb2xkZXIvc21va2UucG5nXCIsXHJcbiAgICAgIGhlaWdodDo2NCxcclxuICAgICAgd2lkdGg6NjRcclxuICAgIH07XHJcbiAgICB0aGlzLnBhcnRpY2xlc1tcImV4cGxvc2lvblwiXSA9IHtcclxuICAgICAgc3ByaXRlOlwiLi9zcHJpdGVzL2ZvbGRlci9leHBsb3Npb24ucG5nXCIsXHJcbiAgICAgIGhlaWdodDo2NCxcclxuICAgICAgd2lkdGg6NjRcclxuICAgIH1cclxuICB9XHJcbiAgc3RhdGVmKHRpbWU6IG51bWJlcikge1xyXG4gICAgaWYgKCF0aGlzLnN0YXRlLnBhdXNlZCkge1xyXG4gICAgICBmb3IgKGxldCBhID0gMDsgYSA8IHRoaXMub2JqZWN0cy5sZW5ndGg7IGErKykge1xyXG4gICAgICAgIGFwcGx5X2dyYXZpdHkodGhpcy5vYmplY3RzW2FdLCAtMSwgLTE1KTtcclxuICAgICAgICB2ZWxvY2l0eV9jb2xsaXNpb25fY2hlY2sodGhpcy5vYmplY3RzW2FdLCB0aGlzLm9iamVjdHMpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0c1thXS5zdGF0ZWYodGltZSk7XHJcbiAgICAgIH1cclxuICAgICAgZm9yKGxldCBwYXJ0aWNsZSBvZiB0aGlzLnBhcnRpY2xlc19hcnIpe1xyXG4gICAgICAgIHBhcnRpY2xlLnN0YXRlZih0aW1lKTtcclxuICAgICAgfVxyXG4gICAgICBsZXQgcGxheWVyID0gdGhpcy5nZXRPYmooXCJwbGF5ZXJcIikgYXMgR29vbWJhO1xyXG4gICAgICBsZXQgdGFyZ2V0ID0gdGhpcy5nZXRPYmpCeVRhZyhcImR1bW15XCIpWzBdIGFzIEdvb21iYTtcclxuICAgICAgbGV0IGN1cnNvciA9IHRoaXMuZ2V0T2JqKFwiY3Vyc29yXCIpIGFzIEN1cnNvcjtcclxuICAgICAgbGV0IGNhbWVyYXMgPSBnZXRHYW1lKCkuc3RhdGUuY2FtZXJhcztcclxuICAgICAgaWYgKHBsYXllcikgeyAgICAgICAgXHJcbiAgICAgICAgY2FtZXJhc1swXS54ID0gcGxheWVyLnN0YXRlLnBvc2l0aW9uLng7XHJcbiAgICAgICAgY2FtZXJhc1swXS55ID0gcGxheWVyLnN0YXRlLnBvc2l0aW9uLnkgKyAoY2FtZXJhc1swXS5zdGF0ZS5kaW1lbnNpb25zLmhlaWdodC8yIC0gcGxheWVyLmhlaWdodC8yIC0gMTAwKTsgICAgIFxyXG4gICAgICB9XHJcblxyXG4gICAgICBjYW1lcmFzWzFdLnN0YXRlLnBvc2l0aW9uLnggPSB0YXJnZXQuc3RhdGUucG9zaXRpb24ueDtcclxuICAgICAgY2FtZXJhc1sxXS5zdGF0ZS5wb3NpdGlvbi55ID0gdGFyZ2V0LnN0YXRlLnBvc2l0aW9uLnk7XHJcblxyXG4gICAgICBpZiAoY3Vyc29yKSB7XHJcbiAgICAgICAgY3Vyc29yLmNvbGxpc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgIGN1cnNvci5ncmF2aXR5ID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IG1vdXNlID0gUG9sbF9Nb3VzZSgpO1xyXG4gICAgICAgIGN1cnNvci5zdGF0ZS5wb3NpdGlvbi54ID0gbW91c2UueDtcclxuICAgICAgICBjdXJzb3Iuc3RhdGUucG9zaXRpb24ueSA9IG1vdXNlLnk7XHJcbiAgICAgICAgY2FtZXJhc1syXS5zdGF0ZS5wb3NpdGlvbi54ID0gbW91c2UueDtcclxuICAgICAgICBjYW1lcmFzWzJdLnN0YXRlLnBvc2l0aW9uLnkgPSBtb3VzZS55O1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIiwiaW50ZXJmYWNlIHNvdW5kX3N0b3JhZ2Uge1xyXG4gIFtpbmRleDogc3RyaW5nXTogSFRNTEF1ZGlvRWxlbWVudFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgYXVkaW8ge1xyXG4gIHNvdW5kczogc291bmRfc3RvcmFnZSA9IHt9O1xyXG4gIGFkZChuYW1lOiBzdHJpbmcsIHM6IHN0cmluZykge1xyXG4gICAgdGhpcy5zb3VuZHNbbmFtZV0gPSBuZXcgQXVkaW8ocyk7XHJcbiAgfVxyXG4gIGxvYWQoKSB7XHJcbiAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuc291bmRzKTtcclxuICAgIGxldCBwcm9taXNlcyA9IGtleXMubWFwKChrZXkpID0+IHtcclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICB0aGlzLnNvdW5kc1trZXldLmFkZEV2ZW50TGlzdGVuZXIoXCJjYW5wbGF5dGhyb3VnaFwiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcclxuICB9XHJcbiAgcGxheShuYW1lOnN0cmluZyx2b2x1bWU6bnVtYmVyKXtcclxuICAgIGxldCBhID0gdGhpcy5zb3VuZHNbbmFtZV07XHJcbiAgICBhLnBhdXNlKClcclxuICAgIGEuY3VycmVudFRpbWUgPSAwO1xyXG4gICAgYS52b2x1bWUgPSB2b2x1bWU7XHJcbiAgICBhLnBsYXkoKTtcclxuICB9XHJcbn0iLCJpbXBvcnQge29iaixnZXRJZH0gZnJvbSBcIi4uL2xpYi9vYmplY3RcIjtcclxuaW1wb3J0IHtvYmpfc3RhdGV9IGZyb20gXCIuLi9saWIvc3RhdGVcIjtcclxuaW1wb3J0IHtkZWVwfSBmcm9tIFwiLi4vdmFuXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIGNvbGxpc2lvbl9ib3h7XHJcbiAgeDpudW1iZXI7XHJcbiAgeTpudW1iZXI7XHJcbiAgd2lkdGg6bnVtYmVyO1xyXG4gIGhlaWdodDpudW1iZXI7XHJcbn1cclxuXHJcbmVudW0gZGlyZWN0aW9ue1xyXG4gIGxlZnQsXHJcbiAgcmlnaHQsXHJcbiAgdXAsXHJcbiAgZG93blxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tfYWxsX29iamVjdHMoYzogY29sbGlzaW9uX2JveCxvYmpzOkFycmF5PG9iajx1bmtub3duPj4sZXhlbXB0aW9uOnN0cmluZ1tdID0gW10pOkFycmF5PG9iajx1bmtub3duPj57XHJcbiAgcmV0dXJuIG9ianMuZmlsdGVyKChhKT0+KCFleGVtcHRpb24uc29tZSgoYik9PmEudGFncy5pbmRleE9mKGIpICE9PSAtMSkgJiYgYS5jb2xsaWRlc193aXRoX2JveChjKSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tfYWxsX2NvbGxpc2lvbnMoYzogY29sbGlzaW9uX2JveCxvYmpzOkFycmF5PG9iajx1bmtub3duPj4sZXhlbXB0aW9uOnN0cmluZ1tdID0gW10pOkFycmF5PG9iajx1bmtub3duPj57XHJcbiAgbGV0IG1hdGNoZWQgPSBbXTtcclxuICBmb3IgKGxldCBhIG9mIG9ianMpIHtcclxuICAgIGlmICghZXhlbXB0aW9uLnNvbWUoKGIpPT5hLnRhZ3MuaW5kZXhPZihiKSAhPT0gLTEpICYmIGEuY29sbGlzaW9uICYmIGEuY29sbGlkZXNfd2l0aF9ib3goYykpIHtcclxuICAgICAgbWF0Y2hlZC5wdXNoKGEpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gbWF0Y2hlZFxyXG59XHJcbi8vQ2hlY2tzIHVwIHRvIHRoZSBmaXJzdCBjb2xsaXNpb25cclxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrX2NvbGxpc2lvbnMoYzogY29sbGlzaW9uX2JveCwgb2JqczogQXJyYXk8b2JqPHVua25vd24+PiwgZXhlbXB0aW9uOnN0cmluZykge1xyXG4gIGZvciAobGV0IGEgb2Ygb2Jqcykge1xyXG4gICAgaWYgKGEuaWQgIT09IGV4ZW1wdGlvbiAmJiBhLmNvbGxpc2lvbiAmJiBhLmNvbGxpZGVzX3dpdGhfYm94KGMpKSB7XHJcbiAgICAgIHJldHVybiBhO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gbnVsbDtcclxufVxyXG5cclxuZnVuY3Rpb24gdmVsb2NpdHlfbWF4KHZlbG9jaXR5Om51bWJlcixib3g6Y29sbGlzaW9uX2JveCxvYmpzOkFycmF5PG9iajx1bmtub3duPj4sIGV4ZW1wdGlvbjpzdHJpbmcsZGlyOmRpcmVjdGlvbil7XHJcbiAgbGV0IGNvbGxpc2lvbiA9IGNoZWNrX2NvbGxpc2lvbnMoYm94LCBvYmpzLCBleGVtcHRpb24pO1xyXG4gIGlmKGNvbGxpc2lvbiA9PSBudWxsKXtcclxuICAgIHJldHVybiB2ZWxvY2l0eTtcclxuICB9XHJcbiAgZWxzZXtcclxuICAgIGxldCBjb2xsaWRlciA9IGNvbGxpc2lvbjtcclxuICAgIGxldCBvcmlnaW4gPSBnZXRJZChvYmpzLGV4ZW1wdGlvbik7XHJcbiAgICBsZXQgb3JpZ19zdCA9IG9yaWdpbi5zdGF0ZSBhcyBvYmpfc3RhdGU7XHJcbiAgICBsZXQgY29sbGlkZXJfc3QgPSBjb2xsaWRlci5zdGF0ZSBhcyBvYmpfc3RhdGU7XHJcbiAgICBpZihkaXIgPT0gZGlyZWN0aW9uLmxlZnQpe1xyXG4gICAgICByZXR1cm4gKG9yaWdfc3QucG9zaXRpb24ueCAtIG9yaWdpbi53aWR0aC8yKSAtIChjb2xsaWRlcl9zdC5wb3NpdGlvbi54ICsgY29sbGlkZXIud2lkdGgvMik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGRpciA9PSBkaXJlY3Rpb24ucmlnaHQpe1xyXG4gICAgICByZXR1cm4gKGNvbGxpZGVyX3N0LnBvc2l0aW9uLnggLSBjb2xsaWRlci53aWR0aC8yKSAtIChvcmlnX3N0LnBvc2l0aW9uLnggKyBvcmlnaW4ud2lkdGgvMik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGRpciA9PSBkaXJlY3Rpb24uZG93bil7XHJcbiAgICAgIHJldHVybiAob3JpZ19zdC5wb3NpdGlvbi55IC0gb3JpZ2luLmhlaWdodC8yKSAtIChjb2xsaWRlcl9zdC5wb3NpdGlvbi55ICsgY29sbGlkZXIuaGVpZ2h0LzIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZihkaXIgPT0gZGlyZWN0aW9uLnVwKXtcclxuICAgICAgcmV0dXJuIChjb2xsaWRlcl9zdC5wb3NpdGlvbi55IC0gY29sbGlkZXIuaGVpZ2h0LzIpIC0gKG9yaWdfc3QucG9zaXRpb24ueSArIG9yaWdpbi5oZWlnaHQvMik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdmVsb2NpdHlfY29sbGlzaW9uX2NoZWNrKG9iamVjdDpvYmo8dW5rbm93bj4sbGlzdDpBcnJheTxvYmo8dW5rbm93bj4+KSB7XHJcbiAgbGlzdCA9IFsuLi5saXN0XTtcclxuICBsZXQgb2IgPSBvYmplY3Q7XHJcbiAgbGV0IHN0ID0gb2JqZWN0LnN0YXRlIGFzIG9ial9zdGF0ZTtcclxuICBsZXQgeF92ZWwgPSBzdC52ZWxvY2l0eS54O1xyXG4gIGxldCB5X3ZlbCA9IHN0LnZlbG9jaXR5Lnk7XHJcbiAgaWYoIW9iLmNvbGxpc2lvbil7XHJcbiAgICAoPG9ial9zdGF0ZT5vYi5zdGF0ZSkucG9zaXRpb24ueCArPSAoPG9ial9zdGF0ZT5vYi5zdGF0ZSkudmVsb2NpdHkueDtcclxuICAgICg8b2JqX3N0YXRlPm9iLnN0YXRlKS5wb3NpdGlvbi55ICs9ICg8b2JqX3N0YXRlPm9iLnN0YXRlKS52ZWxvY2l0eS55O1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBpZiAoeF92ZWwgPiAwKSB7XHJcbiAgICBsZXQgYm94ID0ge1xyXG4gICAgICB4OiBzdC5wb3NpdGlvbi54ICsgb2Iud2lkdGgvMiArIHhfdmVsLzIsXHJcbiAgICAgIHk6IHN0LnBvc2l0aW9uLnksXHJcbiAgICAgIHdpZHRoOiB4X3ZlbCxcclxuICAgICAgaGVpZ2h0OiBvYi5oZWlnaHRcclxuICAgIH07XHJcbiAgICBsZXQgdmVsID0gdmVsb2NpdHlfbWF4KHN0LnZlbG9jaXR5LngsYm94LGxpc3Qsb2IuaWQsZGlyZWN0aW9uLnJpZ2h0KTtcclxuICAgIGlmKHZlbCA+IDApe1xyXG4gICAgICBzdC5wb3NpdGlvbi54ICs9IHZlbDtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgIHN0LnZlbG9jaXR5LnggPSAwOyAgXHJcbiAgICB9XHJcbiAgfVxyXG4gIGVsc2UgaWYgKHhfdmVsIDwgMCkge1xyXG4gICAgbGV0IGJveCA9IHtcclxuICAgICAgeDogeF92ZWwvMiArIHN0LnBvc2l0aW9uLnggLSBvYi53aWR0aC8yLFxyXG4gICAgICB5OiBzdC5wb3NpdGlvbi55LFxyXG4gICAgICB3aWR0aDogLTEgKiB4X3ZlbCxcclxuICAgICAgaGVpZ2h0OiBvYi5oZWlnaHRcclxuICAgIH1cclxuICAgIGxldCB2ZWwgPSB2ZWxvY2l0eV9tYXgoc3QudmVsb2NpdHkueCxib3gsbGlzdCxvYi5pZCxkaXJlY3Rpb24ubGVmdCk7XHJcbiAgICBpZih2ZWwgPCAwKXtcclxuICAgICAgc3QucG9zaXRpb24ueCArPSB2ZWw7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICBzdC52ZWxvY2l0eS54ID0gMDsgXHJcbiAgICB9XHJcbiAgfVxyXG4gIGlmICh5X3ZlbCA+IDApIHtcclxuICAgIGxldCBib3ggPSB7XHJcbiAgICAgIHg6IHN0LnBvc2l0aW9uLngsXHJcbiAgICAgIHk6IHN0LnBvc2l0aW9uLnkgKyBvYi5oZWlnaHQvMiArIHlfdmVsLzIsXHJcbiAgICAgIHdpZHRoOiBvYi53aWR0aCxcclxuICAgICAgaGVpZ2h0OiB5X3ZlbFxyXG4gICAgfVxyXG4gICAgbGV0IHZlbCA9IHZlbG9jaXR5X21heChzdC52ZWxvY2l0eS55LGJveCxsaXN0LG9iLmlkLGRpcmVjdGlvbi51cCk7XHJcbiAgICBpZih2ZWwgPiAwKXtcclxuICAgICAgc3QucG9zaXRpb24ueSArPSB2ZWw7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICBzdC52ZWxvY2l0eS55ID0gMDtcclxuICAgIH1cclxuICB9XHJcbiAgZWxzZSBpZiAoeV92ZWwgPCAwKSB7XHJcbiAgICBsZXQgYm94ID0ge1xyXG4gICAgICB4OiBzdC5wb3NpdGlvbi54LFxyXG4gICAgICB5OiB5X3ZlbC8yICsgc3QucG9zaXRpb24ueSAtIG9iLmhlaWdodC8yLFxyXG4gICAgICB3aWR0aDogb2Iud2lkdGgsXHJcbiAgICAgIGhlaWdodDogLTEgKiB5X3ZlbFxyXG4gICAgfVxyXG4gICAgbGV0IHZlbCA9IHZlbG9jaXR5X21heChzdC52ZWxvY2l0eS55LGJveCxsaXN0LG9iLmlkLGRpcmVjdGlvbi5kb3duKTtcclxuICAgIGlmKHZlbCA8IDApe1xyXG4gICAgICBzdC5wb3NpdGlvbi55ICs9IHZlbDtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgIHN0LnZlbG9jaXR5LnkgPSAwO1xyXG4gICAgfVxyXG4gIH1cclxufSIsImltcG9ydCB7R2V0U2NyZWVuRGltZW5zaW9ucyxHZXRWaWV3cG9ydERpbWVuc2lvbnMsZ2V0R2FtZX0gZnJvbSBcIi4uL3ZhblwiO1xyXG5pbXBvcnQgeyBjb2xsaXNpb25fYm94IH0gZnJvbSBcIi4vY29sbGlzaW9uXCI7XHJcbmltcG9ydCB7b2JqfSBmcm9tIFwiLi9vYmplY3RcIjtcclxuXHJcbmludGVyZmFjZSBtb3VzZVBvc3tcclxuICB4Om51bWJlcixcclxuICB5Om51bWJlcixcclxuICBsYXN0OntcclxuICAgIHg6bnVtYmVyLFxyXG4gICAgeTpudW1iZXJcclxuICB9XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBjb250cm9sX2Z1bmN7XHJcbiAgKCk6dm9pZFxyXG59XHJcblxyXG5pbnRlcmZhY2UgbW91c2VCaW5kc3tcclxuICBba2V5OnN0cmluZ106IEFycmF5PFtjb250cm9sX2Z1bmMsb2JqPHVua25vd24+XT5cclxufVxyXG5cclxuaW50ZXJmYWNlIGtleUJpbmRze1xyXG4gIFtrZXk6c3RyaW5nXTogQXJyYXk8Y29udHJvbF9mdW5jPlxyXG59XHJcbmxldCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhcmdldFwiKTtcclxudGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLChlKT0+e1xyXG4gIGxldCBtb3VzZSA9IFBvbGxfTW91c2UoKTtcclxuICBsZXQgYm94OmNvbGxpc2lvbl9ib3ggPSB7XHJcbiAgICB4Om1vdXNlLngsXHJcbiAgICB5Om1vdXNlLnksXHJcbiAgICBoZWlnaHQ6MSxcclxuICAgIHdpZHRoOjFcclxuICB9O1xyXG4gIGxldCBkID0gWy4uLmFsbF9iaW5kc107XHJcbiAgZm9yKGxldCBhID0gMDthIDwgZC5sZW5ndGg7YSsrKXtcclxuICAgIGxldCBzZWxlY3RlZCA9IGRbYV07XHJcbiAgICBpZihzZWxlY3RlZC50eXBlID09PSBidHlwZS5tb3VzZSAmJiBzZWxlY3RlZC5rZXkgPT09IFwibW91c2UxXCIgJiYgc2VsZWN0ZWQuZXhlY3V0ZSA9PSBleGVjX3R5cGUub25jZSl7XHJcbiAgICAgIGlmKHNlbGVjdGVkLm9iaiAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICBpZihzZWxlY3RlZC5vYmouY29sbGlkZXNfd2l0aF9ib3goYm94KSl7XHJcbiAgICAgICAgICBzZWxlY3RlZC5mdW5jdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBlbHNle1xyXG4gICAgICAgIHNlbGVjdGVkLmZ1bmN0aW9uKCk7ICAgICAgICBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0gIFxyXG59KVxyXG5cclxudGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGUpID0+IHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgbGV0IGQgPSBbLi4uYWxsX2JpbmRzXTtcclxuICBmb3IgKGxldCBhID0gMDsgYSA8IGFsbF9iaW5kcy5sZW5ndGg7IGErKykge1xyXG4gICAgbGV0IHNlbGVjdGVkID0gZFthXTtcclxuICAgIGlmIChzZWxlY3RlZC50eXBlID09PSBidHlwZS5tb3VzZSAmJiBzZWxlY3RlZC5rZXkgPT09IChcIm1vdXNlXCIgKyBlLmJ1dHRvbiArIFwiZG93blwiKSAgJiYgIXNlbGVjdGVkLmV4ZWN1dGVkKSB7XHJcbiAgICAgIGlmKHNlbGVjdGVkLmV4ZWN1dGUgPT09IGV4ZWNfdHlwZS5vbmNlKXtcclxuICAgICAgICBzZWxlY3RlZC5mdW5jdGlvbigpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYoc2VsZWN0ZWQuZXhlY3V0ZSA9PT0gZXhlY190eXBlLnJlcGVhdCl7XHJcbiAgICAgICAgc2VsZWN0ZWQucmVwZWF0X3RpbWVyLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgc2VsZWN0ZWQuZXhlY3V0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxufSlcclxuXHJcbnRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCAoZSkgPT4ge1xyXG4gIGxldCBkID0gWy4uLmFsbF9iaW5kc107XHJcbiAgZm9yIChsZXQgYSA9IDA7IGEgPCBhbGxfYmluZHMubGVuZ3RoOyBhKyspIHtcclxuICAgIGxldCBzZWxlY3RlZCA9IGRbYV07XHJcbiAgICBpZiAoc2VsZWN0ZWQudHlwZSA9PT0gYnR5cGUubW91c2UgJiYgKHNlbGVjdGVkLmtleSA9PT0gZS50eXBlKSAmJiBzZWxlY3RlZC5leGVjdXRlZCAmJiBzZWxlY3RlZC5leGVjdXRlID09PSBleGVjX3R5cGUub25jZSkge1xyXG4gICAgICAgc2VsZWN0ZWQuZXhlY3V0ZWQgPSBmYWxzZTtcclxuICAgICAgXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKHNlbGVjdGVkLnR5cGUgPT09IGJ0eXBlLm1vdXNlICYmIChzZWxlY3RlZC5rZXkgPT09IChcIm1vdXNlXCIgKyBlLmJ1dHRvbiArIFwiZG93blwiKSB8fCBzZWxlY3RlZC5rZXkgPT0gXCJtb3VzZWRvd25cIikgJiYgc2VsZWN0ZWQuZXhlY3V0ZWQgJiYgc2VsZWN0ZWQuZXhlY3V0ZSA9PT0gZXhlY190eXBlLnJlcGVhdCl7XHJcbiAgICAgIGxldCBnID0gWy4uLnJlcGVhdF9iaW5kc107XHJcbiAgICAgIGZvcihsZXQgYSA9IDA7IGEgPCBnLmxlbmd0aDthKyspe1xyXG4gICAgICAgIGlmKGdbYV0uYmluZC5pZCA9PT0gc2VsZWN0ZWQuaWQpe1xyXG4gICAgICAgICAgc2VsZWN0ZWQuZXhlY3V0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgIGdbYV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pXHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGUpID0+IHtcclxuICBsZXQgZCA9IFsuLi5hbGxfYmluZHNdO1xyXG4gIGZvciAobGV0IGEgPSAwOyBhIDwgYWxsX2JpbmRzLmxlbmd0aDsgYSsrKSB7XHJcbiAgICBsZXQgc2VsZWN0ZWQgPSBkW2FdO1xyXG4gICAgaWYgKHNlbGVjdGVkLnR5cGUgPT09IGJ0eXBlLmtleWJvYXJkICYmIHNlbGVjdGVkLmtleSA9PT0gZS5jb2RlICAmJiAhc2VsZWN0ZWQuZXhlY3V0ZWQpIHtcclxuICAgICAgaWYoc2VsZWN0ZWQuZXhlY3V0ZSA9PT0gZXhlY190eXBlLm9uY2Upe1xyXG4gICAgICAgIHNlbGVjdGVkLmZ1bmN0aW9uKCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZihzZWxlY3RlZC5leGVjdXRlID09PSBleGVjX3R5cGUucmVwZWF0KXtcclxuICAgICAgICBmb3IobGV0IGMgb2YgcmVwZWF0X2JpbmRzKXtcclxuICAgICAgICAgIGlmKGMuYmluZC5pZCA9PSBzZWxlY3RlZC5pZCl7XHJcbiAgICAgICAgICAgIGMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHNlbGVjdGVkLmV4ZWN1dGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbn0pXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGUpID0+IHtcclxuICBsZXQgZCA9IFsuLi5hbGxfYmluZHNdO1xyXG4gIGZvciAobGV0IGEgPSAwOyBhIDwgYWxsX2JpbmRzLmxlbmd0aDsgYSsrKSB7XHJcbiAgICBsZXQgc2VsZWN0ZWQgPSBkW2FdO1xyXG4gICAgaWYgKHNlbGVjdGVkLnR5cGUgPT09IGJ0eXBlLmtleWJvYXJkICYmIHNlbGVjdGVkLmtleSA9PT0gZS5jb2RlICYmIHNlbGVjdGVkLmV4ZWN1dGVkKSB7XHJcbiAgICAgIGlmKHNlbGVjdGVkLmV4ZWN1dGUgPT09IGV4ZWNfdHlwZS5vbmNlICl7XHJcbiAgICAgICAgc2VsZWN0ZWQuZXhlY3V0ZWQgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmKHNlbGVjdGVkLmV4ZWN1dGUgPT09IGV4ZWNfdHlwZS5yZXBlYXQpe1xyXG4gICAgICAgIGxldCBnID0gWy4uLnJlcGVhdF9iaW5kc107XHJcbiAgICAgICAgZm9yKGxldCBhID0gMDsgYSA8IGcubGVuZ3RoO2ErKyl7XHJcbiAgICAgICAgICBpZihnW2FdLmJpbmQuaWQgPT09IHNlbGVjdGVkLmlkKXtcclxuICAgICAgICAgICAgc2VsZWN0ZWQuZXhlY3V0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZ1thXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSlcclxubGV0IHRyYWNrZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhcmdldFwiKTtcclxudHJhY2tlci5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIChlKSA9PiB7XHJcbiAgdmFyIHJlY3QgPSAoZS50YXJnZXQgYXMgSFRNTENhbnZhc0VsZW1lbnQpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIDtcclxuICBcclxuICBsYXN0X3ggPSB4O1xyXG4gIGxhc3RfeSA9IHk7XHJcbiAgeCA9IGUuY2xpZW50WCAtIHJlY3QubGVmdDsgLy94IHBvc2l0aW9uIHdpdGhpbiB0aGUgZWxlbWVudC5cclxuICB5ID0gZS5jbGllbnRZIC0gcmVjdC50b3A7ICAvL3kgcG9zaXRpb24gd2l0aGluIHRoZSBlbGVtZW50LlxyXG5cclxufSlcclxuXHJcbmVudW0gYnR5cGV7XHJcbiAgbW91c2UsXHJcbiAga2V5Ym9hcmRcclxufVxyXG5cclxuaW50ZXJmYWNlIGJpbmR7XHJcbiAga2V5OnN0cmluZyxcclxuICB0eXBlOmJ0eXBlLFxyXG4gIGlkOm51bWJlcixcclxuICBmdW5jdGlvbjpjb250cm9sX2Z1bmMsXHJcbiAgZXhlY3V0ZTpleGVjX3R5cGUsXHJcbiAgcmVwZWF0X3RpbWVyPzpyZXBlYXRfYmluZCxcclxuICBvYmo/Om9iajx1bmtub3duPixcclxuICBleGVjdXRlZD86Ym9vbGVhbixcclxuICBpbnRlcnZhbD86bnVtYmVyXHJcbn1cclxuXHJcbmludGVyZmFjZSByZXBlYXRfYmluZHtcclxuICBiaW5kOmJpbmQsXHJcbiAgdGltZXI6bnVtYmVyLFxyXG4gIGludGVydmFsOm51bWJlcixcclxuICBhY3RpdmU6Ym9vbGVhblxyXG59XHJcblxyXG5sZXQgeCA9IDA7XHJcbmxldCB5ID0gMDtcclxubGV0IGxhc3RfeCA9IDA7XHJcbmxldCBsYXN0X3kgPSAwO1xyXG5sZXQgYmluZHM6a2V5QmluZHMgPSB7fTtcclxubGV0IG1vdXNlQmluZHM6bW91c2VCaW5kcyA9IHt9O1xyXG5sZXQgYmluZF9jb3VudCA9IDA7XHJcblxyXG5sZXQgYWxsX2JpbmRzOkFycmF5PGJpbmQ+ID0gW11cclxuXHJcbmxldCByZXBlYXRfYmluZHM6QXJyYXk8cmVwZWF0X2JpbmQ+ID0gW107XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUG9sbF9Nb3VzZSgpOm1vdXNlUG9ze1xyXG4gIGxldCBoZWlnaHQgPSBHZXRWaWV3cG9ydERpbWVuc2lvbnMoKS5oZWlnaHQ7XHJcbiAgbGV0IGNhbnZhcyA9IGdldEdhbWUoKS5zdGF0ZS5jYW52YXM7XHJcbiAgbGV0IHdyYXRpbyA9IHBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUoY2FudmFzKS53aWR0aCkvR2V0Vmlld3BvcnREaW1lbnNpb25zKCkud2lkdGg7XHJcbiAgbGV0IHZyYXRpbyA9IHBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUoY2FudmFzKS5oZWlnaHQpL0dldFZpZXdwb3J0RGltZW5zaW9ucygpLmhlaWdodDtcclxuICBsZXQgY2FtZXJhID0gZ2V0R2FtZSgpLnN0YXRlLmNhbWVyYXNbMF07XHJcbiAgcmV0dXJuICh7XHJcbiAgICB4OiAoeC93cmF0aW8vY2FtZXJhLnN0YXRlLnNjYWxpbmcgKyBjYW1lcmEuc3RhdGUucG9zaXRpb24ueCAtIGNhbWVyYS5zdGF0ZS5kaW1lbnNpb25zLndpZHRoLzIpICxcclxuICAgIHk6ICgoaGVpZ2h0IC0geS92cmF0aW8pL2NhbWVyYS5zdGF0ZS5zY2FsaW5nICsgY2FtZXJhLnN0YXRlLnBvc2l0aW9uLnkgLSBjYW1lcmEuc3RhdGUuZGltZW5zaW9ucy5oZWlnaHQvMiksXHJcbiAgICBsYXN0OntcclxuICAgICAgeDogKHgvd3JhdGlvL2NhbWVyYS5zdGF0ZS5zY2FsaW5nICsgY2FtZXJhLnN0YXRlLnBvc2l0aW9uLngpLFxyXG4gICAgICB5OiAoKGhlaWdodCAtIHkvdnJhdGlvKS9jYW1lcmEuc3RhdGUuc2NhbGluZyArIGNhbWVyYS5zdGF0ZS5wb3NpdGlvbi55KVxyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBFeGVjdXRlUmVwZWF0QmluZHMoYjpudW1iZXIpe1xyXG4gIGZvcihsZXQgYSBvZiByZXBlYXRfYmluZHMpe1xyXG4gICAgaWYoYS5iaW5kLmV4ZWN1dGUgPT09IGV4ZWNfdHlwZS5yZXBlYXQgJiYgYS50aW1lciA9PSAwICYmIGEuYWN0aXZlKXtcclxuICAgICAgYS5iaW5kLmZ1bmN0aW9uKCk7XHJcbiAgICB9XHJcbiAgICBpZihhLmFjdGl2ZSB8fCAoIWEuYWN0aXZlICYmIGEudGltZXIgIT0gMCkpXHJcbiAgICAgIGEudGltZXIgKz0gYjtcclxuICAgIGlmKGEudGltZXIgPiBhLmludGVydmFsKXtcclxuICAgICAgYS50aW1lciA9IDA7IFxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFVuYmluZChiaW5kX2lkOm51bWJlcil7XHJcbiAgZm9yKGxldCBhID0gMDthIDwgYWxsX2JpbmRzLmxlbmd0aDsgYSsrKXtcclxuICAgIGlmKGFsbF9iaW5kc1thXS5pZCA9PSBiaW5kX2lkKXtcclxuICAgICAgYWxsX2JpbmRzLnNwbGljZShhLDEpO1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZW51bSBleGVjX3R5cGV7XHJcbiAgb25jZSxcclxuICByZXBlYXRcclxufVxyXG5cclxubGV0IGlkID0gMDtcclxuZXhwb3J0IGZ1bmN0aW9uIEJpbmQoa2V5bmFtZTpzdHJpbmcsZnVuYzpjb250cm9sX2Z1bmMsdHlwZTpleGVjX3R5cGUsaW50ZXJ2YWw6bnVtYmVyLG9iamVjdD86b2JqPHVua25vd24+KTpudW1iZXJ7XHJcbiAgaWYoa2V5bmFtZS5zbGljZSgwLDUpID09PSBcIm1vdXNlXCIpe1xyXG4gICAgbGV0IGI6YmluZCA9IHtcclxuICAgICAga2V5OmtleW5hbWUsXHJcbiAgICAgIHR5cGU6YnR5cGUubW91c2UsXHJcbiAgICAgIGlkLFxyXG4gICAgICBmdW5jdGlvbjpmdW5jLFxyXG4gICAgICBvYmo6b2JqZWN0LFxyXG4gICAgICBleGVjdXRlOnR5cGUsXHJcbiAgICAgIGV4ZWN1dGVkOmZhbHNlLFxyXG4gICAgICBpbnRlcnZhbFxyXG4gICAgfTtcclxuICAgIGlmKHR5cGUgPT0gZXhlY190eXBlLnJlcGVhdCl7XHJcbiAgICAgIGIucmVwZWF0X3RpbWVyID0ge1xyXG4gICAgICAgIGJpbmQ6YixcclxuICAgICAgICB0aW1lcjowLFxyXG4gICAgICAgIGludGVydmFsLFxyXG4gICAgICAgIGFjdGl2ZTpmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIHJlcGVhdF9iaW5kcy5wdXNoKGIucmVwZWF0X3RpbWVyKTtcclxuICAgIH1cclxuICAgIGFsbF9iaW5kcy5wdXNoKGIpO1xyXG5cclxuICB9XHJcbiAgZWxzZXtcclxuICAgIGxldCBiOmJpbmQgPSB7XHJcbiAgICAgIGtleTprZXluYW1lLFxyXG4gICAgICB0eXBlOmJ0eXBlLmtleWJvYXJkLFxyXG4gICAgICBpZCxcclxuICAgICAgZnVuY3Rpb246ZnVuYyxcclxuICAgICAgZXhlY3V0ZTp0eXBlLFxyXG4gICAgICBleGVjdXRlZDpmYWxzZSxcclxuICAgICAgaW50ZXJ2YWxcclxuICAgIH1cclxuICAgIGlmKHR5cGUgPT0gZXhlY190eXBlLnJlcGVhdCl7XHJcbiAgICAgIGIucmVwZWF0X3RpbWVyID0ge1xyXG4gICAgICAgIGJpbmQ6YixcclxuICAgICAgICB0aW1lcjowLFxyXG4gICAgICAgIGludGVydmFsLFxyXG4gICAgICAgIGFjdGl2ZTpmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIHJlcGVhdF9iaW5kcy5wdXNoKGIucmVwZWF0X3RpbWVyKTtcclxuICAgIH1cclxuICAgIGFsbF9iaW5kcy5wdXNoKGIpO1xyXG4gIH1cclxuICBpZCsrO1xyXG4gIHJldHVybiBpZCAtIDE7XHJcbn0iLCJpbXBvcnQge29ian0gZnJvbSBcIi4vb2JqZWN0XCI7XHJcbmltcG9ydCB7Z2V0R2FtZX0gZnJvbSBcIi4uL3ZhblwiO1xyXG5pbXBvcnQgeyBHb29tYmEgfSBmcm9tIFwiLi4vZ2FtZS9vYmplY3RzL2dvb21iYVwiO1xyXG5cclxuaW50ZXJmYWNlIEh1ZFRleHRHZXRGdW5je1xyXG4gICgpOnN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRleHRTZXR0aW5ne1xyXG4gIHg6bnVtYmVyLFxyXG4gIHk6bnVtYmVyLFxyXG4gIGZvbnQ6Rm9udFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEZvbnR7XHJcbiAgbWF4X3dpZHRoPzpudW1iZXIsXHJcbiAgc2l6ZTpudW1iZXIsXHJcbiAgZm9udDpzdHJpbmcsXHJcbiAgY29sb3I6c3RyaW5nLFxyXG4gIHRleHQ6c3RyaW5nLFxyXG4gIGFsaWduOkNhbnZhc1RleHRBbGlnblxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEh1ZFRleHR7XHJcbiAgbWF4X3dpZHRoPzpudW1iZXIsXHJcbiAgcG9zaXRpb246e1xyXG4gICAgeDpudW1iZXIsXHJcbiAgICB5Om51bWJlclxyXG4gIH1cclxuICBzaXplOm51bWJlcjtcclxuICBmb250OnN0cmluZztcclxuICBjb2xvcjpzdHJpbmc7XHJcbiAgdGV4dD86c3RyaW5nO1xyXG4gIGFsaWduPzpDYW52YXNUZXh0QWxpZ247XHJcbn1cclxuZXhwb3J0IGNsYXNzIEhVRHtcclxuICBncmFwaGljX2VsZW1lbnRzOkFycmF5PG9iajx1bmtub3duPj4gPSBbXTtcclxuICB0ZXh0X2VsZW1lbnRzOkFycmF5PFRleHQ+ID0gW107XHJcbiAgc3RhdGVmKGE6bnVtYmVyKXtcclxuICAgIGZvcihsZXQgeCBvZiB0aGlzLmdyYXBoaWNfZWxlbWVudHMpe1xyXG4gICAgICB4LnN0YXRlZihhKTtcclxuICAgIH1cclxuICAgIGZvcihsZXQgeCBvZiB0aGlzLnRleHRfZWxlbWVudHMpe1xyXG4gICAgICB4LnN0YXRlZihhKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUZXh0e1xyXG4gIGdldF9mdW5jOkh1ZFRleHRHZXRGdW5jO1xyXG4gIHN0YXRlOkh1ZFRleHQ7XHJcbiAgY29uc3RydWN0b3IoYTpIdWRUZXh0LGI6SHVkVGV4dEdldEZ1bmMpe1xyXG4gICAgaWYoIWEuYWxpZ24pe1xyXG4gICAgICBhLmFsaWduID0gXCJjZW50ZXJcIjtcclxuICAgIH1cclxuICAgIHRoaXMuc3RhdGUgPSBhO1xyXG4gICAgaWYoIXRoaXMuc3RhdGUudGV4dCl7XHJcbiAgICAgIHRoaXMuc3RhdGUudGV4dCA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICB0aGlzLmdldF9mdW5jID0gYjtcclxuICB9XHJcbiAgc3RhdGVmKGE6bnVtYmVyKXtcclxuICAgdGhpcy5zdGF0ZS50ZXh0ID0gdGhpcy5nZXRfZnVuYygpO1xyXG4gIH1cclxuICByZW5kZXJmKGE6bnVtYmVyKTpGb250e1xyXG4gICAgbGV0IHtzaXplLGNvbG9yLGZvbnQsdGV4dCxtYXhfd2lkdGgsYWxpZ259ID0gdGhpcy5zdGF0ZTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNpemUsXHJcbiAgICAgIGNvbG9yLFxyXG4gICAgICBmb250LFxyXG4gICAgICB0ZXh0LFxyXG4gICAgICBtYXhfd2lkdGgsXHJcbiAgICAgIGFsaWduXHJcbiAgICB9O1xyXG4gIH1cclxufSIsImltcG9ydCB7IHN0YXRlX2Z1bmMsIG9ial9zdGF0ZSwgcG9zaXRpb24gfSBmcm9tIFwiLi9zdGF0ZVwiO1xyXG5pbXBvcnQgeyByZW5kZXJfZnVuYyB9IGZyb20gXCIuL3JlbmRlclwiO1xyXG5pbXBvcnQgeyBQYXJ0aWNsZSwgcG9zaXRpb25lZF9zcHJpdGUsIHNwcml0ZSwgc3ByaXRlX2dlbiB9IGZyb20gXCIuL3Nwcml0ZVwiO1xyXG5pbXBvcnQgeyBjb2xsaXNpb25fYm94IH0gZnJvbSBcIi4vY29sbGlzaW9uXCI7XHJcbmltcG9ydCB7IGdldEdhbWUgfSBmcm9tIFwiLi4vdmFuXCI7XHJcbmltcG9ydCB7IFVuYmluZCwgQmluZCwgY29udHJvbF9mdW5jLCBleGVjX3R5cGUgfSBmcm9tIFwiLi9jb250cm9sc1wiO1xyXG5pbXBvcnQge2F1ZGlvfSBmcm9tIFwiLi9hdWRpb1wiO1xyXG5cclxuaW50ZXJmYWNlIG9ial9pPFQ+IHtcclxuICBzdGF0ZWY6IHN0YXRlX2Z1bmM8VD4sXHJcbiAgcmVuZGVyZjogcmVuZGVyX2Z1bmNcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0aW9uX2xlbmd0aChsZW5ndGg6IG51bWJlciwgZGVncmVlOiBudW1iZXIpIHtcclxuICBsZXQgYV9sZW4gPSBsZW5ndGggKiBNYXRoLnNpbihkZWdyZWUgKiBNYXRoLlBJIC8gMTgwKTtcclxuICBsZXQgYl9sZW4gPSBsZW5ndGggKiBNYXRoLmNvcyhkZWdyZWUgKiBNYXRoLlBJIC8gMTgwKTtcclxuICByZXR1cm4ge1xyXG4gICAgeDogYV9sZW4sXHJcbiAgICB5OiBiX2xlblxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldElkKGE6IEFycmF5PG9iajx1bmtub3duPj4sIGlkOiBzdHJpbmcpOiBvYmo8dW5rbm93bj4ge1xyXG4gIGZvciAobGV0IGIgPSAwOyBiIDwgYS5sZW5ndGg7IGIrKykge1xyXG4gICAgaWYgKGFbYl0uaWQgPT0gaWQpIHtcclxuICAgICAgcmV0dXJuIGFbYl07XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmxldCBjb3VudGVyID0gMDtcclxuXHJcbmludGVyZmFjZSBhbmltX3N0b3JhZ2Uge1xyXG4gIFtpbmRleDogc3RyaW5nXTogW0FycmF5PFtudW1iZXIsIHNwcml0ZV0+LCBudW1iZXJdXHJcbn1cclxuXHJcbmludGVyZmFjZSB2b2lkX2Z1bmMge1xyXG4gICgpOiB2b2lkXHJcbn1cclxuXHJcbmNsYXNzIGFuaW1hdGlvbnMge1xyXG4gIGFuaW1hdGlvbnM6IGFuaW1fc3RvcmFnZSA9IHt9O1xyXG4gIGFuaW1hdGlvbl90cmFja2VyID0gMDtcclxuICBjdXJyZW50OiBzdHJpbmc7XHJcbiAgY2FsbGJhY2s6IHZvaWRfZnVuYztcclxuICBhZGQobmFtZTogc3RyaW5nLCBzOiBBcnJheTxbbnVtYmVyLCBzcHJpdGVdPiwgbGVuZ3RoOiBudW1iZXIpIHtcclxuICAgIHRoaXMuYW5pbWF0aW9uc1tuYW1lXSA9IFtzLCBsZW5ndGhdO1xyXG4gIH1cclxuICBwbGF5KG5hbWU6IHN0cmluZywgY2FsbGJhY2s/OiB2b2lkX2Z1bmMpIHtcclxuICAgIHRoaXMuY3VycmVudCA9IG5hbWU7XHJcbiAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICB0aGlzLmFuaW1hdGlvbl90cmFja2VyID0gMDtcclxuICB9XHJcbiAgcmVuZGVyZih0OiBudW1iZXIpOiBzcHJpdGUge1xyXG4gICAgbGV0IGN1cnJfYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zW3RoaXMuY3VycmVudF1bMF07XHJcbiAgICBsZXQgbGVuZ3RoOiBudW1iZXIgPSB0aGlzLmFuaW1hdGlvbnNbdGhpcy5jdXJyZW50XVsxXTtcclxuICAgIGxldCBpbmRleDtcclxuICAgIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IGN1cnJfYW5pbWF0aW9uLmxlbmd0aCAtIDE7IGluZGV4KyspIHtcclxuICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uX3RyYWNrZXIgPj0gY3Vycl9hbmltYXRpb25baW5kZXhdWzBdICYmIHRoaXMuYW5pbWF0aW9uX3RyYWNrZXIgPCBjdXJyX2FuaW1hdGlvbltpbmRleCArIDFdWzBdKSB7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25fdHJhY2tlciA9IHRoaXMuYW5pbWF0aW9uX3RyYWNrZXIgKyB0O1xyXG4gICAgICAgIHJldHVybiBjdXJyX2FuaW1hdGlvbltpbmRleF1bMV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0aGlzLmNhbGxiYWNrKSB7XHJcbiAgICAgIHRoaXMuY2FsbGJhY2soKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmFuaW1hdGlvbl90cmFja2VyID49IGxlbmd0aCkge1xyXG4gICAgICB0aGlzLmFuaW1hdGlvbl90cmFja2VyID0gMDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLmFuaW1hdGlvbl90cmFja2VyICs9IHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3Vycl9hbmltYXRpb25baW5kZXhdWzFdO1xyXG4gIH1cclxufVxyXG5cclxuaW50ZXJmYWNlIGhpdGJveHtcclxuICB3aWR0aDpudW1iZXIsXHJcbiAgaGVpZ2h0Om51bWJlcixcclxuICB4X29mZnNldDpudW1iZXIsXHJcbiAgeV9vZmZzZXQ6bnVtYmVyXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBvYmo8VD57XHJcbiAgc3ByaXRlX3VybCA9IFwiXCI7XHJcbiAgc3ByaXRlX3NoZWV0OiBIVE1MSW1hZ2VFbGVtZW50O1xyXG4gIHN0YXRlOiBUO1xyXG4gIGhlaWdodDogbnVtYmVyO1xyXG4gIHdpZHRoOiBudW1iZXI7XHJcbiAgY29sbGlzaW9uOiBib29sZWFuID0gZmFsc2U7XHJcbiAgaGl0Ym94OiBoaXRib3hcclxuICBpZDogc3RyaW5nO1xyXG4gIGJpbmRzOiBBcnJheTxudW1iZXI+O1xyXG4gIHRhZ3M6c3RyaW5nW10gPSBbXTtcclxuICByb3RhdGlvbjogbnVtYmVyID0gMDtcclxuICByZW5kZXIgPSB0cnVlO1xyXG4gIGFuaW1hdGlvbnMgPSBuZXcgYW5pbWF0aW9ucygpO1xyXG4gIGF1ZGlvID0gbmV3IGF1ZGlvKCk7XHJcbiAgbGFzdF9yZW5kZXI6bnVtYmVyID0gMDtcclxuICBcclxuICBnZXRTdGF0ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlO1xyXG4gIH1cclxuICByZWdpc3Rlcl9hbmltYXRpb25zKCkge1xyXG5cclxuICB9XHJcbiAgcmVnaXN0ZXJfYXVkaW8oKSB7XHJcblxyXG4gIH1cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuaWQgPSBcIlwiICsgY291bnRlcjtcclxuICAgIHRoaXMuYmluZHMgPSBbXTtcclxuICAgIGNvdW50ZXIrKztcclxuICAgIHRoaXMucmVnaXN0ZXJfY29udHJvbHMoKTtcclxuICAgIHRoaXMucmVnaXN0ZXJfYXVkaW8oKTtcclxuICB9XHJcbiAgbG9hZCgpIHtcclxuICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBsZXQgYSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICBhLnNyYyA9IHRoaXMuc3ByaXRlX3VybDtcclxuICAgICAgYS5vbmxvYWQgPSAoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIF90aGlzLnNwcml0ZV9zaGVldCA9IGE7XHJcbiAgICAgICAgX3RoaXMucmVnaXN0ZXJfYW5pbWF0aW9ucygpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuYXVkaW8ubG9hZCgpO1xyXG4gICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KVxyXG4gIH1cclxuICBkaXN0YW5jZShhOm9iajx1bmtub3duPik6bnVtYmVye1xyXG4gICAgbGV0IG9fc3QgPSBhLnN0YXRlIGFzIHVua25vd24gYXMgb2JqX3N0YXRlO1xyXG4gICAgbGV0IHN0ID0gdGhpcy5zdGF0ZSBhcyB1bmtub3duIGFzIG9ial9zdGF0ZTtcclxuICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3coc3QucG9zaXRpb24ueCAtIG9fc3QucG9zaXRpb24ueCwyKSArIE1hdGgucG93KHN0LnBvc2l0aW9uLnkgLSBvX3N0LnBvc2l0aW9uLnksMikpO1xyXG4gIH1cclxuICBhbmdsZVRvd2FyZHMoYTogb2JqPHVua25vd24+KTogbnVtYmVyIHtcclxuICAgIGxldCBiID0gYSBhcyBvYmo8b2JqX3N0YXRlPjtcclxuICAgIGxldCBzdGF0ZSA9IHRoaXMuc3RhdGUgYXMgdW5rbm93biBhcyBvYmpfc3RhdGU7XHJcbiAgICBpZiAoc3RhdGUucG9zaXRpb24ueCA8IGIuc3RhdGUucG9zaXRpb24ueCAmJiBzdGF0ZS5wb3NpdGlvbi55ID4gYi5zdGF0ZS5wb3NpdGlvbi55XHJcbiAgICAgIHx8IChzdGF0ZS5wb3NpdGlvbi54IDwgYi5zdGF0ZS5wb3NpdGlvbi54ICYmIHN0YXRlLnBvc2l0aW9uLnkgPCBiLnN0YXRlLnBvc2l0aW9uLnkpKSB7XHJcbiAgICAgIHJldHVybiA5MCAtIE1hdGguYXRhbigoYi5zdGF0ZS5wb3NpdGlvbi55IC0gc3RhdGUucG9zaXRpb24ueSkgLyAoYi5zdGF0ZS5wb3NpdGlvbi54IC0gc3RhdGUucG9zaXRpb24ueCkpICogMTgwIC8gTWF0aC5QSVxyXG4gICAgfVxyXG4gICAgaWYgKHN0YXRlLnBvc2l0aW9uLnggPiBiLnN0YXRlLnBvc2l0aW9uLnggJiYgc3RhdGUucG9zaXRpb24ueSA8IGIuc3RhdGUucG9zaXRpb24ueVxyXG4gICAgICB8fCBzdGF0ZS5wb3NpdGlvbi54ID4gYi5zdGF0ZS5wb3NpdGlvbi54ICYmIHN0YXRlLnBvc2l0aW9uLnkgPiBiLnN0YXRlLnBvc2l0aW9uLnkpIHtcclxuICAgICAgcmV0dXJuIDI3MCAtIE1hdGguYXRhbigoYi5zdGF0ZS5wb3NpdGlvbi55IC0gc3RhdGUucG9zaXRpb24ueSkgLyAoYi5zdGF0ZS5wb3NpdGlvbi54IC0gc3RhdGUucG9zaXRpb24ueCkpICogMTgwIC8gTWF0aC5QSVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIDA7XHJcbiAgfVxyXG4gIGJpbmRfY29udHJvbChrZXk6IHN0cmluZywgeDogZXhlY190eXBlLCBmdW5jOiBjb250cm9sX2Z1bmMsIGludGVydmFsID0gMSkge1xyXG4gICAgaWYgKGtleSA9PSBcIm1vdXNlMVwiKSB7XHJcbiAgICAgIGxldCBiID0gQmluZChrZXksIGZ1bmMsIHgsIGludGVydmFsLCB0aGlzKTtcclxuICAgICAgdGhpcy5iaW5kcy5wdXNoKGIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHRoaXMuYmluZHMucHVzaChCaW5kKGtleSwgZnVuYywgeCwgaW50ZXJ2YWwpKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmVnaXN0ZXJfY29udHJvbHMoKSB7XHJcblxyXG4gIH1cclxuICBkZWxldGUoKSB7XHJcbiAgICBmb3IgKGxldCBhIG9mIHRoaXMuYmluZHMpIHtcclxuICAgICAgVW5iaW5kKGEpO1xyXG4gICAgfVxyXG4gICAgZ2V0R2FtZSgpLmdldFJvb20oKS5kZWxldGVJdGVtKHRoaXMuaWQpO1xyXG4gIH1cclxuICBjb2xsaXNpb25fY2hlY2soYTogY29sbGlzaW9uX2JveCk6IEFycmF5PG9iajx1bmtub3duPj4ge1xyXG4gICAgaWYgKHRoaXMuY29sbGlzaW9uKSB7XHJcbiAgICAgIGxldCByb29tID0gZ2V0R2FtZSgpLmdldFJvb20oKTtcclxuICAgICAgcmV0dXJuIHJvb20uY2hlY2tfY29sbGlzaW9ucyhhLCBbdGhpcy5pZF0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFtdO1xyXG4gIH1cclxuICBzdGF0ZWYodGltZTogbnVtYmVyKSB7XHJcbiAgfVxyXG4gIGNyZWF0ZV9jb2xsaXNpb25fYm94KCk6Y29sbGlzaW9uX2JveHtcclxuICAgIGxldCBzdCA9IHRoaXMuc3RhdGUgYXMgdW5rbm93biBhcyBvYmpfc3RhdGU7XHJcbiAgICBpZih0aGlzLmhpdGJveCl7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgeDpzdC5wb3NpdGlvbi54LFxyXG4gICAgICAgIHk6c3QucG9zaXRpb24ueSxcclxuICAgICAgICB3aWR0aDp0aGlzLmhpdGJveC53aWR0aCxcclxuICAgICAgICBoZWlnaHQ6dGhpcy5oaXRib3guaGVpZ2h0XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgeDpzdC5wb3NpdGlvbi54LFxyXG4gICAgICAgIHk6c3QucG9zaXRpb24ueSxcclxuICAgICAgICB3aWR0aDp0aGlzLndpZHRoLFxyXG4gICAgICAgIGhlaWdodDp0aGlzLmhlaWdodFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGNvbGxpZGVzX3dpdGhfYm94KGE6IGNvbGxpc2lvbl9ib3gpOiBib29sZWFuIHtcclxuICAgIGxldCBzdCA9IHRoaXMuc3RhdGUgYXMgdW5rbm93biBhcyBvYmpfc3RhdGU7XHJcbiAgICBsZXQgaGNvbGxpZGVzID0gZmFsc2UsIHZjb2xsaWRlcyA9IGZhbHNlO1xyXG4gICAgbGV0IGhib3ggPSB0aGlzLmhpdGJveDtcclxuICAgIGlmKCF0aGlzLmhpdGJveCl7XHJcbiAgICAgIGhib3ggPSB7XHJcbiAgICAgICAgeF9vZmZzZXQ6MCxcclxuICAgICAgICB5X29mZnNldDowLFxyXG4gICAgICAgIHdpZHRoOnRoaXMud2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0OnRoaXMuaGVpZ2h0XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGxldCBvYiA9IHtcclxuICAgICAgbGVmdDogKHN0LnBvc2l0aW9uLnggKyBoYm94Lnhfb2Zmc2V0IC0gaGJveC53aWR0aCAvIDIpLFxyXG4gICAgICByaWdodDogKHN0LnBvc2l0aW9uLnggKyBoYm94Lnhfb2Zmc2V0ICsgaGJveC53aWR0aCAvIDIpLFxyXG4gICAgICB0b3A6IChzdC5wb3NpdGlvbi55ICsgaGJveC55X29mZnNldCArIGhib3guaGVpZ2h0IC8gMiksXHJcbiAgICAgIGJvdHRvbTogKHN0LnBvc2l0aW9uLnkgKyBoYm94Lnlfb2Zmc2V0IC0gaGJveC5oZWlnaHQgLyAyKVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBib3ggPSB7XHJcbiAgICAgIGxlZnQ6IChhLnggLSBhLndpZHRoIC8gMiksXHJcbiAgICAgIHJpZ2h0OiAoYS54ICsgYS53aWR0aCAvIDIpLFxyXG4gICAgICB0b3A6IChhLnkgKyBhLmhlaWdodCAvIDIpLFxyXG4gICAgICBib3R0b206IChhLnkgLSBhLmhlaWdodCAvIDIpXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKChvYi5sZWZ0ID49IGJveC5sZWZ0ICYmIG9iLmxlZnQgPCBib3gucmlnaHQpIHx8IChib3gubGVmdCA+IG9iLmxlZnQgJiYgYm94LmxlZnQgPCBvYi5yaWdodCkpIHtcclxuICAgICAgaGNvbGxpZGVzID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmICgob2IuYm90dG9tID49IGJveC5ib3R0b20gJiYgb2IuYm90dG9tIDwgYm94LnRvcCkgfHwgKGJveC5ib3R0b20gPiBvYi5ib3R0b20gJiYgYm94LmJvdHRvbSA8IG9iLnRvcCkpe1xyXG4gICAgICB2Y29sbGlkZXMgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGhjb2xsaWRlcyAmJiB2Y29sbGlkZXM7XHJcbiAgfVxyXG4gIGVtaXRfcGFydGljbGUobmFtZTpzdHJpbmcsb2Zmc2V0OnBvc2l0aW9uLGxpZmV0aW1lOm51bWJlcixyYW5nZTpudW1iZXIpe1xyXG4gICAgbGV0IHJvb20gPSBnZXRHYW1lKCkuZ2V0Um9vbSgpO1xyXG4gICAgbGV0IHN0ID0gdGhpcy5zdGF0ZSBhcyB1bmtub3duIGFzIG9ial9zdGF0ZTtcclxuICAgIGxldCBmaW5hbF9wb3NpdGlvbjpwb3NpdGlvbiA9IHtcclxuICAgICAgeDpzdC5wb3NpdGlvbi54ICsgb2Zmc2V0LngsXHJcbiAgICAgIHk6c3QucG9zaXRpb24ueSArIG9mZnNldC55XHJcbiAgICB9XHJcbiAgICByb29tLmVtaXRfcGFydGljbGUobmFtZSxmaW5hbF9wb3NpdGlvbixsaWZldGltZSxyYW5nZSlcclxuICB9XHJcbiAgcmVuZGVyX3RyYWNrKHRpbWU6bnVtYmVyKXtcclxuICAgIGxldCByZW5kZXJlZCA9IHRoaXMucmVuZGVyZih0aW1lIC0gdGhpcy5sYXN0X3JlbmRlcik7XHJcbiAgICB0aGlzLmxhc3RfcmVuZGVyID0gdGltZTtcclxuICAgIHJldHVybiByZW5kZXJlZDtcclxuICB9XHJcbiAgcmVuZGVyZih0aW1lOiBudW1iZXIpOiBwb3NpdGlvbmVkX3Nwcml0ZSB8IHBvc2l0aW9uZWRfc3ByaXRlW10ge1xyXG4gICAgbGV0IHN0ID0gdGhpcy5zdGF0ZSBhcyB1bmtub3duIGFzIG9ial9zdGF0ZTtcclxuICAgIGlmICghdGhpcy5hbmltYXRpb25zLmN1cnJlbnQpIHtcclxuICAgICAgbGV0IHNwcml0ZV9oZWlnaHQgPSB0aGlzLmhlaWdodDtcclxuICAgICAgbGV0IHNwcml0ZV93aWR0aCA9IHRoaXMud2lkdGg7XHJcbiAgICAgIGlmICh0aGlzLmhlaWdodCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBzcHJpdGVfaGVpZ2h0ID0gdGhpcy5zcHJpdGVfc2hlZXQuaGVpZ2h0O1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLndpZHRoID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHNwcml0ZV93aWR0aCA9IHRoaXMuc3ByaXRlX3NoZWV0LndpZHRoO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgc3ByaXRlOiB7XHJcbiAgICAgICAgICBzcHJpdGVfc2hlZXQ6IHRoaXMuc3ByaXRlX3NoZWV0LFxyXG4gICAgICAgICAgbGVmdDogMCxcclxuICAgICAgICAgIHRvcDogMCxcclxuICAgICAgICAgIHNwcml0ZV93aWR0aCxcclxuICAgICAgICAgIHNwcml0ZV9oZWlnaHQsXHJcbiAgICAgICAgICBvcGFjaXR5OjFcclxuICAgICAgICB9LFxyXG4gICAgICAgIHg6IHN0LnBvc2l0aW9uLngsXHJcbiAgICAgICAgeTogc3QucG9zaXRpb24ueVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3ByaXRlOnRoaXMuYW5pbWF0aW9ucy5yZW5kZXJmKHRpbWUpLFxyXG4gICAgICB4OiBzdC5wb3NpdGlvbi54LFxyXG4gICAgICB5OiBzdC5wb3NpdGlvbi55XHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG5cclxuaW50ZXJmYWNlIGNvbXBvc2l0ZV9zdGF0aWN7XHJcbiAgeDpudW1iZXIsXHJcbiAgeTpudW1iZXIsXHJcbiAgb2JqOm9iajx1bmtub3duPlxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgY29tcG9zaXRlX29iajxUPiBleHRlbmRzIG9iajxUPntcclxuICBvYmplY3RzOm9iajx1bmtub3duPltdID0gW107XHJcbiAgc3RhdGljczpjb21wb3NpdGVfc3RhdGljW10gPSBbXTtcclxuICBsb2FkKCl7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoWy4uLnRoaXMub2JqZWN0cy5tYXAoKGEpPT5hLmxvYWQoKSksLi4udGhpcy5zdGF0aWNzLm1hcChhPT5hLm9iai5sb2FkKCkpXSk7XHJcbiAgfVxyXG4gIHJlbmRlcmYodGltZTpudW1iZXIpOnBvc2l0aW9uZWRfc3ByaXRlW117XHJcbiAgICBsZXQgYXJyOnBvc2l0aW9uZWRfc3ByaXRlW10gPSBbXTtcclxuICAgIGZvcihsZXQgb2JqIG9mIHRoaXMub2JqZWN0cyl7XHJcbiAgICAgIGxldCByZW5kZXJlZCA9IG9iai5yZW5kZXJfdHJhY2sodGltZSk7XHJcbiAgICAgIGlmKEFycmF5LmlzQXJyYXkocmVuZGVyZWQpKXtcclxuICAgICAgICBhcnIucHVzaCguLi5yZW5kZXJlZCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZXtcclxuICAgICAgICBhcnIucHVzaChyZW5kZXJlZCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGZvcihsZXQgbyBvZiB0aGlzLnN0YXRpY3Mpe1xyXG4gICAgICBsZXQgcmVuZGVyZWQgPSBvLm9iai5yZW5kZXJfdHJhY2sodGltZSk7XHJcbiAgICAgIGlmKEFycmF5LmlzQXJyYXkocmVuZGVyZWQpKXtcclxuICAgICAgICBhcnIucHVzaCguLi5yZW5kZXJlZCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZXtcclxuICAgICAgICBhcnIucHVzaChyZW5kZXJlZCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcnI7XHJcbiAgfVxyXG4gIGRlbGV0ZSgpe1xyXG4gICAgZm9yKGxldCBhIG9mIHRoaXMub2JqZWN0cyl7XHJcbiAgICAgIGEuZGVsZXRlKCk7XHJcbiAgICB9XHJcbiAgICBmb3IobGV0IGEgb2YgdGhpcy5zdGF0aWNzKXtcclxuICAgICAgYS5vYmouZGVsZXRlKCk7XHJcbiAgICB9XHJcbiAgICBzdXBlci5kZWxldGUoKTtcclxuICB9XHJcbiAgc3RhdGVmKHRpbWU6bnVtYmVyKXtcclxuICAgIGZvcihsZXQgb2JqIG9mIHRoaXMub2JqZWN0cyl7XHJcbiAgICAgIG9iai5zdGF0ZWYodGltZSk7XHJcbiAgICB9XHJcbiAgICBmb3IobGV0IGEgb2YgdGhpcy5zdGF0aWNzKXtcclxuICAgICAgYS5vYmouc3RhdGVmKHRpbWUpO1xyXG4gICAgICBsZXQgb2JqX3N0ID0gYS5vYmouc3RhdGUgYXMgb2JqX3N0YXRlO1xyXG4gICAgICBsZXQgc3QgPSB0aGlzLnN0YXRlIGFzIHVua25vd24gYXMgb2JqX3N0YXRlO1xyXG4gICAgICBvYmpfc3QucG9zaXRpb24ueCA9IHN0LnBvc2l0aW9uLnggKyBhLng7XHJcbiAgICAgIG9ial9zdC5wb3NpdGlvbi55ID0gc3QucG9zaXRpb24ueSArIGEueTtcclxuICAgIH1cclxuICB9XHJcbiAgY29sbGlkZXNfd2l0aF9ib3goYTogY29sbGlzaW9uX2JveCk6Ym9vbGVhbntcclxuICAgIGZvcihsZXQgb2JqIG9mIHRoaXMub2JqZWN0cyl7XHJcbiAgICAgIGlmKG9iai5jb2xsaWRlc193aXRoX2JveChhKSlcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGZvcihsZXQgbyBvZiB0aGlzLnN0YXRpY3Mpe1xyXG4gICAgICBpZihvLm9iai5jb2xsaWRlc193aXRoX2JveChhKSlcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9ICBcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBzdGF0aWNfb2JqIHtcclxuICBzcHJpdGVfdXJsID0gXCJcIjtcclxuICBzcHJpdGU6IEhUTUxJbWFnZUVsZW1lbnQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBncmF2aXR5X29iajxUPiBleHRlbmRzIG9iajxUPntcclxuICBncmF2aXR5ID0gdHJ1ZVxyXG59IiwiZXhwb3J0IGZ1bmN0aW9uIGdldFJhbmRJbnQobWluOm51bWJlciwgbWF4Om51bWJlcikge1xyXG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSApICsgbWluO1xyXG59IiwiaW1wb3J0IHsgc3ByaXRlIH0gZnJvbSBcIi4vc3ByaXRlXCI7XHJcbmltcG9ydCB7IEdldFZpZXdwb3J0RGltZW5zaW9ucyB9IGZyb20gXCIuLi92YW5cIjtcclxuaW1wb3J0IHsgb2JqIH0gZnJvbSBcIi4vb2JqZWN0XCI7XHJcbmltcG9ydCB7IG9ial9zdGF0ZSB9IGZyb20gXCIuL3N0YXRlXCI7XHJcbmltcG9ydCB7IEh1ZFRleHQsIFRleHRTZXR0aW5nIH0gZnJvbSBcIi4vaHVkXCI7XHJcblxyXG5pbnRlcmZhY2UgY2FtZXJhX3N0YXRlIHtcclxuICBzY2FsaW5nOiBudW1iZXIsXHJcbiAgcG9zaXRpb246IHtcclxuICAgIHg6IG51bWJlcixcclxuICAgIHk6IG51bWJlclxyXG4gIH1cclxuICBkaW1lbnNpb25zOiB7XHJcbiAgICB3aWR0aDogbnVtYmVyLFxyXG4gICAgaGVpZ2h0OiBudW1iZXJcclxuICB9LFxyXG4gIHZpZXdwb3J0OiB2aWV3cG9ydFxyXG59XHJcblxyXG5pbnRlcmZhY2Ugdmlld3BvcnQge1xyXG4gIHg6IG51bWJlcixcclxuICB5OiBudW1iZXIsXHJcbiAgd2lkdGg6IG51bWJlcixcclxuICBoZWlnaHQ6IG51bWJlclxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FtZXJhIHtcclxuICBzdGF0ZTogY2FtZXJhX3N0YXRlXHJcbiAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBzY2FsaW5nOiBudW1iZXIsIHY6IHZpZXdwb3J0KSB7XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBzY2FsaW5nLFxyXG4gICAgICBwb3NpdGlvbjoge1xyXG4gICAgICAgIHg6IHggKiBzY2FsaW5nLFxyXG4gICAgICAgIHk6IHkgKiBzY2FsaW5nXHJcbiAgICAgIH0sXHJcbiAgICAgIGRpbWVuc2lvbnM6IHtcclxuICAgICAgICB3aWR0aDogd2lkdGggKiBzY2FsaW5nLFxyXG4gICAgICAgIGhlaWdodDogaGVpZ2h0ICogc2NhbGluZ1xyXG4gICAgICB9LFxyXG4gICAgICB2aWV3cG9ydDogdlxyXG4gICAgfVxyXG4gIH1cclxuICBzZXQgeCh4OiBudW1iZXIpIHtcclxuICAgIHRoaXMuc3RhdGUucG9zaXRpb24ueCA9IHg7XHJcbiAgfVxyXG4gIHNldCB5KHk6IG51bWJlcikge1xyXG4gICAgdGhpcy5zdGF0ZS5wb3NpdGlvbi55ID0geVxyXG4gIH1cclxuICBnZXQgeCgpIHtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlLnBvc2l0aW9uLng7XHJcbiAgfVxyXG4gIGdldCB5KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhdGUucG9zaXRpb24ueTtcclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIHJlbmRlcl9mdW5jIHtcclxuICAoeDogbnVtYmVyLCB5OiBudW1iZXIsIHNjYWxpbmc6IG51bWJlcik6IHZvaWRcclxufVxyXG5cclxuaW50ZXJmYWNlIHJlY3RhbmdsZSB7XHJcbiAgd2lkdGg6IG51bWJlcixcclxuICBoZWlnaHQ6IG51bWJlclxyXG59XHJcblxyXG5pbnRlcmZhY2Ugc3ByaXRlX2FyZ3Mge1xyXG4gIHNwcml0ZTogc3ByaXRlLFxyXG4gIHg6IG51bWJlcixcclxuICB5OiBudW1iZXIsXHJcbiAgcm90YXRpb246IG51bWJlclxyXG59XHJcblxyXG5pbnRlcmZhY2UgcmVuZGVyZXJfYXJncyB7XHJcbiAgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELFxyXG4gIGNhbWVyYTogQ2FtZXJhXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIHJlbmRlcmVyIHtcclxuICB0ZXh0LFxyXG4gIHNwcml0ZSxcclxuICByZWN0LFxyXG4gIHN0cm9rZV9yZWN0XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB0ZXh0X3JlbmRlcmVyID0gKHI6IHJlbmRlcmVyX2FyZ3MsIHM6IFRleHRTZXR0aW5nKSA9PiB7XHJcbiAgbGV0IHZoZWlnaHQgPSBHZXRWaWV3cG9ydERpbWVuc2lvbnMoKS5oZWlnaHQ7XHJcbiAgci5jb250ZXh0LmZvbnQgPSBgJHtzLmZvbnQuc2l6ZX1weCAke3MuZm9udC5mb250fWA7XHJcbiAgci5jb250ZXh0LmZpbGxTdHlsZSA9IHMuZm9udC5jb2xvcjtcclxuICByLmNvbnRleHQudGV4dEFsaWduID0gcy5mb250LmFsaWduO1xyXG4gIGlmIChzLmZvbnQubWF4X3dpZHRoKSB7XHJcbiAgICByLmNvbnRleHQuZmlsbFRleHQocy5mb250LnRleHQsIHMueCwgdmhlaWdodCAtIHMueSwgcy5mb250Lm1heF93aWR0aCk7XHJcbiAgfVxyXG4gIGVsc2Uge1xyXG4gICAgci5jb250ZXh0LmZpbGxUZXh0KHMuZm9udC50ZXh0LCBzLngsIHZoZWlnaHQgLSBzLnkpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNwcml0ZV9yZW5kZXJlciA9IChyOiByZW5kZXJlcl9hcmdzLCBzOiBzcHJpdGVfYXJncykgPT4ge1xyXG4gIGxldCBjYW1lcmEgPSByLmNhbWVyYTtcclxuICBsZXQgdmhlaWdodCA9IHIuY2FtZXJhLnN0YXRlLmRpbWVuc2lvbnMuaGVpZ2h0IC8gci5jYW1lcmEuc3RhdGUuc2NhbGluZztcclxuICBsZXQgZmluYWxfeCA9ICgocy54IC0gY2FtZXJhLnN0YXRlLnBvc2l0aW9uLnggKyBjYW1lcmEuc3RhdGUuZGltZW5zaW9ucy53aWR0aCAvIDIgLSBzLnNwcml0ZS5zcHJpdGVfd2lkdGggLyAyKSAqIHIuY2FtZXJhLnN0YXRlLnNjYWxpbmcpO1xyXG4gIGxldCBmaW5hbF95ID0gKCh2aGVpZ2h0IC0gcy55IC0gY2FtZXJhLnN0YXRlLmRpbWVuc2lvbnMuaGVpZ2h0IC8gMiAtIHMuc3ByaXRlLnNwcml0ZV9oZWlnaHQgLyAyICsgY2FtZXJhLnN0YXRlLnBvc2l0aW9uLnkpICogci5jYW1lcmEuc3RhdGUuc2NhbGluZyk7XHJcbiAgbGV0IGhlaWdodCA9IHMuc3ByaXRlLnNwcml0ZV9oZWlnaHQgKiByLmNhbWVyYS5zdGF0ZS5zY2FsaW5nO1xyXG4gIGxldCB3aWR0aCA9IHMuc3ByaXRlLnNwcml0ZV93aWR0aCAqIHIuY2FtZXJhLnN0YXRlLnNjYWxpbmc7XHJcbiAgbGV0IGN1dF9vZmYgPSAwO1xyXG4gIHIuY29udGV4dC5zYXZlKCk7XHJcbiAgci5jb250ZXh0Lmdsb2JhbEFscGhhID0gcy5zcHJpdGUub3BhY2l0eTtcclxuICByLmNvbnRleHQudHJhbnNsYXRlKGZpbmFsX3ggKyBjdXRfb2ZmICsgKHMuc3ByaXRlLnNwcml0ZV93aWR0aCAtIGN1dF9vZmYpIC8gMiwgZmluYWxfeSArIHMuc3ByaXRlLnNwcml0ZV9oZWlnaHQgLyAyKVxyXG4gIGxldCByYWRpYW5zID0gcy5yb3RhdGlvbiAqIChNYXRoLlBJIC8gMTgwKTtcclxuICByLmNvbnRleHQucm90YXRlKHJhZGlhbnMpO1xyXG4gIHIuY29udGV4dC5kcmF3SW1hZ2UoXHJcbiAgICBzLnNwcml0ZS5zcHJpdGVfc2hlZXQsXHJcbiAgICBzLnNwcml0ZS5sZWZ0ICsgY3V0X29mZixcclxuICAgIHMuc3ByaXRlLnRvcCxcclxuICAgIChzLnNwcml0ZS5zcHJpdGVfd2lkdGggLSBjdXRfb2ZmKSxcclxuICAgIHMuc3ByaXRlLnNwcml0ZV9oZWlnaHQsXHJcbiAgICAtKHMuc3ByaXRlLnNwcml0ZV93aWR0aCAtIGN1dF9vZmYpIC8gMixcclxuICAgIC1zLnNwcml0ZS5zcHJpdGVfaGVpZ2h0IC8gMixcclxuICAgIHdpZHRoIC0gY3V0X29mZixcclxuICAgIGhlaWdodFxyXG4gIClcclxuICByLmNvbnRleHQucmVzdG9yZSgpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc3Ryb2tlZF9yZWN0X3JlbmRlcmVyID0gKGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgcmVjdDogcmVjdGFuZ2xlLCB4OiBudW1iZXIsIHk6IG51bWJlciwgY29sb3I6IHN0cmluZywgY2FtZXJhOiBDYW1lcmEpID0+IHtcclxuICBsZXQgdmhlaWdodCA9IGNhbWVyYS5zdGF0ZS5kaW1lbnNpb25zLmhlaWdodCAvIGNhbWVyYS5zdGF0ZS5zY2FsaW5nO1xyXG4gIGxldCBmaW5hbF94ID0gKCh4IC0gY2FtZXJhLnN0YXRlLnBvc2l0aW9uLnggKyBjYW1lcmEuc3RhdGUuZGltZW5zaW9ucy53aWR0aCAvIDIgLSByZWN0LndpZHRoIC8gMikgKiBjYW1lcmEuc3RhdGUuc2NhbGluZyk7XHJcbiAgbGV0IGZpbmFsX3kgPSAoKHZoZWlnaHQgLSB5IC0gcmVjdC5oZWlnaHQgLyAyIC0gY2FtZXJhLnN0YXRlLmRpbWVuc2lvbnMuaGVpZ2h0IC8gMiArIGNhbWVyYS5zdGF0ZS5wb3NpdGlvbi55KSAqIGNhbWVyYS5zdGF0ZS5zY2FsaW5nKTtcclxuICBsZXQgaGVpZ2h0ID0gcmVjdC5oZWlnaHQgKiBjYW1lcmEuc3RhdGUuc2NhbGluZztcclxuICBsZXQgd2lkdGggPSByZWN0LndpZHRoICogY2FtZXJhLnN0YXRlLnNjYWxpbmc7XHJcbiAgY29udGV4dC5zdHJva2VTdHlsZSA9IGNvbG9yO1xyXG4gIGNvbnRleHQuc3Ryb2tlUmVjdChmaW5hbF94LCBmaW5hbF95LCByZWN0LndpZHRoLCBoZWlnaHQpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVjdF9yZW5kZXJlciA9IChjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIHJlY3Q6IHJlY3RhbmdsZSwgeDogbnVtYmVyLCB5OiBudW1iZXIsIGNvbG9yOiBzdHJpbmcsIGNhbWVyYTogQ2FtZXJhKSA9PiB7XHJcbiAgbGV0IHZoZWlnaHQgPSBjYW1lcmEuc3RhdGUuZGltZW5zaW9ucy5oZWlnaHQgLyBjYW1lcmEuc3RhdGUuc2NhbGluZztcclxuICBsZXQgZmluYWxfeCA9ICgoeCAtIGNhbWVyYS5zdGF0ZS5wb3NpdGlvbi54ICsgY2FtZXJhLnN0YXRlLmRpbWVuc2lvbnMud2lkdGggLyAyIC0gcmVjdC53aWR0aCAvIDIpICogY2FtZXJhLnN0YXRlLnNjYWxpbmcpO1xyXG4gIGxldCBmaW5hbF95ID0gKCh2aGVpZ2h0IC0geSAtIHJlY3QuaGVpZ2h0IC8gMiAtIGNhbWVyYS5zdGF0ZS5kaW1lbnNpb25zLmhlaWdodCAvIDIgKyBjYW1lcmEuc3RhdGUucG9zaXRpb24ueSkgKiBjYW1lcmEuc3RhdGUuc2NhbGluZyk7XHJcbiAgbGV0IGhlaWdodCA9IHJlY3QuaGVpZ2h0ICogY2FtZXJhLnN0YXRlLnNjYWxpbmc7XHJcbiAgbGV0IHdpZHRoID0gcmVjdC53aWR0aCAqIGNhbWVyYS5zdGF0ZS5zY2FsaW5nO1xyXG4gIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvcjtcclxuICBjb250ZXh0LmZpbGxSZWN0KGZpbmFsX3gsIGZpbmFsX3ksIHJlY3Qud2lkdGgsIGhlaWdodCk7XHJcbn0iLCJpbXBvcnQgeyBncmF2aXR5X29iaixvYmogfSBmcm9tIFwiLi9vYmplY3RcIjtcclxuaW1wb3J0IHsgUGFydGljbGUsIHNwcml0ZSB9IGZyb20gXCIuL3Nwcml0ZVwiO1xyXG5pbXBvcnQgeyBvYmpfc3RhdGUgfSBmcm9tIFwiLi9zdGF0ZVwiO1xyXG5pbXBvcnQgeyB2ZWxvY2l0eV9jb2xsaXNpb25fY2hlY2ssY2hlY2tfY29sbGlzaW9ucyxjb2xsaXNpb25fYm94LGNoZWNrX2FsbF9jb2xsaXNpb25zLGNoZWNrX2FsbF9vYmplY3RzfSBmcm9tIFwiLi9jb2xsaXNpb25cIjtcclxuaW1wb3J0IHtyZW5kZXJfY29sbGlzaW9uX2JveCxERUJVR30gZnJvbSBcIi4uL3ZhblwiO1xyXG5pbXBvcnQge0JpbmQsY29udHJvbF9mdW5jLCBleGVjX3R5cGV9IGZyb20gXCIuL2NvbnRyb2xzXCI7XHJcbmltcG9ydCB7IE92ZXJ3b3JsZCB9IGZyb20gXCIuLi9nYW1lL3Jvb21zL292ZXJ3b3JsZFwiO1xyXG5pbXBvcnQge0hVRH0gZnJvbSBcIi4vaHVkXCI7XHJcbmltcG9ydCB7YXVkaW99IGZyb20gXCIuL2F1ZGlvXCJcclxuXHJcbmludGVyZmFjZSBwb3NpdGlvbntcclxuICB4Om51bWJlcixcclxuICB5Om51bWJlclxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlfZ3Jhdml0eShvYjpncmF2aXR5X29iajx1bmtub3duPixncmF2X2NvbnN0Om51bWJlciwgZ3Jhdl9tYXg6bnVtYmVyKXtcclxuICBsZXQgc3QgPSBvYi5zdGF0ZSBhcyBvYmpfc3RhdGU7XHJcbiAgaWYob2IuZ3Jhdml0eSAmJiBzdC52ZWxvY2l0eS55ID4gZ3Jhdl9tYXgpe1xyXG4gICAgc3QudmVsb2NpdHkueSArPSBncmF2X2NvbnN0O1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBwYXJ0aWNsZV9lbnRyeXtcclxuICBzcHJpdGU6c3RyaW5nLFxyXG4gIGhlaWdodDpudW1iZXIsXHJcbiAgd2lkdGg6bnVtYmVyXHJcbn1cclxuXHJcbmludGVyZmFjZSBwYXJ0aWNsZXN7XHJcbiAgW2luZGV4OnN0cmluZ106cGFydGljbGVfZW50cnlcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSByb29tX2k8VD57XHJcbiAgYmFja2dyb3VuZF91cmw6c3RyaW5nLFxyXG4gIG9iamVjdHM6QXJyYXk8b2JqPHVua25vd24+PlxyXG4gIHN0YXRlOlRcclxufVxyXG5leHBvcnQgY2xhc3Mgcm9vbTxUPntcclxuICBiYWNrZ3JvdW5kX3VybDogc3RyaW5nO1xyXG4gIGJhY2tncm91bmQ6IEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgb2JqZWN0czogQXJyYXk8b2JqPHVua25vd24+PiA9IFtdO1xyXG4gIHBhcnRpY2xlczpwYXJ0aWNsZXMgPSB7fTtcclxuICBwYXJ0aWNsZXNfYXJyOiBBcnJheTxvYmo8dW5rbm93bj4+ID0gW107XHJcbiAgc3RhdGU6IFQ7XHJcbiAgaHVkOkhVRDtcclxuICBhdWRpbyA9IG5ldyBhdWRpbygpO1xyXG4gIGxvYWQoKSB7XHJcbiAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgbGV0IGEgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgbGV0IHRvX2F3YWl0ID0gdGhpcy5vYmplY3RzLm1hcCgoYSkgPT4gYS5sb2FkKCkpO1xyXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbCh0b19hd2FpdCk7XHJcbiAgICAgIGEuc3JjID0gdGhpcy5iYWNrZ3JvdW5kX3VybDtcclxuICAgICAgYS5vbmVycm9yID0gKCgpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIGxvYWRpbmcgdXJsOlwiICsgdGhpcy5iYWNrZ3JvdW5kX3VybCk7XHJcbiAgICAgIH0pXHJcbiAgICAgIGEub25sb2FkID0gKGFzeW5jKCkgPT4ge1xyXG4gICAgICAgIF90aGlzLmJhY2tncm91bmQgPSBhO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuYXVkaW8ubG9hZCgpO1xyXG4gICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KVxyXG4gIH1cclxuICBhc3luYyBhZGRJdGVtKG86b2JqPG9ial9zdGF0ZT4sIGxpc3QgPSB0aGlzLm9iamVjdHMpe1xyXG4gICAgYXdhaXQgby5sb2FkKCk7XHJcbiAgICBsaXN0LnB1c2gobyk7XHJcbiAgfVxyXG4gIGFzeW5jIGFkZEl0ZW1zKG86b2JqPG9ial9zdGF0ZT5bXSwgbGlzdCA9IHRoaXMub2JqZWN0cyl7XHJcbiAgICBhd2FpdCBQcm9taXNlLmFsbChvLm1hcCgoYSk9PmEubG9hZCgpKSk7XHJcbiAgICBsaXN0LnB1c2goLi4ubyk7XHJcbiAgfVxyXG4gIGRlbGV0ZUl0ZW0oaWQ6c3RyaW5nLCBsaXN0ID0gdGhpcy5vYmplY3RzKXtcclxuICAgIGZvcihsZXQgYSA9IDA7YSA8IGxpc3QubGVuZ3RoO2ErKyl7XHJcbiAgICAgIGlmKGxpc3RbYV0uaWQgPT09IGlkKXtcclxuICAgICAgICBsaXN0LnNwbGljZShhLDEpXHJcbiAgICAgICAgYS0tO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJlZ2lzdGVyUGFydGljbGVzKCl7XHJcblxyXG4gIH1cclxuICByZWdpc3RlckhVRCgpOkhVRHtcclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG4gIGJpbmRDb250cm9sKGtleTpzdHJpbmcseDpleGVjX3R5cGUsZnVuYzpjb250cm9sX2Z1bmMsaW50ZXJ2YWw6bnVtYmVyID0gMSl7XHJcbiAgICBCaW5kKGtleSxmdW5jLHgsaW50ZXJ2YWwpOyBcclxuICB9XHJcbiAgY2hlY2tfY29sbGlzaW9ucyhib3g6Y29sbGlzaW9uX2JveCxleGVtcHQ/OkFycmF5PHN0cmluZz4pOkFycmF5PG9iajx1bmtub3duPj57XHJcbiAgICBpZihERUJVRyl7XHJcbiAgICAgIHJlbmRlcl9jb2xsaXNpb25fYm94KGJveCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2hlY2tfYWxsX2NvbGxpc2lvbnMoYm94LHRoaXMub2JqZWN0cyxleGVtcHQpO1xyXG4gIH1cclxuICBjaGVja19vYmplY3RzKGJveDpjb2xsaXNpb25fYm94LGV4ZW1wdD86c3RyaW5nW10sbGlzdD10aGlzLm9iamVjdHMpe1xyXG4gICAgaWYoREVCVUcpe1xyXG4gICAgICByZW5kZXJfY29sbGlzaW9uX2JveChib3gpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNoZWNrX2FsbF9vYmplY3RzKGJveCxsaXN0LGV4ZW1wdCk7XHJcbiAgfVxyXG4gIHJlZ2lzdGVyX2NvbnRyb2xzKCl7XHJcblxyXG4gIH1cclxuICBjbGVhbnVwKCl7XHJcblxyXG4gIH1cclxuICBzdGF0ZWYodGltZTogbnVtYmVyKSB7XHJcbiAgICBmb3IgKGxldCBhID0gMDsgYSA8IHRoaXMub2JqZWN0cy5sZW5ndGg7IGErKykge1xyXG4gICAgICB0aGlzLm9iamVjdHNbYV0uc3RhdGVmKHRpbWUpO1xyXG4gICAgfVxyXG4gIH1cclxuICBlbWl0X3BhcnRpY2xlKG5hbWU6c3RyaW5nLHBvczpwb3NpdGlvbixsaWZldGltZTpudW1iZXIscG9zX3JhbmdlOm51bWJlcil7XHJcbiAgICB0aGlzLmFkZEl0ZW0obmV3IFBhcnRpY2xlKHRoaXMucGFydGljbGVzW25hbWVdLHBvcyxsaWZldGltZSxwb3NfcmFuZ2UpLCB0aGlzLnBhcnRpY2xlc19hcnIpO1xyXG4gIH1cclxuICBnZXRPYmooaWQ6c3RyaW5nKXtcclxuICAgIGZvcihsZXQgYSA9IDA7IGEgPCB0aGlzLm9iamVjdHMubGVuZ3RoOyBhKyspe1xyXG4gICAgICBpZih0aGlzLm9iamVjdHNbYV0uaWQgPT0gaWQpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzLm9iamVjdHNbYV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuICBnZXRPYmpCeVRhZyh0YWc6c3RyaW5nKXtcclxuICAgIHJldHVybiB0aGlzLm9iamVjdHMuZmlsdGVyKChhKT0+YS50YWdzLmluZGV4T2YodGFnKSA+IC0xKTtcclxuICB9XHJcbiAgcmVuZGVyZih0aW1lOiBudW1iZXIpOiBzcHJpdGUge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3ByaXRlX3NoZWV0OiB0aGlzLmJhY2tncm91bmQsXHJcbiAgICAgIGxlZnQ6IDAsXHJcbiAgICAgIHRvcDogMCxcclxuICAgICAgc3ByaXRlX2hlaWdodDogdGhpcy5iYWNrZ3JvdW5kLmhlaWdodCxcclxuICAgICAgc3ByaXRlX3dpZHRoOiB0aGlzLmJhY2tncm91bmQud2lkdGgsXHJcbiAgICAgIG9wYWNpdHk6MVxyXG4gICAgfVxyXG4gIH1cclxufSIsImltcG9ydCB7IG9iaiB9IGZyb20gXCIuL29iamVjdFwiO1xyXG5pbXBvcnQgeyBvYmpfc3RhdGUsIHBvc2l0aW9uLCBkaW1lbnNpb25zfSBmcm9tIFwiLi9zdGF0ZVwiO1xyXG5pbXBvcnQge2dldFJhbmRJbnR9IGZyb20gXCIuL3JhbmRcIjtcclxuaW1wb3J0IHtwYXJ0aWNsZV9lbnRyeX0gZnJvbSBcIi4vcm9vbVwiO1xyXG5pbXBvcnQge2dldEdhbWV9IGZyb20gXCIuLi92YW5cIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2Ugc3ByaXRle1xyXG4gIHNwcml0ZV9zaGVldDpIVE1MSW1hZ2VFbGVtZW50LFxyXG4gIGxlZnQ6bnVtYmVyLFxyXG4gIHRvcDpudW1iZXIsXHJcbiAgc3ByaXRlX3dpZHRoOm51bWJlcixcclxuICBzcHJpdGVfaGVpZ2h0Om51bWJlcixcclxuICBvcGFjaXR5Om51bWJlclxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIHBvc2l0aW9uZWRfc3ByaXRle1xyXG4gIHNwcml0ZTpzcHJpdGUsXHJcbiAgeDpudW1iZXIsXHJcbiAgeTpudW1iZXJcclxufVxyXG5cclxuaW50ZXJmYWNlIFBhcnRpY2xlX2l7XHJcbiAgbGlmZXRpbWU6bnVtYmVyO1xyXG4gIHBvc2l0aW9uOntcclxuICAgIHg6bnVtYmVyLFxyXG4gICAgeTpudW1iZXJcclxuICB9LFxyXG4gIHZlbG9jaXR5OntcclxuICAgIHg6bnVtYmVyLFxyXG4gICAgeTpudW1iZXJcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQYXJ0aWNsZSBleHRlbmRzIG9iajxQYXJ0aWNsZV9pPntcclxuICBjb2xsaXNpb24gPSBmYWxzZTtcclxuICByYW5kb21fcmFuZ2U6bnVtYmVyO1xyXG4gIG1heF9saWZldGltZTpudW1iZXI7XHJcbiAgc2VsZWN0ZWRfc3ByaXRlOnNwcml0ZTtcclxuICBjb25zdHJ1Y3RvcihwYXJ0OnBhcnRpY2xlX2VudHJ5LHBvczpwb3NpdGlvbixsaWZldGltZTpudW1iZXIscmFuZG9tX3JhbmdlOm51bWJlcil7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgbGlmZXRpbWU6MCxcclxuICAgICAgcG9zaXRpb246e1xyXG4gICAgICAgIHg6cG9zLnggKyBnZXRSYW5kSW50KC1yYW5kb21fcmFuZ2UscmFuZG9tX3JhbmdlKSxcclxuICAgICAgICB5OnBvcy55ICsgZ2V0UmFuZEludCgtcmFuZG9tX3JhbmdlLHJhbmRvbV9yYW5nZSlcclxuICAgICAgfSxcclxuICAgICAgdmVsb2NpdHk6e1xyXG4gICAgICAgIHg6MCxcclxuICAgICAgICB5OjBcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoaXMuc3ByaXRlX3VybCA9IHBhcnQuc3ByaXRlO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBwYXJ0LmhlaWdodDtcclxuICAgIHRoaXMud2lkdGggPSBwYXJ0LndpZHRoO1xyXG4gICAgdGhpcy5tYXhfbGlmZXRpbWUgPSBsaWZldGltZTtcclxuICAgIHRoaXMucmFuZG9tX3JhbmdlID0gcmFuZG9tX3JhbmdlO1xyXG4gIH1cclxuICBkZWxldGUoKXtcclxuICAgIGxldCByb29tID0gZ2V0R2FtZSgpLmdldFJvb20oKTtcclxuICAgIHJvb20uZGVsZXRlSXRlbSh0aGlzLmlkLHJvb20ucGFydGljbGVzX2Fycik7XHJcbiAgfVxyXG4gIHN0YXRlZih0aW1lOm51bWJlcil7XHJcbiAgICB0aGlzLnN0YXRlLmxpZmV0aW1lICs9IHRpbWU7XHJcbiAgICBpZih0aGlzLnN0YXRlLmxpZmV0aW1lID4gdGhpcy5tYXhfbGlmZXRpbWUpe1xyXG4gICAgICB0aGlzLmRlbGV0ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZW5kZXJmKHRpbWU6bnVtYmVyKTpwb3NpdGlvbmVkX3Nwcml0ZXtcclxuICAgIGlmKCF0aGlzLnNlbGVjdGVkX3Nwcml0ZSl7XHJcbiAgICAgIGxldCBzcHJpdGVzID0gc3ByaXRlX2dlbih0aGlzLnNwcml0ZV9zaGVldCx0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KVxyXG4gICAgICBsZXQgcmFuZG9tX3JvdyA9IGdldFJhbmRJbnQoMCxzcHJpdGVzLmxlbmd0aCk7XHJcbiAgICAgIGxldCByYW5kb21fY29sID0gZ2V0UmFuZEludCgwLHNwcml0ZXNbcmFuZG9tX3Jvd10ubGVuZ3RoKTtcclxuICAgICAgdGhpcy5zZWxlY3RlZF9zcHJpdGUgPSBzcHJpdGVzW3JhbmRvbV9yb3ddW3JhbmRvbV9jb2xdO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZWxlY3RlZF9zcHJpdGUub3BhY2l0eSA9IDEgLSB0aGlzLnN0YXRlLmxpZmV0aW1lL3RoaXMubWF4X2xpZmV0aW1lO1xyXG4gICAgcmV0dXJue1xyXG4gICAgICB4OnRoaXMuc3RhdGUucG9zaXRpb24ueCxcclxuICAgICAgeTp0aGlzLnN0YXRlLnBvc2l0aW9uLnksXHJcbiAgICAgIHNwcml0ZTp0aGlzLnNlbGVjdGVkX3Nwcml0ZVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNwcml0ZV9nZW4oc3ByaXRlX3NoZWV0OkhUTUxJbWFnZUVsZW1lbnQsc3ByaXRlX3dpZHRoOm51bWJlcixzcHJpdGVfaGVpZ2h0Om51bWJlcik6QXJyYXk8QXJyYXk8c3ByaXRlPj57XHJcbiAgbGV0IHdpZHRoID0gc3ByaXRlX3NoZWV0LndpZHRoO1xyXG4gIGxldCBoZWlnaHQgPSBzcHJpdGVfc2hlZXQuaGVpZ2h0O1xyXG4gIGxldCBzcHJpdGVzOkFycmF5PEFycmF5PHNwcml0ZT4+ID0gW107XHJcbiAgZm9yKGxldCBiID0gMDsgYiA8IGhlaWdodDtiICs9IHNwcml0ZV9oZWlnaHQpe1xyXG4gICAgc3ByaXRlcy5wdXNoKFtdKTtcclxuICAgIGZvcihsZXQgYSA9IDA7IGEgPCB3aWR0aDthICs9IHNwcml0ZV93aWR0aCl7XHJcbiAgICAgIHNwcml0ZXNbYl0ucHVzaCh7XHJcbiAgICAgICAgc3ByaXRlX3NoZWV0LFxyXG4gICAgICAgIGxlZnQ6YSxcclxuICAgICAgICB0b3A6YiAqIHNwcml0ZV9oZWlnaHQsXHJcbiAgICAgICAgc3ByaXRlX2hlaWdodCxcclxuICAgICAgICBzcHJpdGVfd2lkdGgsXHJcbiAgICAgICAgb3BhY2l0eToxXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBzcHJpdGVzO1xyXG59XHJcblxyXG4iLCJleHBvcnQgaW50ZXJmYWNlIHN0YXRlX2Z1bmM8VD57XHJcbiAgKGxhc3RfdGltZTpudW1iZXIsY3VycmVudF9zdGF0ZTpUKTpUXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgdmVsb2NpdHl7XHJcbiAgeDpudW1iZXI7XHJcbiAgeTpudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgcG9zaXRpb257XHJcbiAgeDpudW1iZXI7XHJcbiAgeTpudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgZGltZW5zaW9uc3tcclxuICBoZWlnaHQ6bnVtYmVyLFxyXG4gIHdpZHRoOm51bWJlclxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIG9ial9zdGF0ZXtcclxuICBwb3NpdGlvbjpwb3NpdGlvbjtcclxuICB2ZWxvY2l0eTp2ZWxvY2l0eTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSByb29tX3N0YXRle1xyXG4gIG9iamVjdHM6IEFycmF5PG9ial9zdGF0ZT5cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBvc2l0aW9uX2luaXQoKTpvYmpfc3RhdGV7XHJcbiAgcmV0dXJuIHtcclxuICAgIHBvc2l0aW9uOntcclxuICAgICAgeDowLFxyXG4gICAgICB5OjBcclxuICAgIH0sXHJcbiAgICB2ZWxvY2l0eTp7XHJcbiAgICAgIHg6MCxcclxuICAgICAgeTowXHJcbiAgICB9XHJcblxyXG4gIH0gIFxyXG59IiwiZXhwb3J0IGxldCBERUJVRyA9IGZhbHNlO1xyXG5cclxuaW1wb3J0IHtvYmp9IGZyb20gXCIuL2xpYi9vYmplY3RcIjtcclxuaW1wb3J0IHtvYmpfc3RhdGV9IGZyb20gXCIuL2xpYi9zdGF0ZVwiO1xyXG5pbXBvcnQge3Jvb219IGZyb20gXCIuL2xpYi9yb29tXCI7XHJcbmltcG9ydCB7cG9zaXRpb25lZF9zcHJpdGUsIHNwcml0ZX0gZnJvbSBcIi4vbGliL3Nwcml0ZVwiO1xyXG5pbXBvcnQgeyBjb2xsaXNpb25fYm94IH0gZnJvbSBcIi4vbGliL2NvbGxpc2lvblwiO1xyXG5pbXBvcnQge3Nwcml0ZV9yZW5kZXJlcixyZWN0X3JlbmRlcmVyLCBzdHJva2VkX3JlY3RfcmVuZGVyZXIsIHRleHRfcmVuZGVyZXIsIENhbWVyYX0gZnJvbSBcIi4vbGliL3JlbmRlclwiO1xyXG5pbXBvcnQge0hVRH0gZnJvbSBcIi4vbGliL2h1ZFwiO1xyXG5pbXBvcnQge0V4ZWN1dGVSZXBlYXRCaW5kc30gZnJvbSBcIi4vbGliL2NvbnRyb2xzXCI7XHJcblxyXG5pbXBvcnQge092ZXJ3b3JsZH0gZnJvbSBcIi4vZ2FtZS9yb29tcy9vdmVyd29ybGRcIjtcclxuXHJcblxyXG5sZXQgY2FudmFzX2VsZW1lbnQ6SFRNTENhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhcmdldFwiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcclxubGV0IGNvbnRleHQ6Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gY2FudmFzX2VsZW1lbnQuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuXHJcbmxldCBzY3JlZW5fd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxubGV0IHNjcmVlbl9oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG5sZXQgdndpZHRoID0gY2FudmFzX2VsZW1lbnQud2lkdGg7XHJcbmxldCB2aGVpZ2h0ID0gY2FudmFzX2VsZW1lbnQuaGVpZ2h0O1xyXG5cclxuXHJcbi8vSG93IG9mdGVuIHRoZSBnYW1lIGxvZ2ljIGxvb3Agc2hvdWxkIHJ1biwgaW4gbWlsbGlzZWNvbmRzXHJcbmxldCBsb2dpY19sb29wX2ludGVydmFsOm51bWJlciA9IDEwMDAvNjA7ICBcclxuXHJcbmxldCBsYXN0X3RpbWUgPSBuZXcgRGF0ZSgpO1xyXG5cclxubGV0IGxhc3RfcmVuZGVyX3RpbWUgPSAwO1xyXG5cclxuaW50ZXJmYWNlIGRpbWVuc2lvbnN7XHJcbiAgaGVpZ2h0Om51bWJlcixcclxuICB3aWR0aDpudW1iZXJcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBHZXRTY3JlZW5EaW1lbnNpb25zICgpOmRpbWVuc2lvbnN7XHJcbiAgcmV0dXJuKHtcclxuICAgIHdpZHRoOnNjcmVlbl93aWR0aCxcclxuICAgIGhlaWdodDpzY3JlZW5faGVpZ2h0XHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEdldFZpZXdwb3J0RGltZW5zaW9ucyAoKTpkaW1lbnNpb25ze1xyXG4gIHJldHVybih7XHJcbiAgICBoZWlnaHQ6dmhlaWdodCxcclxuICAgIHdpZHRoOnZ3aWR0aFxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXREZWJ1Zyh4OmJvb2xlYW4pe1xyXG4gIERFQlVHID0geDtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlbmRlcl9jb2xsaXNpb25fYm94ID0gKGE6Y29sbGlzaW9uX2JveCkgPT4ge1xyXG4gIGJveGVzLnB1c2goYSk7XHJcbn1cclxuXHJcbmxldCBib3hlczpBcnJheTxjb2xsaXNpb25fYm94PiA9IFtdO1xyXG5cclxuZXhwb3J0IGxldCBkZWVwID0gKGE6YW55KSA9PntcclxuICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhKSk7XHJcbn1cclxuXHJcbmludGVyZmFjZSBnYW1lX3N0YXRle1xyXG4gIGxvZ2ljOm51bWJlcixcclxuICBjb250ZXh0OkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxcclxuICBjdXJyZW50X3Jvb206cm9vbTx1bmtub3duPixcclxuICBjYW1lcmFzOkFycmF5PENhbWVyYT4sXHJcbiAgY2FudmFzOkhUTUxDYW52YXNFbGVtZW50LFxyXG4gIHBsYXllcl9zdGF0ZTp7XHJcbiAgICBwb3dlcjpudW1iZXJcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBnYW1le1xyXG4gIHN0YXRlOmdhbWVfc3RhdGU7XHJcbiAgY29udGV4dDpDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgb2Zmc2NyZWVuX2NhbnZhczpIVE1MQ2FudmFzRWxlbWVudDtcclxuICBvZmZzY3JlZW5fY29udGV4dDpDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgY29uc3RydWN0b3IoY3R4OkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxhOnJvb208dW5rbm93bj4pe1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgY2FudmFzOmNhbnZhc19lbGVtZW50LFxyXG4gICAgICBsb2dpYzp1bmRlZmluZWQsXHJcbiAgICAgIGNvbnRleHQ6Y3R4LFxyXG4gICAgICBjYW1lcmFzOltuZXcgQ2FtZXJhKDAsMCx2d2lkdGgvMix2aGVpZ2h0LDEse1xyXG4gICAgICAgIHg6MCxcclxuICAgICAgICB5OjAsXHJcbiAgICAgICAgd2lkdGg6MC41LFxyXG4gICAgICAgIGhlaWdodDowLjVcclxuICAgICAgfSksXHJcbiAgICAgIG5ldyBDYW1lcmEoMCwxMDAsdndpZHRoLzIsdmhlaWdodC8yLDEse1xyXG4gICAgICAgIHg6dndpZHRoLzIsXHJcbiAgICAgICAgeTowLFxyXG4gICAgICAgIHdpZHRoOjAuNSxcclxuICAgICAgICBoZWlnaHQ6MC41XHJcbiAgICAgIH0pLFxyXG4gICAgICBuZXcgQ2FtZXJhKDAsMTAwLHZ3aWR0aC8yLHZoZWlnaHQvMiwxLHtcclxuICAgICAgICB4OnZ3aWR0aC8yLFxyXG4gICAgICAgIHk6dmhlaWdodC8yLFxyXG4gICAgICAgIHdpZHRoOjAuNSxcclxuICAgICAgICBoZWlnaHQ6MC41XHJcbiAgICAgIH0pXHJcbiAgICAgIF0sXHJcbiAgICAgIGN1cnJlbnRfcm9vbTogdW5kZWZpbmVkLFxyXG4gICAgICBwbGF5ZXJfc3RhdGU6e1xyXG4gICAgICAgIHBvd2VyOjBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5vZmZzY3JlZW5fY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgIHRoaXMub2Zmc2NyZWVuX2NvbnRleHQgPSB0aGlzLm9mZnNjcmVlbl9jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgdGhpcy5sb2FkUm9vbShhKTtcclxuICB9XHJcbiAgcmVuZGVyKHQ6bnVtYmVyKXtcclxuICAgIGxldCB0aW1lID0gdCAtIGxhc3RfcmVuZGVyX3RpbWVcclxuICAgIGxhc3RfcmVuZGVyX3RpbWUgPSB0O1xyXG4gICAgZm9yKGxldCBjYW1lcmEgb2YgdGhpcy5zdGF0ZS5jYW1lcmFzKXtcclxuICAgICAgXHJcbiAgICAgIHRoaXMub2Zmc2NyZWVuX2NhbnZhcy5oZWlnaHQgPSBjYW1lcmEuc3RhdGUuZGltZW5zaW9ucy5oZWlnaHQ7XHJcbiAgICAgIHRoaXMub2Zmc2NyZWVuX2NhbnZhcy53aWR0aCA9IGNhbWVyYS5zdGF0ZS5kaW1lbnNpb25zLndpZHRoO1xyXG4gICAgICB0aGlzLm9mZnNjcmVlbl9jb250ZXh0LmNsZWFyUmVjdCgwLDAsY2FtZXJhLnN0YXRlLmRpbWVuc2lvbnMud2lkdGgsY2FtZXJhLnN0YXRlLmRpbWVuc2lvbnMuaGVpZ2h0KTtcclxuICAgICAgdGhpcy5vZmZzY3JlZW5fY29udGV4dC5maWxsU3R5bGU9XCJibGFja1wiO1xyXG4gICAgICB0aGlzLm9mZnNjcmVlbl9jb250ZXh0LmZpbGxSZWN0KDAsMCxjYW1lcmEuc3RhdGUuZGltZW5zaW9ucy53aWR0aCxjYW1lcmEuc3RhdGUuZGltZW5zaW9ucy5oZWlnaHQpO1xyXG4gICAgICBsZXQgY2FtZXJhX2JveCA9IHtcclxuICAgICAgICB4OmNhbWVyYS5zdGF0ZS5wb3NpdGlvbi54LFxyXG4gICAgICAgIHk6Y2FtZXJhLnN0YXRlLnBvc2l0aW9uLnksXHJcbiAgICAgICAgd2lkdGg6Y2FtZXJhLnN0YXRlLmRpbWVuc2lvbnMud2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0OmNhbWVyYS5zdGF0ZS5kaW1lbnNpb25zLmhlaWdodFxyXG4gICAgICB9O1xyXG4gICAgICBsZXQgcGFydGljbGVfY29sbGlkZXMgPSB0aGlzLnN0YXRlLmN1cnJlbnRfcm9vbS5jaGVja19vYmplY3RzKGNhbWVyYV9ib3gsW10sdGhpcy5zdGF0ZS5jdXJyZW50X3Jvb20ucGFydGljbGVzX2Fycik7XHJcbiAgICAgIGxldCBjYW1lcmFfY29sbGlkZXJzID0gWy4uLnRoaXMuc3RhdGUuY3VycmVudF9yb29tLmNoZWNrX29iamVjdHMoY2FtZXJhX2JveCksLi4ucGFydGljbGVfY29sbGlkZXNdO1xyXG4gICAgICBsZXQgcmVuZGVyX2FyZ3MgPSB7XHJcbiAgICAgICAgY29udGV4dDp0aGlzLm9mZnNjcmVlbl9jb250ZXh0LFxyXG4gICAgICAgIGNhbWVyYTpjYW1lcmEsXHJcbiAgICAgIH07XHJcbiAgICAgIHNwcml0ZV9yZW5kZXJlcihyZW5kZXJfYXJncyx7XHJcbiAgICAgICAgc3ByaXRlOnRoaXMuc3RhdGUuY3VycmVudF9yb29tLnJlbmRlcmYodGltZSksXHJcbiAgICAgICAgeDogMCxcclxuICAgICAgICB5OiAwLFxyXG4gICAgICAgIHJvdGF0aW9uOiAwXHJcbiAgICAgIH0pO1xyXG4gICAgICBsZXQgaGl0Ym94ZXM6Y29sbGlzaW9uX2JveFtdID0gW107XHJcbiAgICAgIGZvciAobGV0IGEgb2YgY2FtZXJhX2NvbGxpZGVycy5maWx0ZXIoKGIpID0+IGIucmVuZGVyKSkge1xyXG4gICAgICAgIGxldCByZW5kZXJlZCA9IGEucmVuZGVyX3RyYWNrKHQpO1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlbmRlcmVkKSkge1xyXG4gICAgICAgICAgZm9yIChsZXQgcG9zaXRpb25lZF9zcHJpdGUgb2YgcmVuZGVyZWQpXHJcbiAgICAgICAgICAgIHNwcml0ZV9yZW5kZXJlcihyZW5kZXJfYXJncywge1xyXG4gICAgICAgICAgICAgIHNwcml0ZTpwb3NpdGlvbmVkX3Nwcml0ZS5zcHJpdGUsXHJcbiAgICAgICAgICAgICAgeDogcG9zaXRpb25lZF9zcHJpdGUueCxcclxuICAgICAgICAgICAgICB5OiBwb3NpdGlvbmVkX3Nwcml0ZS55LFxyXG4gICAgICAgICAgICAgIHJvdGF0aW9uOiBhLnJvdGF0aW9uXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIGxldCBwb3NpdGlvbmVkX3Nwcml0ZSA9IHJlbmRlcmVkIGFzIHBvc2l0aW9uZWRfc3ByaXRlO1xyXG4gICAgICAgICAgc3ByaXRlX3JlbmRlcmVyKHJlbmRlcl9hcmdzLCB7XHJcbiAgICAgICAgICAgIHNwcml0ZTogcG9zaXRpb25lZF9zcHJpdGUuc3ByaXRlLFxyXG4gICAgICAgICAgICB4OiBwb3NpdGlvbmVkX3Nwcml0ZS54LFxyXG4gICAgICAgICAgICB5OiBwb3NpdGlvbmVkX3Nwcml0ZS55LFxyXG4gICAgICAgICAgICByb3RhdGlvbjogYS5yb3RhdGlvblxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKERFQlVHICYmIGEuY29sbGlzaW9uKXtcclxuICAgICAgICAgIGhpdGJveGVzLnB1c2goYS5jcmVhdGVfY29sbGlzaW9uX2JveCgpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKERFQlVHKSB7XHJcbiAgICAgICAgbGV0IGJveDogY29sbGlzaW9uX2JveDtcclxuICAgICAgICBsZXQgYm94ZXNfY29weSA9IFsuLi5ib3hlc11cclxuICAgICAgICB3aGlsZShib3hlc19jb3B5Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgbGV0IGJveCA9IGJveGVzX2NvcHkucG9wKCk7XHJcbiAgICAgICAgICBsZXQgcmVjdCA9IHtcclxuICAgICAgICAgICAgd2lkdGg6Ym94LndpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQ6Ym94LmhlaWdodFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgc3Ryb2tlZF9yZWN0X3JlbmRlcmVyKHRoaXMub2Zmc2NyZWVuX2NvbnRleHQscmVjdCxib3gueCxib3gueSxcIiNGRjAwMDBcIixjYW1lcmEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aGlsZShoaXRib3hlcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgIGxldCBib3ggPSBoaXRib3hlcy5wb3AoKTtcclxuICAgICAgICAgIGxldCByZWN0ID0ge1xyXG4gICAgICAgICAgICB3aWR0aDpib3gud2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDpib3guaGVpZ2h0XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBzdHJva2VkX3JlY3RfcmVuZGVyZXIodGhpcy5vZmZzY3JlZW5fY29udGV4dCxyZWN0LGJveC54LGJveC55LFwiIzAwODAwMFwiLGNhbWVyYSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmKHRoaXMuc3RhdGUuY3VycmVudF9yb29tLmh1ZCl7XHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gdGhpcy5zdGF0ZS5jdXJyZW50X3Jvb20uaHVkLmdyYXBoaWNfZWxlbWVudHM7XHJcbiAgICAgICAgbGV0IHRleHRfZWxlbWVudHMgPSB0aGlzLnN0YXRlLmN1cnJlbnRfcm9vbS5odWQudGV4dF9lbGVtZW50cztcclxuICAgICAgICBmb3IobGV0IGEgb2YgZ3JhcGhpY3Mpe1xyXG4gICAgICAgICAgbGV0IHJlbmRlcmVkID0gYS5yZW5kZXJfdHJhY2sodCk7XHJcbiAgICAgICAgICBpZihBcnJheS5pc0FycmF5KHJlbmRlcmVkKSAmJiBhLnJlbmRlcil7XHJcbiAgICAgICAgICAgIGZvcihsZXQgcG9zaXRpb25lZF9zcHJpdGUgb2YgcmVuZGVyZWQpe1xyXG4gICAgICAgICAgICAgIHNwcml0ZV9yZW5kZXJlcihyZW5kZXJfYXJncyx7XHJcbiAgICAgICAgICAgICAgICBzcHJpdGU6cG9zaXRpb25lZF9zcHJpdGUuc3ByaXRlLFxyXG4gICAgICAgICAgICAgICAgeDpwb3NpdGlvbmVkX3Nwcml0ZS54LFxyXG4gICAgICAgICAgICAgICAgeTpwb3NpdGlvbmVkX3Nwcml0ZS55LFxyXG4gICAgICAgICAgICAgICAgcm90YXRpb246YS5yb3RhdGlvblxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIGlmKGEucmVuZGVyKXtcclxuICAgICAgICAgICAgbGV0IHBvcyA9ICg8cG9zaXRpb25lZF9zcHJpdGU+cmVuZGVyZWQpO1xyXG4gICAgICAgICAgICBzcHJpdGVfcmVuZGVyZXIocmVuZGVyX2FyZ3Mse1xyXG4gICAgICAgICAgICAgIHNwcml0ZTpwb3Muc3ByaXRlLFxyXG4gICAgICAgICAgICAgIHg6cG9zLngsXHJcbiAgICAgICAgICAgICAgeTpwb3MueSxcclxuICAgICAgICAgICAgICByb3RhdGlvbjphLnJvdGF0aW9uXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZW5kZXJfYXJncy5jb250ZXh0ID0gdGhpcy5zdGF0ZS5jb250ZXh0O1xyXG4gICAgICAgIGZvcihsZXQgYSBvZiB0ZXh0X2VsZW1lbnRzKXtcclxuICAgICAgICAgIGxldCBzdCA9IGEuc3RhdGU7XHJcbiAgICAgICAgICB0ZXh0X3JlbmRlcmVyKHJlbmRlcl9hcmdzLHtcclxuICAgICAgICAgICAgeDpzdC5wb3NpdGlvbi54LFxyXG4gICAgICAgICAgICB5OnN0LnBvc2l0aW9uLnksXHJcbiAgICAgICAgICAgIGZvbnQ6YS5yZW5kZXJmKHQpXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0aGlzLnN0YXRlLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMub2Zmc2NyZWVuX2NhbnZhcyxjYW1lcmEuc3RhdGUudmlld3BvcnQueCxjYW1lcmEuc3RhdGUudmlld3BvcnQueSk7XHJcbiAgICB9XHJcbiAgICBpZihERUJVRylcclxuICAgICAgYm94ZXMgPSBbXTtcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoYSk9Pnt0aGlzLnJlbmRlcihhKX0pOyBcclxuICB9XHJcbiAgc3RhcnRfbG9naWMoYTpudW1iZXIpe1xyXG4gICAgcmV0dXJuIHNldEludGVydmFsKCgpPT57XHJcbiAgICAgIGxldCBuZXdfdGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgIGxldCB0aW1lX3NpbmNlID0gbmV3X3RpbWUuZ2V0VGltZSgpIC0gbGFzdF90aW1lLmdldFRpbWUoKTtcclxuICAgICAgbGFzdF90aW1lID0gbmV3X3RpbWU7XHJcbiAgICAgIHRoaXMuc3RhdGUuY3VycmVudF9yb29tLnN0YXRlZih0aW1lX3NpbmNlKTtcclxuICAgICAgaWYodGhpcy5zdGF0ZS5jdXJyZW50X3Jvb20uaHVkKXtcclxuICAgICAgICB0aGlzLnN0YXRlLmN1cnJlbnRfcm9vbS5odWQuc3RhdGVmKHRpbWVfc2luY2UpO1xyXG4gICAgICB9XHJcbiAgICAgICAgRXhlY3V0ZVJlcGVhdEJpbmRzKGEpO1xyXG4gICAgfSxhKTtcclxuICB9XHJcbiAgZ2V0Um9vbSgpe1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuY3VycmVudF9yb29tO1xyXG4gIH1cclxuICBhc3luYyBsb2FkUm9vbSh4OnJvb208dW5rbm93bj4pe1xyXG4gICAgeC5odWQgPSB4LnJlZ2lzdGVySFVEKCk7XHJcbiAgICBpZih0aGlzLnN0YXRlLmN1cnJlbnRfcm9vbSAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgd2hpbGUodGhpcy5zdGF0ZS5jdXJyZW50X3Jvb20ub2JqZWN0cy5sZW5ndGggPiAwKXtcclxuICAgICAgICB0aGlzLnN0YXRlLmN1cnJlbnRfcm9vbS5vYmplY3RzWzBdLmRlbGV0ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgbmV3X3Jvb20gPSBhd2FpdCB4LmxvYWQoKTtcclxuICAgIHgucmVnaXN0ZXJfY29udHJvbHMoKTtcclxuICAgIHgucmVnaXN0ZXJQYXJ0aWNsZXMoKTtcclxuICAgIHRoaXMuc3RhdGUuY3VycmVudF9yb29tID0geDtcclxuICAgIGlmKHRoaXMuc3RhdGUubG9naWMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnN0YXRlLmxvZ2ljKTtcclxuICAgIH1cclxuICAgIHRoaXMuc3RhdGUubG9naWMgPSB0aGlzLnN0YXJ0X2xvZ2ljKGxvZ2ljX2xvb3BfaW50ZXJ2YWwpXHJcbiAgICB0aGlzLnJlbmRlcigwKTtcclxuICB9XHJcbn1cclxuXHJcbmxldCBnYW1lX2luc3QgPSBuZXcgZ2FtZShjb250ZXh0LG5ldyBPdmVyd29ybGQoKSAgKTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRHYW1lKCl7XHJcbiAgcmV0dXJuIGdhbWVfaW5zdDtcclxufSJdLCJzb3VyY2VSb290IjoiIn0=