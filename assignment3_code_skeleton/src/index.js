/*
    ********************************
    ********** Basic Setup *********
    ********************************
 */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import { MathUtils } from 'three';



// defining the variables
// scene components
let canvas, context, camera, scene, renderer, directional_light, ambient_light, light_params;

// geometry/object components
let geometry_cube, geometry_sphere, mesh_cube, material_sphere, mesh_sphere, mesh;

function init() {

    //webgl2 renderer
    canvas = document.createElement('canvas')
    context = canvas.getContext('webgl2', { antialias: true, alpha: false })
    renderer = new THREE.WebGLRenderer({ canvas: canvas, context: context });
    // get and set window dimension for the renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    // add dom object(renderer) to the body section of the index.html
    document.body.appendChild(renderer.domElement);

    //creating the Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color('#878787')

    // adding a camera PerspectiveCamera( fov, aspect, near, far)
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);

    // set the camera position x,y,z in the Scene
    camera.position.set(0, 2, 3.5);
    scene.add(camera)

    // adding directional light
    directional_light = new THREE.DirectionalLight('#efebd8', 1.0)
    directional_light.position.set(1, 1, 0)
    camera.add(directional_light)

    // adding ambient light
    ambient_light = new THREE.AmbientLight('#efebd8', 0.3)
    camera.add(ambient_light)



    // add controls to the scene
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    // add GUI menu instance
    const gui = new GUI({ "width": 400 });

    // generate menu items
    light_params = {
        "directional light - color": directional_light.color.getHex(),
        "directional light - intensity": directional_light.intensity
    }

    let render_params = {
        "object transform - bool": false
    }

    // map functions to menu items
    // add color picker for directional light color
    gui.addColor(light_params, 'directional light - color').onChange(function (color_val) {
        directional_light.color.setHex(color_val);
        //render();
    })

    // add input element for directional light intensity
    gui.add(light_params, 'directional light - intensity').onChange(function (intensity_val) {
        directional_light.intensity = intensity_val;
        //render();
    })

    gui.add(render_params, 'object transform - bool').onChange(function (bool_val) {
        if(bool_val){
            mesh.applyMatrix4(rotateYTrans);
        }else{
            mesh.applyMatrix4(invers);
        }
    })

    /**
     * Transformation
     */

     let rotationAngle = MathUtils.degToRad(90)
     let rotateYTrans = new THREE.Matrix4();
     rotateYTrans.makeRotationY(rotationAngle);
     rotateYTrans = rotateYTrans.setPosition(-0.5, -0.4,0);
     
     let invers = rotateYTrans.clone();
     invers = invers.invert();
     
    /*
        ********************************
        ******** Manual Geometry *******
        ********************************
     */
    let geometry = new THREE.BufferGeometry();

    const indices = [
        1, 0, 4,
        0, 3, 4,
        3, 2, 4,
        2, 1, 4];

    const vertices = [
        0.0, 0.0, 0.0,
        0.0, 0.0, -1.0,
        1.0, 0.0, -1.0,
        1.0, 0.0, 0.0,
        0.5, Math.sqrt(0.5), -0.5
    ];
    const normals = [
        0, 0, 0,
        0.707107, -0.5, 0,
        0.707107, 0, 0.707107,
        0, 0.5, 0.707107,
        0.3535535, 0, 0.3535535];

    const colors = [
        255, 0, 0,
        255, 225, 0,
        0, 128, 0,
        0, 0, 255,
        255, 255, 255
    ];


    geometry.setIndex(indices);
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ));

    const material = new THREE.MeshPhongMaterial( {
        vertexColors: true
    } );

    mesh = new THREE.Mesh( geometry, material)
    scene.add(mesh)

}
/*
    ********************************
    *** Animation and Rendering ****
    ********************************
 */

// extendable render wrapper
function render() {
    renderer.render(scene, camera);
}

// animation function calling the renderer and introducing the rotation
function animate() {
    requestAnimationFrame(animate);
    render();

}
init();
animate();
