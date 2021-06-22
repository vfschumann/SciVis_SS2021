/*
Schumann_Vic-Fabienne__Kopp_Alexandra
    ********************************
    ********** Basic Setup *********
    ********************************
 */
import * as THREE from 'three'
import { Color } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';

// defining the variables
// scene components
let canvas, context, camera, scene, renderer, directional_light, ambient_light, light_params;
let center_positions, colors, values;



document.getElementById('input').onchange = function () {
    const file = this.files[0];
    const reader = new FileReader();

    center_positions = [];
    colors = [];
    values = [];

    //START FILE READING
    reader.onload = function () {
        let lines = "";
        if (window.navigator.platform == "Win32") {
            lines = this.result.split('\r');
        } else {
            lines = this.result.split('\n');
        }
        // reading file line by line
        let i = 0
        lines.forEach(line => {
            let line_split = line.split(",");

            // set center_positions
            center_positions.push(parseFloat(line_split[0]), parseFloat(line_split[1]), parseFloat(line_split[2]))


            // set colors
            let colorClass = line_split[4];
            if (colorClass == "Iris-setosa\r") {
                colors.push(1.0, 0.0, 0.0)
            } else if (colorClass == "Iris-versicolor\r") {
                colors.push(0.0, 1.0, 0.0)
            } else {
                colors.push(0.0, 0.0, 1.0)
            }
            values.push(parseFloat(line_split[3]));

        });
        console.log("center_positions", center_positions);
        console.log("colors", colors);
        console.log("values", values);
        init()
        animate();
        //END FILE READING
    };
    reader.readAsText(file)
}


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
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 200);

    // set the camera position x,y,z in the Scene
    camera.position.set(0, 0, -15);
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
    let render_params = {
        "Color Classes": true
    }
    
    //Color with values
    let colorValuesArrays = []
    const baseColor = new THREE.Color( 1, 0, 0 );
    values.forEach(element => {
        let color = baseColor.addScalar(element).toArray()
        let color01 = color.map((element) => element/255)
        colorValuesArrays.push(color01)
    });
    const colorValues = [].concat(...colorValuesArrays);


    gui.add(render_params, 'Color Classes').onChange(function (bool_val) {
        if(bool_val){
            geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        }else{
            geometry.setAttribute('color', new THREE.Float32BufferAttribute(colorValues, 3));

        }
    })

    
    /*
        ********************************
        **** Geometries and objects ****
        ********************************
     */


    //plot the points (centered around the origin) and color them
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(center_positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({ size: 0.2, vertexColors: true });
    const points = new THREE.Points(geometry, material);
    points.geometry.center();
    scene.add(points);

    // add and draw a bounding box
    let box = new THREE.BoxHelper(points, 0xffff00);
    scene.add(box);

    // add an axis indicator
    const axesHelper = new THREE.AxesHelper(3);
    scene.add(axesHelper);
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

