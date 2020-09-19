import { Button, Rectangle } from "../../";
import * as PIXI from "pixi.js";

export class ToggleButton extends Button {

    static readonly TOGGLE = "toggle";

    isToggled = false;

    constructor(text: string = "",
                bgDefault: PIXI.Container = new Rectangle(Button.WIDTH, Button.HEIGHT, 0x333333),
                bgMouseOver: PIXI.Container = new Rectangle(0, 0, 0x555555),
                bgMouseDown: PIXI.Container = new Rectangle(0, 0, 0x222222),
                protected readonly bgToggled: PIXI.Container = bgMouseOver,
                bgDisabled: PIXI.Container = bgMouseOver) {
        super(text, bgDefault, bgMouseOver, bgMouseDown, bgDisabled);
        this.on(Button.TRIGGERED, () => {
            this.isToggled = !this.isToggled;
            this.updateBg();
            this.emit(ToggleButton.TOGGLE, this.isToggled);
        });
    }

    protected updateBg(): void {
        this.bg.removeChildren();
        if (this.buttonMode) {
            if (this.isToggled) {
                this.bg.addChild(this.bgToggled);
            } else {
                if (this.state == Button.State.MouseOut) {
                    this.bg.addChild(this.bgDefault);
                } else if (this.state == Button.State.MouseOver) {
                    this.bg.addChild(this.bgMouseOver);
                } else if (this.state == Button.State.MouseDown) {
                    this.bg.addChild(this.bgMouseDown);
                }
            }
        } else {
            this.bg.addChild(this.bgDisabled);
        }
    }
}
