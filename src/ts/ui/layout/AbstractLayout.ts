import { INDENT } from "../../";
import * as PIXI from "pixi.js";

export abstract class AbstractLayout extends PIXI.Container {

    protected readonly elements = new Array<PIXI.Container>(0);

    constructor(private _spacing: number = INDENT) {
        super();
    }

    get spacing(): number {
        return this._spacing;
    }

    set spacing(value: number) {
        this._spacing = value;
        this.updateElements();
    }

    getElementAt(index: number): PIXI.Container {
        return this.elements[index];
    }

    addElement(element: PIXI.Container): PIXI.Container {
        this.elements.push(element);
        this.addChild(element);
        this.updateElements();
        return element;
    }

    removeElement(element: PIXI.Container): PIXI.Container {
        this.elements.splice(this.elements.indexOf(element), 1);
        this.removeChild(element);
        this.updateElements();
        return element;
    }

    removeElements(): void {
        this.elements.length = 0;
        this.removeChildren();
    }

    abstract updateElements(): void;
}
