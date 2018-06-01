import { AbstractBranch, Event } from "../";

export class ScrollContainer extends AbstractBranch {

    static readonly INTERACTION = "interaction";

    readonly content: PIXI.Container = new ScrollContent();

    constructor() {
        super();
        this.addChild(this.content);
        this.content.on(ScrollContainer.INTERACTION, () => this.emit(ScrollContainer.INTERACTION));
    }

    onResize(): void {}
}

class ScrollContent extends PIXI.Container {

    private static readonly MIN_ZOOM = 0.75;
    private static readonly MAX_ZOOM = 1.25;
    private static readonly ZOOM_FACTOR = 1.02;

    private isMouseOnContainer = false;
    private isLeftMouseButtonDown = false;
    private readonly mousePosition = new PIXI.Point();

    constructor() {
        super();
        this.interactive = true;

        this.on(Event.MOUSE_OVER, () => this.isMouseOnContainer = true);
        this.on(Event.MOUSE_MOVE, (e: PIXI.interaction.InteractionEvent) => {
            const oldMousePosition: PIXI.Point = this.mousePosition.clone();
            this.mousePosition.set(e.data.global.x, e.data.global.y);
            if (this.isLeftMouseButtonDown) {
                this.x += this.mousePosition.x - oldMousePosition.x;
                this.y += this.mousePosition.y - oldMousePosition.y;
                this.normalizePosition();
                this.emit(ScrollContainer.INTERACTION);
            }
        });
        this.on(Event.MOUSE_DOWN, () => this.isLeftMouseButtonDown = true);
        this.on(Event.MOUSE_UP, () => this.isLeftMouseButtonDown = false);
        this.on(Event.MOUSE_OUT, () => this.isMouseOnContainer = false);
        this.on(Event.MOUSE_UP_OUTSIDE, () => this.isLeftMouseButtonDown = false);

        const onWheel = (e: WheelEvent) => {
            if (this.isMouseOnContainer) {
                e.preventDefault();
                let newScale = 0;
                if (e.deltaY > 0) {
                    newScale = this.scale.x / ScrollContent.ZOOM_FACTOR;
                    if (newScale < ScrollContent.MIN_ZOOM) {
                        newScale = ScrollContent.MIN_ZOOM;
                    }
                } else if (e.deltaY < 0) {
                    newScale = this.scale.x * ScrollContent.ZOOM_FACTOR;
                    if (newScale > ScrollContent.MAX_ZOOM) {
                        newScale = ScrollContent.MAX_ZOOM;
                    }
                }
                if (newScale != 0 && this.scale.x != newScale) {
                    const localBounds: PIXI.Rectangle = this.getLocalBounds();
                    const localMouseX: number = (this.mousePosition.x - localBounds.x) / this.scale.x;
                    const localMouseY: number = (this.mousePosition.y - localBounds.y) / this.scale.y;
                    this.scale.set(newScale, newScale);
                    this.x = (this.mousePosition.x / newScale - localMouseX) * newScale;
                    this.y = (this.mousePosition.y / newScale - localMouseY) * newScale;
                    this.normalizePosition();
                    this.emit(ScrollContainer.INTERACTION);
                }
            }
        };
        this.on(Event.ADDED, () => window.addEventListener("wheel", onWheel));
        this.on(Event.REMOVED, () => window.removeEventListener("wheel", onWheel));
    }

    private normalizePosition(): void {
        const leftBorder: number = this.width / 2 - this.width;
        if (this.x < leftBorder) {
            this.x = leftBorder;
        } else if (this.x > this.width / 2) {
            this.x = this.width / 2;
        }
        const topBorder: number = this.height / 2 - this.height;
        if (this.y < topBorder) {
            this.y = topBorder;
        } else if (this.y > this.height / 2) {
            this.y = this.height /2;
        }
    }
}
