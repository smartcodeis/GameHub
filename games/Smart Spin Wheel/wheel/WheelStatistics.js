export default class WheelStatistics {
    constructor(model) {
        this.model = model;
    }
    getTotalSpins() {
        return this.model.totalSpins;
    }
    getTotalItems() {
        return this.model.items.length;
    }
    getMostSelected() {
        if (!this.model.items.length) {
            return null;
        }
        return this.model.items.reduce(
            (best, item) =>
                item.spins > best.spins
                    ? item
                    : best
        );
    }
    getLastResult() {
        return this.model.history[0]
            ?.itemName || null;
    }
}