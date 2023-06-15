import { App, Branch } from "./"
import * as PIXI from "pixi.js"
import "pixi-layers"

export class AppWithLighting extends App {

    readonly lighting = new PIXI.display.Layer()
    readonly ui = new PIXI.display.Layer()

    constructor(
        resolution: number,
        width: number,
        height: number,
        backgroundColor: number = 0x000000,
        canvas?: HTMLCanvasElement
    ) {
        super(resolution, width, height, backgroundColor, canvas)
        this.lighting.useRenderTexture = true
        this.application.stage.addChild(this.lighting)
        this.application.stage.addChild(this.createLightingSprite())
        this.application.stage.addChild(this.ui)
        this.resize(width, height)

        this.lighting.on("display", e => e.blendMode = PIXI.BLEND_MODES.ADD)
    }

    private createLightingSprite(): PIXI.Sprite {
        const lightingSprite = new PIXI.Sprite(this.lighting.getRenderTexture())
        lightingSprite.blendMode = PIXI.BLEND_MODES.MULTIPLY
        return lightingSprite
    }
}
