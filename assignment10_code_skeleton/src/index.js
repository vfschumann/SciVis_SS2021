/* Schumann_Vic-Fabienne__Kopp_Alexandra
    ********************************
    ********** Basic Setup *********
    ********************************
 */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {vectorFieldFrag} from "./vectorField.frag";
import {vertShader} from "./vertexShader.vert";
import {sampleVectorField} from "./utility";


// defining the variables
// scene components
let canvas, context, camera, scene, renderer, uniforms,  mesh, shaderMat,  xSpace, ySpace, texture;

function init(){

    //webgl2 renderer
    canvas = document.createElement( 'canvas' )
    context = canvas.getContext( 'webgl2', {antialias: false, alpha:true})
    renderer = new THREE.WebGLRenderer( { canvas: canvas, context: context} );
    // get and set window dimension for the renderer
    renderer.setSize( window.innerWidth, window.innerHeight );
    // add dom object(renderer) to the body section of the index.html
    document.body.appendChild( renderer.domElement );

    //creating the Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color('#7a7a7a')

    // adding rectSidelength camera PerspectiveCamera( fov, aspect, near, far)
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 100 );

    // set the camera position x,y,z in the Scene
    camera.position.set(0.0,1.0,0);
    scene.add(camera)

    // add controls to the scene
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    /*
        ********************************
        **** Geometries and objects ****
        ********************************
     */

    let geometry = new THREE.BufferGeometry()

    let vertices = [   -0.5,  0.0,  0.5,
                        0.5,  0.0,  0.5,
                        0.5,  0.0, -0.5,
                       -0.5,  0.0, -0.5];

    // TODO: define texCoords
    let texCoords = [   0.0,0.0,
                        0.0,1.0,
                        1.0,1.0,
                        1.0,0.0, ];

    // TODO: set indices
    let indices = [ 0,2,3,
                    0,1,2];

    xSpace = [-2.0, 2.0];
    ySpace = [-2.0, 2.0];

    let noiseTexture = new THREE.TextureLoader().load( 'assets/noisetexture128.png' );

    // TODO:  generate Vector Field Texture
    let result = generateVectorFieldTexture(xSpace, ySpace);
    texture = result;

    // TODO: texture needs to be set
    uniforms = {
        u_vecFieldTex: {type: 't', value: texture },
        u_noiseTexture: { type: 't', value: noiseTexture },

    }
    shaderMat = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertShader,
        fragmentShader: vectorFieldFrag,
        side: THREE.DoubleSide,
        transparent: true,
        glslVersion: THREE.GLSL3
    });

    geometry.setIndex(indices);
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices,3));
    geometry.setAttribute('texCoords', new THREE.Float32BufferAttribute(texCoords,2));
    geometry.computeVertexNormals();

    mesh = new THREE.Mesh( geometry, shaderMat );
    scene.add(mesh);

}

// TODO: think about and choose needed params for the function
function generateVectorFieldTexture(xSpace, ySpace){

    let xDim = 128
    let yDim = 128

    // TODO: set size of vector field

    // // TODO: create the Vector Field Texture using sampleVectorField(x,y,t) function of utility.js
    // @returns: vec2
    let index = 0;
    let steps = (Math.abs(xSpace[0]) + Math.abs(xSpace[1])) / (xDim);
    let vectorField = new Float32Array(100000, 100000);

    for (let x = xSpace[0]; x < xSpace[1]; x += steps) {
        for (let y = ySpace[0]; y < ySpace[1]; y += steps) {
            let vector = sampleVectorField(x,y,1.0);
            vectorField[index] = vector[0];
            vectorField[index+1] = vector[1];
            index+=2;
         }
    }
    console.log(vectorField);

    let texture = new THREE.DataTexture( vectorField, xDim, yDim)
    console.log(texture);

    texture.format = THREE.RGFormat;
    texture.type = THREE.FloatType;
    texture.internalFormat = 'RG32F';
    texture.minFilter = texture.magFilter = THREE.LinearFilter;

    return texture;
}

// TODO: add function for visualizing the vectors as arrows (triangles)

/*
    ********************************
    *** Animation and Rendering ****
    ********************************
 */
function render(){
    renderer.render(scene, camera );
    // TODO: BONUS animate
}

// animation function calling the renderer
function animate() {
    requestAnimationFrame( animate );
    render();
   // TODO: BONUS animate
}

/*
    ********************************
    ************* MAIN *************
    ********************************
 */
init();
animate();
