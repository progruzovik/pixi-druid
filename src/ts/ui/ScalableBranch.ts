import { AbstractBranch } from "../";

export class ScalableBranch extends AbstractBranch {

    onResize(): void {
        const bounds = this.getLocalBounds();
        const ratio = Math.min(this.width / bounds.width, this.height / bounds.height);
        this.scale.set(ratio, ratio);
    }
}
