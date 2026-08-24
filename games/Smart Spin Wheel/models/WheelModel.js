import {
    generateId
} from "../core/Utils.js";

import ItemModel from "./ItemModel.js";

export default class WheelModel {
    constructor(data = {}) {
        this.id = data.id || generateId("wheel");
        this.name = data.name || "My Wheel";

        this.items = (data.items || []).map(
            item => item instanceof ItemModel
                ? item
                : new ItemModel(item)
        );

        this.history = data.history || [];
        this.totalSpins = Number(data.totalSpins) || 0;

        this.settings = {
            removeDuplicates: data.settings?.removeDuplicates ?? false,
            removeWinnerAfterSpin: data.settings?.removeWinnerAfterSpin ?? false,
            preventDuplicates: data.settings?.preventDuplicates ?? false,
            enableSound: data.settings?.enableSound ?? true,
            enableConfetti: data.settings?.enableConfetti ?? true,
            highlightWinner: data.settings?.highlightWinner ?? true,
            spinDuration: data.settings?.spinDuration ?? 5
        };
    }

    addItem(data = {}) {
        const item =
            data instanceof ItemModel
                ? data
                : new ItemModel(data);
        this.items.push(item);
        return item;
    }

    removeItem(id) {
        this.items =
            this.items.filter(
                item => item.id !== id
            );
    }

    getItem(id) {
        return this.items.find(
            item => item.id === id
        );
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            items:
                this.items.map(
                    item => item.toJSON()
                ),
            history: this.history,
            totalSpins:
                this.totalSpins,
            settings:
                this.settings
        };
    }
}