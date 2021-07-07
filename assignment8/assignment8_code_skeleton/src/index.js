/*
    ********************************
    ********** Basic Setup *********
    ********************************
 */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';

// defining the variables
// scene components
let canvas, context, camera, scene, renderer, directional_light, ambient_light, light_params;

// geometry/object components
let shaderMaterial;
// TODO: use the variables below while creating the grid
let rectSidelength = 1024;
let terrainWidth = 20;

// shader imports
import {vertShader} from './vertexShader_heightmap.vert.js';
import {fragShader} from './fragmentShader_heightmap.frag.js';


function init(){

    //webgl2 renderer
    canvas = document.createElement( 'canvas' )
    context = canvas.getContext( 'webgl2', {antialias: true, alpha:true})
    renderer = new THREE.WebGLRenderer( { canvas: canvas, context: context} );
    // get and set window dimension for the renderer
    renderer.setSize( window.innerWidth, window.innerHeight );
    // add dom object(renderer) to the body section of the index.html
    document.body.appendChild( renderer.domElement );

    //creating the Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color('#878787')

    // adding rectSidelength camera PerspectiveCamera( fov, aspect, near, far)
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 100 );

    // set the camera position x,y,z in the Scene
    camera.position.set(12,3,18);
    scene.add(camera)

    // adding directional light
    directional_light = new THREE.DirectionalLight('#efebd8', 0.7)
    directional_light.position.set(1,1,0)
    camera.add( directional_light )

    // adding ambient light
    ambient_light = new THREE.AmbientLight('#efebd8', 0.3)
    camera.add( ambient_light )

    // add controls to the scene
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    // add GUI menu instance
    const gui = new GUI({"width":400});

    // generate menu items
    light_params = {
        "directional light - intensity": directional_light.intensity
    }

    // map functions to menu items
    // add input element for directional light intensity
    gui.add( light_params, 'directional light - intensity').onChange( function ( intensity_val ) {
        directional_light.intensity = intensity_val;
    })

    /*
        ********************************
        **** Geometries and Objects ****
        ********************************
    */
    // http://www.smartjava.org/content/threejs-render-real-world-terrain-heightmap-using-open-data/
    let texture = THREE.ImageUtils.loadTexture( "assets/heightmap_flat.png", null, loaded)
    let uniforms = {
        // TODO: load textures and set uniform variables

        lightDir: {value: directional_light.position},
        diffSpecLightIntensity: {value: new THREE.Vector4(directional_light.intensity, directional_light.intensity, directional_light.intensity, directional_light.intensity)},
        ambientLightIntensity: {value: new THREE.Vector4(0.5, 0.5, 0.5, 1.0)},
    }

    shaderMaterial =
        new THREE.ShaderMaterial({
            vertexShader: vertShader,
            fragmentShader: fragShader,
            uniforms: uniforms,
            glslVersion: THREE.GLSL3
        });

    let vertices, uvs;
    let geometry = new THREE.BufferGeometry();
    let indices ;

    // TODO: calculate rectangular geometry with triangular faces
    // TODO: calculate uv coordinates

    geometry.setIndex(indices);
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices,3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs,2));
    geometry.computeVertexNormals();

}

/*
    ********************************
    *** Animation and Rendering ****
    ********************************
 */

// extendable render wrapper
function render(){
    shaderMaterial.uniforms.diffSpecLightIntensity.value.copy(new THREE.Vector4(directional_light.intensity,directional_light.intensity,directional_light.intensity, 1.0));
    renderer.render(scene, camera );
}

// animation function calling the renderer and introducing the rotation
function animate() {
    requestAnimationFrame( animate );
    render();

}

init();
animate();
