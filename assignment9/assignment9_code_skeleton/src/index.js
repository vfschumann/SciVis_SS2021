/*Schumann_Vic-Fabienne__Kopp_Alexandra
    ********************************
    ********** Basic Setup *********
    ********************************
 */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import {mipShaderFrag} from "./mipShader.frag";
import {dvrShaderFrag} from "./dvrShader.frag";
import {isoShaderFrag} from "./isoShader.frag";
import {vertShader} from "./vertexShader.vert";
import {clean, textParse} from "./utility";


// defining the variables
// scene components
let canvas, context, camera, scene, renderer, uniforms, material, mesh,  ShaderApi, lightParams, isoParams;

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
    scene.background = new THREE.Color('#7a7a7a')

    // adding rectSidelength camera PerspectiveCamera( fov, aspect, near, far)
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 100 );

    // set the camera position x,y,z in the Scene
    camera.position.set(0.0,0.5,2.0);
    scene.add(camera)

    // add controls to the scene
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    // add GUI menu instance
    const gui = new GUI({"width":400});

    let fragShaderSelections = {
        DirectVolumeRenderer: 'dvr',
        MaxIntenseProject: 'mip',
        IsoSurface: 'iso'
    };
    ShaderApi = {
        currentShader: fragShaderSelections.DirectVolumeRenderer
    };

    gui.add(ShaderApi, 'currentShader', fragShaderSelections).onChange( function(){
            material = fragShaderMaterial(ShaderApi.currentShader)
            mesh.material = material;
    });

    lightParams = {
        'lighting': false
    }
    isoParams = {
        'isoValue': 0.5,
        'isoAlpha': 0.5
    }
    gui.add( lightParams, 'lighting').name("toggle Light");
    gui.add( isoParams, 'isoValue').min(0.0).max(1.0);
    gui.add( isoParams, 'isoAlpha').min(0.0).max(1.0);

    /*
        ********************************
        **** Geometries and objects ****
        ********************************
     */
    let colormap = new THREE.TextureLoader().load( 'assets/tf/transferFunction.png' );


    uniforms = {
        // uniform has to be set by a later functions
        u_volumeTexture: {type: 't', value: 'none' },
        // uniform has to be set by a later functions
        u_volumeTexSize: {value: ''},
        // TODO: uniform has to be set by a later functions
        u_dimsBBox: {value : ''},
        // TODO: set transfer function
        u_tfTexture: {type: 't', value: '' },
        u_toggleLight:{ value: 0},
        u_isoValue: { value: 0.5},
        u_isoAlphaValue: { value: 0.5}
    }
    // bind functionality to load button
    document.getElementById('input').onchange = function () {
        const file = document.getElementById('input').files[0];
        file.text().then(text => {
            let datFile = textParse(text)
            console.log(datFile)
            let loader = new THREE.FileLoader().setResponseType('arraybuffer');
            let url = 'assets/data/'+datFile.filename;
            console.log("url:", url);
            loader.load(
                url,
                function ( data ) {
                    //TODO convert data to THREE.DataTexture3D
                    data = new Uint8Array(data)
                    let texture3D = new THREE.DataTexture3D(data,...datFile.dimensions);
                    createVolume(texture3D,datFile);
                }
            )
        })
    };
}

/**
 * @param {new THREE.DataTexture3D} texture3D
 * @param {{sliceThickness: *[], filename: string, dimensions: *[]}} datFile
 */
function createVolume(texture3D,datFile){
    clean(scene)
    // set Texture3D params to load and store volume data in the right form
    texture3D.format = THREE.LuminanceFormat
    texture3D.type = THREE.UnsignedByteType;
    texture3D.unpackAlignment = 1;
    texture3D.minFilter = texture3D.magFilter = THREE.LinearFilter;

    // TODO: get texture dimensions and set it for uniform u_volumeTextureSize
    let volumeTextureSize = datFile.dimensions;
    const longestEdge = Math.max(...volumeTextureSize)
    volumeTextureSize = volumeTextureSize.map(dim => dim / longestEdge);
    uniforms.u_volumeTexture.value = texture3D;
    uniforms.u_volumeTexSize.value = volumeTextureSize;

    let geometry = new THREE.BufferGeometry()

    //TODO: create a geometry with quadratic voxels and volume dimensions
    //TODO BONUS:  handle quadratic and non quadratic voxels and volume dimensions

    let vertices = [
        0,0,0,
        uniforms.u_volumeTexSize.value[0], 0, 0,
        uniforms.u_volumeTexSize.value[0], 0, uniforms.u_volumeTexSize.value[2],
        0,0,uniforms.u_volumeTexSize.value[2],
        0, uniforms.u_volumeTexSize.value[1], 0,
        uniforms.u_volumeTexSize.value[0], uniforms.u_volumeTexSize.value[1], 0,
        uniforms.u_volumeTexSize.value[0], uniforms.u_volumeTexSize.value[1], uniforms.u_volumeTexSize.value[2],
        0,uniforms.u_volumeTexSize.value[1],uniforms.u_volumeTexSize.value[2]
    ];

    let texCoords = [
        0.0, 0.0, 0.0,
        1.0,0.0,0.0,
        1.0,0.0,1.0,
        0.0,0.0,1.0,
        0.0,1.0,0.0,
        1.0,1.0,0.0,
        1.0,1.0,1.0,
        0.0,1.0,1.0,
    ];

    let indices = [
        0,1,4,
        1,5,4,
        1,2,5,
        2,6,5,
        2,6,7,
        3,2,7,
        3,7,0,
        7,4,0,
        1,3,0,
        1,2,3,
        7,4,5,
        7,5,6,
    ];

    geometry.setIndex(indices);
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices,3));
    geometry.setAttribute('texCoords', new THREE.Float32BufferAttribute(texCoords,3));
    geometry.computeVertexNormals();
    material = fragShaderMaterial(ShaderApi.currentShader);
    mesh = new THREE.Mesh( geometry, material );
    mesh.geometry.center();
    scene.add(mesh);
}

function fragShaderMaterial(choice_string){
    switch ( choice_string ) {
        case 'dvr':  return new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertShader,
            fragmentShader: dvrShaderFrag,
            side: THREE.DoubleSide,
            transparent: true,
            glslVersion: THREE.GLSL3
        });
        case 'mip': return new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertShader,
            fragmentShader: mipShaderFrag,
            side: THREE.DoubleSide,
            transparent: true,
            glslVersion: THREE.GLSL3
        });
        case 'iso': return new  THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertShader,
            fragmentShader: isoShaderFrag,
            side: THREE.DoubleSide,
            transparent: true,
            glslVersion: THREE.GLSL3
        });
    }
}
/*
    ********************************
    *** Animation and Rendering ****
    ********************************
 */
function render(){
    if (material) {
        material.uniforms.u_isoValue.value = isoParams['isoValue'];
        material.uniforms.u_isoAlphaValue.value = isoParams['isoAlpha'];
        material.uniforms.u_toggleLight.value = lightParams['lighting'];
    }
    renderer.render(scene, camera );
}

// animation function calling the renderer and introducing the rotation
function animate() {
    requestAnimationFrame( animate );
    render();
}

init();
animate();
