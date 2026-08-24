export default class WheelRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.rotation = 0;

    }
    render(items, rotation = 0) {
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(centerX, centerY) - 10;

        ctx.clearRect(0, 0, width, height);

        if (!items.length) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fillStyle = "#e5e7eb";
            ctx.fill();
            return;
        }


        const totalWeight =
            items.reduce(
                (sum, item) =>
                    sum + item.weight,
                0
            );

        let currentAngle = rotation;

        items.forEach(item => {
            const angle = (item.weight / totalWeight) * Math.PI * 2;

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + angle);
            ctx.closePath();

            ctx.fillStyle = item.color;

            ctx.fill();

            ctx.strokeStyle = "#ffffff";

            ctx.lineWidth = 3;

            ctx.stroke();
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(currentAngle + angle / 2);

            ctx.textAlign = "right";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 18px Arial";
            ctx.fillText(`${item.icon || ""} ${item.name}`, radius - 20, 0);
            ctx.restore();
            currentAngle += angle;
        });
    }
}