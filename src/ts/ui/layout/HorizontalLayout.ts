import { AbstractLayout } from "./AbstractLayout"

export class HorizontalLayout extends AbstractLayout {

    updateElements(): void {
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].x = i == 0
                ? 0
                : this.elements[i - 1].x + this.elements[i - 1].width + this.spacing
        }
    }
}
