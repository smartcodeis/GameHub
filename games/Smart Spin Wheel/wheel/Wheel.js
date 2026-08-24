export default class Wheel {
    constructor(model) {
        this.model = model;
        this.isSpinning = false;
    }

    get items() {
        return this.model.items;
    }

    canSpin() {
        return (
            !this.isSpinning &&
            this.items.length > 0
        );
    }

    chooseWinner() {
        if (!this.canSpin()) {
            return null;
        }
        const available =
            this.items.filter(
                item => item.weight > 0
            );
        if (!available.length) {
            return null;
        }
        const totalWeight =
            available.reduce(
                (total, item) =>
                    total + item.weight,
                0
            );
        let random = Math.random() * totalWeight;

        for (const item of available) {
            random -= item.weight;
            if (random <= 0) {
                return item;
            }
        }
        return available[available.length - 1];
    }
}