import { Event } from "./util";
import * as PIXI from "pixi.js";

export class KeyboardListener extends PIXI.utils.EventEmitter {

    constructor(window: Window) {
        super();
        window.addEventListener("keydown", (e: KeyboardEvent) => this.emit(Event.KEY_EVENT, true, e.code));
        window.addEventListener("keyup", (e: KeyboardEvent) => {
            this.emit(Event.KEY_EVENT, false, e.code);
            this.emit(Event.KEY_RELEASE, e.code);
        });
    }
}
