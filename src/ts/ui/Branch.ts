import { Event, SizeAware } from "../util"
import { AbstractActor } from "../AbstractActor"

export class Branch extends AbstractActor implements SizeAware {

    private _width = 0
    private _height = 0

    constructor(isTickerEnabled: boolean = false) {
        super(isTickerEnabled)
    }

    get width(): number {
        return this._width
    }

    get height(): number {
        return this._height
    }

    resize(width: number, height: number) {
        this._width = width
        this._height = height
        this.emit(Event.RESIZE, width, height)
    }

    protected update(deltaTime: number): void {}
}
