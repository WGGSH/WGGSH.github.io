// ページの読み込みを待つ
window.addEventListener('load', init);

function init(): void{
  // サイズを指定
  const width: number = window.innerWidth;
  const height: number = window.innerHeight;

  // レンダラーを作成
  const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas')
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene: THREE.Scene = new THREE.Scene();

  // カメラを作成
  const camera: THREE.Camera = new THREE.PerspectiveCamera(45, width / height,1,30000);
  camera.position.set(0, 0, 1000);

  // OrbitControl
  const controls: THREE.OrbitControls = new THREE.OrbitControls(camera);

  // 形状データを作成
  const geometry :THREE.Geometry = new THREE.Geometry();
  const numParticles:number = 200000;
  // for(let i :number = 0 ; i < numParticles ; i++) {
  //   geometry.vertices.push(new THREE.Vector3(
  //     Math.random() * 2000 - 1000,
  //     Math.random() * 2000 - 1000,
  //     Math.random() * 2000 - 1000));
  // }
  for (let i: number = 0; i < 1200; i++){
    for (let j: number = 0; j < 108; j++){
      geometry.vertices.push(new THREE.Vector3(
        i*Math.cos(Math.PI*2/108*j+Math.PI/180*i),
        0,
        i*Math.sin(Math.PI*2/108*j+Math.PI/180*i)
      ))
    }
  }

  // マテリアルを作成
  const texture :THREE.Texture =THREE.ImageUtils.loadTexture('../resources/image.png');
  const material :THREE.Material = new THREE.ParticleBasicMaterial({
  size: 1, color: 0xff8888, blending: THREE.AdditiveBlending,
  transparent: true, depthTest: false, map: texture });

  // 物体を作成
  const mesh :THREE.ParticleSystem = new THREE.ParticleSystem(geometry, material);
  mesh.position = new THREE.Vector3(0, 0, 0);
  mesh.sortParticles = false;
  scene.add(mesh);

  tick();

  // 毎フレーム実行されるループイベント
  function tick(): void{
    
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
}
