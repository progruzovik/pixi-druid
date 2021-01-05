import { Branch } from "./"
import * as PIXI from "pixi.js"
import "pixi-layers"

export class App extends PIXI.utils.EventEmitter {

    private readonly application: PIXI.Application
    private _root: Branch
    readonly lighting = new PIXI.display.Layer()
    readonly ui = new PIXI.display.Layer()

    constructor(
        resolution: number,
        private width: number,
        private height: number,
        backgroundColor: number = 0x000000,
        canvas?: HTMLCanvasElement
    ) {
        super()
        this.application = new PIXI.Application({
            autoDensity: true,
            backgroundColor: backgroundColor,
            view: canvas,
            resolution: resolution,
            sharedLoader: true,
            sharedTicker: true
        })
        this.application.stage = new PIXI.display.Stage()
        this.lighting.useRenderTexture = true
        this.application.stage.addChild(this.lighting)
        this.application.stage.addChild(this.createLightingSprite())
        this.application.stage.addChild(this.ui)
        this.resize(width, height)

        this.lighting.on("display", e => e.blendMode = PIXI.BLEND_MODES.ADD)
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

    private createLightingSprite(): PIXI.Sprite {
        const lightingSprite = new PIXI.Sprite(this.lighting.getRenderTexture())
        lightingSprite.blendMode = PIXI.BLEND_MODES.MULTIPLY
        return lightingSprite
    }
}
