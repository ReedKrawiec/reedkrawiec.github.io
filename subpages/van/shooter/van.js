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
exports.Box = void 0;
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


/***/ }),

/***/ "./src/game/objects/bullet.ts":
/*!************************************!*\
  !*** ./src/game/objects/bullet.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Bullet = void 0;
const platformer_obj_1 = __webpack_require__(/*! ./platformer_obj */ "./src/game/objects/platformer_obj.ts");
const object_1 = __webpack_require__(/*! ../../lib/object */ "./src/lib/object.ts");
const van_1 = __webpack_require__(/*! ../../van */ "./src/van.ts");
class Bullet extends platformer_obj_1.platformer_obj {
    constructor(x, angle, id = undefined) {
        super();
        this.sprite_url = "http://localhost/src/game/sprites/bullet.png";
        this.collision = false;
        this.height = 20;
        this.width = 10;
        this.gravity = false;
        if (id != undefined) {
            this.id = id;
        }
        this.state = {
            position: x,
            velocity: {
                x: 0,
                y: 0
            },
            speed: 40,
            rotation: angle,
            distance: 0,
            damage: 5
        };
        this.rotation = angle;
    }
    statef() {
        this.state.velocity = object_1.rotation_length(this.state.speed, this.state.rotation);
        this.state.distance += this.state.speed;
        if (this.state.distance > 2000) {
            this.delete();
        }
        let room = van_1.getGame().state.current_room;
        let collisions = room.check_collisions({
            x: this.state.position.x,
            y: this.state.position.y,
            width: this.width,
            height: this.height
        }, ["player", "bullet"]);
        if (collisions.length > 0) {
            for (let collision of collisions) {
                let st = collision.state;
                if (collision.enemy) {
                    st.health -= this.state.damage;
                }
            }
            this.delete();
        }
    }
    register_controls() {
    }
}
exports.Bullet = Bullet;


/***/ }),

/***/ "./src/game/objects/goomba.ts":
/*!************************************!*\
  !*** ./src/game/objects/goomba.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.StandingGoomba = exports.Goomba = exports.Cursor = void 0;
const sprite_1 = __webpack_require__(/*! ../../lib/sprite */ "./src/lib/sprite.ts");
const platformer_obj_1 = __webpack_require__(/*! ./platformer_obj */ "./src/game/objects/platformer_obj.ts");
const controls_1 = __webpack_require__(/*! ../../lib/controls */ "./src/lib/controls.ts");
const van_1 = __webpack_require__(/*! ../../van */ "./src/van.ts");
var direction;
(function (direction) {
    direction[direction["left"] = 0] = "left";
    direction[direction["right"] = 1] = "right";
})(direction || (direction = {}));
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
        this.sprite_url = "./sprites/goomba.png";
        this.height = 64;
        this.width = 64;
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
            health: 100
        };
        this.animations.play("walk1");
    }
    register_animations() {
        let sprites = sprite_1.sprite_gen(this.sprite_sheet, this.width, this.height);
        this.animations.add("walk1", [
            [0, sprites[0][0]],
            [1000, sprites[0][1]]
        ], 2000);
    }
    register_audio() {
        this.audio.add("slime", "./sounds/goomba/slimeball.wav");
    }
    register_controls() {
        this.bindControl("KeyA", controls_1.exec_type.repeat, () => {
            if (this.state.velocity.x > -10) {
                this.state.velocity.x = this.state.velocity.x - 0.5;
            }
        });
        this.bindControl("mousedown", controls_1.exec_type.repeat, () => {
            this.audio.play("slime", 0.01);
        }, 50);
        this.bindControl("KeyD", controls_1.exec_type.repeat, () => {
            if (this.state.velocity.x < 10) {
                this.state.velocity.x = this.state.velocity.x + 0.5;
            }
        });
        this.bindControl("Space", controls_1.exec_type.once, () => {
            if (!this.state.jumping) {
                this.state.velocity.y += 15;
                this.audio.play("slime", 0.1);
            }
        });
    }
    statef(time) {
        let cursor = van_1.getGame().getRoom().getObj("cursor");
        let bottom_collisions = this.collision_check({
            x: this.state.position.x,
            y: this.state.position.y - 1 - this.height / 2,
            width: this.width,
            height: 1
        });
        let jumping_check = bottom_collisions.length > 0;
        if (jumping_check) {
            this.state.jumping = false;
        }
        else {
            this.state.jumping = true;
        }
        if (this.state.velocity.x > 0) {
            this.state.velocity.x = this.state.velocity.x - 0.2;
            if (this.state.velocity.x < 0) {
                this.state.velocity.x = 0;
            }
        }
        else if (this.state.velocity.x < 0) {
            this.state.velocity.x = this.state.velocity.x + 0.2;
            if (this.state.velocity.x > 0) {
                this.state.velocity.x = 0;
            }
        }
    }
}
exports.Goomba = Goomba;
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
            health: 100
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
exports.platformer_obj = void 0;
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
                y: 710
            },
            size: 44,
            font: "Alata",
            color: "white",
            align: "left"
        }, () => {
            let x = van_1.getGame().getRoom().getObj("player");
            return `X:${Math.round(x.state.position.x)}`;
        }));
        this.text_elements.push(new hud_1.Text({
            position: {
                x: 10,
                y: 750
            },
            size: 44,
            font: "Alata",
            color: "white",
            align: "left"
        }, () => {
            let x = van_1.getGame().getRoom().getObj("player");
            return `Y:${Math.round(x.state.position.y)}`;
        }));
    }
}
class Overworld extends room_1.room {
    constructor() {
        super();
        this.background_url = "./sprites/imD41l.jpg";
        this.objects = [new goomba_1.Cursor("cursor"), new goomba_1.Goomba(800, 64, "player"), new box_1.Box(600, 0, "platform"), new target_1.Target([200, 100]), new target_1.Target([200, 200]), new target_1.Target([1000, 100]), new target_1.Target([1000, 200])];
        this.state = {
            player: undefined,
            paused: false
        };
    }
    registerHUD() {
        return new Overworld_HUD();
    }
    register_controls() {
        this.bindControl("Escape", controls_1.exec_type.once, () => {
            this.state.paused = !this.state.paused;
        });
        this.bindControl("mousedown", controls_1.exec_type.repeat, () => {
            let player = this.getObj("player");
            let cursor = this.getObj("cursor");
            let position = {
                x: player.state.position.x,
                y: player.state.position.y
            };
            let bullet = new bullet_1.Bullet(position, player.angleTowards(cursor));
            this.addItem(bullet);
        }, 50);
    }
    statef(time) {
        if (!this.state.paused) {
            for (let a = 0; a < this.objects.length; a++) {
                room_1.apply_gravity(this.objects[a], -.5, -15);
                collision_1.velocity_collision_check(this.objects[a], this.objects);
                this.objects[a].statef(time);
            }
            let player = this.getObj("player");
            let cursor = this.getObj("cursor");
            if (player) {
                let camera = van_1.getGame().state.camera;
                camera.x = player.state.position.x;
                camera.y = player.state.position.y;
            }
            if (cursor) {
                cursor.collision = false;
                cursor.gravity = false;
                let mouse = controls_1.Poll_Mouse();
                cursor.state.position.x = mouse.x;
                cursor.state.position.y = mouse.y;
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
function check_all_objects(c, objs, exemption) {
    let matched = [];
    for (let a of objs) {
        if (a.id !== exemption && a.collides_with_box(c)) {
            matched.push(a);
        }
    }
    return matched;
}
exports.check_all_objects = check_all_objects;
function check_all_collisions(c, objs, exemption = []) {
    let matched = [];
    for (let a of objs) {
        if (exemption.indexOf(a.id) == -1 && a.collision && a.collides_with_box(c)) {
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
    let ob = object;
    let st = object.getState();
    let x_vel = st.velocity.x;
    let y_vel = st.velocity.y;
    if (!ob.collision) {
        st.position.x += x_vel;
        st.position.y += y_vel;
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
    let d = [...all_binds];
    for (let a = 0; a < all_binds.length; a++) {
        let selected = d[a];
        if (selected.type === btype.mouse && selected.key === e.type && !selected.executed) {
            if (selected.execute === exec_type.once) {
                selected.function();
            }
            else if (selected.execute === exec_type.repeat) {
                let active = {
                    bind: selected,
                    timer: 0,
                    interval: selected.interval
                };
                active_binds.push(active);
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
        else if (selected.type === btype.mouse && (selected.key === e.type || selected.key == "mousedown") && selected.executed && selected.execute === exec_type.repeat) {
            let g = [...active_binds];
            for (let a = 0; a < g.length; a++) {
                if (g[a].bind.id === selected.id) {
                    selected.executed = false;
                    active_binds.splice(a, 1);
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
                let active = {
                    bind: selected,
                    timer: 0,
                    interval: selected.interval
                };
                active_binds.push(active);
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
                let g = [...active_binds];
                for (let a = 0; a < g.length; a++) {
                    if (g[a].bind.id === selected.id) {
                        selected.executed = false;
                        active_binds.splice(a, 1);
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
let active_binds = [];
function Poll_Mouse() {
    let height = van_1.GetViewportDimensions().height;
    let canvas = van_1.getGame().state.canvas;
    let wratio = parseFloat(window.getComputedStyle(canvas).width) / van_1.GetViewportDimensions().width;
    let vratio = parseFloat(window.getComputedStyle(canvas).height) / van_1.GetViewportDimensions().height;
    let camera = van_1.getGame().state.camera;
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
    for (let a of active_binds) {
        if (a.bind.execute === exec_type.repeat && a.timer == 0) {
            a.bind.function();
        }
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
        all_binds.push({
            key: keyname,
            type: btype.mouse,
            id,
            function: func,
            obj: object,
            execute: type,
            executed: false,
            interval
        });
    }
    else {
        all_binds.push({
            key: keyname,
            type: btype.keyboard,
            id,
            function: func,
            execute: type,
            executed: false,
            interval
        });
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
exports.gravity_obj = exports.static_obj = exports.obj = exports.getId = exports.rotation_length = void 0;
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
        this.rotation = 0;
        this.render = true;
        this.animations = new animations();
        this.audio = new audio_1.audio();
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
    bindControl(key, x, func, interval = 1) {
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
    collides_with_box(a) {
        let st = this.state;
        let hcollides = false, vcollides = false;
        let ob = {
            left: (st.position.x - this.width / 2),
            right: (st.position.x + this.width / 2),
            top: (st.position.y + this.height / 2),
            bottom: (st.position.y - this.height / 2)
        };
        let box = {
            left: (a.x - a.width / 2),
            right: (a.x + a.width / 2),
            top: (a.y + a.height / 2),
            bottom: (a.y - a.height / 2)
        };
        if (ob.left >= box.left && ob.left < box.right) {
            hcollides = true;
        }
        if (box.left > ob.left && box.left < ob.right) {
            hcollides = true;
        }
        if (ob.bottom >= box.bottom && ob.bottom < box.top) {
            vcollides = true;
        }
        if (box.bottom > ob.bottom && box.bottom < ob.top) {
            vcollides = true;
        }
        return hcollides && vcollides;
    }
    renderf(time) {
        if (!this.animations.current) {
            let st = this.state;
            let sprite_height = this.height;
            let sprite_width = this.width;
            if (this.height == undefined) {
                sprite_height = this.sprite_sheet.height;
            }
            if (this.width == undefined) {
                sprite_width = this.sprite_sheet.width;
            }
            return {
                sprite_sheet: this.sprite_sheet,
                left: 0,
                top: 0,
                sprite_width,
                sprite_height
            };
        }
        return this.animations.renderf(time);
    }
}
exports.obj = obj;
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
    constructor(x, y, width, height, scaling, stretch) {
        this.state = {
            scaling,
            stretch,
            position: {
                x: x / scaling,
                y: y / scaling
            },
            dimensions: {
                width: width / scaling,
                height: height / scaling
            }
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
    let vheight = van_1.GetViewportDimensions().height;
    let final_x = ((s.x - camera.state.position.x + camera.state.dimensions.width / 2 - s.sprite.sprite_width / 2) * r.camera.state.scaling);
    let final_y = ((vheight - s.y - camera.state.dimensions.height / 2 - s.sprite.sprite_height / 2 + camera.state.position.y) * r.camera.state.scaling);
    let height = s.sprite.sprite_height * r.camera.state.scaling;
    let width = s.sprite.sprite_width * r.camera.state.scaling;
    if (s.rotation > 0) {
        r.context.save();
        r.context.translate(final_x + s.sprite.sprite_width / 2, final_y + s.sprite.sprite_height / 2);
        let radians = s.rotation * (Math.PI / 180);
        r.context.rotate(radians);
        r.context.drawImage(s.sprite.sprite_sheet, s.sprite.left, s.sprite.top, s.sprite.sprite_width, s.sprite.sprite_height, -s.sprite.sprite_width / 2, -s.sprite.sprite_height / 2, width, height);
        r.context.restore();
    }
    else {
        r.context.drawImage(s.sprite.sprite_sheet, s.sprite.left, s.sprite.top, s.sprite.sprite_width, s.sprite.sprite_height, final_x, final_y, width, height);
    }
};
exports.stroked_rect_renderer = (context, rect, x, y, color, camera) => {
    let vheight = van_1.GetViewportDimensions().height;
    let final_x = ((x - camera.state.position.x + camera.state.dimensions.width / 2 - rect.width / 2) * camera.state.scaling);
    let final_y = ((vheight - y - rect.height / 2 - camera.state.dimensions.height / 2 + camera.state.position.y) * camera.state.scaling);
    let height = rect.height * camera.state.scaling;
    let width = rect.width * camera.state.scaling;
    context.strokeStyle = color;
    context.strokeRect(final_x, final_y, rect.width, height);
};
exports.rect_renderer = (context, rect, x, y, color, camera) => {
    let vheight = van_1.GetViewportDimensions().height;
    let final_x = ((x - camera.state.position.x + camera.state.dimensions.width / 2 - rect.width / 2) * camera.state.scaling);
    let final_y = ((vheight - y - rect.height / 2 - camera.state.dimensions.height / 2 + camera.state.position.y) * camera.state.scaling);
    let height = rect.height * camera.state.scaling;
    let width = rect.width * camera.state.scaling;
    context.fillStyle = color;
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
    addItem(o) {
        return __awaiter(this, void 0, void 0, function* () {
            yield o.load();
            this.objects.push(o);
        });
    }
    deleteItem(id) {
        for (let a = 0; a < this.objects.length; a++) {
            if (this.objects[a].id === id) {
                this.objects = this.objects.slice(0, a).concat(this.objects.slice(a + 1));
                a--;
            }
        }
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
    check_objects(box, exempt) {
        if (van_1.DEBUG) {
            van_1.render_collision_box(box);
        }
        return collision_1.check_all_objects(box, this.objects, exempt);
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
    getObj(id) {
        for (let a = 0; a < this.objects.length; a++) {
            if (this.objects[a].id == id) {
                return this.objects[a];
            }
        }
        return null;
    }
    renderf(time) {
        return {
            sprite_sheet: this.background,
            left: 0,
            top: 0,
            sprite_height: this.background.height,
            sprite_width: this.background.width
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
exports.sprite_gen = void 0;
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
                sprite_width
            });
        }
    }
    return sprites;
}
exports.sprite_gen = sprite_gen;


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
exports.getGame = exports.game = exports.deep = exports.render_collision_box = exports.GetViewportDimensions = exports.GetScreenDimensions = exports.DEBUG = void 0;
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
            camera: new render_1.Camera(0, 0, vwidth, vheight, 1, false),
            current_room: undefined,
            player_state: {
                power: 0
            }
        };
        this.loadRoom(a);
    }
    render(t) {
        let time = t - last_render_time;
        last_render_time = t;
        this.state.context.clearRect(0, 0, vwidth, vheight);
        this.state.context.fillStyle = "black";
        this.state.context.fillRect(0, 0, vwidth, vheight);
        let camera_colliders = this.state.current_room.check_objects({
            x: this.state.camera.state.position.x,
            y: this.state.camera.state.position.y,
            width: this.state.camera.state.dimensions.width,
            height: this.state.camera.state.dimensions.height
        });
        let render_args = {
            context: this.state.context,
            camera: this.state.camera,
        };
        render_1.sprite_renderer(render_args, {
            sprite: this.state.current_room.renderf(time),
            x: 0,
            y: 0,
            rotation: 0
        });
        for (let a of camera_colliders) {
            let st = a.state;
            if (a.render) {
                render_1.sprite_renderer(render_args, {
                    sprite: a.renderf(time),
                    x: st.position.x,
                    y: st.position.y,
                    rotation: a.rotation
                });
            }
        }
        let box;
        while (boxes.length > 0) {
            let box = boxes.pop();
            let rect = {
                width: box.width,
                height: box.height
            };
            render_1.stroked_rect_renderer(context, rect, box.x, box.y, "#FF0000", this.state.camera);
        }
        if (this.state.current_room.hud) {
            let graphics = this.state.current_room.hud.graphic_elements;
            let text_elements = this.state.current_room.hud.text_elements;
            for (let a of graphics) {
                let st = a.state;
                if (a.render) {
                    render_1.sprite_renderer(render_args, {
                        sprite: a.renderf(t),
                        x: st.position.x,
                        y: st.position.y,
                        rotation: a.rotation
                    });
                }
            }
            for (let a of text_elements) {
                let st = a.state;
                render_1.text_renderer(render_args, {
                    x: st.position.x,
                    y: st.position.y,
                    font: a.renderf(t)
                });
            }
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvb2JqZWN0cy9ib3gudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvb2JqZWN0cy9idWxsZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvb2JqZWN0cy9nb29tYmEudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvb2JqZWN0cy9wbGF0Zm9ybWVyX29iai50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9vYmplY3RzL3RhcmdldC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9yb29tcy9vdmVyd29ybGQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9hdWRpby50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2NvbGxpc2lvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2NvbnRyb2xzLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvaHVkLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvb2JqZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvcmVuZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvcm9vbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3Nwcml0ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNB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RyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDdEMsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7U0FDMUM7UUFFRCxJQUFJLEdBQUcsR0FBRztZQUNSLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDekIsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUMxQixHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7U0FDN0I7UUFFRCxJQUFJLEVBQUUsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLEVBQUU7WUFDOUMsU0FBUyxHQUFHLElBQUksQ0FBQztTQUNsQjtRQUNELElBQUksR0FBRyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRTtZQUM3QyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ2xCO1FBQ0QsSUFBSSxFQUFFLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFO1lBQ2xELFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDbEI7UUFDRCxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUU7WUFDakQsU0FBUyxHQUFHLElBQUksQ0FBQztTQUNsQjtRQUNELE9BQU8sU0FBUyxJQUFJLFNBQVMsQ0FBQztJQUNoQyxDQUFDO0lBQ0QsT0FBTyxDQUFDLElBQVk7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFO1lBQzVCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUE2QixDQUFDO1lBQzVDLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDaEMsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUM5QixJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksU0FBUyxFQUFFO2dCQUM1QixhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7YUFDMUM7WUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksU0FBUyxFQUFFO2dCQUMzQixZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7YUFDeEM7WUFDRCxPQUFPO2dCQUNMLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWTtnQkFDL0IsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsR0FBRyxFQUFFLENBQUM7Z0JBQ04sWUFBWTtnQkFDWixhQUFhO2FBQ2QsQ0FBQztTQUNIO1FBQ0QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0NBQ0Y7QUF2SUQsa0JBdUlDO0FBRUQsTUFBYSxVQUFVO0lBQXZCO1FBQ0UsZUFBVSxHQUFHLEVBQUUsQ0FBQztJQUVsQixDQUFDO0NBQUE7QUFIRCxnQ0FHQztBQUVELE1BQWEsV0FBZSxTQUFRLEdBQU07SUFBMUM7O1FBQ0UsWUFBTyxHQUFHLElBQUk7SUFDaEIsQ0FBQztDQUFBO0FBRkQsa0NBRUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1TkQsZ0VBQTZDO0FBa0I3QyxNQUFhLE1BQU07SUFFakIsWUFBWSxDQUFRLEVBQUMsQ0FBUSxFQUFDLEtBQVksRUFBQyxNQUFhLEVBQUMsT0FBYyxFQUFDLE9BQWU7UUFDckYsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNYLE9BQU87WUFDUCxPQUFPO1lBQ1AsUUFBUSxFQUFDO2dCQUNQLENBQUMsRUFBQyxDQUFDLEdBQUMsT0FBTztnQkFDWCxDQUFDLEVBQUMsQ0FBQyxHQUFDLE9BQU87YUFDWjtZQUNELFVBQVUsRUFBQztnQkFDVCxLQUFLLEVBQUMsS0FBSyxHQUFHLE9BQU87Z0JBQ3JCLE1BQU0sRUFBQyxNQUFNLEdBQUcsT0FBTzthQUN4QjtTQUNGO0lBQ0gsQ0FBQztJQUNELElBQUksQ0FBQyxDQUFDLENBQVE7UUFDWixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRCxJQUFJLENBQUMsQ0FBQyxDQUFRO1FBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDM0IsQ0FBQztJQUNELElBQUksQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFDRCxJQUFJLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUMvQixDQUFDO0NBRUY7QUE3QkQsd0JBNkJDO0FBdUJELElBQVksUUFLWDtBQUxELFdBQVksUUFBUTtJQUNsQix1Q0FBSTtJQUNKLDJDQUFNO0lBQ04sdUNBQUk7SUFDSixxREFBVztBQUNiLENBQUMsRUFMVyxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQUtuQjtBQUVZLHFCQUFhLEdBQUcsQ0FBQyxDQUFlLEVBQUMsQ0FBYSxFQUFFLEVBQUU7SUFDN0QsSUFBSSxPQUFPLEdBQUcsMkJBQXFCLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDN0MsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ25ELENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ25DLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ25DLElBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUM7UUFDbEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ3BFO1NBQ0c7UUFDRixDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbkQ7QUFDSCxDQUFDO0FBRVksdUJBQWUsR0FBRyxDQUFDLENBQWUsRUFBQyxDQUFhLEVBQUUsRUFBRTtJQUMvRCxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQ3RCLElBQUksT0FBTyxHQUFHLDJCQUFxQixFQUFFLENBQUMsTUFBTSxDQUFDO0lBQzdDLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxHQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JJLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxHQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqSixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7SUFDN0QsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO0lBQzNELElBQUcsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUM7UUFDaEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQixDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEdBQUMsQ0FBQyxFQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsR0FBQyxDQUFDLENBQUM7UUFDekYsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUMsR0FBRyxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQ2pCLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUNyQixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFDYixDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFDWixDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksRUFDckIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQ3RCLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEdBQUMsQ0FBQyxFQUN4QixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxHQUFDLENBQUMsRUFDekIsS0FBSyxFQUNMLE1BQU0sQ0FDUDtRQUNELENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDckI7U0FDRztRQUNGLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUNqQixDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksRUFDckIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQ2IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQ1osQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQ3JCLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUN0QixPQUFPLEVBQ1AsT0FBTyxFQUNQLEtBQUssRUFDTCxNQUFNLENBQ1A7S0FDRjtBQUNILENBQUM7QUFFWSw2QkFBcUIsR0FBRyxDQUFDLE9BQWdDLEVBQUMsSUFBYyxFQUFDLENBQVEsRUFBQyxDQUFRLEVBQUMsS0FBWSxFQUFDLE1BQWEsRUFBRSxFQUFFO0lBQ3BJLElBQUksT0FBTyxHQUFHLDJCQUFxQixFQUFFLENBQUMsTUFBTSxDQUFDO0lBQzdDLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RILElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNsSSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO0lBQ2hELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7SUFDOUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDNUIsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxLQUFLLEVBQUMsTUFBTSxDQUFDLENBQUM7QUFDeEQsQ0FBQztBQUVZLHFCQUFhLEdBQUcsQ0FBQyxPQUFnQyxFQUFDLElBQWMsRUFBQyxDQUFRLEVBQUMsQ0FBUSxFQUFDLEtBQVksRUFBQyxNQUFhLEVBQUUsRUFBRTtJQUM1SCxJQUFJLE9BQU8sR0FBRywyQkFBcUIsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUM3QyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0SCxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEksSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztJQUNoRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO0lBQzlDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQzFCLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsS0FBSyxFQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3RELENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsSkQscUZBQTRIO0FBQzVILGdFQUFrRDtBQUNsRCxrRkFBd0Q7QUFHeEQseUVBQTZCO0FBTzdCLFNBQWdCLGFBQWEsQ0FBQyxFQUF1QixFQUFDLFVBQWlCLEVBQUUsUUFBZTtJQUN0RixJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBa0IsQ0FBQztJQUMvQixJQUFHLEVBQUUsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsUUFBUSxFQUFDO1FBQ3hDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLFVBQVUsQ0FBQztLQUM3QjtBQUNILENBQUM7QUFMRCxzQ0FLQztBQU9ELE1BQWEsSUFBSTtJQUFqQjtRQU1FLFVBQUssR0FBRyxJQUFJLGFBQUssRUFBRSxDQUFDO0lBNEV0QixDQUFDO0lBM0VDLElBQUk7UUFDRixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDakIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUMzQyxJQUFJLENBQUMsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQ3BCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNqRCxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDNUIsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1lBQzVCLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzFELENBQUMsQ0FBQztZQUNGLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFRLEVBQUU7Z0JBQ3BCLEtBQUssQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQixNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3hCLE9BQU8sRUFBRSxDQUFDO1lBQ1osQ0FBQyxFQUFDLENBQUM7UUFDTCxDQUFDLEVBQUM7SUFDSixDQUFDO0lBQ0ssT0FBTyxDQUFDLENBQWdCOztZQUM1QixNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7S0FBQTtJQUNELFVBQVUsQ0FBQyxFQUFTO1FBQ2xCLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQztZQUN4QyxJQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBQztnQkFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2RSxDQUFDLEVBQUUsQ0FBQzthQUNMO1NBQ0Y7SUFDSCxDQUFDO0lBQ0QsV0FBVztRQUNULE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFDRCxXQUFXLENBQUMsR0FBVSxFQUFDLENBQVcsRUFBQyxJQUFpQixFQUFDLFdBQWtCLENBQUM7UUFDdEUsZUFBSSxDQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRCxnQkFBZ0IsQ0FBQyxHQUFpQixFQUFDLE1BQXFCO1FBQ3RELElBQUcsV0FBSyxFQUFDO1lBQ1AsMEJBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDM0I7UUFDRCxPQUFPLGdDQUFvQixDQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMsT0FBTyxFQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFDRCxhQUFhLENBQUMsR0FBaUIsRUFBQyxNQUFjO1FBQzVDLElBQUcsV0FBSyxFQUFDO1lBQ1AsMEJBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDM0I7UUFDRCxPQUFPLDZCQUFpQixDQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMsT0FBTyxFQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFDRCxpQkFBaUI7SUFFakIsQ0FBQztJQUNELE9BQU87SUFFUCxDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQVk7UUFDakIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzlCO0lBQ0gsQ0FBQztJQUNELE1BQU0sQ0FBQyxFQUFTO1FBQ2QsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO1lBQzFDLElBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFDO2dCQUMxQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDeEI7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELE9BQU8sQ0FBQyxJQUFZO1FBQ2xCLE9BQU87WUFDTCxZQUFZLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDN0IsSUFBSSxFQUFFLENBQUM7WUFDUCxHQUFHLEVBQUUsQ0FBQztZQUNOLGFBQWEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU07WUFDckMsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSztTQUNwQztJQUNILENBQUM7Q0FDRjtBQWxGRCxvQkFrRkM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyR0QsU0FBZ0IsVUFBVSxDQUFDLFlBQTZCLEVBQUMsWUFBbUIsRUFBQyxhQUFvQjtJQUMvRixJQUFJLEtBQUssR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO0lBQy9CLElBQUksTUFBTSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUM7SUFDakMsSUFBSSxPQUFPLEdBQXdCLEVBQUUsQ0FBQztJQUN0QyxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFDLENBQUMsSUFBSSxhQUFhLEVBQUM7UUFDM0MsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqQixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFDLENBQUMsSUFBSSxZQUFZLEVBQUM7WUFDekMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDZCxZQUFZO2dCQUNaLElBQUksRUFBQyxDQUFDO2dCQUNOLEdBQUcsRUFBQyxDQUFDLEdBQUcsYUFBYTtnQkFDckIsYUFBYTtnQkFDYixZQUFZO2FBQ2IsQ0FBQztTQUNIO0tBQ0Y7SUFDRCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBakJELGdDQWlCQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pCWSxhQUFLLEdBQUcsS0FBSyxDQUFDO0FBTzNCLGdGQUF5RztBQUV6RyxzRkFBa0Q7QUFFbEQsdUdBQWlEO0FBRWpELElBQUksY0FBYyxHQUFxQixRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBc0IsQ0FBQztBQUM5RixJQUFJLE9BQU8sR0FBNEIsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUd2RSxJQUFJLFlBQVksR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO0FBQ3JDLElBQUksYUFBYSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7QUFFdkMsSUFBSSxNQUFNLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQztBQUNsQyxJQUFJLE9BQU8sR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDO0FBR3BDLDJEQUEyRDtBQUMzRCxJQUFJLG1CQUFtQixHQUFVLElBQUksR0FBQyxFQUFFLENBQUM7QUFFekMsSUFBSSxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUUzQixJQUFJLGdCQUFnQixHQUFHLENBQUMsQ0FBQztBQVF6QixTQUFnQixtQkFBbUI7SUFDakMsT0FBTSxDQUFDO1FBQ0wsS0FBSyxFQUFDLFlBQVk7UUFDbEIsTUFBTSxFQUFDLGFBQWE7S0FDckIsQ0FBQztBQUNKLENBQUM7QUFMRCxrREFLQztBQUVELFNBQWdCLHFCQUFxQjtJQUNuQyxPQUFNLENBQUM7UUFDTCxNQUFNLEVBQUMsT0FBTztRQUNkLEtBQUssRUFBQyxNQUFNO0tBQ2IsQ0FBQztBQUNKLENBQUM7QUFMRCxzREFLQztBQUVZLDRCQUFvQixHQUFHLENBQUMsQ0FBZSxFQUFFLEVBQUU7SUFDdEQsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoQixDQUFDO0FBRUQsSUFBSSxLQUFLLEdBQXdCLEVBQUUsQ0FBQztBQUV6QixZQUFJLEdBQUcsQ0FBQyxDQUFLLEVBQUUsRUFBRTtJQUMxQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7QUFhRCxNQUFhLElBQUk7SUFHZixZQUFZLEdBQTRCLEVBQUMsQ0FBZTtRQUN0RCxJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1gsTUFBTSxFQUFDLGNBQWM7WUFDckIsS0FBSyxFQUFDLFNBQVM7WUFDZixPQUFPLEVBQUMsR0FBRztZQUNYLE1BQU0sRUFBQyxJQUFJLGVBQU0sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEtBQUssQ0FBQztZQUM3QyxZQUFZLEVBQUUsU0FBUztZQUN2QixZQUFZLEVBQUM7Z0JBQ1gsS0FBSyxFQUFDLENBQUM7YUFDUjtTQUNGO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBQ0QsTUFBTSxDQUFDLENBQVE7UUFDYixJQUFJLElBQUksR0FBRyxDQUFDLEdBQUcsZ0JBQWdCO1FBQy9CLGdCQUFnQixHQUFHLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFDLE9BQU8sQ0FBQztRQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEQsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUM7WUFDM0QsQ0FBQyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3BDLEtBQUssRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUs7WUFDOUMsTUFBTSxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTTtTQUNqRCxDQUFDLENBQUM7UUFDSCxJQUFJLFdBQVcsR0FBRztZQUNoQixPQUFPLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPO1lBQzFCLE1BQU0sRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07U0FDekIsQ0FBQztRQUNGLHdCQUFlLENBQUMsV0FBVyxFQUFDO1lBQzFCLE1BQU0sRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQzVDLENBQUMsRUFBQyxDQUFDO1lBQ0gsQ0FBQyxFQUFDLENBQUM7WUFDSCxRQUFRLEVBQUMsQ0FBQztTQUNYLENBQUMsQ0FBQztRQUNILEtBQUssSUFBSSxDQUFDLElBQUksZ0JBQWdCLEVBQUM7WUFDN0IsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQWtCLENBQUM7WUFDOUIsSUFBRyxDQUFDLENBQUMsTUFBTSxFQUFDO2dCQUNWLHdCQUFlLENBQUMsV0FBVyxFQUFDO29CQUMxQixNQUFNLEVBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQ3RCLENBQUMsRUFBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ2YsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDZixRQUFRLEVBQUMsQ0FBQyxDQUFDLFFBQVE7aUJBQ3BCLENBQUMsQ0FBQzthQUNKO1NBQ0Y7UUFDRCxJQUFJLEdBQWlCLENBQUM7UUFDdEIsT0FBTSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQztZQUNyQixJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDdEIsSUFBSSxJQUFJLEdBQUc7Z0JBQ1QsS0FBSyxFQUFDLEdBQUcsQ0FBQyxLQUFLO2dCQUNmLE1BQU0sRUFBQyxHQUFHLENBQUMsTUFBTTthQUNsQjtZQUNELDhCQUFxQixDQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsQ0FBQyxFQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzdFO1FBQ0QsSUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUM7WUFDN0IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDO1lBQzVELElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7WUFDOUQsS0FBSSxJQUFJLENBQUMsSUFBSSxRQUFRLEVBQUM7Z0JBQ3BCLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxLQUFrQixDQUFDO2dCQUM5QixJQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUM7b0JBQ1Ysd0JBQWUsQ0FBQyxXQUFXLEVBQUM7d0JBQzFCLE1BQU0sRUFBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFDbkIsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDZixDQUFDLEVBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUNmLFFBQVEsRUFBQyxDQUFDLENBQUMsUUFBUTtxQkFDcEIsQ0FBQyxDQUFDO2lCQUNKO2FBQ0Y7WUFDRCxLQUFJLElBQUksQ0FBQyxJQUFJLGFBQWEsRUFBQztnQkFDekIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDakIsc0JBQWEsQ0FBQyxXQUFXLEVBQUM7b0JBQ3hCLENBQUMsRUFBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ2YsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDZixJQUFJLEVBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7aUJBQ2xCLENBQUM7YUFDSDtTQUNGO1FBQ0QscUJBQXFCLENBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFDRCxXQUFXLENBQUMsQ0FBUTtRQUNsQixPQUFPLFdBQVcsQ0FBQyxHQUFFLEVBQUU7WUFDckIsSUFBSSxRQUFRLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUMxQixJQUFJLFVBQVUsR0FBRyxRQUFRLENBQUMsT0FBTyxFQUFFLEdBQUcsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzFELFNBQVMsR0FBRyxRQUFRLENBQUM7WUFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzNDLElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFDO2dCQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ2hEO1lBQ0MsNkJBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELE9BQU87UUFDTCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO0lBQ2pDLENBQUM7SUFDSyxRQUFRLENBQUMsQ0FBZTs7WUFDNUIsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDeEIsSUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksS0FBSyxTQUFTLEVBQUM7Z0JBQ3ZDLE9BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUM7b0JBQy9DLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztpQkFDN0M7YUFDRjtZQUNELElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzlCLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztZQUM1QixJQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLFNBQVMsRUFBQztnQkFDL0IsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDakM7WUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDO1lBQ3hELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakIsQ0FBQztLQUFBO0NBQ0Y7QUFsSEQsb0JBa0hDO0FBRUQsSUFBSSxTQUFTLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFDLElBQUkscUJBQVMsRUFBRSxDQUFDLENBQUM7QUFFbEQsU0FBZ0IsT0FBTztJQUNyQixPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDO0FBRkQsMEJBRUMiLCJmaWxlIjoidmFuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvdmFuLnRzXCIpO1xuIiwiaW1wb3J0IHtwbGF0Zm9ybWVyX29iaixwbGF0X3N0YXRlfSBmcm9tIFwiLi9wbGF0Zm9ybWVyX29ialwiO1xyXG5pbXBvcnQge29ial9zdGF0ZX0gZnJvbSBcIi4uLy4uL2xpYi9zdGF0ZVwiO1xyXG5pbXBvcnQgeyBleGVjX3R5cGUgfSBmcm9tIFwiLi4vLi4vbGliL2NvbnRyb2xzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQm94IGV4dGVuZHMgcGxhdGZvcm1lcl9vYmo8cGxhdF9zdGF0ZT57XHJcbiAgc3ByaXRlX3VybCA9IFwiLi9zcHJpdGVzL2JveC5wbmdcIlxyXG4gIGNvbGxpc2lvbiA9IHRydWVcclxuICBoZWlnaHQgPSA2NDtcclxuICB3aWR0aCA9IDUwMDtcclxuICBncmF2aXR5ID0gZmFsc2U7XHJcbiAgZW5lbXkgPSB0cnVlO1xyXG4gIGNvbnN0cnVjdG9yKHg6bnVtYmVyLCB5Om51bWJlciwgaWQ6c3RyaW5nID0gdW5kZWZpbmVkKXtcclxuICAgIHN1cGVyKCk7XHJcbiAgICBpZihpZCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBwb3NpdGlvbjp7XHJcbiAgICAgICAgeCxcclxuICAgICAgICB5XHJcbiAgICAgIH0sXHJcbiAgICAgIHZlbG9jaXR5OntcclxuICAgICAgICB4OjAsXHJcbiAgICAgICAgeTowXHJcbiAgICAgIH0sXHJcbiAgICAgIGhlYWx0aDoxMDAwXHJcbiAgICB9XHJcbiAgfVxyXG59IiwiaW1wb3J0IHtwbGF0Zm9ybWVyX29iaiwgcGxhdF9zdGF0ZX0gZnJvbSBcIi4vcGxhdGZvcm1lcl9vYmpcIjtcclxuaW1wb3J0IHtvYmpfc3RhdGV9IGZyb20gXCIuLi8uLi9saWIvc3RhdGVcIjtcclxuaW1wb3J0IHsgZXhlY190eXBlIH0gZnJvbSBcIi4uLy4uL2xpYi9jb250cm9sc1wiO1xyXG5pbXBvcnQge3JvdGF0aW9uX2xlbmd0aH0gZnJvbSBcIi4uLy4uL2xpYi9vYmplY3RcIjtcclxuaW1wb3J0IHtnZXRHYW1lfSBmcm9tIFwiLi4vLi4vdmFuXCI7XHJcblxyXG5pbnRlcmZhY2UgYnVsbGV0X3N0YXRlIGV4dGVuZHMgb2JqX3N0YXRle1xyXG4gIHJvdGF0aW9uOm51bWJlcixcclxuICBkaXN0YW5jZTpudW1iZXIsXHJcbiAgc3BlZWQ6bnVtYmVyLFxyXG4gIGRhbWFnZTpudW1iZXJcclxufVxyXG5cclxuaW50ZXJmYWNlIHBvc2l0aW9ue1xyXG4gIHg6bnVtYmVyLFxyXG4gIHk6bnVtYmVyXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCdWxsZXQgZXh0ZW5kcyBwbGF0Zm9ybWVyX29iajxidWxsZXRfc3RhdGU+e1xyXG4gIHNwcml0ZV91cmwgPSBcImh0dHA6Ly9sb2NhbGhvc3Qvc3JjL2dhbWUvc3ByaXRlcy9idWxsZXQucG5nXCJcclxuICBjb2xsaXNpb24gPSBmYWxzZVxyXG4gIGhlaWdodCA9IDIwO1xyXG4gIHdpZHRoID0gMTA7XHJcbiAgZ3Jhdml0eSA9IGZhbHNlO1xyXG4gIGNvbnN0cnVjdG9yKHg6cG9zaXRpb24sIGFuZ2xlOm51bWJlciwgaWQ6c3RyaW5nID0gdW5kZWZpbmVkKXtcclxuICAgIHN1cGVyKCk7XHJcbiAgICBpZihpZCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBwb3NpdGlvbjp4LFxyXG4gICAgICB2ZWxvY2l0eTp7XHJcbiAgICAgICAgeDowLFxyXG4gICAgICAgIHk6MFxyXG4gICAgICB9LFxyXG4gICAgICBzcGVlZDo0MCxcclxuICAgICAgcm90YXRpb246YW5nbGUsXHJcbiAgICAgIGRpc3RhbmNlOjAsXHJcbiAgICAgIGRhbWFnZTo1XHJcbiAgICB9XHJcbiAgICB0aGlzLnJvdGF0aW9uID0gYW5nbGU7XHJcbiAgfVxyXG4gIHN0YXRlZigpe1xyXG4gICAgdGhpcy5zdGF0ZS52ZWxvY2l0eSA9IHJvdGF0aW9uX2xlbmd0aCh0aGlzLnN0YXRlLnNwZWVkLHRoaXMuc3RhdGUucm90YXRpb24pO1xyXG4gICAgdGhpcy5zdGF0ZS5kaXN0YW5jZSArPSB0aGlzLnN0YXRlLnNwZWVkO1xyXG4gICAgaWYodGhpcy5zdGF0ZS5kaXN0YW5jZSA+IDIwMDApe1xyXG4gICAgICB0aGlzLmRlbGV0ZSgpO1xyXG4gICAgfVxyXG4gICAgbGV0IHJvb20gPSBnZXRHYW1lKCkuc3RhdGUuY3VycmVudF9yb29tO1xyXG4gICAgbGV0IGNvbGxpc2lvbnMgPSByb29tLmNoZWNrX2NvbGxpc2lvbnMoe1xyXG4gICAgICB4OnRoaXMuc3RhdGUucG9zaXRpb24ueCxcclxuICAgICAgeTp0aGlzLnN0YXRlLnBvc2l0aW9uLnksXHJcbiAgICAgIHdpZHRoOnRoaXMud2lkdGgsXHJcbiAgICAgIGhlaWdodDp0aGlzLmhlaWdodFxyXG4gICAgfSxbXCJwbGF5ZXJcIixcImJ1bGxldFwiXSk7XHJcbiAgICBpZihjb2xsaXNpb25zLmxlbmd0aCA+IDApe1xyXG4gICAgICBmb3IobGV0IGNvbGxpc2lvbiBvZiBjb2xsaXNpb25zKXtcclxuICAgICAgICBsZXQgc3QgPSBjb2xsaXNpb24uc3RhdGUgYXMgdW5rbm93biBhcyBwbGF0X3N0YXRlO1xyXG4gICAgICAgIGlmKCg8cGxhdGZvcm1lcl9vYmo8b2JqX3N0YXRlPj5jb2xsaXNpb24pLmVuZW15KXtcclxuICAgICAgICAgIHN0LmhlYWx0aCAtPSB0aGlzLnN0YXRlLmRhbWFnZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5kZWxldGUoKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmVnaXN0ZXJfY29udHJvbHMoKXtcclxuXHJcbiAgfVxyXG59IiwiaW1wb3J0IHt2ZWxvY2l0eSxvYmpfc3RhdGUsc3RhdGVfZnVuY30gZnJvbSBcIi4uLy4uL2xpYi9zdGF0ZVwiO1xyXG5pbXBvcnQge3Nwcml0ZSxzcHJpdGVfZ2VufSBmcm9tIFwiLi4vLi4vbGliL3Nwcml0ZVwiO1xyXG5pbXBvcnQge29iaixyb3RhdGlvbl9sZW5ndGh9IGZyb20gXCIuLi8uLi9saWIvb2JqZWN0XCI7XHJcbmltcG9ydCB7cGxhdGZvcm1lcl9vYmoscGxhdF9zdGF0ZX0gZnJvbSBcIi4vcGxhdGZvcm1lcl9vYmpcIjtcclxuaW1wb3J0IHtQb2xsX01vdXNlLCBleGVjX3R5cGV9IGZyb20gXCIuLi8uLi9saWIvY29udHJvbHNcIjtcclxuaW1wb3J0IHtjb2xsaXNpb25fYm94fSBmcm9tIFwiLi4vLi4vbGliL2NvbGxpc2lvblwiO1xyXG5pbXBvcnQge0JpbmR9IGZyb20gXCIuLi8uLi9saWIvY29udHJvbHNcIjtcclxuXHJcbmltcG9ydCB7T3ZlcndvcmxkfSBmcm9tIFwiLi4vcm9vbXMvb3ZlcndvcmxkXCI7XHJcbmltcG9ydCB7Z2V0R2FtZX0gZnJvbSBcIi4uLy4uL3ZhblwiO1xyXG5cclxuZW51bSBkaXJlY3Rpb257XHJcbiAgbGVmdCxcclxuICByaWdodFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIGdvb21iYV9zdGF0ZSBleHRlbmRzIG9ial9zdGF0ZSxwbGF0X3N0YXRle1xyXG4gIGRpcmVjdGlvbjogZGlyZWN0aW9uLFxyXG4gIHZlbG9jaXR5OnZlbG9jaXR5LFxyXG4gIGp1bXBpbmc6Ym9vbGVhblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ3Vyc29yIGV4dGVuZHMgcGxhdGZvcm1lcl9vYmo8b2JqX3N0YXRlPntcclxuICBzcHJpdGVfdXJsID0gXCIuL3Nwcml0ZXMvY3Vyc29yLnBuZ1wiO1xyXG4gIGhlaWdodCA9IDY0O1xyXG4gIHdpZHRoID0gNjQ7XHJcbiAgY29sbGlzaW9uID0gdHJ1ZTtcclxuICByZW5kZXIgPSB0cnVlO1xyXG4gIGNvbnN0cnVjdG9yKGlkOnN0cmluZyl7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgcG9zaXRpb246e1xyXG4gICAgICAgIHg6MCxcclxuICAgICAgICB5OjBcclxuICAgICAgfSxcclxuICAgICAgdmVsb2NpdHk6e1xyXG4gICAgICAgIHg6MCxcclxuICAgICAgICB5OjBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBzdGF0ZWYoKXtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBHb29tYmEgZXh0ZW5kcyBwbGF0Zm9ybWVyX29iajxnb29tYmFfc3RhdGU+e1xyXG4gIHNwcml0ZV91cmwgPSBcIi4vc3ByaXRlcy9nb29tYmEucG5nXCI7XHJcbiAgaGVpZ2h0ID0gNjQ7XHJcbiAgd2lkdGggPSA2NDtcclxuICBjb2xsaXNpb24gPSB0cnVlO1xyXG4gIGNvbnN0cnVjdG9yKHg6bnVtYmVyLHk6bnVtYmVyLGlkOnN0cmluZyA9IHVuZGVmaW5lZCl7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgaWYoaWQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgZGlyZWN0aW9uOmRpcmVjdGlvbi5sZWZ0LFxyXG4gICAgICBwb3NpdGlvbjp7XHJcbiAgICAgICAgeCxcclxuICAgICAgICB5XHJcbiAgICAgIH0sXHJcbiAgICAgIHZlbG9jaXR5OntcclxuICAgICAgICB4OjAsXHJcbiAgICAgICAgeTowXHJcbiAgICAgIH0sXHJcbiAgICAgIGp1bXBpbmc6ZmFsc2UsXHJcbiAgICAgIGhlYWx0aDoxMDBcclxuICAgIH1cclxuICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KFwid2FsazFcIik7XHJcbiAgfVxyXG4gIHJlZ2lzdGVyX2FuaW1hdGlvbnMoKXtcclxuICAgIGxldCBzcHJpdGVzID0gc3ByaXRlX2dlbih0aGlzLnNwcml0ZV9zaGVldCx0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KTtcclxuICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoXCJ3YWxrMVwiLFtcclxuICAgICAgWzAsc3ByaXRlc1swXVswXV0sXHJcbiAgICAgIFsxMDAwLHNwcml0ZXNbMF1bMV1dXHJcbiAgICBdLDIwMDApXHJcbiAgfVxyXG4gIHJlZ2lzdGVyX2F1ZGlvKCl7XHJcbiAgICB0aGlzLmF1ZGlvLmFkZChcInNsaW1lXCIsXCIuL3NvdW5kcy9nb29tYmEvc2xpbWViYWxsLndhdlwiKTtcclxuICB9XHJcbiAgcmVnaXN0ZXJfY29udHJvbHMoKXtcclxuICAgIHRoaXMuYmluZENvbnRyb2woXCJLZXlBXCIsZXhlY190eXBlLnJlcGVhdCwoKT0+e1xyXG4gICAgICBpZih0aGlzLnN0YXRlLnZlbG9jaXR5LnggPiAtMTApe1xyXG4gICAgICAgIHRoaXMuc3RhdGUudmVsb2NpdHkueCA9IHRoaXMuc3RhdGUudmVsb2NpdHkueCAtIDAuNTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmJpbmRDb250cm9sKFwibW91c2Vkb3duXCIsZXhlY190eXBlLnJlcGVhdCwgKCk9PntcclxuICAgICAgdGhpcy5hdWRpby5wbGF5KFwic2xpbWVcIiwwLjAxKTtcclxuICAgIH0sNTApO1xyXG4gICAgdGhpcy5iaW5kQ29udHJvbChcIktleURcIixleGVjX3R5cGUucmVwZWF0LCgpPT57XHJcbiAgICAgIGlmKHRoaXMuc3RhdGUudmVsb2NpdHkueCA8IDEwKXtcclxuICAgICAgICB0aGlzLnN0YXRlLnZlbG9jaXR5LnggPSB0aGlzLnN0YXRlLnZlbG9jaXR5LnggKyAwLjU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5iaW5kQ29udHJvbChcIlNwYWNlXCIsZXhlY190eXBlLm9uY2UsKCk9PntcclxuICAgICAgaWYoIXRoaXMuc3RhdGUuanVtcGluZyl7XHJcbiAgICAgICAgdGhpcy5zdGF0ZS52ZWxvY2l0eS55ICs9IDE1O1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheShcInNsaW1lXCIsMC4xKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIFxyXG4gIHN0YXRlZih0aW1lOm51bWJlcil7XHJcbiAgICBsZXQgY3Vyc29yID0gZ2V0R2FtZSgpLmdldFJvb20oKS5nZXRPYmooXCJjdXJzb3JcIik7XHJcbiAgICBsZXQgYm90dG9tX2NvbGxpc2lvbnMgPSB0aGlzLmNvbGxpc2lvbl9jaGVjayh7XHJcbiAgICAgIHg6dGhpcy5zdGF0ZS5wb3NpdGlvbi54LFxyXG4gICAgICB5OnRoaXMuc3RhdGUucG9zaXRpb24ueSAtIDEgLSB0aGlzLmhlaWdodC8yLFxyXG4gICAgICB3aWR0aDp0aGlzLndpZHRoLFxyXG4gICAgICBoZWlnaHQ6MVxyXG4gICAgfSk7XHJcbiAgICBsZXQganVtcGluZ19jaGVjayA9IGJvdHRvbV9jb2xsaXNpb25zLmxlbmd0aCA+IDA7XHJcbiAgICBpZihqdW1waW5nX2NoZWNrKXtcclxuICAgICAgdGhpcy5zdGF0ZS5qdW1waW5nID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICB0aGlzLnN0YXRlLmp1bXBpbmcgPSB0cnVlO1xyXG4gICAgICBcclxuICAgIH1cclxuICAgIGlmKHRoaXMuc3RhdGUudmVsb2NpdHkueCA+IDAgKXtcclxuICAgICAgdGhpcy5zdGF0ZS52ZWxvY2l0eS54ID0gdGhpcy5zdGF0ZS52ZWxvY2l0eS54IC0gMC4yO1xyXG4gICAgICBpZih0aGlzLnN0YXRlLnZlbG9jaXR5LnggPCAwKXtcclxuICAgICAgICB0aGlzLnN0YXRlLnZlbG9jaXR5LnggPSAwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKHRoaXMuc3RhdGUudmVsb2NpdHkueCA8IDApe1xyXG4gICAgICB0aGlzLnN0YXRlLnZlbG9jaXR5LnggPSB0aGlzLnN0YXRlLnZlbG9jaXR5LnggKyAwLjI7XHJcbiAgICAgIGlmKHRoaXMuc3RhdGUudmVsb2NpdHkueCA+IDApe1xyXG4gICAgICAgIHRoaXMuc3RhdGUudmVsb2NpdHkueCA9IDA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdGFuZGluZ0dvb21iYSBleHRlbmRzIHBsYXRmb3JtZXJfb2JqPGdvb21iYV9zdGF0ZT57XHJcbiAgc3ByaXRlX3VybCA9IFwiaHR0cDovL2xvY2FsaG9zdC9zcmMvZ2FtZS9vYmplY3RzL2dvb21iYS5wbmdcIjtcclxuICBoZWlnaHQgPSA2NDtcclxuICB3aWR0aCA9IDY0O1xyXG4gIGNvbGxpc2lvbiA9IHRydWU7XHJcbiAgZW5lbXkgPSB0cnVlO1xyXG4gIGNvbnN0cnVjdG9yKHg6bnVtYmVyLHk6bnVtYmVyLGlkOnN0cmluZyA9IHVuZGVmaW5lZCl7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgaWYoaWQpe1xyXG4gICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB9ICAgIFxyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgZGlyZWN0aW9uOmRpcmVjdGlvbi5sZWZ0LFxyXG4gICAgICBwb3NpdGlvbjp7XHJcbiAgICAgICAgeCxcclxuICAgICAgICB5XHJcbiAgICAgIH0sXHJcbiAgICAgIHZlbG9jaXR5OntcclxuICAgICAgICB4OjAsXHJcbiAgICAgICAgeTowXHJcbiAgICAgIH0sXHJcbiAgICAgIGp1bXBpbmc6ZmFsc2UsXHJcbiAgICAgIGhlYWx0aDoxMDBcclxuICAgIH1cclxuICB9XHJcbiAgc3RhdGVmKHRpbWU6bnVtYmVyKXtcclxuICAgIGlmKHRoaXMuc3RhdGUuanVtcGluZyl7XHJcbiAgICAgIGxldCBtb3VzZV9wb3NpdGlvbiA9IFBvbGxfTW91c2UoKTtcclxuICAgICAgaWYobW91c2VfcG9zaXRpb24ueSA+IG1vdXNlX3Bvc2l0aW9uLmxhc3QueSl7XHJcbiAgICAgICAgaWYodGhpcy5jb2xsaXNpb25fY2hlY2soe1xyXG4gICAgICAgICAgeDp0aGlzLnN0YXRlLnBvc2l0aW9uLngsXHJcbiAgICAgICAgICB5OnRoaXMuc3RhdGUucG9zaXRpb24ueSArIHRoaXMuaGVpZ2h0LFxyXG4gICAgICAgICAgd2lkdGg6dGhpcy53aWR0aCxcclxuICAgICAgICAgIGhlaWdodDoxXHJcbiAgICAgICAgfSkubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgdGhpcy5zdGF0ZS5wb3NpdGlvbi55ID0gbW91c2VfcG9zaXRpb24ueSAtIHRoaXMuaGVpZ2h0LzI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYobW91c2VfcG9zaXRpb24ueSA8IG1vdXNlX3Bvc2l0aW9uLmxhc3QueSl7XHJcbiAgICAgICAgaWYodGhpcy5jb2xsaXNpb25fY2hlY2soe1xyXG4gICAgICAgICAgeDp0aGlzLnN0YXRlLnBvc2l0aW9uLngsXHJcbiAgICAgICAgICB5OnRoaXMuc3RhdGUucG9zaXRpb24ueSAtIDEsXHJcbiAgICAgICAgICB3aWR0aDp0aGlzLndpZHRoLFxyXG4gICAgICAgICAgaGVpZ2h0OjFcclxuICAgICAgICB9KS5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICB0aGlzLnN0YXRlLnBvc2l0aW9uLnkgPSBtb3VzZV9wb3NpdGlvbi55IC0gdGhpcy5oZWlnaHQvMjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYobW91c2VfcG9zaXRpb24ueCA8IG1vdXNlX3Bvc2l0aW9uLmxhc3QueCl7XHJcbiAgICAgICAgaWYodGhpcy5jb2xsaXNpb25fY2hlY2soe1xyXG4gICAgICAgICAgeDp0aGlzLnN0YXRlLnBvc2l0aW9uLnggLSAxLFxyXG4gICAgICAgICAgeTp0aGlzLnN0YXRlLnBvc2l0aW9uLnksXHJcbiAgICAgICAgICB3aWR0aDoxLFxyXG4gICAgICAgICAgaGVpZ2h0OnRoaXMuaGVpZ2h0XHJcbiAgICAgICAgfSkubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgdGhpcy5zdGF0ZS5wb3NpdGlvbi54ID0gbW91c2VfcG9zaXRpb24ueCAtIHRoaXMud2lkdGgvMjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZihtb3VzZV9wb3NpdGlvbi54ID4gbW91c2VfcG9zaXRpb24ubGFzdC54KXtcclxuICAgICAgICBpZih0aGlzLmNvbGxpc2lvbl9jaGVjayh7XHJcbiAgICAgICAgICB4OnRoaXMuc3RhdGUucG9zaXRpb24ueCArIHRoaXMud2lkdGgsXHJcbiAgICAgICAgICB5OnRoaXMuc3RhdGUucG9zaXRpb24ueSxcclxuICAgICAgICAgIHdpZHRoOjEsXHJcbiAgICAgICAgICBoZWlnaHQ6dGhpcy5oZWlnaHRcclxuICAgICAgICB9KS5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICB0aGlzLnN0YXRlLnBvc2l0aW9uLnggPSBtb3VzZV9wb3NpdGlvbi54IC0gdGhpcy53aWR0aC8yO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3VwZXIuc3RhdGVmKHRpbWUpO1xyXG4gIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHtncmF2aXR5X29ian0gZnJvbSBcIi4uLy4uL2xpYi9vYmplY3RcIjtcclxuaW1wb3J0IHtvYmpfc3RhdGV9IGZyb20gXCIuLi8uLi9saWIvc3RhdGVcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgcGxhdF9zdGF0ZSBleHRlbmRzIG9ial9zdGF0ZXtcclxuICBoZWFsdGg6bnVtYmVyICBcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIHBsYXRmb3JtZXJfb2JqPHQ+IGV4dGVuZHMgZ3Jhdml0eV9vYmo8dD57XHJcbiAgZW5lbXkgPSBmYWxzZTtcclxuICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcbiAgc3RhdGVmKGE6bnVtYmVyKXtcclxuICAgIGxldCBzdGF0ZSA9IHRoaXMuc3RhdGUgYXMgdW5rbm93biBhcyBwbGF0X3N0YXRlO1xyXG4gICAgaWYoc3RhdGUuaGVhbHRoIDw9IDApe1xyXG4gICAgICB0aGlzLmRlbGV0ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxufSIsImltcG9ydCB7dmVsb2NpdHksb2JqX3N0YXRlLHN0YXRlX2Z1bmN9IGZyb20gXCIuLi8uLi9saWIvc3RhdGVcIjtcclxuaW1wb3J0IHtzcHJpdGUsc3ByaXRlX2dlbn0gZnJvbSBcIi4uLy4uL2xpYi9zcHJpdGVcIjtcclxuaW1wb3J0IHtvYmoscm90YXRpb25fbGVuZ3RofSBmcm9tIFwiLi4vLi4vbGliL29iamVjdFwiO1xyXG5pbXBvcnQge3BsYXRmb3JtZXJfb2JqLHBsYXRfc3RhdGV9IGZyb20gXCIuL3BsYXRmb3JtZXJfb2JqXCI7XHJcbmltcG9ydCB7UG9sbF9Nb3VzZSwgZXhlY190eXBlfSBmcm9tIFwiLi4vLi4vbGliL2NvbnRyb2xzXCI7XHJcbmltcG9ydCB7Y29sbGlzaW9uX2JveH0gZnJvbSBcIi4uLy4uL2xpYi9jb2xsaXNpb25cIjtcclxuaW1wb3J0IHtCaW5kfSBmcm9tIFwiLi4vLi4vbGliL2NvbnRyb2xzXCI7XHJcblxyXG5pbXBvcnQge092ZXJ3b3JsZH0gZnJvbSBcIi4uL3Jvb21zL292ZXJ3b3JsZFwiO1xyXG5pbXBvcnQge2dldEdhbWV9IGZyb20gXCIuLi8uLi92YW5cIjtcclxuXHJcbmludGVyZmFjZSB0YXJnZXRfc3RhdGUgZXh0ZW5kcyBvYmpfc3RhdGV7XHJcbiAgaGVhbHRoOm51bWJlcjtcclxuICBicmVha2luZzpib29sZWFuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUYXJnZXQgZXh0ZW5kcyBwbGF0Zm9ybWVyX29iajx0YXJnZXRfc3RhdGU+e1xyXG4gIHNwcml0ZV91cmwgPSBcIi4vc3ByaXRlcy90YXJnZXQucG5nXCI7XHJcbiAgaGVpZ2h0ID0gNjQ7XHJcbiAgd2lkdGggPSA2NDtcclxuICBjb2xsaXNpb24gPSB0cnVlO1xyXG4gIGdyYXZpdHkgPSBmYWxzZTtcclxuICByZW5kZXIgPSB0cnVlO1xyXG4gIGVuZW15ID0gdHJ1ZTtcclxuICBjb25zdHJ1Y3RvcihhOltudW1iZXIsbnVtYmVyXSl7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgcG9zaXRpb246e1xyXG4gICAgICAgIHg6YVswXSxcclxuICAgICAgICB5OmFbMV1cclxuICAgICAgfSxcclxuICAgICAgdmVsb2NpdHk6e1xyXG4gICAgICAgIHg6MCxcclxuICAgICAgICB5OjBcclxuICAgICAgfSxcclxuICAgICAgaGVhbHRoOjIwLFxyXG4gICAgICBicmVha2luZzpmYWxzZVxyXG4gICAgfVxyXG4gIH1cclxuICByZWdpc3Rlcl9hdWRpbygpe1xyXG4gICAgdGhpcy5hdWRpby5hZGQoXCJicmVha1wiLFwiLi9zb3VuZHMvdGFyZ2V0L2hpdHNvdW5kXzI3NC5tcDNcIik7XHJcbiAgfVxyXG4gIHJlZ2lzdGVyX2FuaW1hdGlvbnMoKXtcclxuICAgIGxldCBzcHJpdGVzID0gc3ByaXRlX2dlbih0aGlzLnNwcml0ZV9zaGVldCx0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KTtcclxuICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoXCJicmVha1wiLFtcclxuICAgICAgWzAsc3ByaXRlc1swXVsxXV0sXHJcbiAgICAgIFs1MCxzcHJpdGVzWzBdWzJdXSxcclxuICAgICAgWzEwMCxzcHJpdGVzWzBdWzNdXSxcclxuICAgICAgWzE1MCxzcHJpdGVzWzBdWzRdXVxyXG4gICAgXSwyMDApXHJcbiAgfVxyXG4gIHN0YXRlZigpe1xyXG4gICAgaWYodGhpcy5zdGF0ZS5oZWFsdGggPD0gMCAmJiAhdGhpcy5zdGF0ZS5icmVha2luZyl7XHJcbiAgICAgIHRoaXMuc3RhdGUuYnJlYWtpbmcgPSB0cnVlO1xyXG4gICAgICB0aGlzLmFuaW1hdGlvbnMucGxheShcImJyZWFrXCIsKCk9PntcclxuICAgICAgICB0aGlzLmRlbGV0ZSgpO1xyXG4gICAgICB9KVxyXG4gICAgICB0aGlzLmF1ZGlvLnBsYXkoXCJicmVha1wiLDAuMSk7XHJcbiAgICB9XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgcm9vbSwgYXBwbHlfZ3Jhdml0eSB9IGZyb20gXCIuLi8uLi9saWIvcm9vbVwiO1xyXG5pbXBvcnQgeyBTdGFuZGluZ0dvb21iYSwgR29vbWJhLCBnb29tYmFfc3RhdGUsIEN1cnNvciB9IGZyb20gXCIuLi9vYmplY3RzL2dvb21iYVwiO1xyXG5pbXBvcnQgeyBCb3ggfSBmcm9tIFwiLi4vb2JqZWN0cy9ib3hcIjtcclxuaW1wb3J0IHsgdmVsb2NpdHlfY29sbGlzaW9uX2NoZWNrIH0gZnJvbSBcIi4uLy4uL2xpYi9jb2xsaXNpb25cIjtcclxuaW1wb3J0IHsgZ3Jhdml0eV9vYmogfSBmcm9tIFwiLi4vLi4vbGliL29iamVjdFwiO1xyXG5pbXBvcnQgeyBQb2xsX01vdXNlLCBleGVjX3R5cGUgfSBmcm9tIFwiLi4vLi4vbGliL2NvbnRyb2xzXCI7XHJcbmltcG9ydCB7IERvb3IgfSBmcm9tIFwiLi4vb2JqZWN0cy9yb29tX2xvYWRlclwiO1xyXG5pbXBvcnQgeyBIVUQsIFRleHQgfSBmcm9tIFwiLi4vLi4vbGliL2h1ZFwiO1xyXG5pbXBvcnQgeyBnZXRHYW1lIH0gZnJvbSBcIi4uLy4uL3ZhblwiO1xyXG5pbXBvcnQge0J1bGxldH0gZnJvbSBcIi4uL29iamVjdHMvYnVsbGV0XCI7XHJcbmltcG9ydCB7VGFyZ2V0fSBmcm9tIFwiLi4vb2JqZWN0cy90YXJnZXRcIjtcclxuXHJcbmludGVyZmFjZSBvdmVyd29ybGRfaSB7XHJcbiAgcGxheWVyOiBncmF2aXR5X29iajx1bmtub3duPixcclxuICBwYXVzZWQ6IGJvb2xlYW5cclxufVxyXG5cclxuY2xhc3MgT3ZlcndvcmxkX0hVRCBleHRlbmRzIEhVRCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy50ZXh0X2VsZW1lbnRzLnB1c2gobmV3IFRleHQoe1xyXG4gICAgICBwb3NpdGlvbjoge1xyXG4gICAgICAgIHg6IDEwLFxyXG4gICAgICAgIHk6IDcxMFxyXG4gICAgICB9LFxyXG4gICAgICBzaXplOiA0NCxcclxuICAgICAgZm9udDogXCJBbGF0YVwiLFxyXG4gICAgICBjb2xvcjogXCJ3aGl0ZVwiLFxyXG4gICAgICBhbGlnbjpcImxlZnRcIlxyXG4gICAgfSwgKCkgPT4ge1xyXG4gICAgICBsZXQgeCA9IGdldEdhbWUoKS5nZXRSb29tKCkuZ2V0T2JqKFwicGxheWVyXCIpIGFzIEdvb21iYTtcclxuICAgICAgcmV0dXJuIGBYOiR7TWF0aC5yb3VuZCh4LnN0YXRlLnBvc2l0aW9uLngpfWA7XHJcbiAgICB9KSk7XHJcbiAgICB0aGlzLnRleHRfZWxlbWVudHMucHVzaChuZXcgVGV4dCh7XHJcbiAgICAgIHBvc2l0aW9uOiB7XHJcbiAgICAgICAgeDogMTAsXHJcbiAgICAgICAgeTogNzUwXHJcbiAgICAgIH0sXHJcbiAgICAgIHNpemU6IDQ0LFxyXG4gICAgICBmb250OiBcIkFsYXRhXCIsXHJcbiAgICAgIGNvbG9yOiBcIndoaXRlXCIsXHJcbiAgICAgIGFsaWduOiBcImxlZnRcIlxyXG4gICAgfSwgKCkgPT4ge1xyXG4gICAgICBsZXQgeCA9IGdldEdhbWUoKS5nZXRSb29tKCkuZ2V0T2JqKFwicGxheWVyXCIpIGFzIEdvb21iYTtcclxuICAgICAgcmV0dXJuIGBZOiR7TWF0aC5yb3VuZCh4LnN0YXRlLnBvc2l0aW9uLnkpfWA7XHJcbiAgICB9KSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgT3ZlcndvcmxkIGV4dGVuZHMgcm9vbTxvdmVyd29ybGRfaT57XHJcbiAgYmFja2dyb3VuZF91cmwgPSBcIi4vc3ByaXRlcy9pbUQ0MWwuanBnXCI7XHJcbiAgb2JqZWN0cyA9IFtuZXcgQ3Vyc29yKFwiY3Vyc29yXCIpLG5ldyBHb29tYmEoODAwLCA2NCwgXCJwbGF5ZXJcIiksbmV3IEJveCg2MDAsMCxcInBsYXRmb3JtXCIpLG5ldyBUYXJnZXQoWzIwMCwxMDBdKSxuZXcgVGFyZ2V0KFsyMDAsMjAwXSksbmV3IFRhcmdldChbMTAwMCwxMDBdKSxuZXcgVGFyZ2V0KFsxMDAwLDIwMF0pXVxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIHBsYXllcjogdW5kZWZpbmVkLFxyXG4gICAgICBwYXVzZWQ6IGZhbHNlXHJcbiAgICB9O1xyXG4gIH1cclxuICByZWdpc3RlckhVRCgpIHtcclxuICAgIHJldHVybiBuZXcgT3ZlcndvcmxkX0hVRCgpO1xyXG4gIH1cclxuICByZWdpc3Rlcl9jb250cm9scygpIHtcclxuICAgIHRoaXMuYmluZENvbnRyb2woXCJFc2NhcGVcIiwgZXhlY190eXBlLm9uY2UsICgpID0+IHtcclxuICAgICAgdGhpcy5zdGF0ZS5wYXVzZWQgPSAhdGhpcy5zdGF0ZS5wYXVzZWQ7XHJcbiAgICB9KVxyXG4gICAgXHJcbiAgICB0aGlzLmJpbmRDb250cm9sKFwibW91c2Vkb3duXCIsIGV4ZWNfdHlwZS5yZXBlYXQsKCkgPT4ge1xyXG4gICAgICBsZXQgcGxheWVyID0gdGhpcy5nZXRPYmooXCJwbGF5ZXJcIikgYXMgR29vbWJhO1xyXG4gICAgICBsZXQgY3Vyc29yID0gdGhpcy5nZXRPYmooXCJjdXJzb3JcIik7XHJcbiAgICAgIGxldCBwb3NpdGlvbiA9IHtcclxuICAgICAgICB4OnBsYXllci5zdGF0ZS5wb3NpdGlvbi54LFxyXG4gICAgICAgIHk6cGxheWVyLnN0YXRlLnBvc2l0aW9uLnlcclxuICAgICAgfVxyXG4gICAgICBsZXQgYnVsbGV0ID0gbmV3IEJ1bGxldChwb3NpdGlvbixwbGF5ZXIuYW5nbGVUb3dhcmRzKGN1cnNvcikpO1xyXG4gICAgICB0aGlzLmFkZEl0ZW0oYnVsbGV0KTtcclxuICAgIH0sNTApXHJcbiAgICBcclxuICB9XHJcbiAgc3RhdGVmKHRpbWU6IG51bWJlcikge1xyXG4gICAgaWYgKCF0aGlzLnN0YXRlLnBhdXNlZCkge1xyXG4gICAgICBmb3IgKGxldCBhID0gMDsgYSA8IHRoaXMub2JqZWN0cy5sZW5ndGg7IGErKykge1xyXG4gICAgICAgIGFwcGx5X2dyYXZpdHkodGhpcy5vYmplY3RzW2FdLCAtLjUsIC0xNSk7XHJcbiAgICAgICAgdmVsb2NpdHlfY29sbGlzaW9uX2NoZWNrKHRoaXMub2JqZWN0c1thXSwgdGhpcy5vYmplY3RzKTtcclxuICAgICAgICB0aGlzLm9iamVjdHNbYV0uc3RhdGVmKHRpbWUpO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLmdldE9iaihcInBsYXllclwiKSBhcyBHb29tYmE7XHJcbiAgICAgIGxldCBjdXJzb3IgPSB0aGlzLmdldE9iaihcImN1cnNvclwiKSBhcyBDdXJzb3I7XHJcbiAgICAgIGlmIChwbGF5ZXIpIHtcclxuXHJcbiAgICAgICAgbGV0IGNhbWVyYSA9IGdldEdhbWUoKS5zdGF0ZS5jYW1lcmE7XHJcbiAgICAgICAgY2FtZXJhLnggPSBwbGF5ZXIuc3RhdGUucG9zaXRpb24ueDtcclxuICAgICAgICBjYW1lcmEueSA9IHBsYXllci5zdGF0ZS5wb3NpdGlvbi55O1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICBpZiAoY3Vyc29yKSB7XHJcbiAgICAgICAgY3Vyc29yLmNvbGxpc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgIGN1cnNvci5ncmF2aXR5ID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IG1vdXNlID0gUG9sbF9Nb3VzZSgpO1xyXG4gICAgICAgIGN1cnNvci5zdGF0ZS5wb3NpdGlvbi54ID0gbW91c2UueDtcclxuICAgICAgICBjdXJzb3Iuc3RhdGUucG9zaXRpb24ueSA9IG1vdXNlLnk7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbnRlcmZhY2Ugc291bmRfc3RvcmFnZSB7XHJcbiAgW2luZGV4OiBzdHJpbmddOiBIVE1MQXVkaW9FbGVtZW50XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBhdWRpbyB7XHJcbiAgc291bmRzOiBzb3VuZF9zdG9yYWdlID0ge307XHJcbiAgYWRkKG5hbWU6IHN0cmluZywgczogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnNvdW5kc1tuYW1lXSA9IG5ldyBBdWRpbyhzKTtcclxuICB9XHJcbiAgbG9hZCgpIHtcclxuICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXModGhpcy5zb3VuZHMpO1xyXG4gICAgbGV0IHByb21pc2VzID0ga2V5cy5tYXAoKGtleSkgPT4ge1xyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc291bmRzW2tleV0uYWRkRXZlbnRMaXN0ZW5lcihcImNhbnBsYXl0aHJvdWdoXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xyXG4gIH1cclxuICBwbGF5KG5hbWU6c3RyaW5nLHZvbHVtZTpudW1iZXIpe1xyXG4gICAgbGV0IGEgPSB0aGlzLnNvdW5kc1tuYW1lXTtcclxuICAgIGEucGF1c2UoKVxyXG4gICAgYS5jdXJyZW50VGltZSA9IDA7XHJcbiAgICBhLnZvbHVtZSA9IHZvbHVtZTtcclxuICAgIGEucGxheSgpO1xyXG4gIH1cclxufSIsImltcG9ydCB7b2JqLGdldElkfSBmcm9tIFwiLi4vbGliL29iamVjdFwiO1xyXG5pbXBvcnQge29ial9zdGF0ZX0gZnJvbSBcIi4uL2xpYi9zdGF0ZVwiO1xyXG5pbXBvcnQge2RlZXB9IGZyb20gXCIuLi92YW5cIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgY29sbGlzaW9uX2JveHtcclxuICB4Om51bWJlcjtcclxuICB5Om51bWJlcjtcclxuICB3aWR0aDpudW1iZXI7XHJcbiAgaGVpZ2h0Om51bWJlcjtcclxufVxyXG5cclxuZW51bSBkaXJlY3Rpb257XHJcbiAgbGVmdCxcclxuICByaWdodCxcclxuICB1cCxcclxuICBkb3duXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjaGVja19hbGxfb2JqZWN0cyhjOiBjb2xsaXNpb25fYm94LG9ianM6QXJyYXk8b2JqPHVua25vd24+PixleGVtcHRpb246c3RyaW5nKTpBcnJheTxvYmo8dW5rbm93bj4+e1xyXG4gIGxldCBtYXRjaGVkID0gW107XHJcbiAgZm9yIChsZXQgYSBvZiBvYmpzKSB7XHJcbiAgICBpZiAoYS5pZCAhPT0gZXhlbXB0aW9uICYmIGEuY29sbGlkZXNfd2l0aF9ib3goYykpIHtcclxuICAgICAgbWF0Y2hlZC5wdXNoKGEpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gbWF0Y2hlZFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tfYWxsX2NvbGxpc2lvbnMoYzogY29sbGlzaW9uX2JveCxvYmpzOkFycmF5PG9iajx1bmtub3duPj4sZXhlbXB0aW9uOnN0cmluZ1tdID0gW10pOkFycmF5PG9iajx1bmtub3duPj57XHJcbiAgbGV0IG1hdGNoZWQgPSBbXTtcclxuICBmb3IgKGxldCBhIG9mIG9ianMpIHtcclxuICAgIGlmIChleGVtcHRpb24uaW5kZXhPZihhLmlkKSA9PSAtMSAmJiBhLmNvbGxpc2lvbiAmJiBhLmNvbGxpZGVzX3dpdGhfYm94KGMpKSB7XHJcbiAgICAgIG1hdGNoZWQucHVzaChhKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIG1hdGNoZWRcclxufVxyXG4vL0NoZWNrcyB1cCB0byB0aGUgZmlyc3QgY29sbGlzaW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBjaGVja19jb2xsaXNpb25zKGM6IGNvbGxpc2lvbl9ib3gsIG9ianM6IEFycmF5PG9iajx1bmtub3duPj4sIGV4ZW1wdGlvbjpzdHJpbmcpIHtcclxuICBmb3IgKGxldCBhIG9mIG9ianMpIHtcclxuICAgIGlmIChhLmlkICE9PSBleGVtcHRpb24gJiYgYS5jb2xsaXNpb24gJiYgYS5jb2xsaWRlc193aXRoX2JveChjKSkge1xyXG4gICAgICByZXR1cm4gYTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZlbG9jaXR5X21heCh2ZWxvY2l0eTpudW1iZXIsYm94OmNvbGxpc2lvbl9ib3gsb2JqczpBcnJheTxvYmo8dW5rbm93bj4+LCBleGVtcHRpb246c3RyaW5nLGRpcjpkaXJlY3Rpb24pe1xyXG4gIGxldCBjb2xsaXNpb24gPSBjaGVja19jb2xsaXNpb25zKGJveCwgb2JqcywgZXhlbXB0aW9uKTtcclxuICBpZihjb2xsaXNpb24gPT0gbnVsbCl7XHJcbiAgICByZXR1cm4gdmVsb2NpdHk7XHJcbiAgfVxyXG4gIGVsc2V7XHJcbiAgICBsZXQgY29sbGlkZXIgPSBjb2xsaXNpb247XHJcbiAgICBsZXQgb3JpZ2luID0gZ2V0SWQob2JqcyxleGVtcHRpb24pO1xyXG4gICAgbGV0IG9yaWdfc3QgPSBvcmlnaW4uc3RhdGUgYXMgb2JqX3N0YXRlO1xyXG4gICAgbGV0IGNvbGxpZGVyX3N0ID0gY29sbGlkZXIuc3RhdGUgYXMgb2JqX3N0YXRlO1xyXG4gICAgaWYoZGlyID09IGRpcmVjdGlvbi5sZWZ0KXtcclxuICAgICAgcmV0dXJuIChvcmlnX3N0LnBvc2l0aW9uLnggLSBvcmlnaW4ud2lkdGgvMikgLSAoY29sbGlkZXJfc3QucG9zaXRpb24ueCArIGNvbGxpZGVyLndpZHRoLzIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZihkaXIgPT0gZGlyZWN0aW9uLnJpZ2h0KXtcclxuICAgICAgcmV0dXJuIChjb2xsaWRlcl9zdC5wb3NpdGlvbi54IC0gY29sbGlkZXIud2lkdGgvMikgLSAob3JpZ19zdC5wb3NpdGlvbi54ICsgb3JpZ2luLndpZHRoLzIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZihkaXIgPT0gZGlyZWN0aW9uLmRvd24pe1xyXG4gICAgICByZXR1cm4gKG9yaWdfc3QucG9zaXRpb24ueSAtIG9yaWdpbi5oZWlnaHQvMikgLSAoY29sbGlkZXJfc3QucG9zaXRpb24ueSArIGNvbGxpZGVyLmhlaWdodC8yKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYoZGlyID09IGRpcmVjdGlvbi51cCl7XHJcbiAgICAgIHJldHVybiAoY29sbGlkZXJfc3QucG9zaXRpb24ueSAtIGNvbGxpZGVyLmhlaWdodC8yKSAtIChvcmlnX3N0LnBvc2l0aW9uLnkgKyBvcmlnaW4uaGVpZ2h0LzIpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZlbG9jaXR5X2NvbGxpc2lvbl9jaGVjayhvYmplY3Q6b2JqPHVua25vd24+LGxpc3Q6QXJyYXk8b2JqPHVua25vd24+Pikge1xyXG4gIGxldCBvYiA9IG9iamVjdDtcclxuICBsZXQgc3QgPSBvYmplY3QuZ2V0U3RhdGUoKSBhcyBvYmpfc3RhdGU7XHJcbiAgbGV0IHhfdmVsID0gc3QudmVsb2NpdHkueDtcclxuICBsZXQgeV92ZWwgPSBzdC52ZWxvY2l0eS55O1xyXG4gIGlmKCFvYi5jb2xsaXNpb24pe1xyXG4gICAgc3QucG9zaXRpb24ueCArPSB4X3ZlbDtcclxuICAgIHN0LnBvc2l0aW9uLnkgKz0geV92ZWw7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGlmICh4X3ZlbCA+IDApIHtcclxuICAgIGxldCBib3ggPSB7XHJcbiAgICAgIHg6IHN0LnBvc2l0aW9uLnggKyBvYi53aWR0aC8yICsgeF92ZWwvMixcclxuICAgICAgeTogc3QucG9zaXRpb24ueSxcclxuICAgICAgd2lkdGg6IHhfdmVsLFxyXG4gICAgICBoZWlnaHQ6IG9iLmhlaWdodFxyXG4gICAgfTtcclxuICAgIGxldCB2ZWwgPSB2ZWxvY2l0eV9tYXgoc3QudmVsb2NpdHkueCxib3gsbGlzdCxvYi5pZCxkaXJlY3Rpb24ucmlnaHQpO1xyXG4gICAgaWYodmVsID4gMCl7XHJcbiAgICAgIHN0LnBvc2l0aW9uLnggKz0gdmVsO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgc3QudmVsb2NpdHkueCA9IDA7ICBcclxuICAgIH1cclxuICB9XHJcbiAgZWxzZSBpZiAoeF92ZWwgPCAwKSB7XHJcbiAgICBsZXQgYm94ID0ge1xyXG4gICAgICB4OiB4X3ZlbC8yICsgc3QucG9zaXRpb24ueCAtIG9iLndpZHRoLzIsXHJcbiAgICAgIHk6IHN0LnBvc2l0aW9uLnksXHJcbiAgICAgIHdpZHRoOiAtMSAqIHhfdmVsLFxyXG4gICAgICBoZWlnaHQ6IG9iLmhlaWdodFxyXG4gICAgfVxyXG4gICAgbGV0IHZlbCA9IHZlbG9jaXR5X21heChzdC52ZWxvY2l0eS54LGJveCxsaXN0LG9iLmlkLGRpcmVjdGlvbi5sZWZ0KTtcclxuICAgIGlmKHZlbCA8IDApe1xyXG4gICAgICBzdC5wb3NpdGlvbi54ICs9IHZlbDtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgIHN0LnZlbG9jaXR5LnggPSAwOyBcclxuICAgIH1cclxuICB9XHJcbiAgaWYgKHlfdmVsID4gMCkge1xyXG4gICAgbGV0IGJveCA9IHtcclxuICAgICAgeDogc3QucG9zaXRpb24ueCxcclxuICAgICAgeTogc3QucG9zaXRpb24ueSArIG9iLmhlaWdodC8yICsgeV92ZWwvMixcclxuICAgICAgd2lkdGg6IG9iLndpZHRoLFxyXG4gICAgICBoZWlnaHQ6IHlfdmVsXHJcbiAgICB9XHJcbiAgICBsZXQgdmVsID0gdmVsb2NpdHlfbWF4KHN0LnZlbG9jaXR5LnksYm94LGxpc3Qsb2IuaWQsZGlyZWN0aW9uLnVwKTtcclxuICAgIGlmKHZlbCA+IDApe1xyXG4gICAgICBzdC5wb3NpdGlvbi55ICs9IHZlbDtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgIHN0LnZlbG9jaXR5LnkgPSAwO1xyXG4gICAgfVxyXG4gIH1cclxuICBlbHNlIGlmICh5X3ZlbCA8IDApIHtcclxuICAgIGxldCBib3ggPSB7XHJcbiAgICAgIHg6IHN0LnBvc2l0aW9uLngsXHJcbiAgICAgIHk6IHlfdmVsLzIgKyBzdC5wb3NpdGlvbi55IC0gb2IuaGVpZ2h0LzIsXHJcbiAgICAgIHdpZHRoOiBvYi53aWR0aCxcclxuICAgICAgaGVpZ2h0OiAtMSAqIHlfdmVsXHJcbiAgICB9XHJcbiAgICBsZXQgdmVsID0gdmVsb2NpdHlfbWF4KHN0LnZlbG9jaXR5LnksYm94LGxpc3Qsb2IuaWQsZGlyZWN0aW9uLmRvd24pO1xyXG4gICAgaWYodmVsIDwgMCl7XHJcbiAgICAgIHN0LnBvc2l0aW9uLnkgKz0gdmVsO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgc3QudmVsb2NpdHkueSA9IDA7XHJcbiAgICB9XHJcbiAgfVxyXG59IiwiaW1wb3J0IHtHZXRTY3JlZW5EaW1lbnNpb25zLEdldFZpZXdwb3J0RGltZW5zaW9ucyxnZXRHYW1lfSBmcm9tIFwiLi4vdmFuXCI7XHJcbmltcG9ydCB7IGNvbGxpc2lvbl9ib3ggfSBmcm9tIFwiLi9jb2xsaXNpb25cIjtcclxuaW1wb3J0IHtvYmp9IGZyb20gXCIuL29iamVjdFwiO1xyXG5cclxuaW50ZXJmYWNlIG1vdXNlUG9ze1xyXG4gIHg6bnVtYmVyLFxyXG4gIHk6bnVtYmVyLFxyXG4gIGxhc3Q6e1xyXG4gICAgeDpudW1iZXIsXHJcbiAgICB5Om51bWJlclxyXG4gIH1cclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIGNvbnRyb2xfZnVuY3tcclxuICAoKTp2b2lkXHJcbn1cclxuXHJcbmludGVyZmFjZSBtb3VzZUJpbmRze1xyXG4gIFtrZXk6c3RyaW5nXTogQXJyYXk8W2NvbnRyb2xfZnVuYyxvYmo8dW5rbm93bj5dPlxyXG59XHJcblxyXG5pbnRlcmZhY2Uga2V5QmluZHN7XHJcbiAgW2tleTpzdHJpbmddOiBBcnJheTxjb250cm9sX2Z1bmM+XHJcbn1cclxubGV0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFyZ2V0XCIpO1xyXG50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsKGUpPT57XHJcbiAgbGV0IG1vdXNlID0gUG9sbF9Nb3VzZSgpO1xyXG4gIGxldCBib3g6Y29sbGlzaW9uX2JveCA9IHtcclxuICAgIHg6bW91c2UueCxcclxuICAgIHk6bW91c2UueSxcclxuICAgIGhlaWdodDoxLFxyXG4gICAgd2lkdGg6MVxyXG4gIH07XHJcbiAgbGV0IGQgPSBbLi4uYWxsX2JpbmRzXTtcclxuICBmb3IobGV0IGEgPSAwO2EgPCBkLmxlbmd0aDthKyspe1xyXG4gICAgbGV0IHNlbGVjdGVkID0gZFthXTtcclxuICAgIGlmKHNlbGVjdGVkLnR5cGUgPT09IGJ0eXBlLm1vdXNlICYmIHNlbGVjdGVkLmtleSA9PT0gXCJtb3VzZTFcIiAmJiBzZWxlY3RlZC5leGVjdXRlID09IGV4ZWNfdHlwZS5vbmNlKXtcclxuICAgICAgaWYoc2VsZWN0ZWQub2JqICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgIGlmKHNlbGVjdGVkLm9iai5jb2xsaWRlc193aXRoX2JveChib3gpKXtcclxuICAgICAgICAgIHNlbGVjdGVkLmZ1bmN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2V7XHJcbiAgICAgICAgc2VsZWN0ZWQuZnVuY3Rpb24oKTsgICAgICAgIFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSAgXHJcbn0pXHJcblxyXG50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZSkgPT4ge1xyXG4gIGxldCBkID0gWy4uLmFsbF9iaW5kc107XHJcbiAgZm9yIChsZXQgYSA9IDA7IGEgPCBhbGxfYmluZHMubGVuZ3RoOyBhKyspIHtcclxuICAgIGxldCBzZWxlY3RlZCA9IGRbYV07XHJcbiAgICBpZiAoc2VsZWN0ZWQudHlwZSA9PT0gYnR5cGUubW91c2UgJiYgc2VsZWN0ZWQua2V5ID09PSBlLnR5cGUgICYmICFzZWxlY3RlZC5leGVjdXRlZCkge1xyXG4gICAgICBpZihzZWxlY3RlZC5leGVjdXRlID09PSBleGVjX3R5cGUub25jZSl7XHJcbiAgICAgICAgc2VsZWN0ZWQuZnVuY3Rpb24oKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmKHNlbGVjdGVkLmV4ZWN1dGUgPT09IGV4ZWNfdHlwZS5yZXBlYXQpe1xyXG4gICAgICAgIGxldCBhY3RpdmUgPSB7XHJcbiAgICAgICAgICBiaW5kOnNlbGVjdGVkLFxyXG4gICAgICAgICAgdGltZXI6MCxcclxuICAgICAgICAgIGludGVydmFsOnNlbGVjdGVkLmludGVydmFsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFjdGl2ZV9iaW5kcy5wdXNoKGFjdGl2ZSk7XHJcbiAgICAgIH1cclxuICAgICAgc2VsZWN0ZWQuZXhlY3V0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxufSlcclxuXHJcbnRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCAoZSkgPT4ge1xyXG4gIGxldCBkID0gWy4uLmFsbF9iaW5kc107XHJcbiAgZm9yIChsZXQgYSA9IDA7IGEgPCBhbGxfYmluZHMubGVuZ3RoOyBhKyspIHtcclxuICAgIGxldCBzZWxlY3RlZCA9IGRbYV07XHJcbiAgICBpZiAoc2VsZWN0ZWQudHlwZSA9PT0gYnR5cGUubW91c2UgJiYgKHNlbGVjdGVkLmtleSA9PT0gZS50eXBlKSAmJiBzZWxlY3RlZC5leGVjdXRlZCAmJiBzZWxlY3RlZC5leGVjdXRlID09PSBleGVjX3R5cGUub25jZSkge1xyXG4gICAgICAgc2VsZWN0ZWQuZXhlY3V0ZWQgPSBmYWxzZTtcclxuICAgICAgXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKHNlbGVjdGVkLnR5cGUgPT09IGJ0eXBlLm1vdXNlICYmIChzZWxlY3RlZC5rZXkgPT09IGUudHlwZSB8fCBzZWxlY3RlZC5rZXkgPT0gXCJtb3VzZWRvd25cIikgJiYgc2VsZWN0ZWQuZXhlY3V0ZWQgJiYgc2VsZWN0ZWQuZXhlY3V0ZSA9PT0gZXhlY190eXBlLnJlcGVhdCl7XHJcbiAgICAgIGxldCBnID0gWy4uLmFjdGl2ZV9iaW5kc107XHJcbiAgICAgIGZvcihsZXQgYSA9IDA7IGEgPCBnLmxlbmd0aDthKyspe1xyXG4gICAgICAgIGlmKGdbYV0uYmluZC5pZCA9PT0gc2VsZWN0ZWQuaWQpe1xyXG4gICAgICAgICAgc2VsZWN0ZWQuZXhlY3V0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgIGFjdGl2ZV9iaW5kcy5zcGxpY2UoYSwxKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4ge1xyXG4gIGxldCBkID0gWy4uLmFsbF9iaW5kc107XHJcbiAgZm9yIChsZXQgYSA9IDA7IGEgPCBhbGxfYmluZHMubGVuZ3RoOyBhKyspIHtcclxuICAgIGxldCBzZWxlY3RlZCA9IGRbYV07XHJcbiAgICBpZiAoc2VsZWN0ZWQudHlwZSA9PT0gYnR5cGUua2V5Ym9hcmQgJiYgc2VsZWN0ZWQua2V5ID09PSBlLmNvZGUgICYmICFzZWxlY3RlZC5leGVjdXRlZCkge1xyXG4gICAgICBpZihzZWxlY3RlZC5leGVjdXRlID09PSBleGVjX3R5cGUub25jZSl7XHJcbiAgICAgICAgc2VsZWN0ZWQuZnVuY3Rpb24oKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmKHNlbGVjdGVkLmV4ZWN1dGUgPT09IGV4ZWNfdHlwZS5yZXBlYXQpe1xyXG4gICAgICAgIGxldCBhY3RpdmUgPSB7XHJcbiAgICAgICAgICBiaW5kOnNlbGVjdGVkLFxyXG4gICAgICAgICAgdGltZXI6MCxcclxuICAgICAgICAgIGludGVydmFsOnNlbGVjdGVkLmludGVydmFsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFjdGl2ZV9iaW5kcy5wdXNoKGFjdGl2ZSk7XHJcbiAgICAgIH1cclxuICAgICAgc2VsZWN0ZWQuZXhlY3V0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuICBcclxufSlcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoZSkgPT4ge1xyXG4gIGxldCBkID0gWy4uLmFsbF9iaW5kc107XHJcbiAgZm9yIChsZXQgYSA9IDA7IGEgPCBhbGxfYmluZHMubGVuZ3RoOyBhKyspIHtcclxuICAgIGxldCBzZWxlY3RlZCA9IGRbYV07XHJcbiAgICBpZiAoc2VsZWN0ZWQudHlwZSA9PT0gYnR5cGUua2V5Ym9hcmQgJiYgc2VsZWN0ZWQua2V5ID09PSBlLmNvZGUgJiYgc2VsZWN0ZWQuZXhlY3V0ZWQpIHtcclxuICAgICAgaWYoc2VsZWN0ZWQuZXhlY3V0ZSA9PT0gZXhlY190eXBlLm9uY2UgKXtcclxuICAgICAgICBzZWxlY3RlZC5leGVjdXRlZCA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYoc2VsZWN0ZWQuZXhlY3V0ZSA9PT0gZXhlY190eXBlLnJlcGVhdCl7XHJcbiAgICAgICAgbGV0IGcgPSBbLi4uYWN0aXZlX2JpbmRzXTtcclxuICAgICAgICBmb3IobGV0IGEgPSAwOyBhIDwgZy5sZW5ndGg7YSsrKXtcclxuICAgICAgICAgIGlmKGdbYV0uYmluZC5pZCA9PT0gc2VsZWN0ZWQuaWQpe1xyXG4gICAgICAgICAgICBzZWxlY3RlZC5leGVjdXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBhY3RpdmVfYmluZHMuc3BsaWNlKGEsMSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbn0pXHJcbmxldCB0cmFja2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXJnZXRcIik7XHJcbnRyYWNrZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCAoZSkgPT4ge1xyXG4gIHZhciByZWN0ID0gKGUudGFyZ2V0IGFzIEhUTUxDYW52YXNFbGVtZW50KS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSA7XHJcbiAgXHJcbiAgbGFzdF94ID0geDtcclxuICBsYXN0X3kgPSB5O1xyXG4gIHggPSBlLmNsaWVudFggLSByZWN0LmxlZnQ7IC8veCBwb3NpdGlvbiB3aXRoaW4gdGhlIGVsZW1lbnQuXHJcbiAgeSA9IGUuY2xpZW50WSAtIHJlY3QudG9wOyAgLy95IHBvc2l0aW9uIHdpdGhpbiB0aGUgZWxlbWVudC5cclxuXHJcbn0pXHJcblxyXG5lbnVtIGJ0eXBle1xyXG4gIG1vdXNlLFxyXG4gIGtleWJvYXJkXHJcbn1cclxuXHJcbmludGVyZmFjZSBiaW5ke1xyXG4gIGtleTpzdHJpbmcsXHJcbiAgdHlwZTpidHlwZSxcclxuICBpZDpudW1iZXIsXHJcbiAgZnVuY3Rpb246Y29udHJvbF9mdW5jLFxyXG4gIGV4ZWN1dGU6ZXhlY190eXBlLFxyXG4gIG9iaj86b2JqPHVua25vd24+LFxyXG4gIGV4ZWN1dGVkPzpib29sZWFuLFxyXG4gIGludGVydmFsPzpudW1iZXJcclxufVxyXG5cclxuaW50ZXJmYWNlIHJlcGVhdF9iaW5ke1xyXG4gIGJpbmQ6YmluZCxcclxuICB0aW1lcjpudW1iZXIsXHJcbiAgaW50ZXJ2YWw6bnVtYmVyXHJcbn1cclxuXHJcbmxldCB4ID0gMDtcclxubGV0IHkgPSAwO1xyXG5sZXQgbGFzdF94ID0gMDtcclxubGV0IGxhc3RfeSA9IDA7XHJcbmxldCBiaW5kczprZXlCaW5kcyA9IHt9O1xyXG5sZXQgbW91c2VCaW5kczptb3VzZUJpbmRzID0ge307XHJcbmxldCBiaW5kX2NvdW50ID0gMDtcclxuXHJcbmxldCBhbGxfYmluZHM6QXJyYXk8YmluZD4gPSBbXVxyXG5cclxubGV0IGFjdGl2ZV9iaW5kczpBcnJheTxyZXBlYXRfYmluZD4gPSBbXTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBQb2xsX01vdXNlKCk6bW91c2VQb3N7XHJcbiAgbGV0IGhlaWdodCA9IEdldFZpZXdwb3J0RGltZW5zaW9ucygpLmhlaWdodDtcclxuICBsZXQgY2FudmFzID0gZ2V0R2FtZSgpLnN0YXRlLmNhbnZhcztcclxuICBsZXQgd3JhdGlvID0gcGFyc2VGbG9hdCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShjYW52YXMpLndpZHRoKS9HZXRWaWV3cG9ydERpbWVuc2lvbnMoKS53aWR0aDtcclxuICBsZXQgdnJhdGlvID0gcGFyc2VGbG9hdCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShjYW52YXMpLmhlaWdodCkvR2V0Vmlld3BvcnREaW1lbnNpb25zKCkuaGVpZ2h0O1xyXG4gIGxldCBjYW1lcmEgPSBnZXRHYW1lKCkuc3RhdGUuY2FtZXJhO1xyXG4gIHJldHVybiAoe1xyXG4gICAgeDogKHgvd3JhdGlvL2NhbWVyYS5zdGF0ZS5zY2FsaW5nICsgY2FtZXJhLnN0YXRlLnBvc2l0aW9uLnggLSBjYW1lcmEuc3RhdGUuZGltZW5zaW9ucy53aWR0aC8yKSAsXHJcbiAgICB5OiAoKGhlaWdodCAtIHkvdnJhdGlvKS9jYW1lcmEuc3RhdGUuc2NhbGluZyArIGNhbWVyYS5zdGF0ZS5wb3NpdGlvbi55IC0gY2FtZXJhLnN0YXRlLmRpbWVuc2lvbnMuaGVpZ2h0LzIpLFxyXG4gICAgbGFzdDp7XHJcbiAgICAgIHg6ICh4L3dyYXRpby9jYW1lcmEuc3RhdGUuc2NhbGluZyArIGNhbWVyYS5zdGF0ZS5wb3NpdGlvbi54KSxcclxuICAgICAgeTogKChoZWlnaHQgLSB5L3ZyYXRpbykvY2FtZXJhLnN0YXRlLnNjYWxpbmcgKyBjYW1lcmEuc3RhdGUucG9zaXRpb24ueSlcclxuICAgIH1cclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gRXhlY3V0ZVJlcGVhdEJpbmRzKGI6bnVtYmVyKXtcclxuICBmb3IobGV0IGEgb2YgYWN0aXZlX2JpbmRzKXtcclxuICAgIGlmKGEuYmluZC5leGVjdXRlID09PSBleGVjX3R5cGUucmVwZWF0ICYmIGEudGltZXIgPT0gMCl7XHJcbiAgICAgIGEuYmluZC5mdW5jdGlvbigpO1xyXG4gICAgfVxyXG4gICAgYS50aW1lciArPSBiO1xyXG4gICAgaWYoYS50aW1lciA+IGEuaW50ZXJ2YWwpe1xyXG4gICAgICBhLnRpbWVyID0gMDsgXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gVW5iaW5kKGJpbmRfaWQ6bnVtYmVyKXtcclxuICBmb3IobGV0IGEgPSAwO2EgPCBhbGxfYmluZHMubGVuZ3RoOyBhKyspe1xyXG4gICAgaWYoYWxsX2JpbmRzW2FdLmlkID09IGJpbmRfaWQpe1xyXG4gICAgICBhbGxfYmluZHMuc3BsaWNlKGEsMSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIGV4ZWNfdHlwZXtcclxuICBvbmNlLFxyXG4gIHJlcGVhdFxyXG59XHJcblxyXG5sZXQgaWQgPSAwO1xyXG5leHBvcnQgZnVuY3Rpb24gQmluZChrZXluYW1lOnN0cmluZyxmdW5jOmNvbnRyb2xfZnVuYyx0eXBlOmV4ZWNfdHlwZSxpbnRlcnZhbDpudW1iZXIsb2JqZWN0PzpvYmo8dW5rbm93bj4pOm51bWJlcntcclxuICBpZihrZXluYW1lLnNsaWNlKDAsNSkgPT09IFwibW91c2VcIil7XHJcbiAgICBhbGxfYmluZHMucHVzaCh7XHJcbiAgICAgIGtleTprZXluYW1lLFxyXG4gICAgICB0eXBlOmJ0eXBlLm1vdXNlLFxyXG4gICAgICBpZCxcclxuICAgICAgZnVuY3Rpb246ZnVuYyxcclxuICAgICAgb2JqOm9iamVjdCxcclxuICAgICAgZXhlY3V0ZTp0eXBlLFxyXG4gICAgICBleGVjdXRlZDpmYWxzZSxcclxuICAgICAgaW50ZXJ2YWxcclxuICAgIH0pXHJcbiAgfVxyXG4gIGVsc2V7XHJcbiAgICBhbGxfYmluZHMucHVzaCh7XHJcbiAgICAgIGtleTprZXluYW1lLFxyXG4gICAgICB0eXBlOmJ0eXBlLmtleWJvYXJkLFxyXG4gICAgICBpZCxcclxuICAgICAgZnVuY3Rpb246ZnVuYyxcclxuICAgICAgZXhlY3V0ZTp0eXBlLFxyXG4gICAgICBleGVjdXRlZDpmYWxzZSxcclxuICAgICAgaW50ZXJ2YWxcclxuICAgIH0pXHJcbiAgfVxyXG4gIGlkKys7XHJcbiAgcmV0dXJuIGlkIC0gMTtcclxufSIsImltcG9ydCB7b2JqfSBmcm9tIFwiLi9vYmplY3RcIjtcclxuaW1wb3J0IHtnZXRHYW1lfSBmcm9tIFwiLi4vdmFuXCI7XHJcbmltcG9ydCB7IEdvb21iYSB9IGZyb20gXCIuLi9nYW1lL29iamVjdHMvZ29vbWJhXCI7XHJcblxyXG5pbnRlcmZhY2UgSHVkVGV4dEdldEZ1bmN7XHJcbiAgKCk6c3RyaW5nXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGV4dFNldHRpbmd7XHJcbiAgeDpudW1iZXIsXHJcbiAgeTpudW1iZXIsXHJcbiAgZm9udDpGb250XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRm9udHtcclxuICBtYXhfd2lkdGg/Om51bWJlcixcclxuICBzaXplOm51bWJlcixcclxuICBmb250OnN0cmluZyxcclxuICBjb2xvcjpzdHJpbmcsXHJcbiAgdGV4dDpzdHJpbmcsXHJcbiAgYWxpZ246Q2FudmFzVGV4dEFsaWduXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSHVkVGV4dHtcclxuICBtYXhfd2lkdGg/Om51bWJlcixcclxuICBwb3NpdGlvbjp7XHJcbiAgICB4Om51bWJlcixcclxuICAgIHk6bnVtYmVyXHJcbiAgfVxyXG4gIHNpemU6bnVtYmVyO1xyXG4gIGZvbnQ6c3RyaW5nO1xyXG4gIGNvbG9yOnN0cmluZztcclxuICB0ZXh0PzpzdHJpbmc7XHJcbiAgYWxpZ24/OkNhbnZhc1RleHRBbGlnbjtcclxufVxyXG5leHBvcnQgY2xhc3MgSFVEe1xyXG4gIGdyYXBoaWNfZWxlbWVudHM6QXJyYXk8b2JqPHVua25vd24+PiA9IFtdO1xyXG4gIHRleHRfZWxlbWVudHM6QXJyYXk8VGV4dD4gPSBbXTtcclxuICBzdGF0ZWYoYTpudW1iZXIpe1xyXG4gICAgZm9yKGxldCB4IG9mIHRoaXMuZ3JhcGhpY19lbGVtZW50cyl7XHJcbiAgICAgIHguc3RhdGVmKGEpO1xyXG4gICAgfVxyXG4gICAgZm9yKGxldCB4IG9mIHRoaXMudGV4dF9lbGVtZW50cyl7XHJcbiAgICAgIHguc3RhdGVmKGEpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRleHR7XHJcbiAgZ2V0X2Z1bmM6SHVkVGV4dEdldEZ1bmM7XHJcbiAgc3RhdGU6SHVkVGV4dDtcclxuICBjb25zdHJ1Y3RvcihhOkh1ZFRleHQsYjpIdWRUZXh0R2V0RnVuYyl7XHJcbiAgICBpZighYS5hbGlnbil7XHJcbiAgICAgIGEuYWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zdGF0ZSA9IGE7XHJcbiAgICBpZighdGhpcy5zdGF0ZS50ZXh0KXtcclxuICAgICAgdGhpcy5zdGF0ZS50ZXh0ID0gXCJcIjtcclxuICAgIH1cclxuICAgIHRoaXMuZ2V0X2Z1bmMgPSBiO1xyXG4gIH1cclxuICBzdGF0ZWYoYTpudW1iZXIpe1xyXG4gICB0aGlzLnN0YXRlLnRleHQgPSB0aGlzLmdldF9mdW5jKCk7XHJcbiAgfVxyXG4gIHJlbmRlcmYoYTpudW1iZXIpOkZvbnR7XHJcbiAgICBsZXQge3NpemUsY29sb3IsZm9udCx0ZXh0LG1heF93aWR0aCxhbGlnbn0gPSB0aGlzLnN0YXRlO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc2l6ZSxcclxuICAgICAgY29sb3IsXHJcbiAgICAgIGZvbnQsXHJcbiAgICAgIHRleHQsXHJcbiAgICAgIG1heF93aWR0aCxcclxuICAgICAgYWxpZ25cclxuICAgIH07XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgc3RhdGVfZnVuYywgb2JqX3N0YXRlIH0gZnJvbSBcIi4vc3RhdGVcIjtcclxuaW1wb3J0IHsgcmVuZGVyX2Z1bmMgfSBmcm9tIFwiLi9yZW5kZXJcIjtcclxuaW1wb3J0IHsgc3ByaXRlLCBzcHJpdGVfZ2VuIH0gZnJvbSBcIi4vc3ByaXRlXCI7XHJcbmltcG9ydCB7IGNvbGxpc2lvbl9ib3ggfSBmcm9tIFwiLi9jb2xsaXNpb25cIjtcclxuaW1wb3J0IHsgZ2V0R2FtZSB9IGZyb20gXCIuLi92YW5cIjtcclxuaW1wb3J0IHsgVW5iaW5kLCBCaW5kLCBjb250cm9sX2Z1bmMsIGV4ZWNfdHlwZSB9IGZyb20gXCIuL2NvbnRyb2xzXCI7XHJcbmltcG9ydCB7YXVkaW99IGZyb20gXCIuL2F1ZGlvXCI7XHJcblxyXG5pbnRlcmZhY2Ugb2JqX2k8VD4ge1xyXG4gIHN0YXRlZjogc3RhdGVfZnVuYzxUPixcclxuICByZW5kZXJmOiByZW5kZXJfZnVuY1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcm90YXRpb25fbGVuZ3RoKGxlbmd0aDogbnVtYmVyLCBkZWdyZWU6IG51bWJlcikge1xyXG4gIGxldCBhX2xlbiA9IGxlbmd0aCAqIE1hdGguc2luKGRlZ3JlZSAqIE1hdGguUEkgLyAxODApO1xyXG4gIGxldCBiX2xlbiA9IGxlbmd0aCAqIE1hdGguY29zKGRlZ3JlZSAqIE1hdGguUEkgLyAxODApO1xyXG4gIHJldHVybiB7XHJcbiAgICB4OiBhX2xlbixcclxuICAgIHk6IGJfbGVuXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0SWQoYTogQXJyYXk8b2JqPHVua25vd24+PiwgaWQ6IHN0cmluZyk6IG9iajx1bmtub3duPiB7XHJcbiAgZm9yIChsZXQgYiA9IDA7IGIgPCBhLmxlbmd0aDsgYisrKSB7XHJcbiAgICBpZiAoYVtiXS5pZCA9PSBpZCkge1xyXG4gICAgICByZXR1cm4gYVtiXTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHVuZGVmaW5lZDtcclxufVxyXG5cclxubGV0IGNvdW50ZXIgPSAwO1xyXG5cclxuaW50ZXJmYWNlIGFuaW1fc3RvcmFnZSB7XHJcbiAgW2luZGV4OiBzdHJpbmddOiBbQXJyYXk8W251bWJlciwgc3ByaXRlXT4sIG51bWJlcl1cclxufVxyXG5cclxuaW50ZXJmYWNlIHZvaWRfZnVuYyB7XHJcbiAgKCk6IHZvaWRcclxufVxyXG5cclxuY2xhc3MgYW5pbWF0aW9ucyB7XHJcbiAgYW5pbWF0aW9uczogYW5pbV9zdG9yYWdlID0ge307XHJcbiAgYW5pbWF0aW9uX3RyYWNrZXIgPSAwO1xyXG4gIGN1cnJlbnQ6IHN0cmluZztcclxuICBjYWxsYmFjazogdm9pZF9mdW5jO1xyXG4gIGFkZChuYW1lOiBzdHJpbmcsIHM6IEFycmF5PFtudW1iZXIsIHNwcml0ZV0+LCBsZW5ndGg6IG51bWJlcikge1xyXG4gICAgdGhpcy5hbmltYXRpb25zW25hbWVdID0gW3MsIGxlbmd0aF07XHJcbiAgfVxyXG4gIHBsYXkobmFtZTogc3RyaW5nLCBjYWxsYmFjaz86IHZvaWRfZnVuYykge1xyXG4gICAgdGhpcy5jdXJyZW50ID0gbmFtZTtcclxuICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgIHRoaXMuYW5pbWF0aW9uX3RyYWNrZXIgPSAwO1xyXG4gIH1cclxuICByZW5kZXJmKHQ6IG51bWJlcik6IHNwcml0ZSB7XHJcbiAgICBsZXQgY3Vycl9hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnNbdGhpcy5jdXJyZW50XVswXTtcclxuICAgIGxldCBsZW5ndGg6IG51bWJlciA9IHRoaXMuYW5pbWF0aW9uc1t0aGlzLmN1cnJlbnRdWzFdO1xyXG4gICAgbGV0IGluZGV4O1xyXG4gICAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgY3Vycl9hbmltYXRpb24ubGVuZ3RoIC0gMTsgaW5kZXgrKykge1xyXG4gICAgICBpZiAodGhpcy5hbmltYXRpb25fdHJhY2tlciA+PSBjdXJyX2FuaW1hdGlvbltpbmRleF1bMF0gJiYgdGhpcy5hbmltYXRpb25fdHJhY2tlciA8IGN1cnJfYW5pbWF0aW9uW2luZGV4ICsgMV1bMF0pIHtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbl90cmFja2VyID0gdGhpcy5hbmltYXRpb25fdHJhY2tlciArIHQ7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJfYW5pbWF0aW9uW2luZGV4XVsxXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuY2FsbGJhY2spIHtcclxuICAgICAgdGhpcy5jYWxsYmFjaygpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuYW5pbWF0aW9uX3RyYWNrZXIgPj0gbGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuYW5pbWF0aW9uX3RyYWNrZXIgPSAwO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHRoaXMuYW5pbWF0aW9uX3RyYWNrZXIgKz0gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBjdXJyX2FuaW1hdGlvbltpbmRleF1bMV07XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3Mgb2JqPFQ+e1xyXG4gIHNwcml0ZV91cmwgPSBcIlwiO1xyXG4gIHNwcml0ZV9zaGVldDogSFRNTEltYWdlRWxlbWVudDtcclxuICBzdGF0ZTogVDtcclxuICBoZWlnaHQ6IG51bWJlcjtcclxuICB3aWR0aDogbnVtYmVyO1xyXG4gIGNvbGxpc2lvbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGNvbGxpc2lvbl9ib3g6IGNvbGxpc2lvbl9ib3hcclxuICBpZDogc3RyaW5nO1xyXG4gIGJpbmRzOiBBcnJheTxudW1iZXI+O1xyXG4gIHJvdGF0aW9uOiBudW1iZXIgPSAwO1xyXG4gIHJlbmRlciA9IHRydWU7XHJcbiAgYW5pbWF0aW9ucyA9IG5ldyBhbmltYXRpb25zKCk7XHJcbiAgYXVkaW8gPSBuZXcgYXVkaW8oKTtcclxuICBnZXRTdGF0ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlO1xyXG4gIH1cclxuICByZWdpc3Rlcl9hbmltYXRpb25zKCkge1xyXG5cclxuICB9XHJcbiAgcmVnaXN0ZXJfYXVkaW8oKSB7XHJcblxyXG4gIH1cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuaWQgPSBcIlwiICsgY291bnRlcjtcclxuICAgIHRoaXMuYmluZHMgPSBbXTtcclxuICAgIGNvdW50ZXIrKztcclxuICAgIHRoaXMucmVnaXN0ZXJfY29udHJvbHMoKTtcclxuICAgIHRoaXMucmVnaXN0ZXJfYXVkaW8oKTtcclxuICB9XHJcbiAgbG9hZCgpIHtcclxuICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBsZXQgYSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICBhLnNyYyA9IHRoaXMuc3ByaXRlX3VybDtcclxuICAgICAgYS5vbmxvYWQgPSAoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIF90aGlzLnNwcml0ZV9zaGVldCA9IGE7XHJcbiAgICAgICAgX3RoaXMucmVnaXN0ZXJfYW5pbWF0aW9ucygpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuYXVkaW8ubG9hZCgpO1xyXG4gICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KVxyXG4gIH1cclxuICBhbmdsZVRvd2FyZHMoYTogb2JqPHVua25vd24+KTogbnVtYmVyIHtcclxuICAgIGxldCBiID0gYSBhcyBvYmo8b2JqX3N0YXRlPjtcclxuICAgIGxldCBzdGF0ZSA9IHRoaXMuc3RhdGUgYXMgdW5rbm93biBhcyBvYmpfc3RhdGU7XHJcbiAgICBpZiAoc3RhdGUucG9zaXRpb24ueCA8IGIuc3RhdGUucG9zaXRpb24ueCAmJiBzdGF0ZS5wb3NpdGlvbi55ID4gYi5zdGF0ZS5wb3NpdGlvbi55XHJcbiAgICAgIHx8IChzdGF0ZS5wb3NpdGlvbi54IDwgYi5zdGF0ZS5wb3NpdGlvbi54ICYmIHN0YXRlLnBvc2l0aW9uLnkgPCBiLnN0YXRlLnBvc2l0aW9uLnkpKSB7XHJcbiAgICAgIHJldHVybiA5MCAtIE1hdGguYXRhbigoYi5zdGF0ZS5wb3NpdGlvbi55IC0gc3RhdGUucG9zaXRpb24ueSkgLyAoYi5zdGF0ZS5wb3NpdGlvbi54IC0gc3RhdGUucG9zaXRpb24ueCkpICogMTgwIC8gTWF0aC5QSVxyXG4gICAgfVxyXG4gICAgaWYgKHN0YXRlLnBvc2l0aW9uLnggPiBiLnN0YXRlLnBvc2l0aW9uLnggJiYgc3RhdGUucG9zaXRpb24ueSA8IGIuc3RhdGUucG9zaXRpb24ueVxyXG4gICAgICB8fCBzdGF0ZS5wb3NpdGlvbi54ID4gYi5zdGF0ZS5wb3NpdGlvbi54ICYmIHN0YXRlLnBvc2l0aW9uLnkgPiBiLnN0YXRlLnBvc2l0aW9uLnkpIHtcclxuICAgICAgcmV0dXJuIDI3MCAtIE1hdGguYXRhbigoYi5zdGF0ZS5wb3NpdGlvbi55IC0gc3RhdGUucG9zaXRpb24ueSkgLyAoYi5zdGF0ZS5wb3NpdGlvbi54IC0gc3RhdGUucG9zaXRpb24ueCkpICogMTgwIC8gTWF0aC5QSVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIDA7XHJcbiAgfVxyXG4gIGJpbmRDb250cm9sKGtleTogc3RyaW5nLCB4OiBleGVjX3R5cGUsIGZ1bmM6IGNvbnRyb2xfZnVuYywgaW50ZXJ2YWwgPSAxKSB7XHJcbiAgICBpZiAoa2V5ID09IFwibW91c2UxXCIpIHtcclxuICAgICAgbGV0IGIgPSBCaW5kKGtleSwgZnVuYywgeCwgaW50ZXJ2YWwsIHRoaXMpO1xyXG4gICAgICB0aGlzLmJpbmRzLnB1c2goYik7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5iaW5kcy5wdXNoKEJpbmQoa2V5LCBmdW5jLCB4LCBpbnRlcnZhbCkpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZWdpc3Rlcl9jb250cm9scygpIHtcclxuXHJcbiAgfVxyXG4gIGRlbGV0ZSgpIHtcclxuICAgIGZvciAobGV0IGEgb2YgdGhpcy5iaW5kcykge1xyXG4gICAgICBVbmJpbmQoYSk7XHJcbiAgICB9XHJcbiAgICBnZXRHYW1lKCkuZ2V0Um9vbSgpLmRlbGV0ZUl0ZW0odGhpcy5pZCk7XHJcbiAgfVxyXG4gIGNvbGxpc2lvbl9jaGVjayhhOiBjb2xsaXNpb25fYm94KTogQXJyYXk8b2JqPHVua25vd24+PiB7XHJcbiAgICBpZiAodGhpcy5jb2xsaXNpb24pIHtcclxuICAgICAgbGV0IHJvb20gPSBnZXRHYW1lKCkuZ2V0Um9vbSgpO1xyXG4gICAgICByZXR1cm4gcm9vbS5jaGVja19jb2xsaXNpb25zKGEsIFt0aGlzLmlkXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW107XHJcbiAgfVxyXG4gIHN0YXRlZih0aW1lOiBudW1iZXIpIHtcclxuICB9XHJcbiAgY29sbGlkZXNfd2l0aF9ib3goYTogY29sbGlzaW9uX2JveCk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IHN0ID0gdGhpcy5zdGF0ZSBhcyB1bmtub3duIGFzIG9ial9zdGF0ZTtcclxuICAgIGxldCBoY29sbGlkZXMgPSBmYWxzZSwgdmNvbGxpZGVzID0gZmFsc2U7XHJcbiAgICBsZXQgb2IgPSB7XHJcbiAgICAgIGxlZnQ6IChzdC5wb3NpdGlvbi54IC0gdGhpcy53aWR0aCAvIDIpLFxyXG4gICAgICByaWdodDogKHN0LnBvc2l0aW9uLnggKyB0aGlzLndpZHRoIC8gMiksXHJcbiAgICAgIHRvcDogKHN0LnBvc2l0aW9uLnkgKyB0aGlzLmhlaWdodCAvIDIpLFxyXG4gICAgICBib3R0b206IChzdC5wb3NpdGlvbi55IC0gdGhpcy5oZWlnaHQgLyAyKVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBib3ggPSB7XHJcbiAgICAgIGxlZnQ6IChhLnggLSBhLndpZHRoIC8gMiksXHJcbiAgICAgIHJpZ2h0OiAoYS54ICsgYS53aWR0aCAvIDIpLFxyXG4gICAgICB0b3A6IChhLnkgKyBhLmhlaWdodCAvIDIpLFxyXG4gICAgICBib3R0b206IChhLnkgLSBhLmhlaWdodCAvIDIpXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9iLmxlZnQgPj0gYm94LmxlZnQgJiYgb2IubGVmdCA8IGJveC5yaWdodCkge1xyXG4gICAgICBoY29sbGlkZXMgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKGJveC5sZWZ0ID4gb2IubGVmdCAmJiBib3gubGVmdCA8IG9iLnJpZ2h0KSB7XHJcbiAgICAgIGhjb2xsaWRlcyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAob2IuYm90dG9tID49IGJveC5ib3R0b20gJiYgb2IuYm90dG9tIDwgYm94LnRvcCkge1xyXG4gICAgICB2Y29sbGlkZXMgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKGJveC5ib3R0b20gPiBvYi5ib3R0b20gJiYgYm94LmJvdHRvbSA8IG9iLnRvcCkge1xyXG4gICAgICB2Y29sbGlkZXMgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGhjb2xsaWRlcyAmJiB2Y29sbGlkZXM7XHJcbiAgfVxyXG4gIHJlbmRlcmYodGltZTogbnVtYmVyKTogc3ByaXRlIHtcclxuICAgIGlmICghdGhpcy5hbmltYXRpb25zLmN1cnJlbnQpIHtcclxuICAgICAgbGV0IHN0ID0gdGhpcy5zdGF0ZSBhcyB1bmtub3duIGFzIG9ial9zdGF0ZTtcclxuICAgICAgbGV0IHNwcml0ZV9oZWlnaHQgPSB0aGlzLmhlaWdodDtcclxuICAgICAgbGV0IHNwcml0ZV93aWR0aCA9IHRoaXMud2lkdGg7XHJcbiAgICAgIGlmICh0aGlzLmhlaWdodCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBzcHJpdGVfaGVpZ2h0ID0gdGhpcy5zcHJpdGVfc2hlZXQuaGVpZ2h0O1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLndpZHRoID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHNwcml0ZV93aWR0aCA9IHRoaXMuc3ByaXRlX3NoZWV0LndpZHRoO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgc3ByaXRlX3NoZWV0OiB0aGlzLnNwcml0ZV9zaGVldCxcclxuICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgIHRvcDogMCxcclxuICAgICAgICBzcHJpdGVfd2lkdGgsXHJcbiAgICAgICAgc3ByaXRlX2hlaWdodFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuYW5pbWF0aW9ucy5yZW5kZXJmKHRpbWUpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIHN0YXRpY19vYmoge1xyXG4gIHNwcml0ZV91cmwgPSBcIlwiO1xyXG4gIHNwcml0ZTogSFRNTEltYWdlRWxlbWVudDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIGdyYXZpdHlfb2JqPFQ+IGV4dGVuZHMgb2JqPFQ+e1xyXG4gIGdyYXZpdHkgPSB0cnVlXHJcbn0iLCJpbXBvcnQge3Nwcml0ZX0gZnJvbSBcIi4vc3ByaXRlXCI7XHJcbmltcG9ydCB7R2V0Vmlld3BvcnREaW1lbnNpb25zfSBmcm9tIFwiLi4vdmFuXCI7XHJcbmltcG9ydCB7b2JqfSBmcm9tIFwiLi9vYmplY3RcIjtcclxuaW1wb3J0IHtvYmpfc3RhdGV9IGZyb20gXCIuL3N0YXRlXCI7XHJcbmltcG9ydCB7SHVkVGV4dCxUZXh0U2V0dGluZ30gZnJvbSBcIi4vaHVkXCI7XHJcblxyXG5pbnRlcmZhY2UgY2FtZXJhX3N0YXRle1xyXG4gIHNjYWxpbmc6bnVtYmVyLFxyXG4gIHN0cmV0Y2g6Ym9vbGVhbixcclxuICBwb3NpdGlvbjp7XHJcbiAgICB4Om51bWJlcixcclxuICAgIHk6bnVtYmVyXHJcbiAgfVxyXG4gIGRpbWVuc2lvbnM6e1xyXG4gICAgd2lkdGg6bnVtYmVyLFxyXG4gICAgaGVpZ2h0Om51bWJlclxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENhbWVyYXtcclxuICBzdGF0ZTpjYW1lcmFfc3RhdGVcclxuICBjb25zdHJ1Y3Rvcih4Om51bWJlcix5Om51bWJlcix3aWR0aDpudW1iZXIsaGVpZ2h0Om51bWJlcixzY2FsaW5nOm51bWJlcixzdHJldGNoOmJvb2xlYW4pe1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgc2NhbGluZyxcclxuICAgICAgc3RyZXRjaCxcclxuICAgICAgcG9zaXRpb246e1xyXG4gICAgICAgIHg6eC9zY2FsaW5nLFxyXG4gICAgICAgIHk6eS9zY2FsaW5nXHJcbiAgICAgIH0sXHJcbiAgICAgIGRpbWVuc2lvbnM6e1xyXG4gICAgICAgIHdpZHRoOndpZHRoIC8gc2NhbGluZyxcclxuICAgICAgICBoZWlnaHQ6aGVpZ2h0IC8gc2NhbGluZ1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHNldCB4KHg6bnVtYmVyKXtcclxuICAgIHRoaXMuc3RhdGUucG9zaXRpb24ueCA9IHg7XHJcbiAgfVxyXG4gIHNldCB5KHk6bnVtYmVyKXtcclxuICAgIHRoaXMuc3RhdGUucG9zaXRpb24ueSA9IHkgXHJcbiAgfVxyXG4gIGdldCB4KCl7XHJcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5wb3NpdGlvbi54O1xyXG4gIH1cclxuICBnZXQgeSgpe1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhdGUucG9zaXRpb24ueTtcclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIHJlbmRlcl9mdW5je1xyXG4gICh4Om51bWJlcix5Om51bWJlcixzY2FsaW5nOm51bWJlcik6dm9pZFxyXG59XHJcblxyXG5pbnRlcmZhY2UgcmVjdGFuZ2xle1xyXG4gIHdpZHRoOm51bWJlcixcclxuICBoZWlnaHQ6bnVtYmVyXHJcbn1cclxuXHJcbmludGVyZmFjZSBzcHJpdGVfYXJnc3tcclxuICBzcHJpdGU6c3ByaXRlLFxyXG4gIHg6bnVtYmVyLFxyXG4gIHk6bnVtYmVyLFxyXG4gIHJvdGF0aW9uOm51bWJlclxyXG59XHJcblxyXG5pbnRlcmZhY2UgcmVuZGVyZXJfYXJnc3tcclxuICBjb250ZXh0OkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxcclxuICBjYW1lcmE6Q2FtZXJhXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIHJlbmRlcmVye1xyXG4gIHRleHQsXHJcbiAgc3ByaXRlLFxyXG4gIHJlY3QsXHJcbiAgc3Ryb2tlX3JlY3RcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHRleHRfcmVuZGVyZXIgPSAocjpyZW5kZXJlcl9hcmdzLHM6VGV4dFNldHRpbmcpID0+IHtcclxuICBsZXQgdmhlaWdodCA9IEdldFZpZXdwb3J0RGltZW5zaW9ucygpLmhlaWdodDtcclxuICByLmNvbnRleHQuZm9udCA9IGAke3MuZm9udC5zaXplfXB4ICR7cy5mb250LmZvbnR9YDtcclxuICByLmNvbnRleHQuZmlsbFN0eWxlID0gcy5mb250LmNvbG9yO1xyXG4gIHIuY29udGV4dC50ZXh0QWxpZ24gPSBzLmZvbnQuYWxpZ247XHJcbiAgaWYocy5mb250Lm1heF93aWR0aCl7XHJcbiAgICByLmNvbnRleHQuZmlsbFRleHQocy5mb250LnRleHQscy54LHZoZWlnaHQgLSBzLnkscy5mb250Lm1heF93aWR0aCk7XHJcbiAgfVxyXG4gIGVsc2V7XHJcbiAgICByLmNvbnRleHQuZmlsbFRleHQocy5mb250LnRleHQscy54LHZoZWlnaHQgLSBzLnkpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNwcml0ZV9yZW5kZXJlciA9IChyOnJlbmRlcmVyX2FyZ3MsczpzcHJpdGVfYXJncykgPT4ge1xyXG4gIGxldCBjYW1lcmEgPSByLmNhbWVyYTtcclxuICBsZXQgdmhlaWdodCA9IEdldFZpZXdwb3J0RGltZW5zaW9ucygpLmhlaWdodDtcclxuICBsZXQgZmluYWxfeCA9ICgocy54IC0gY2FtZXJhLnN0YXRlLnBvc2l0aW9uLnggKyBjYW1lcmEuc3RhdGUuZGltZW5zaW9ucy53aWR0aC8yIC0gcy5zcHJpdGUuc3ByaXRlX3dpZHRoLzIpICogci5jYW1lcmEuc3RhdGUuc2NhbGluZyk7XHJcbiAgbGV0IGZpbmFsX3kgPSAoKHZoZWlnaHQgLSBzLnkgLSBjYW1lcmEuc3RhdGUuZGltZW5zaW9ucy5oZWlnaHQvMiAtIHMuc3ByaXRlLnNwcml0ZV9oZWlnaHQvMiArIGNhbWVyYS5zdGF0ZS5wb3NpdGlvbi55KSAqIHIuY2FtZXJhLnN0YXRlLnNjYWxpbmcpO1xyXG4gIGxldCBoZWlnaHQgPSBzLnNwcml0ZS5zcHJpdGVfaGVpZ2h0ICogci5jYW1lcmEuc3RhdGUuc2NhbGluZztcclxuICBsZXQgd2lkdGggPSBzLnNwcml0ZS5zcHJpdGVfd2lkdGggKiByLmNhbWVyYS5zdGF0ZS5zY2FsaW5nO1xyXG4gIGlmKHMucm90YXRpb24gPiAwKXtcclxuICAgIHIuY29udGV4dC5zYXZlKCk7XHJcbiAgICByLmNvbnRleHQudHJhbnNsYXRlKGZpbmFsX3ggKyBzLnNwcml0ZS5zcHJpdGVfd2lkdGgvMixmaW5hbF95ICsgcy5zcHJpdGUuc3ByaXRlX2hlaWdodC8yKVxyXG4gICAgbGV0IHJhZGlhbnMgPSBzLnJvdGF0aW9uICogKE1hdGguUEkvMTgwKTtcclxuICAgIHIuY29udGV4dC5yb3RhdGUocmFkaWFucyk7XHJcbiAgICByLmNvbnRleHQuZHJhd0ltYWdlKFxyXG4gICAgICBzLnNwcml0ZS5zcHJpdGVfc2hlZXQsXHJcbiAgICAgIHMuc3ByaXRlLmxlZnQsXHJcbiAgICAgIHMuc3ByaXRlLnRvcCxcclxuICAgICAgcy5zcHJpdGUuc3ByaXRlX3dpZHRoLFxyXG4gICAgICBzLnNwcml0ZS5zcHJpdGVfaGVpZ2h0LFxyXG4gICAgICAtcy5zcHJpdGUuc3ByaXRlX3dpZHRoLzIsXHJcbiAgICAgIC1zLnNwcml0ZS5zcHJpdGVfaGVpZ2h0LzIsXHJcbiAgICAgIHdpZHRoLFxyXG4gICAgICBoZWlnaHRcclxuICAgIClcclxuICAgIHIuY29udGV4dC5yZXN0b3JlKCk7XHJcbiAgfVxyXG4gIGVsc2V7XHJcbiAgICByLmNvbnRleHQuZHJhd0ltYWdlKFxyXG4gICAgICBzLnNwcml0ZS5zcHJpdGVfc2hlZXQsXHJcbiAgICAgIHMuc3ByaXRlLmxlZnQsXHJcbiAgICAgIHMuc3ByaXRlLnRvcCxcclxuICAgICAgcy5zcHJpdGUuc3ByaXRlX3dpZHRoLFxyXG4gICAgICBzLnNwcml0ZS5zcHJpdGVfaGVpZ2h0LFxyXG4gICAgICBmaW5hbF94LFxyXG4gICAgICBmaW5hbF95LFxyXG4gICAgICB3aWR0aCxcclxuICAgICAgaGVpZ2h0XHJcbiAgICApXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc3Ryb2tlZF9yZWN0X3JlbmRlcmVyID0gKGNvbnRleHQ6Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJELHJlY3Q6cmVjdGFuZ2xlLHg6bnVtYmVyLHk6bnVtYmVyLGNvbG9yOnN0cmluZyxjYW1lcmE6Q2FtZXJhKSA9PiB7XHJcbiAgbGV0IHZoZWlnaHQgPSBHZXRWaWV3cG9ydERpbWVuc2lvbnMoKS5oZWlnaHQ7XHJcbiAgbGV0IGZpbmFsX3ggPSAoKHggLSBjYW1lcmEuc3RhdGUucG9zaXRpb24ueCArIGNhbWVyYS5zdGF0ZS5kaW1lbnNpb25zLndpZHRoLzIgLSByZWN0LndpZHRoLzIpICogY2FtZXJhLnN0YXRlLnNjYWxpbmcpO1xyXG4gIGxldCBmaW5hbF95ID0gKCh2aGVpZ2h0IC0geSAtIHJlY3QuaGVpZ2h0LzIgLSBjYW1lcmEuc3RhdGUuZGltZW5zaW9ucy5oZWlnaHQvMiArIGNhbWVyYS5zdGF0ZS5wb3NpdGlvbi55KSAqIGNhbWVyYS5zdGF0ZS5zY2FsaW5nKTtcclxuICBsZXQgaGVpZ2h0ID0gcmVjdC5oZWlnaHQgKiBjYW1lcmEuc3RhdGUuc2NhbGluZztcclxuICBsZXQgd2lkdGggPSByZWN0LndpZHRoICogY2FtZXJhLnN0YXRlLnNjYWxpbmc7XHJcbiAgY29udGV4dC5zdHJva2VTdHlsZSA9IGNvbG9yO1xyXG4gIGNvbnRleHQuc3Ryb2tlUmVjdChmaW5hbF94LGZpbmFsX3kscmVjdC53aWR0aCxoZWlnaHQpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVjdF9yZW5kZXJlciA9IChjb250ZXh0OkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxyZWN0OnJlY3RhbmdsZSx4Om51bWJlcix5Om51bWJlcixjb2xvcjpzdHJpbmcsY2FtZXJhOkNhbWVyYSkgPT4ge1xyXG4gIGxldCB2aGVpZ2h0ID0gR2V0Vmlld3BvcnREaW1lbnNpb25zKCkuaGVpZ2h0O1xyXG4gIGxldCBmaW5hbF94ID0gKCh4IC0gY2FtZXJhLnN0YXRlLnBvc2l0aW9uLnggKyBjYW1lcmEuc3RhdGUuZGltZW5zaW9ucy53aWR0aC8yIC0gcmVjdC53aWR0aC8yKSAqIGNhbWVyYS5zdGF0ZS5zY2FsaW5nKTtcclxuICBsZXQgZmluYWxfeSA9ICgodmhlaWdodCAtIHkgLSByZWN0LmhlaWdodC8yIC0gY2FtZXJhLnN0YXRlLmRpbWVuc2lvbnMuaGVpZ2h0LzIgKyBjYW1lcmEuc3RhdGUucG9zaXRpb24ueSkgKiBjYW1lcmEuc3RhdGUuc2NhbGluZyk7XHJcbiAgbGV0IGhlaWdodCA9IHJlY3QuaGVpZ2h0ICogY2FtZXJhLnN0YXRlLnNjYWxpbmc7XHJcbiAgbGV0IHdpZHRoID0gcmVjdC53aWR0aCAqIGNhbWVyYS5zdGF0ZS5zY2FsaW5nO1xyXG4gIGNvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgY29udGV4dC5maWxsUmVjdChmaW5hbF94LGZpbmFsX3kscmVjdC53aWR0aCxoZWlnaHQpO1xyXG59IiwiaW1wb3J0IHsgZ3Jhdml0eV9vYmosb2JqIH0gZnJvbSBcIi4vb2JqZWN0XCI7XHJcbmltcG9ydCB7IHNwcml0ZSB9IGZyb20gXCIuL3Nwcml0ZVwiO1xyXG5pbXBvcnQgeyBvYmpfc3RhdGUgfSBmcm9tIFwiLi9zdGF0ZVwiO1xyXG5pbXBvcnQgeyB2ZWxvY2l0eV9jb2xsaXNpb25fY2hlY2ssY2hlY2tfY29sbGlzaW9ucyxjb2xsaXNpb25fYm94LGNoZWNrX2FsbF9jb2xsaXNpb25zLGNoZWNrX2FsbF9vYmplY3RzfSBmcm9tIFwiLi9jb2xsaXNpb25cIjtcclxuaW1wb3J0IHtyZW5kZXJfY29sbGlzaW9uX2JveCxERUJVR30gZnJvbSBcIi4uL3ZhblwiO1xyXG5pbXBvcnQge0JpbmQsY29udHJvbF9mdW5jLCBleGVjX3R5cGV9IGZyb20gXCIuL2NvbnRyb2xzXCI7XHJcbmltcG9ydCB7IE92ZXJ3b3JsZCB9IGZyb20gXCIuLi9nYW1lL3Jvb21zL292ZXJ3b3JsZFwiO1xyXG5pbXBvcnQge0hVRH0gZnJvbSBcIi4vaHVkXCI7XHJcbmltcG9ydCB7YXVkaW99IGZyb20gXCIuL2F1ZGlvXCJcclxuXHJcbmludGVyZmFjZSBwb3NpdGlvbntcclxuICB4Om51bWJlcixcclxuICB5Om51bWJlclxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlfZ3Jhdml0eShvYjpncmF2aXR5X29iajx1bmtub3duPixncmF2X2NvbnN0Om51bWJlciwgZ3Jhdl9tYXg6bnVtYmVyKXtcclxuICBsZXQgc3QgPSBvYi5zdGF0ZSBhcyBvYmpfc3RhdGU7XHJcbiAgaWYob2IuZ3Jhdml0eSAmJiBzdC52ZWxvY2l0eS55ID4gZ3Jhdl9tYXgpe1xyXG4gICAgc3QudmVsb2NpdHkueSArPSBncmF2X2NvbnN0O1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSByb29tX2k8VD57XHJcbiAgYmFja2dyb3VuZF91cmw6c3RyaW5nLFxyXG4gIG9iamVjdHM6QXJyYXk8b2JqPHVua25vd24+PlxyXG4gIHN0YXRlOlRcclxufVxyXG5leHBvcnQgY2xhc3Mgcm9vbTxUPntcclxuICBiYWNrZ3JvdW5kX3VybDogc3RyaW5nO1xyXG4gIGJhY2tncm91bmQ6IEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgb2JqZWN0czogQXJyYXk8b2JqPHVua25vd24+PlxyXG4gIHN0YXRlOiBUO1xyXG4gIGh1ZDpIVUQ7XHJcbiAgYXVkaW8gPSBuZXcgYXVkaW8oKTtcclxuICBsb2FkKCkge1xyXG4gICAgbGV0IF90aGlzID0gdGhpcztcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGxldCBhID0gbmV3IEltYWdlKCk7XHJcbiAgICAgIGxldCB0b19hd2FpdCA9IHRoaXMub2JqZWN0cy5tYXAoKGEpID0+IGEubG9hZCgpKTtcclxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwodG9fYXdhaXQpO1xyXG4gICAgICBhLnNyYyA9IHRoaXMuYmFja2dyb3VuZF91cmw7XHJcbiAgICAgIGEub25lcnJvciA9ICgoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciBsb2FkaW5nIHVybDpcIiArIHRoaXMuYmFja2dyb3VuZF91cmwpO1xyXG4gICAgICB9KVxyXG4gICAgICBhLm9ubG9hZCA9IChhc3luYygpID0+IHtcclxuICAgICAgICBfdGhpcy5iYWNrZ3JvdW5kID0gYTtcclxuICAgICAgICBhd2FpdCB0aGlzLmF1ZGlvLmxvYWQoKTtcclxuICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSlcclxuICB9XHJcbiAgYXN5bmMgYWRkSXRlbShvOm9iajxvYmpfc3RhdGU+KXtcclxuICAgIGF3YWl0IG8ubG9hZCgpO1xyXG4gICAgdGhpcy5vYmplY3RzLnB1c2gobyk7XHJcbiAgfVxyXG4gIGRlbGV0ZUl0ZW0oaWQ6c3RyaW5nKXtcclxuICAgIGZvcihsZXQgYSA9IDA7YSA8IHRoaXMub2JqZWN0cy5sZW5ndGg7YSsrKXtcclxuICAgICAgaWYodGhpcy5vYmplY3RzW2FdLmlkID09PSBpZCl7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzID0gdGhpcy5vYmplY3RzLnNsaWNlKDAsYSkuY29uY2F0KHRoaXMub2JqZWN0cy5zbGljZShhKzEpKTtcclxuICAgICAgICBhLS07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmVnaXN0ZXJIVUQoKTpIVUR7XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxuICBiaW5kQ29udHJvbChrZXk6c3RyaW5nLHg6ZXhlY190eXBlLGZ1bmM6Y29udHJvbF9mdW5jLGludGVydmFsOm51bWJlciA9IDEpe1xyXG4gICAgQmluZChrZXksZnVuYyx4LGludGVydmFsKTsgXHJcbiAgfVxyXG4gIGNoZWNrX2NvbGxpc2lvbnMoYm94OmNvbGxpc2lvbl9ib3gsZXhlbXB0PzpBcnJheTxzdHJpbmc+KTpBcnJheTxvYmo8dW5rbm93bj4+e1xyXG4gICAgaWYoREVCVUcpe1xyXG4gICAgICByZW5kZXJfY29sbGlzaW9uX2JveChib3gpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNoZWNrX2FsbF9jb2xsaXNpb25zKGJveCx0aGlzLm9iamVjdHMsZXhlbXB0KTtcclxuICB9XHJcbiAgY2hlY2tfb2JqZWN0cyhib3g6Y29sbGlzaW9uX2JveCxleGVtcHQ/OnN0cmluZyl7XHJcbiAgICBpZihERUJVRyl7XHJcbiAgICAgIHJlbmRlcl9jb2xsaXNpb25fYm94KGJveCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2hlY2tfYWxsX29iamVjdHMoYm94LHRoaXMub2JqZWN0cyxleGVtcHQpO1xyXG4gIH1cclxuICByZWdpc3Rlcl9jb250cm9scygpe1xyXG5cclxuICB9XHJcbiAgY2xlYW51cCgpe1xyXG5cclxuICB9XHJcbiAgc3RhdGVmKHRpbWU6IG51bWJlcikge1xyXG4gICAgZm9yIChsZXQgYSA9IDA7IGEgPCB0aGlzLm9iamVjdHMubGVuZ3RoOyBhKyspIHtcclxuICAgICAgdGhpcy5vYmplY3RzW2FdLnN0YXRlZih0aW1lKTtcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0T2JqKGlkOnN0cmluZyl7XHJcbiAgICBmb3IobGV0IGEgPSAwOyBhIDwgdGhpcy5vYmplY3RzLmxlbmd0aDsgYSsrKXtcclxuICAgICAgaWYodGhpcy5vYmplY3RzW2FdLmlkID09IGlkKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5vYmplY3RzW2FdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbiAgcmVuZGVyZih0aW1lOiBudW1iZXIpOiBzcHJpdGUge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3ByaXRlX3NoZWV0OiB0aGlzLmJhY2tncm91bmQsXHJcbiAgICAgIGxlZnQ6IDAsXHJcbiAgICAgIHRvcDogMCxcclxuICAgICAgc3ByaXRlX2hlaWdodDogdGhpcy5iYWNrZ3JvdW5kLmhlaWdodCxcclxuICAgICAgc3ByaXRlX3dpZHRoOiB0aGlzLmJhY2tncm91bmQud2lkdGhcclxuICAgIH1cclxuICB9XHJcbn0iLCJleHBvcnQgaW50ZXJmYWNlIHNwcml0ZXtcclxuICBzcHJpdGVfc2hlZXQ6SFRNTEltYWdlRWxlbWVudCxcclxuICBsZWZ0Om51bWJlcixcclxuICB0b3A6bnVtYmVyLFxyXG4gIHNwcml0ZV93aWR0aDpudW1iZXIsXHJcbiAgc3ByaXRlX2hlaWdodDpudW1iZXJcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNwcml0ZV9nZW4oc3ByaXRlX3NoZWV0OkhUTUxJbWFnZUVsZW1lbnQsc3ByaXRlX3dpZHRoOm51bWJlcixzcHJpdGVfaGVpZ2h0Om51bWJlcik6QXJyYXk8QXJyYXk8c3ByaXRlPj57XHJcbiAgbGV0IHdpZHRoID0gc3ByaXRlX3NoZWV0LndpZHRoO1xyXG4gIGxldCBoZWlnaHQgPSBzcHJpdGVfc2hlZXQuaGVpZ2h0O1xyXG4gIGxldCBzcHJpdGVzOkFycmF5PEFycmF5PHNwcml0ZT4+ID0gW107XHJcbiAgZm9yKGxldCBiID0gMDsgYiA8IGhlaWdodDtiICs9IHNwcml0ZV9oZWlnaHQpe1xyXG4gICAgc3ByaXRlcy5wdXNoKFtdKTtcclxuICAgIGZvcihsZXQgYSA9IDA7IGEgPCB3aWR0aDthICs9IHNwcml0ZV93aWR0aCl7XHJcbiAgICAgIHNwcml0ZXNbYl0ucHVzaCh7XHJcbiAgICAgICAgc3ByaXRlX3NoZWV0LFxyXG4gICAgICAgIGxlZnQ6YSxcclxuICAgICAgICB0b3A6YiAqIHNwcml0ZV9oZWlnaHQsXHJcbiAgICAgICAgc3ByaXRlX2hlaWdodCxcclxuICAgICAgICBzcHJpdGVfd2lkdGhcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHNwcml0ZXM7XHJcbn1cclxuXHJcbiIsImV4cG9ydCBjb25zdCBERUJVRyA9IGZhbHNlO1xyXG5cclxuaW1wb3J0IHtvYmp9IGZyb20gXCIuL2xpYi9vYmplY3RcIjtcclxuaW1wb3J0IHtvYmpfc3RhdGV9IGZyb20gXCIuL2xpYi9zdGF0ZVwiO1xyXG5pbXBvcnQge3Jvb219IGZyb20gXCIuL2xpYi9yb29tXCI7XHJcbmltcG9ydCB7c3ByaXRlfSBmcm9tIFwiLi9saWIvc3ByaXRlXCI7XHJcbmltcG9ydCB7IGNvbGxpc2lvbl9ib3ggfSBmcm9tIFwiLi9saWIvY29sbGlzaW9uXCI7XHJcbmltcG9ydCB7c3ByaXRlX3JlbmRlcmVyLHJlY3RfcmVuZGVyZXIsIHN0cm9rZWRfcmVjdF9yZW5kZXJlciwgdGV4dF9yZW5kZXJlciwgQ2FtZXJhfSBmcm9tIFwiLi9saWIvcmVuZGVyXCI7XHJcbmltcG9ydCB7SFVEfSBmcm9tIFwiLi9saWIvaHVkXCI7XHJcbmltcG9ydCB7RXhlY3V0ZVJlcGVhdEJpbmRzfSBmcm9tIFwiLi9saWIvY29udHJvbHNcIjtcclxuXHJcbmltcG9ydCB7T3ZlcndvcmxkfSBmcm9tIFwiLi9nYW1lL3Jvb21zL292ZXJ3b3JsZFwiO1xyXG5cclxubGV0IGNhbnZhc19lbGVtZW50OkhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXJnZXRcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XHJcbmxldCBjb250ZXh0OkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IGNhbnZhc19lbGVtZW50LmdldENvbnRleHQoXCIyZFwiKTtcclxuXHJcblxyXG5sZXQgc2NyZWVuX3dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbmxldCBzY3JlZW5faGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG5cclxubGV0IHZ3aWR0aCA9IGNhbnZhc19lbGVtZW50LndpZHRoO1xyXG5sZXQgdmhlaWdodCA9IGNhbnZhc19lbGVtZW50LmhlaWdodDtcclxuXHJcblxyXG4vL0hvdyBvZnRlbiB0aGUgZ2FtZSBsb2dpYyBsb29wIHNob3VsZCBydW4sIGluIG1pbGxpc2Vjb25kc1xyXG5sZXQgbG9naWNfbG9vcF9pbnRlcnZhbDpudW1iZXIgPSAxMDAwLzYwOyAgXHJcblxyXG5sZXQgbGFzdF90aW1lID0gbmV3IERhdGUoKTtcclxuXHJcbmxldCBsYXN0X3JlbmRlcl90aW1lID0gMDtcclxuXHJcbmludGVyZmFjZSBkaW1lbnNpb25ze1xyXG4gIGhlaWdodDpudW1iZXIsXHJcbiAgd2lkdGg6bnVtYmVyXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gR2V0U2NyZWVuRGltZW5zaW9ucyAoKTpkaW1lbnNpb25ze1xyXG4gIHJldHVybih7XHJcbiAgICB3aWR0aDpzY3JlZW5fd2lkdGgsXHJcbiAgICBoZWlnaHQ6c2NyZWVuX2hlaWdodFxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBHZXRWaWV3cG9ydERpbWVuc2lvbnMgKCk6ZGltZW5zaW9uc3tcclxuICByZXR1cm4oe1xyXG4gICAgaGVpZ2h0OnZoZWlnaHQsXHJcbiAgICB3aWR0aDp2d2lkdGhcclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVuZGVyX2NvbGxpc2lvbl9ib3ggPSAoYTpjb2xsaXNpb25fYm94KSA9PiB7XHJcbiAgYm94ZXMucHVzaChhKTtcclxufVxyXG5cclxubGV0IGJveGVzOkFycmF5PGNvbGxpc2lvbl9ib3g+ID0gW107XHJcblxyXG5leHBvcnQgbGV0IGRlZXAgPSAoYTphbnkpID0+e1xyXG4gIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGEpKTtcclxufVxyXG5cclxuaW50ZXJmYWNlIGdhbWVfc3RhdGV7XHJcbiAgbG9naWM6bnVtYmVyLFxyXG4gIGNvbnRleHQ6Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJELFxyXG4gIGN1cnJlbnRfcm9vbTpyb29tPHVua25vd24+LFxyXG4gIGNhbWVyYTpDYW1lcmEsXHJcbiAgY2FudmFzOkhUTUxDYW52YXNFbGVtZW50LFxyXG4gIHBsYXllcl9zdGF0ZTp7XHJcbiAgICBwb3dlcjpudW1iZXJcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBnYW1le1xyXG4gIHN0YXRlOmdhbWVfc3RhdGU7XHJcbiAgY29udGV4dDpDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgY29uc3RydWN0b3IoY3R4OkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxhOnJvb208dW5rbm93bj4pe1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgY2FudmFzOmNhbnZhc19lbGVtZW50LFxyXG4gICAgICBsb2dpYzp1bmRlZmluZWQsXHJcbiAgICAgIGNvbnRleHQ6Y3R4LFxyXG4gICAgICBjYW1lcmE6bmV3IENhbWVyYSgwLDAsdndpZHRoLHZoZWlnaHQsMSxmYWxzZSksXHJcbiAgICAgIGN1cnJlbnRfcm9vbTogdW5kZWZpbmVkLFxyXG4gICAgICBwbGF5ZXJfc3RhdGU6e1xyXG4gICAgICAgIHBvd2VyOjBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5sb2FkUm9vbShhKTtcclxuICB9XHJcbiAgcmVuZGVyKHQ6bnVtYmVyKXtcclxuICAgIGxldCB0aW1lID0gdCAtIGxhc3RfcmVuZGVyX3RpbWVcclxuICAgIGxhc3RfcmVuZGVyX3RpbWUgPSB0O1xyXG4gICAgdGhpcy5zdGF0ZS5jb250ZXh0LmNsZWFyUmVjdCgwLDAsdndpZHRoLHZoZWlnaHQpO1xyXG4gICAgdGhpcy5zdGF0ZS5jb250ZXh0LmZpbGxTdHlsZT1cImJsYWNrXCI7XHJcbiAgICB0aGlzLnN0YXRlLmNvbnRleHQuZmlsbFJlY3QoMCwwLHZ3aWR0aCx2aGVpZ2h0KTtcclxuICAgIGxldCBjYW1lcmFfY29sbGlkZXJzID0gdGhpcy5zdGF0ZS5jdXJyZW50X3Jvb20uY2hlY2tfb2JqZWN0cyh7XHJcbiAgICAgIHg6dGhpcy5zdGF0ZS5jYW1lcmEuc3RhdGUucG9zaXRpb24ueCxcclxuICAgICAgeTp0aGlzLnN0YXRlLmNhbWVyYS5zdGF0ZS5wb3NpdGlvbi55LFxyXG4gICAgICB3aWR0aDp0aGlzLnN0YXRlLmNhbWVyYS5zdGF0ZS5kaW1lbnNpb25zLndpZHRoLFxyXG4gICAgICBoZWlnaHQ6dGhpcy5zdGF0ZS5jYW1lcmEuc3RhdGUuZGltZW5zaW9ucy5oZWlnaHRcclxuICAgIH0pO1xyXG4gICAgbGV0IHJlbmRlcl9hcmdzID0ge1xyXG4gICAgICBjb250ZXh0OnRoaXMuc3RhdGUuY29udGV4dCxcclxuICAgICAgY2FtZXJhOnRoaXMuc3RhdGUuY2FtZXJhLFxyXG4gICAgfTtcclxuICAgIHNwcml0ZV9yZW5kZXJlcihyZW5kZXJfYXJncyx7XHJcbiAgICAgIHNwcml0ZTp0aGlzLnN0YXRlLmN1cnJlbnRfcm9vbS5yZW5kZXJmKHRpbWUpLFxyXG4gICAgICB4OjAsXHJcbiAgICAgIHk6MCxcclxuICAgICAgcm90YXRpb246MFxyXG4gICAgfSk7XHJcbiAgICBmb3IgKGxldCBhIG9mIGNhbWVyYV9jb2xsaWRlcnMpe1xyXG4gICAgICBsZXQgc3QgPSBhLnN0YXRlIGFzIG9ial9zdGF0ZTtcclxuICAgICAgaWYoYS5yZW5kZXIpe1xyXG4gICAgICAgIHNwcml0ZV9yZW5kZXJlcihyZW5kZXJfYXJncyx7XHJcbiAgICAgICAgICBzcHJpdGU6YS5yZW5kZXJmKHRpbWUpLFxyXG4gICAgICAgICAgeDpzdC5wb3NpdGlvbi54LFxyXG4gICAgICAgICAgeTpzdC5wb3NpdGlvbi55LFxyXG4gICAgICAgICAgcm90YXRpb246YS5yb3RhdGlvblxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgYm94OmNvbGxpc2lvbl9ib3g7XHJcbiAgICB3aGlsZShib3hlcy5sZW5ndGggPiAwKXtcclxuICAgICAgbGV0IGJveCA9IGJveGVzLnBvcCgpO1xyXG4gICAgICBsZXQgcmVjdCA9IHtcclxuICAgICAgICB3aWR0aDpib3gud2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0OmJveC5oZWlnaHRcclxuICAgICAgfVxyXG4gICAgICBzdHJva2VkX3JlY3RfcmVuZGVyZXIoY29udGV4dCxyZWN0LGJveC54LGJveC55LFwiI0ZGMDAwMFwiLHRoaXMuc3RhdGUuY2FtZXJhKTtcclxuICAgIH1cclxuICAgIGlmKHRoaXMuc3RhdGUuY3VycmVudF9yb29tLmh1ZCl7XHJcbiAgICAgIGxldCBncmFwaGljcyA9IHRoaXMuc3RhdGUuY3VycmVudF9yb29tLmh1ZC5ncmFwaGljX2VsZW1lbnRzO1xyXG4gICAgICBsZXQgdGV4dF9lbGVtZW50cyA9IHRoaXMuc3RhdGUuY3VycmVudF9yb29tLmh1ZC50ZXh0X2VsZW1lbnRzO1xyXG4gICAgICBmb3IobGV0IGEgb2YgZ3JhcGhpY3Mpe1xyXG4gICAgICAgIGxldCBzdCA9IGEuc3RhdGUgYXMgb2JqX3N0YXRlO1xyXG4gICAgICAgIGlmKGEucmVuZGVyKXtcclxuICAgICAgICAgIHNwcml0ZV9yZW5kZXJlcihyZW5kZXJfYXJncyx7XHJcbiAgICAgICAgICAgIHNwcml0ZTphLnJlbmRlcmYodCksXHJcbiAgICAgICAgICAgIHg6c3QucG9zaXRpb24ueCxcclxuICAgICAgICAgICAgeTpzdC5wb3NpdGlvbi55LFxyXG4gICAgICAgICAgICByb3RhdGlvbjphLnJvdGF0aW9uXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZm9yKGxldCBhIG9mIHRleHRfZWxlbWVudHMpe1xyXG4gICAgICAgIGxldCBzdCA9IGEuc3RhdGU7XHJcbiAgICAgICAgdGV4dF9yZW5kZXJlcihyZW5kZXJfYXJncyx7XHJcbiAgICAgICAgICB4OnN0LnBvc2l0aW9uLngsXHJcbiAgICAgICAgICB5OnN0LnBvc2l0aW9uLnksXHJcbiAgICAgICAgICBmb250OmEucmVuZGVyZih0KVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoYSk9Pnt0aGlzLnJlbmRlcihhKX0pOyBcclxuICB9XHJcbiAgc3RhcnRfbG9naWMoYTpudW1iZXIpe1xyXG4gICAgcmV0dXJuIHNldEludGVydmFsKCgpPT57XHJcbiAgICAgIGxldCBuZXdfdGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgIGxldCB0aW1lX3NpbmNlID0gbmV3X3RpbWUuZ2V0VGltZSgpIC0gbGFzdF90aW1lLmdldFRpbWUoKTtcclxuICAgICAgbGFzdF90aW1lID0gbmV3X3RpbWU7XHJcbiAgICAgIHRoaXMuc3RhdGUuY3VycmVudF9yb29tLnN0YXRlZih0aW1lX3NpbmNlKTtcclxuICAgICAgaWYodGhpcy5zdGF0ZS5jdXJyZW50X3Jvb20uaHVkKXtcclxuICAgICAgICB0aGlzLnN0YXRlLmN1cnJlbnRfcm9vbS5odWQuc3RhdGVmKHRpbWVfc2luY2UpO1xyXG4gICAgICB9XHJcbiAgICAgICAgRXhlY3V0ZVJlcGVhdEJpbmRzKGEpO1xyXG4gICAgfSxhKTtcclxuICB9XHJcbiAgZ2V0Um9vbSgpe1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuY3VycmVudF9yb29tO1xyXG4gIH1cclxuICBhc3luYyBsb2FkUm9vbSh4OnJvb208dW5rbm93bj4pe1xyXG4gICAgeC5odWQgPSB4LnJlZ2lzdGVySFVEKCk7XHJcbiAgICBpZih0aGlzLnN0YXRlLmN1cnJlbnRfcm9vbSAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgd2hpbGUodGhpcy5zdGF0ZS5jdXJyZW50X3Jvb20ub2JqZWN0cy5sZW5ndGggPiAwKXtcclxuICAgICAgICB0aGlzLnN0YXRlLmN1cnJlbnRfcm9vbS5vYmplY3RzWzBdLmRlbGV0ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgbmV3X3Jvb20gPSBhd2FpdCB4LmxvYWQoKTtcclxuICAgIHgucmVnaXN0ZXJfY29udHJvbHMoKTtcclxuICAgIHRoaXMuc3RhdGUuY3VycmVudF9yb29tID0geDtcclxuICAgIGlmKHRoaXMuc3RhdGUubG9naWMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnN0YXRlLmxvZ2ljKTtcclxuICAgIH1cclxuICAgIHRoaXMuc3RhdGUubG9naWMgPSB0aGlzLnN0YXJ0X2xvZ2ljKGxvZ2ljX2xvb3BfaW50ZXJ2YWwpXHJcbiAgICB0aGlzLnJlbmRlcigwKTtcclxuICB9XHJcbn1cclxuXHJcbmxldCBnYW1lX2luc3QgPSBuZXcgZ2FtZShjb250ZXh0LG5ldyBPdmVyd29ybGQoKSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0R2FtZSgpe1xyXG4gIHJldHVybiBnYW1lX2luc3Q7XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9