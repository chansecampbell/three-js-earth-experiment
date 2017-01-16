var scene;
var camera;
var renderer;
var earth;
var cameraControls;

function createRenderer() {
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0x000000, 1.0);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
}

function createCamera() {
	camera = new THREE.PerspectiveCamera(
		125,
		window.innerWidth / window.innerHeight,
		0.1, 10000);
	camera.position.x = 15;
	camera.position.y = 16;
	camera.position.z = 13;
	camera.lookAt(scene.position);

	cameraControls = new THREE.OrbitControls(camera);
}

function createEarthMaterial() {
	var texture = new THREE.Texture();
	var loader = new THREE.ImageLoader();
	loader.load('assets/earth5k.jpg', function(image) {
		texture.image = image;
		texture.needsUpdate = true;
	});

	var material = new THREE.MeshBasicMaterial();
	material.map = texture;
	return material;
}

function createEarth() {
	var geometry = new THREE.SphereGeometry(15, 30, 30);
	var material = createEarthMaterial();
	earth = new THREE.Mesh(geometry, material);
	// sphere.castShadow = true;
	earth.name = 'earth';
	scene.add(earth);
}

function createLight() {
	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(10, 20, 20);
	spotLight.shadowCameraNear = 20;
	spotLight.shadowCameraFar = 50;
	spotLight.castShadow = true;
	scene.add(spotLight);
}

function init() {
	scene = new THREE.Scene();

	createRenderer();
	createCamera();
	createLight();
	createEarth();		

	document.body.appendChild(renderer.domElement);

	render();
}

function render() {

	cameraControls.update();

	renderer.render(scene, camera);

	requestAnimationFrame(render);
}

init();