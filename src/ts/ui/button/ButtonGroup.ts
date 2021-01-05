import { Button } from "../../"
import * as PIXI from "pixi.js"

export class ButtonGroup extends PIXI.utils.EventEmitter {

    private _isEnabled = true
    private _activeButtonIndex = 0

    private readonly buttons: Button[] = []

    constructor(...buttons: Button[]) {
        super()
        buttons.forEach((b, i) => {
            b.isEnabled = true
            this.buttons.push(b)

            b.on(Button.TRIGGERED, () => {
                this.activeButtonIndex = i
                this.emit(Button.TRIGGERED, b)
            })
        })
        this.activeButtonIndex = 0
    }

    get isEnabled(): boolean {
        return this._isEnabled
    }

    set isEnabled(value: boolean) {
        this._isEnabled = value
        this.buttons.forEach((b, i) => {
           if (i != this.activeButtonIndex) {
               b.isEnabled = value
           }
        })
    }

    get activeButtonIndex(): number {
        return this._activeButtonIndex
    }

    set activeButtonIndex(value: number) {
        this.buttons[this.activeButtonIndex].isEnabled = true
        if (value < 0) {
            value = 0
        } else if (value >= this.buttons.length) {
            value = this.buttons.length - 1
        }
        this._activeButtonIndex = value
        this.buttons[value].isEnabled = false
    }
}
