import { Event, Rectangle } from "../../";
import * as PIXI from "pixi.js";

export class Button extends PIXI.Container {

    static readonly WIDTH = 165;
    static readonly HEIGHT = 40;
    static readonly TRIGGERED = "triggered";

    private _state: Button.State;
    protected readonly bg = new PIXI.Container();
    readonly txtMain: PIXI.Text;

    constructor(text: string = "",
                protected readonly bgDefault: PIXI.Container = new Rectangle(Button.WIDTH, Button.HEIGHT, 0x333333),
                protected readonly bgMouseOver: PIXI.Container = new Rectangle(0, 0, 0x555555),
                protected readonly bgMouseDown: PIXI.Container = new Rectangle(0, 0, 0x222222),
                protected readonly bgDisabled: PIXI.Container = bgMouseOver) {
        super();
        this.interactive = true;
        this.buttonMode = true;
        this.state = Button.State.MouseOut;
        this.addChild(this.bg);
        this.txtMain = new PIXI.Text(text,
            { align: "center", fill: "white", fontSize: 28, wordWrap: true, wordWrapWidth: bgDefault.width });
        this.txtMain.anchor.set(0.5, 0.5);
        this.addChild(this.txtMain);
        this.width = this.bg.width;
        this.height = this.bg.height;

        this.on(Event.MOUSE_OVER, () => this.state = Button.State.MouseOver);
        this.on(Event.MOUSE_DOWN, () => this.state = Button.State.MouseDown);
        this.on(Event.MOUSE_UP, () => {
            this.state = Button.State.MouseOver;
            if (this.buttonMode) {
                this.emit(Button.TRIGGERED);
            }
        });
        this.on(Event.MOUSE_OUT, () => this.state = Button.State.MouseOut);
        this.on(Event.TOUCH_START, () => this.state = Button.State.MouseDown);
        this.on(Event.TOUCH_END, () => {
            this.state = Button.State.MouseOut;
            if (this.buttonMode) {
                this.emit(Button.TRIGGERED);
            }
        });
    }

    get text(): string {
        return this.txtMain.text;
    }

    set text(value: string) {
        this.txtMain.text = value;
    }

    set isEnabled(value: boolean) {
        this.buttonMode = value;
        this.updateBg();
    }

    get width(): number {
        return this.bg.width;
    }

    set width(value: number) {
        this.bgDefault.width = value;
        this.bgMouseOver.width = value;
        this.bgMouseDown.width = value;
        this.bgDisabled.width = value;
        this.txtMain.style.wordWrapWidth = value;
        this.txtMain.x = value / 2;
    }

    get height() {
        return this.bgDefault.height;
    }

    set height(value: number) {
        this.bgDefault.height = value;
        this.bgMouseOver.height = value;
        this.bgMouseDown.height = value;
        this.bgDisabled.height = value;
        this.txtMain.y = value / 2;
    }

    protected get state(): Button.State {
        return this._state;
    }

    protected set state(value: Button.State) {
        if (this._state != value) {
            this._state = value;
            this.updateBg();
        }
    }

    protected updateBg(): void {
        this.bg.removeChildren();
        if (this.buttonMode) {
            if (this.state == Button.State.MouseOut) {
                this.bg.addChild(this.bgDefault);
            } else if (this.state == Button.State.MouseOver) {
                this.bg.addChild(this.bgMouseOver);
            } else if (this.state == Button.State.MouseDown) {
                this.bg.addChild(this.bgMouseDown);
            }
        } else {
            this.bg.addChild(this.bgDisabled);
        }
    }
}

export namespace Button {

    export const enum State {
        MouseOut, MouseOver, MouseDown
    }
}
