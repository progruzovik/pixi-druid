import { AbstractBranch, Event } from "../";

export class ScrollContainer extends AbstractBranch {

    private static readonly MIN_SCALE = 0.75;
    private static readonly MAX_SCALE = 1.25;
    private static readonly SCALE_FACTOR = 1.02;

    private isMouseOnContainer = false;
    private isLeftMouseButtonDown = false;
    private readonly mousePosition = new PIXI.Point();

    readonly content = new PIXI.Container();

    constructor() {
        super();
        this.content.interactive = true;
        this.addChild(this.content);

        this.content.on(Event.MOUSE_OVER, () => this.isMouseOnContainer = true);
        this.content.on(Event.MOUSE_MOVE, (e: PIXI.interaction.InteractionEvent) => {
            const oldMousePosition = this.mousePosition.clone();
            this.mousePosition.set(e.data.global.x, e.data.global.y);
            if (this.isLeftMouseButtonDown) {
                this.content.x += this.mousePosition.x - oldMousePosition.x;
                this.content.y += this.mousePosition.y - oldMousePosition.y;
                this.normalizeContentPosition();
            }
        });
        this.content.on(Event.MOUSE_DOWN, (e: PIXI.interaction.InteractionEvent) => this.isLeftMouseButtonDown = true);
        this.content.on(Event.MOUSE_UP, () => this.isLeftMouseButtonDown = false);
        this.content.on(Event.MOUSE_OUT, () => this.isMouseOnContainer = false);
        this.content.on(Event.MOUSE_UP_OUTSIDE, () => this.isLeftMouseButtonDown = false);

        const onWheel = (e: WheelEvent) => {
            if (this.isMouseOnContainer) {
                e.preventDefault();
                let newScale = 0;
                if (e.deltaY < 0) {
                    newScale = this.content.scale.x / ScrollContainer.SCALE_FACTOR;
                    if (newScale < ScrollContainer.MIN_SCALE) {
                        newScale = ScrollContainer.MIN_SCALE;
                    }
                } else if (e.deltaY > 0) {
                    newScale = this.content.scale.x * ScrollContainer.SCALE_FACTOR;
                    if (newScale > ScrollContainer.MAX_SCALE) {
                        newScale = ScrollContainer.MAX_SCALE;
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
                }
            }
        };
        this.on(Event.ADDED, () => window.addEventListener("wheel", onWheel));
        this.on(Event.REMOVED, () => window.removeEventListener("wheel", onWheel));
    }

    onResize(): void {}

    private normalizeContentPosition() {
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
