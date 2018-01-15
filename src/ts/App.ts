import { AbstractBranch } from "./";
import * as PIXI from "pixi.js";

export class App {

    private _root: AbstractBranch;
    private readonly application: PIXI.Application;

    constructor(resolution: number, private width: number, private height: number) {
        this.application = new PIXI.Application({ autoResize: true,
            resolution: resolution, sharedLoader: true, sharedTicker: true });
        this.resize(width, height);
    }

    get root(): AbstractBranch {
        return this._root;
    }

    set root(value: AbstractBranch) {
        if (this.root) {
            this.application.stage.removeChild(this.root);
        }
        this._root = value;
        if (value) {
            value.setUpChildren(this.width, this.height);
            this.application.stage.addChild(value);
        }
    }

    get view(): HTMLCanvasElement {
        return this.application.view;
    }

    resize(width: number, height: number): void {
        if (width > 0 && height > 0) {
            this.width = width;
            this.height = height;
            this.application.renderer.resize(width, height);
            if (this.root) {
                this.root.setUpChildren(width, height);
            }
        }
    }

    destroy(): void {
        PIXI.loader.reset();
        if (this.root) {
            this.root.destroy({ children: true });
        }
        this.application.destroy();
    }
}
