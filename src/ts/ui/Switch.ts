import { CENTER, Event } from "../";
import * as PIXI from "pixi.js";

export class Switch extends PIXI.Sprite {

    static readonly STEP_CHANGE = "stepChange";

    private _state = 0;
    private readonly maxState: number;
    private readonly rotationStep: number;

    constructor(stepsCount: number, texture: PIXI.Texture,
                private readonly minRotation: number = 0, maxRotation: number = Math.PI * 2) {
        super(texture);
        this.maxState = stepsCount - 1;
        this.rotationStep = (maxRotation - minRotation) / this.maxState;
        this.interactive = true;
        this.buttonMode = true;
        this.rotation = this.minRotation;
        this.anchor.set(CENTER, CENTER);
        this.on(Event.CLICK, () => this.state++);
    }

    get state(): number {
        return this._state;
    }

    set state(value: number) {
        let validValue: number = value;
        if (validValue < -1 || validValue > this.maxState) {
            validValue = 0;
        }
        if (this.state != validValue) {
            this._state = validValue;
            this.rotation = this.minRotation + this.rotationStep * validValue;
            this.emit(Switch.STEP_CHANGE);
        }
    }
}
