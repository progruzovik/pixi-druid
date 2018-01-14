import { AbstractBranch } from "../";

export class ScalableBranch extends AbstractBranch {

    setUpChildren(width: number, height: number) {
        const bounds = this.getLocalBounds();
        const ratio = Math.min(width / bounds.width, height / bounds.height);
        this.scale.set(ratio, ratio);
    }
}
