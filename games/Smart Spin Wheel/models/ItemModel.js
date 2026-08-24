import { generateId } from "../core/Utils.js";
export default class ItemModel {
    constructor(data = {}) {
        this.id = data.id || generateId();
        this.name = data.name || "New Item";
        this.color = data.color || "#6366f1";
        this.icon = data.icon || "🎯";
        this.image = data.image || null;
        this.weight = Number(data.weight) > 0
            ? Number(data.weight)
            : 1;

        this.spins = Number(data.spins) || 0;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            color: this.color,
            icon: this.icon,
            image: this.image,
            weight: this.weight,
            spins: this.spins
        };
    }
}