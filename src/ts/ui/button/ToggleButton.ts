import { Button, Rectangle } from "../../";
import * as PIXI from "pixi.js";

export class ToggleButton extends Button {

    static readonly TOGGLE = "toggle";

    isToggled = false;

    constructor(text: string = "",
                bgDefault: PIXI.Container = new Rectangle(Button.WIDTH, Button.HEIGHT, 0x333333),
                bgMouseOver: PIXI.Container = new Rectangle(0, 0, 0x555555),
                bgMouseDown: PIXI.Container = new Rectangle(0, 0, 0x222222),
                bgDisabled: PIXI.Container = bgMouseOver) {
        super(text, bgDefault, bgMouseOver, bgMouseDown, bgDisabled);
        this.on(Button.TRIGGERED, () => {
            this.isToggled = !this.isToggled;
            this.emit(ToggleButton.TOGGLE, this.isToggled);
        });
    }
}
