// var camera, tick = 0,
//   scene, renderer, clock = new THREE.Clock(),
//   controls, container, gui = new dat.GUI( { width: 350 } ),
//   options, spawnerOptions, particleSystem;

var camera: THREE.PerspectiveCamera;
var tick: number = 0;
var frameCount: number = 0;
var scene: THREE.Scene;
var renderer: THREE.WebGLRenderer;
var clock: THREE.Clock = new THREE.Clock();
var controls: THREE.TrackballControls;
var container: HTMLElement;
var gui = new dat.GUI({ width: 350 })
var options: any;
var spawnerOptions: any;
var particleSystem: THREE.GPUParticleSystem;
var stats;
var danmakuScript: DanmakuScript = new Script02();

init();
animate();

function init() :void{

  //

  container = document.getElementById( 'container' );

  camera = new THREE.PerspectiveCamera( 28, window.innerWidth / window.innerHeight, 1, 50000 );
  camera.position.y = 2000;
  camera.position.z=1;

  scene = new THREE.Scene();

  // The GPU Particle system extends THREE.Object3D, and so you can use it
  // as you would any other scene graph component.	Particle positions will be
  // relative to the position of the particle system, but you will probably only need one
  // system for your whole scene

  particleSystem = new THREE.GPUParticleSystem( {
    maxParticles: 250000
  } );

  scene.add(particleSystem );

  // options passed during each spawned

  options = {
    position: new THREE.Vector3(),
    positionRandomness: 0,
    velocity: new THREE.Vector3(),
    velocityRandomness: 0,
    color: 0xaa88ff,
    colorRandomness: 0,
    turbulence: 0,
    lifetime: 200,
    size: 20,
    sizeRandomness: 0
  };

  spawnerOptions = {
    spawnRate: 1500000,
    horizontalSpeed: 1.5,
    verticalSpeed: 1.33,
    timeScale: 1
  };

  //

  // gui.add( options, "velocityRandomness", 0, 3 );
  // gui.add( options, "positionRandomness", 0, 3 );
  // gui.add( options, "size", 1, 20 );
  // gui.add( options, "sizeRandomness", 0, 25 );
  // gui.add( options, "colorRandomness", 0, 1 );
  // gui.add( options, "lifetime", .1, 10 );
  // gui.add( options, "turbulence", 0, 1 );

  // gui.add( spawnerOptions, "spawnRate", 10, 30000 );
  gui.add( spawnerOptions, "timeScale", - 3, 3 );

  //

  stats = new Stats();
  container.appendChild( stats.dom );

  //

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  //

  controls = new THREE.TrackballControls( camera, renderer.domElement );
  controls.rotateSpeed = 5.0;
  controls.zoomSpeed = 2.2;
  controls.panSpeed = 1;
  controls.dynamicDampingFactor = 0.3;

  window.addEventListener( 'resize', onWindowResize, false );

  // 軸の描画
  const geometryXAxis : THREE.Geometry = new THREE.BoxGeometry(100000,3,3);
  const materialXAxis : THREE.Material = new THREE.MeshBasicMaterial({color: 0x660000});
  const meshXAxis : THREE.Mesh = new THREE.Mesh(geometryXAxis,materialXAxis);
  // scene.add(meshXAxis);
  const geometryYAxis : THREE.Geometry = new THREE.BoxGeometry(3,100000,3);
  const materialYAxis : THREE.Material = new THREE.MeshBasicMaterial({color: 0x003300});
  const meshYAxis : THREE.Mesh = new THREE.Mesh(geometryYAxis,materialYAxis);
  // scene.add(meshYAxis);
  const geometryZAxis : THREE.Geometry = new THREE.BoxGeometry(3,3,100000);
  const materialZAxis : THREE.Material = new THREE.MeshBasicMaterial({color: 0x000066});
  const meshZAxis : THREE.Mesh = new THREE.Mesh(geometryZAxis,materialZAxis);
  // scene.add(meshZAxis);

}

function onWindowResize() : void {

  camera.aspect= window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() : void {

  requestAnimationFrame( animate );

  controls.update();

  let delta : number = clock.getDelta() * spawnerOptions.timeScale;

  tick += delta;
  frameCount++;

  if ( tick < 0 ) tick = 0;

  if ( delta > 0 ) {

    // options.position.x = Math.sin( tick * spawnerOptions.horizontalSpeed ) * 20;
    // options.position.y = Math.sin( tick * spawnerOptions.verticalSpeed ) * 10;
    // options.position.z = Math.sin( tick * spawnerOptions.horizontalSpeed + spawnerOptions.verticalSpeed ) * 5;

    // for ( var x = 0; x < spawnerOptions.spawnRate * delta; x ++ ) {

    // 	// Yep, that's really it.	Spawning particles is super cheap, and once you spawn them, the rest of
    // 	// their lifecycle is handled entirely on the GPU, driven by a time uniform updated below

    // 	particleSystem.spawnParticle( options ,new THREE.Vector3(
    //     Math.cos(tick),
    //     0,
    //     Math.sin(tick*2)
    //     ));

    // }

    // 弾幕処理
    danmakuScript.update();
    

  }

  particleSystem.update( tick );

  render();

  stats.update();

}

function render() : void{

  renderer.render( scene, camera );

}

function getColor(red,blue,green) : number {
  return red*65536+blue*256+green;
}

function getColorHSV(H,S,V) : number{
  if(H>=360){
    H-=360;
  }
  let C : number = V * S;
  let Hp : number = H / 60;
  var X : number = C * (1 - Math.abs(Hp % 2 - 1));

  let R : number, G : number, B : number;
  if (0 <= Hp && Hp < 1) {[R,G,B]=[C,X,0]};
  if (1 <= Hp && Hp < 2) {[R,G,B]=[X,C,0]};
  if (2 <= Hp && Hp < 3) {[R,G,B]=[0,C,X]};
  if (3 <= Hp && Hp < 4) {[R,G,B]=[0,X,C]};
  if (4 <= Hp && Hp < 5) {[R,G,B]=[X,0,C]};
  if (5 <= Hp && Hp < 6) {[R,G,B]=[C,0,X]};

  let m : number = V - C;
  [R, G, B] = [R+m, G+m, B+m];

  R = Math.floor(R * 255);
  G = Math.floor(G * 255);
  B = Math.floor(B * 255);

  return R*65536+G*256+B;
}
