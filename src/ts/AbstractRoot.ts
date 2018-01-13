import { SizeAware } from "./";
import * as PIXI from "pixi.js";

export abstract class AbstractRoot extends PIXI.Container implements SizeAware {

    private _width = 0;
    private _height = 0;

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    setUpChildren(width: number, height: number) {
        this._width = width;
        this._height = height;
        this.resize(width, height);
    }

    protected abstract resize(width: number, height: number);
}
