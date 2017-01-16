var scene;
var camera;
var renderer;
var sphere;
var cube;

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
	var geometry = new THREE.SphereGeometry(6, 30, 30);
	var material = new THREE.MeshLambertMaterial({
		color: "orange"
	});
	sphere = new THREE.Mesh(geometry, material);
	scene.add(sphere)
}

function createCube() {
	var geometry = new THREE.BoxGeometry(1, 1, 1);
	var material = new THREE.MeshLambertMaterial({
		color: "lightblue"
	});
	cube = new THREE.Mesh(geometry, material);
	scene.add(cube);
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
	// createCube();

	createLight();

	document.body.appendChild(renderer.domElement);

	render();
}

function render() {
	sphere.rotation.x += 0.1;
	sphere.rotation.y += 0.1;
	renderer.render(scene, camera);

	requestAnimationFrame(render);
}

init();