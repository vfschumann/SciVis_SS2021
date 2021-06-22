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
let mesh;

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
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 100 );

    // set the camera position x,y,z in the Scene
    camera.position.set(0,0,6);
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
    })

    // add input element for directional light intensity
    gui.add( light_params, 'directional light - intensity').onChange( function ( intensity_val ) {
        directional_light.intensity = intensity_val;
    })

    /*
        ********************************
        **** Geometries and objects ****
        ********************************
     */
    let material = new THREE.MeshPhongMaterial(
        {
            vertexColors: true,
            side: THREE.DoubleSide
        }
    )

    let reference_geometry = new THREE.BufferGeometry();
    let reference_indices = [];
    let reference_vertices = [];
    let reference_colors = [];

    //ref 0
    reference_vertices.push(-4,0,0)
    //ref 1
    reference_vertices.push(-1,0,0)
    //ref 2
    reference_vertices.push(-2.5,3*0.866,0)

    reference_colors.push(1,0,0)
    reference_colors.push(0,1,0)
    reference_colors.push(0,0,1)

    reference_indices.push(0,1,2)

    reference_geometry.setIndex(reference_indices);
    reference_geometry.setAttribute('position', new THREE.Float32BufferAttribute(reference_vertices,3));
    reference_geometry.setAttribute('color', new THREE.Float32BufferAttribute(reference_colors,3));

    reference_geometry.computeVertexNormals();

    let reference_mesh = new THREE.Mesh( reference_geometry, material )
    scene.add(reference_mesh)

    let geometry = new THREE.BufferGeometry();
    let indices = [];
    let vertices = [];
    let colors = [];

    //0
    vertices.push(0,0,0);
    //1
    vertices.push(3,0,0);
    //2
    vertices.push(1.5,3*0.866,0);
    //3
    vertices.push(1.8,0.6,0);
    //4
    vertices.push(1.3,1.6,0);
    //5
    vertices.push(1.9,1.3,0);
    //6
    vertices.push(0.8,0.7,0);
    //7
    vertices.push(1.3,0.2,0);
    //8
    vertices.push(1.25,0.9,0);

    colors.push(1,1,1);
    colors.push(1,1,1);
    colors.push(1,1,1);
    colors.push(1,1,1);
    colors.push(1,1,1);
    colors.push(1,1,1);
    colors.push(1,1,1);
    colors.push(1,1,1);
    colors.push(1,1,1);

    indices.push(0,7,6);
    indices.push(0,6,4);
    indices.push(0,1,7);

    indices.push(1,5,3);
    indices.push(1,2,5);
    indices.push(1,3,7);

    indices.push(2,4,5);
    indices.push(2,0,4);

    indices.push(3,5,4);
    indices.push(3,6,7);

    indices.push(8,4,6);
    indices.push(8,6,3);
    indices.push(8,3,4);

    function baryInterpolate(vertices, indices, colors, surroundingABC){
       // surroundingABC: are the indices of the major surrounding triangle (containing all the little ones)
       // TODO: Implement the barycentric interpolation of colors for the given vertices
    }

    function getTriangleArea(a,b,c){
        // a,b,c are the vertices of a triangle
        // TODO: Implement the calculation of the area of a triangle
        return area;
    }

    baryInterpolate(vertices, indices, colors,  [0,1,2])

    geometry.setIndex(indices);
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices,3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors,3));

    geometry.computeVertexNormals();

    mesh = new THREE.Mesh( geometry, material )
    let wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, opacity: 0.15, transparent: true} );
    let wireframe = new THREE.Mesh( geometry, wireframeMaterial );

    scene.add(mesh)
    scene.add( wireframe );

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
