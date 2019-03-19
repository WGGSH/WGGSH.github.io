var Script02 = /** @class */ (function () {
    function Script02() {
        this.XDIV = 90;
        this.YDIV = 90;
        this.SPEED = 3;
        this.INTERVAL = 60;
    }
    Script02.prototype.update = function () {
        if (frameCount % this.INTERVAL == 1) {
            options.color = getColorHSV(Math.random() * 120 + 90, 0.6, 0.1);
            for (var i = 0; i < this.XDIV; i++) {
                for (var j = 0; j < this.YDIV; j++) {
                    particleSystem.spawnParticle(options, new THREE.Vector3(this.SPEED * Math.cos(Math.PI / this.XDIV * i) * Math.cos(Math.PI * 2 / this.YDIV * j), this.SPEED * Math.sin(Math.PI * 2 / this.YDIV * j), this.SPEED * Math.sin(Math.PI / this.XDIV * i) * Math.cos(Math.PI * 2 / this.YDIV * j)));
                }
            }
        }
    };
    return Script02;
}());
//# sourceMappingURL=script02.js.map