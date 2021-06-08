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
let center_positions, colors, values;



document.getElementById('input').onchange= function() {
    const file = this.files[0];
    const reader = new FileReader();

    center_positions = [];
    colors  = [];
    values = [];

    //START FILE READING
    reader.onload = function(){
        let lines = "";
        if(window.navigator.platform == "Win32") {
            lines = this.result.split('\r');
        }else {
            lines = this.result.split('\n');
        }
        // reading file line by line
        lines.forEach(line => {
            let line_split = line.split(",");

            // TODO: set center_positions

            // TODO: set colors

            values.push(parseFloat(line_split[3]));

        });
        console.log("center_positions",center_positions);
        console.log("colors",colors);
        console.log("values",values);
        init()
        animate();
        //END FILE READING
    };
    reader.readAsText(file)
}


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
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 200 );

    // set the camera position x,y,z in the Scene
    camera.position.set(0,0,-15);
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

    /*
        ********************************
        **** Geometries and objects ****
        ********************************
     */

    // TODO: plot the points (centered around the origin) and color them
    // TODO: add and draw a bounding box
    // TODO: add an axis indicator
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

