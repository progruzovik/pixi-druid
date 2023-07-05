import { Branch } from "./"
import * as PIXI from "pixi.js"
import "pixi-layers"

export class App extends PIXI.utils.EventEmitter {

    protected readonly application: PIXI.Application
    private _root: Branch

    constructor(
        resolution: number,
        private width: number,
        private height: number,
        autoDensity: boolean = true,
        backgroundColor: number = 0x000000,
        canvas?: HTMLCanvasElement
    ) {
        super()
        this.application = new PIXI.Application({
            autoDensity: autoDensity,
            backgroundColor: backgroundColor,
            view: canvas,
            resolution: resolution,
            sharedLoader: true,
            sharedTicker: true
        })
        this.application.stage = new PIXI.display.Stage()
        this.resize(width, height)
    }

    get root(): Branch {
        return this._root
    }

    set root(value: Branch) {
        if (this.root) {
            this.application.stage.removeChild(this.root)
        }
        this._root = value
        if (value) {
            value.resize(this.width, this.height)
            this.application.stage.addChildAt(value, 0)
        }
    }

    get view(): HTMLCanvasElement {
        return this.application.view
    }

    resize(width: number, height: number): void {
        if (width > 0 && height > 0) {
            this.width = width
            this.height = height
            this.application.renderer.resize(width, height)
            if (this.root) {
                this.root.resize(width, height)
            }
        }
    }

    destroy(): void {
        PIXI.Loader.shared.reset()
        if (this.root) {
            this.root.destroy({ children: true })
        }
        this.application.destroy()
    }
}
