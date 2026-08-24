export default class WheelHistory {
    constructor(model) {
        this.model = model;
    }
    add(item) {
        this.model.history.unshift({
            itemId: item.id,
            itemName: item.name,
            timestamp: new Date().toISOString()
        });
        this.model.totalSpins++;
        item.spins++;
    }
    clear() { this.model.history = []; }
    getAll() { return this.model.history; }
}