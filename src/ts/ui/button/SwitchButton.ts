import { Event } from "../../index";
import * as PIXI from "pixi.js";

export class SwitchButton extends PIXI.Sprite {

    static readonly TOGGLED = "toggled";

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
        this.anchor.set(0.5, 0.5);
        this.on(Event.CLICK, () => this.state++);
    }

    get state(): number {
        return this._state;
    }

    set state(value: number) {
        const validValue: number = value < 0 || value > this.maxState ? 0 : value;
        if (this.state != validValue) {
            this._state = validValue;
            this.rotation = this.minRotation + this.rotationStep * validValue;
            this.emit(SwitchButton.TOGGLED);
        }
    }
}
