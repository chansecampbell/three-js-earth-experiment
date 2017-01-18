var scene;
var camera;
var renderer;
var earth;
var clouds;
var starfield;
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
	loader.load('assets/earth10k.jpg', function(image) {
		texture.image = image;
		texture.needsUpdate = true;
	});

	var normalTexture = new THREE.Texture();
	var loader = new THREE.ImageLoader();
	loader.load('assets/earth_normalmap_flat2k.jpg', function(image) {
		normalTexture.image = image;
		normalTexture.needsUpdate = true;
	});

	var specularTexture = new THREE.Texture();
	var loader = new THREE.ImageLoader();
	loader.load('assets/earthspec2k.jpg', function(image) {
		specularTexture.image = image;
		specularTexture.needsUpdate = true;
	});

	var material = new THREE.MeshPhongMaterial();
	material.map = texture;

	material.normalMap = normalTexture;
	material.normalScale = new THREE.Vector2(0.7, 0.7);

	material.specularMap = specularTexture;
	material.specular = new THREE.Color(0x262626);

	return material;
}

function createCloudsMaterial() {
	var texture = new THREE.Texture();
	var loader = new THREE.ImageLoader();
	loader.load('assets/thickerclouds.png', function(image) {
		texture.image = image;
		texture.needsUpdate = true;
	});

	var material = new THREE.MeshPhongMaterial();
	material.map = texture;
	material.transparent = true;
	return material;
}

function createEarth() {
	var geometry = new THREE.SphereGeometry(15, 30, 30);
	var material = createEarthMaterial();
	earth = new THREE.Mesh(geometry, material);
	earth.name = 'earth';
	scene.add(earth);
}

function createClouds() {
	var geometry = new THREE.SphereGeometry(15.1, 30, 30);
	var material = createCloudsMaterial();
	clouds = new THREE.Mesh(geometry, material);
	clouds.name = 'clouds';
	scene.add(clouds);
}

function createStarfield() {
	var geometry = new THREE.SphereGeometry(90, 32, 32);
	var texture = new THREE.Texture();
	var loader = new THREE.ImageLoader();
	loader.load('assets/galaxy_starfield.png', function(image) {
		texture.image = image;
		texture.needsUpdate = true;
	});

	var material = new THREE.MeshBasicMaterial();
	material.map = texture;
	material.side = THREE.BackSide;
	starfield = new THREE.Mesh(geometry, material);
	scene.add(starfield);
}

function createLight() {
	var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	directionalLight.position.set(100, 10, -50);
	directionalLight.name = "directional";
	scene.add(directionalLight);

	var ambientLight = new THREE.AmbientLight(0x111111);
	scene.add(ambientLight);
}

function init() {
	scene = new THREE.Scene();

	createRenderer();
	createCamera();
	createLight();
	createEarth();	
	createClouds();
	createStarfield();

	document.body.appendChild(renderer.domElement);

	render();
}

function render() {

	cameraControls.update();

	scene.getObjectByName('earth').rotation.y += 0.0005;
	scene.getObjectByName('clouds').rotation.y += 0.0007;

	renderer.render(scene, camera);
	requestAnimationFrame(render);
}

init();




