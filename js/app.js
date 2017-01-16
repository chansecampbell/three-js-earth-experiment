var scene;
var camera;
var renderer;
var sphere;
var cube;
var plane;

function createRenderer() {
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0x000000, 1.0);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
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
		color: "red"
	});
	sphere = new THREE.Mesh(geometry, material);
	sphere.castShadow = true;
	scene.add(sphere)
}

function createCube() {
	var geometry = new THREE.BoxGeometry(4, 4, 4);
	var material = new THREE.MeshLambertMaterial({
		color: "yellow"
	});
	cube = new THREE.Mesh(geometry, material);
	cube.castShadow = true;
	scene.add(cube);
}

function createPlane() {
	var geometry = new THREE.PlaneGeometry(40, 40);
	var material = new THREE.MeshLambertMaterial({
		color: 'lightgray'
	});
	plane = new THREE.Mesh(geometry, material);
	plane.receiveShadow = true;
	plane.rotation.x = -0.5 * Math.PI;
	plane.position.y = -5;
	scene.add(plane);
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

	// createSphere();
	createCube();

	createPlane();
	createLight();

	document.body.appendChild(renderer.domElement);

	render();
}

function render() {
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	renderer.render(scene, camera);

	requestAnimationFrame(render);
}

init();