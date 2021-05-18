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
let canvas, context, camera, scene, renderer, directional_light,ambient_light, light_params;

// geometry/object components
let geometry_cube, geometry_sphere,  mesh_cube,  material_sphere, mesh_sphere, mesh;

function init(){

    //webgl2 renderer
    canvas = document.createElement( 'canvas' )
    context = canvas.getContext( 'webgl2', {antialias: true, alpha:false})
    renderer = new THREE.WebGLRenderer( { canvas: canvas, context: context} );
    // get and set window dimension for the renderer
    renderer.setSize( window.innerWidth, window.innerHeight );
    // add dom object(renderer) to the body section of the index.html
    document.body.appendChild( renderer.domElement );

    //creating the Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color('#878787')

    // adding a camera PerspectiveCamera( fov, aspect, near, far)
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );

    // set the camera position x,y,z in the Scene
    camera.position.set(0,2,3.5);
    scene.add(camera)

    // adding directional light
    directional_light = new THREE.DirectionalLight('#efebd8', 1.0)
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
        "directional light - color": directional_light.color.getHex(),
        "directional light - intensity": directional_light.intensity
    }

    let render_params = {
        "object transform - bool": false
    }

    // map functions to menu items
    // add color picker for directional light color
    gui.addColor(light_params, 'directional light - color').onChange(function ( color_val ) {
        directional_light.color.setHex( color_val );
        //render();
    })

    // add input element for directional light intensity
    gui.add( light_params, 'directional light - intensity').onChange( function ( intensity_val ) {
        directional_light.intensity = intensity_val;
        //render();
    })

    gui.add( render_params, 'object transform - bool').onChange( function ( bool_val ) {
        // TODO: apply the transformations
    })

    /*
        ********************************
        ******** Manual Geometry *******
        ********************************
     */
    let geometry = new THREE.BufferGeometry();


    // TODO fill BufferGeometry

    // TODO create the PhongMaterial


    //mesh = new THREE.Mesh( geometry, material )
    //scene.add(mesh)
}
/*
    ********************************
    *** Animation and Rendering ****
    ********************************
 */

// extendable render wrapper
function render(){
    renderer.render(scene, camera );
}

// animation function calling the renderer and introducing the rotation
function animate() {
    requestAnimationFrame( animate );
    render();

}
init();
animate();