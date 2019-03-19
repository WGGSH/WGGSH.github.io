// ページの読み込みを待つ
window.addEventListener('load', init);
function init() {
    // サイズを指定
    var width = window.innerWidth;
    var height = window.innerHeight;
    // レンダラーを作成
    var renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    // シーンを作成
    var scene = new THREE.Scene();
    // カメラを作成
    var camera = new THREE.PerspectiveCamera(45, width / height, 1, 30000);
    camera.position.set(0, 0, 1000);
    // OrbitControl
    var controls = new THREE.OrbitControls(camera);
    // 形状データを作成
    var geometry = new THREE.Geometry();
    var numParticles = 200000;
    // for(let i :number = 0 ; i < numParticles ; i++) {
    //   geometry.vertices.push(new THREE.Vector3(
    //     Math.random() * 2000 - 1000,
    //     Math.random() * 2000 - 1000,
    //     Math.random() * 2000 - 1000));
    // }
    for (var i = 0; i < 1200; i++) {
        for (var j = 0; j < 108; j++) {
            geometry.vertices.push(new THREE.Vector3(i * Math.cos(Math.PI * 2 / 108 * j + Math.PI / 180 * i), 0, i * Math.sin(Math.PI * 2 / 108 * j + Math.PI / 180 * i)));
        }
    }
    // マテリアルを作成
    var texture = THREE.ImageUtils.loadTexture('../resources/image.png');
    var material = new THREE.ParticleBasicMaterial({
        size: 1, color: 0xff8888, blending: THREE.AdditiveBlending,
        transparent: true, depthTest: false, map: texture
    });
    // 物体を作成
    var mesh = new THREE.ParticleSystem(geometry, material);
    mesh.position = new THREE.Vector3(0, 0, 0);
    mesh.sortParticles = false;
    scene.add(mesh);
    tick();
    // 毎フレーム実行されるループイベント
    function tick() {
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
}
//# sourceMappingURL=main.js.map