import { Branch } from "../";
import * as PIXI from "pixi.js";

// noinspection JSUnusedGlobalSymbols
export class ScalableBranch extends Branch {

    resize(width: number, height: number) {
        const bounds: PIXI.Rectangle = this.getLocalBounds();
        const ratio: number = Math.min(width / bounds.width, height / bounds.height);
        this.scale.set(ratio, ratio);
        super.resize(width, height);
    }
}
