import { Event, SizeAware } from "../util";
import * as PIXI from "pixi.js";

export class Branch extends PIXI.Container implements SizeAware {

    private _width = 0;
    private _height = 0;

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    resize(width: number, height: number) {
        this._width = width;
        this._height = height;
        this.emit(Event.RESIZE, width, height);
    }
}
