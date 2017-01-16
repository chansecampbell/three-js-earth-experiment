var scene;
var camera;
var renderer;

function createRenderer() {
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0x000000, 1.0);
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function createCamera() {
	camera = new THREE.PerspectiveCamera(
		45,
		window.innerWidth / window.innerHeight,
		0.1, 10000);
	camera.position.x = 15;
	camera.position.y = 16;
	camera.position.z = 13;
	camera.lookAt(scene.position);
}

function createSphere() {
	var sphereGeometry = new THREE.SphereGeometry(6, 30, 30);
	var sphereMaterial = new THREE.MeshLambertMaterial({
		color: "yellow"
	});
	var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
	scene.add(sphere)
}

function createLight() {
	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(10, 20, 20);
	scene.add(spotLight);
}

function init() {
	scene = new THREE.Scene();

	createRenderer();
	createCamera();

	createSphere();

	createLight();

	document.body.appendChild(renderer.domElement);

	render();
}

function render() {
	renderer.render(scene, camera);

	requestAnimationFrame(render);
}

init();