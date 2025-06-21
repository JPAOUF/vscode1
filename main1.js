import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );  

const scene = new THREE.Scene();
const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );

const controls = new OrbitControls( camera, renderer.domElement );
controls.panSpeed = 2;
controls.rotateSpeed = 2;

controls.keys = {
  LEFT: 'KeyA',
  UP: 'KeyW',
  RIGHT: 'KeyD',
  BOTTOM: 'KeyS'
}
controls.listenToKeyEvents(window);
controls.keyPanSpeed = 20;

camera.position.set( 0, 6, 6 );
controls.update();

const loader = new GLTFLoader();

loader.load('boat.glb', function ( gltf ) {

  scene.add( gltf.scene );

}, undefined, function ( error ) {

  console.error( error );

} 
);

function animate() {
  requestAnimationFrame( animate );
  controls.update();
  renderer.render( scene, camera );
}

animate();