var Script01 = /** @class */ (function () {
    function Script01() {
    }
    Script01.prototype.update = function () {
        for (var j = 0; j < 2; j++) {
            options.position.x = 200 * Math.cos(tick + j * Math.PI);
            options.position.z = 200 * Math.sin(tick + j * Math.PI);
            for (var i = 0; i < 4; i++) {
                for (var k = 0; k < 3; k++) {
                    options.color = getColorHSV(360 / 2 * j + 120, 0.6, 1);
                    particleSystem.spawnParticle(options, new THREE.Vector3(3 * Math.cos(Math.PI * 2 / 4 * i + tick * tick / 10 * (j * 2 - 1) + Math.PI / 180 * k * 5 * (j * 2 - 1) + j * Math.PI), 0, 3 * Math.sin(Math.PI * 2 / 4 * i + tick * tick / 10 * (j * 2 - 1) + Math.PI / 180 * k * 5 * (j * 2 - 1) + j * Math.PI)));
                }
            }
        }
    };
    return Script01;
}());
//# sourceMappingURL=script01.js.map