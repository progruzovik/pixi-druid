import { AbstractLayout } from "./AbstractLayout";
import { Alignment, INDENT } from "../../";

export class HorizontalLayout extends AbstractLayout {

    constructor(private _alignment: Alignment = Alignment.Left, spacing: number = INDENT) {
        super(spacing);
    }

    get alignment(): Alignment {
        return this._alignment;
    }

    set alignment(value: Alignment) {
        this._alignment = value;
        this.updateElements();
    }

    updateElements(): void {
        const width: number = this.width;
        for (let i = 0; i < this.elements.length; i++) {
            if (this.alignment == Alignment.Left) {
                this.elements[i].pivot.x = 0;
                this.elements[i].x = 0;
            } else if (this.alignment == Alignment.Center) {
                this.elements[i].pivot.x = this.elements[i].width / this.elements[i].scale.x / 2;
                this.elements[i].x = width / 2;
            } else if (this.alignment == Alignment.Right) {
                this.elements[i].pivot.x = this.elements[i].width / this.elements[i].scale.x;
                this.elements[i].x = width;
            }
            this.elements[i].y = i == 0 ? 0 : this.elements[i - 1].y + this.elements[i - 1].height + this.spacing;
        }
    }
}
