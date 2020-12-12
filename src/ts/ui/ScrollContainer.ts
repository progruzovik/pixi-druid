import { Branch, Event } from "../";

export class ScrollContainer extends Branch {

    static readonly INTERACTION = "interaction";

    private static readonly MIN_ZOOM = 0.75;
    private static readonly MAX_ZOOM = 1.25;
    private static readonly ZOOM_FACTOR = 1.02;

    private isMouseOnContainer = false;
    private isLeftMouseButtonDown = false;
    private readonly mousePosition = new PIXI.Point();

    readonly content = new PIXI.Container();

    constructor() {
        super();
        this.content.interactive = true;
        this.addChild(this.content);

        this.content.on(Event.MOUSE_OVER, () => this.isMouseOnContainer = true);
        this.content.on(Event.MOUSE_MOVE, (e: PIXI.InteractionEvent) => {
            const oldMousePosition = this.mousePosition.clone();
            this.mousePosition.set(e.data.global.x, e.data.global.y);
            if (this.isLeftMouseButtonDown) {
                this.content.x += this.mousePosition.x - oldMousePosition.x;
                this.content.y += this.mousePosition.y - oldMousePosition.y;
                this.normalizeContentPosition();
                this.emit(ScrollContainer.INTERACTION);
            }
        });
        this.content.on(Event.MOUSE_DOWN, () => this.isLeftMouseButtonDown = true);
        this.content.on(Event.MOUSE_UP, () => this.isLeftMouseButtonDown = false);
        this.content.on(Event.MOUSE_OUT, () => this.isMouseOnContainer = false);
        this.content.on(Event.MOUSE_UP_OUTSIDE, () => this.isLeftMouseButtonDown = false);

        const onWheel = (e: WheelEvent) => {
            if (this.isMouseOnContainer) {
                e.preventDefault();
                let newScale = 0;
                if (e.deltaY > 0) {
                    newScale = this.content.scale.x / ScrollContainer.ZOOM_FACTOR;
                    if (newScale < ScrollContainer.MIN_ZOOM) {
                        newScale = ScrollContainer.MIN_ZOOM;
                    }
                } else if (e.deltaY < 0) {
                    newScale = this.content.scale.x * ScrollContainer.ZOOM_FACTOR;
                    if (newScale > ScrollContainer.MAX_ZOOM) {
                        newScale = ScrollContainer.MAX_ZOOM;
                    }
                }
                if (newScale != 0 && this.content.scale.x != newScale) {
                    const localBounds: PIXI.Rectangle = this.getLocalBounds();
                    const localMouseX: number = (this.mousePosition.x - localBounds.x) / this.content.scale.x;
                    const localMouseY: number = (this.mousePosition.y - localBounds.y) / this.content.scale.y;
                    this.content.scale.set(newScale, newScale);
                    this.content.x = (this.mousePosition.x / newScale - localMouseX) * newScale;
                    this.content.y = (this.mousePosition.y / newScale - localMouseY) * newScale;
                    this.normalizeContentPosition();
                    this.emit(ScrollContainer.INTERACTION);
                }
            }
        };
        this.on(Event.ADDED, () => window.addEventListener("wheel", onWheel));
        this.on(Event.REMOVED, () => window.removeEventListener("wheel", onWheel));
    }

    private normalizeContentPosition(): void {
        const leftBorder: number = this.width / 2 - this.content.width;
        if (this.content.x < leftBorder) {
            this.content.x = leftBorder;
        } else if (this.content.x > this.width / 2) {
            this.content.x = this.width / 2;
        }
        const topBorder: number = this.height / 2 - this.content.height;
        if (this.content.y < topBorder) {
            this.content.y = topBorder;
        } else if (this.content.y > this.height / 2) {
            this.content.y = this.height /2;
        }
    }
}
