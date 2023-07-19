import * as PIXI from "pixi.js"

export abstract class Shape extends PIXI.Container {

    protected readonly graphics = new PIXI.Graphics()

    constructor(private _width: number = 0, private _height: number = 0,
                private _color: number = 0x000000, private _thickness: number = 1) {
        super()
        this.addChild(this.graphics)
        this.draw()
    }

    get color(): number {
        return this._color
    }

    set color(value: number) {
        this._color = value
        this.redraw()
    }

    get width(): number {
        return this._width * this.scale.x
    }

    set width(value: number) {
        this._width = value
        this.redraw()
    }

    get height(): number {
        return this._height * this.scale.y
    }

    set height(value: number) {
        this._height = value
        this.redraw()
    }

    get thickness(): number {
        return this._thickness
    }

    set thickness(value: number) {
        this._thickness = value
        this.redraw()
    }

    protected abstract draw(): void

    /**
     * Удаляет нарисованную ранее фигуру и рисует ее заново
     */
    protected redraw(): void {
        this.graphics.clear()
        this.draw()
    }
}
