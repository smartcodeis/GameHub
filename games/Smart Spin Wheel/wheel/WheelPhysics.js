export default class WheelPhysics {
    static getTargetRotation(items, winner) {
        const totalWeight =
            items.reduce(
                (sum, item) =>
                    sum + item.weight,
                0
            );

        let before = 0;
        for (const item of items) {
            if (item.id === winner.id) {
                break;
            }
            before += item.weight;
        }
        const winnerStart = before / totalWeight * Math.PI * 2;
        const winnerSize = winner.weight / totalWeight * Math.PI * 2;
        const winnerCenter = winnerStart + winnerSize / 2;
        const pointerAngle = -Math.PI / 2;
        const spins = 5 + Math.floor(Math.random() * 3);

        return (spins * Math.PI * 2 + pointerAngle - winnerCenter);
    }
}