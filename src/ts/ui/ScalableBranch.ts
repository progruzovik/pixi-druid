import { Branch, Event } from "../";
import * as PIXI from "pixi.js";

export class ScalableBranch extends Branch {

    constructor() {
        super();
        this.on(Event.RESIZE, (width: number, height: number) => {
            const bounds: PIXI.Rectangle = this.getLocalBounds();
            const ratio: number = Math.min(width / bounds.width, height / bounds.height);
            this.scale.set(ratio, ratio);
        });
    }
}
