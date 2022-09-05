var head;

window.onload = function() {
	var model;
	var ctrl = document.getElementById('control')
	const position = new THREE.Vector3();
	const clock = new THREE.Clock()
	var loader = new THREE.GLTFLoader();
	var width = window.innerWidth;
	var height = window.innerHeight;
	var canvas = document.getElementById('canvas');
	canvas.setAttribute('width',width);
	canvas.setAttribute('height',height);

	var cx = document.getElementById('cx');
	var cy = document.getElementById('cy');
	var cz = document.getElementById('cz');

	var debug_mx = document.getElementById('mx');
	var debug_my = document.getElementById('my');
	
	var renderer = new THREE.WebGLRenderer({canvas: canvas,antialias: true,alpha: true});
	
	var scene = new THREE.Scene();
	
	var camera = new THREE.PerspectiveCamera( 70, width / height, 0.1, 5000 );
	camera.position.set(0,2,0,0.6);
	
	
	//var light = new THREE.PointLight(0xffffff,1,100);
	//light.position.set(0,4,0);
	//scene.add(light)

	const targetObject = new THREE.Object3D();
	targetObject.position.set(0,2,-20);
	scene.add(targetObject);

	const spot = new THREE.SpotLight( 0xffffff, 0.5 );
	spot.target = targetObject
	spot.castShadow = true;
	scene.add(spot);
	
	const light = new THREE.AmbientLight( 0x404040 ); // soft white light
	scene.add( light );
	loader.load( 'mdl/map.glb', function ( gltf ) {
		model = gltf.scene;
		scene.add(gltf.scene);
		renderer.render(scene,camera);
	});
	var sens = 5;
	document.onmousemove = function(event)
	{	
		var mx = (event.clientX-width/2)/width;
		var my = (event.clientY-height/2)/height;
		camera.rotation.y = -1*mx*Math.PI;

		targetObject.position.set(mx*100,2,-20);

		cx.innerHTML = camera.rotation.x;
		cy.innerHTML = camera.rotation.y;
		cz.innerHTML = camera.rotation.z;

		debug_mx.innerHTML = mx;
		debug_my.innerHTML = my;
		renderer.render(scene,camera);
	}
}