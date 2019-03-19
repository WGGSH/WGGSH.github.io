class Script02 implements DanmakuScript{
  XDIV: number = 90;
  YDIV: number = 90;
  SPEED: number = 3;
  INTERVAL: number = 60;
  update(): void{
    if (frameCount % this.INTERVAL == 1) {
      options.color = getColorHSV(Math.random()*120+90, 0.6, 0.1);
      for (let i = 0; i < this.XDIV; i++) {
        for (let j = 0; j < this.YDIV; j++) {
          particleSystem.spawnParticle(options, new THREE.Vector3(
            this.SPEED * Math.cos(Math.PI  / this.XDIV * i) * Math.cos(Math.PI * 2 / this.YDIV * j),
            this.SPEED * Math.sin(Math.PI * 2 / this.YDIV * j),
            this.SPEED * Math.sin(Math.PI  / this.XDIV * i) * Math.cos(Math.PI * 2 / this.YDIV * j)
          ));
        }
      }
    }
  }
}
