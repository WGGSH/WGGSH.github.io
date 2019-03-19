var camera, tick = 0,
  scene, renderer, clock = new THREE.Clock(),
  controls, container, gui = new dat.GUI( { width: 350 } ),
  options, spawnerOptions, particleSystem;

var stats;

init();
animate();

function init() {

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
  const geometryXAxis = new THREE.BoxGeometry(100000,3,3);
  const materialXAxis = new THREE.MeshBasicMaterial({color: 0x660000});
  const meshXAxis = new THREE.Mesh(geometryXAxis,materialXAxis);
  scene.add(meshXAxis);
  const geometryYAxis = new THREE.BoxGeometry(3,100000,3);
  const materialYAxis = new THREE.MeshBasicMaterial({color: 0x003300});
  const meshYAxis = new THREE.Mesh(geometryYAxis,materialYAxis);
  // scene.add(meshYAxis);
  const geometryZAxis = new THREE.BoxGeometry(3,3,100000);
  const materialZAxis = new THREE.MeshBasicMaterial({color: 0x000066});
  const meshZAxis = new THREE.Mesh(geometryZAxis,materialZAxis);
  scene.add(meshZAxis);

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

  requestAnimationFrame( animate );

  controls.update();

  var delta = clock.getDelta() * spawnerOptions.timeScale;

  tick += delta;

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
    for(let j=0;j<2;j++){
      options.position.x=200*Math.cos(tick+j*Math.PI);
      options.position.z=200*Math.sin(tick+j*Math.PI);
      for(let i =0;i<4;i++){
        for(let k=0;k<3;k++){
          options.color=getColorHSV(360/2*j+120,0.6,1);
          particleSystem.spawnParticle(options,new THREE.Vector3(
            3*Math.cos(Math.PI*2/4*i+tick*tick/10*(j*2-1)+Math.PI/180*k*5*(j*2-1)+j*Math.PI),
            0,
            3*Math.sin(Math.PI*2/4*i+tick*tick/10*(j*2-1)+Math.PI/180*k*5*(j*2-1)+j*Math.PI)
          ),
          );
        }
      }
    }

  }

  particleSystem.update( tick );

  render();

  stats.update();

}

function render() {

  renderer.render( scene, camera );

}

function getColor(red,blue,green){
  return red*65536+blue*256+green;
}

function getColorHSV(H,S,V){
  if(H>=360){
    H-=360;
  }
  var C = V * S;
  var Hp = H / 60;
  var X = C * (1 - Math.abs(Hp % 2 - 1));

  var R, G, B;
  if (0 <= Hp && Hp < 1) {[R,G,B]=[C,X,0]};
  if (1 <= Hp && Hp < 2) {[R,G,B]=[X,C,0]};
  if (2 <= Hp && Hp < 3) {[R,G,B]=[0,C,X]};
  if (3 <= Hp && Hp < 4) {[R,G,B]=[0,X,C]};
  if (4 <= Hp && Hp < 5) {[R,G,B]=[X,0,C]};
  if (5 <= Hp && Hp < 6) {[R,G,B]=[C,0,X]};

  var m = V - C;
  [R, G, B] = [R+m, G+m, B+m];

  R = Math.floor(R * 255);
  G = Math.floor(G * 255);
  B = Math.floor(B * 255);

  return R*65536+G*256+B;
}
