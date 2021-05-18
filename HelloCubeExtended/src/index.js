/*
     Schumann_Vic-Fabienne__Kopp_Alexandra

    ********************************
    ********** Basic Setup *********
    ********************************
 */
    import * as THREE from 'three'
    import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
    
    // defining the variables
    let camera, scene, renderer;
    
    //creating the Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0)
    
    // adding directional light
    
    let light_color = 0xffffff;
    let directional_intensity = 3;
    
    
    const directional_light = new THREE.DirectionalLight(light_color, directional_intensity);
    scene.add(directional_light);
    
    // adding ambient light
    const light = new THREE.AmbientLight(light_color, 0.3);
    scene.add(light);
    
    // adding a camera PerspectiveCamera( fov, aspect, near, far)
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    
    // set the camera position x,y,z in the Scene
    camera.position.set(0, 0, 1);
    
    // +++ create a WebGLRenderer +++
    // enables antialiasing (nicer geometry: borders without stair effect)
    // TODO change to WebGL2.0
    renderer = new THREE.WebGLRenderer({ antialias: true });
    
    // get and set window dimension for the renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // add dom object(renderer) to the body section of the index.html
    document.body.appendChild(renderer.domElement);
    
    // add controls to the scene
    const controls = new OrbitControls(camera, renderer.domElement);
    
    // add GUI menu instance
    const gui = new GUI();

    gui.addColor(directional_light, 'color')
    gui.add(directional_light, 'intensity', 0, 10)
    
    
    /*
        ********************************
        **** Geometries and objects ****
        ********************************
     */
    
    // create cube geometry ([width, height, depth])
    const geometry_cube = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    
    // create cube material
    const texture1 = new THREE.TextureLoader().load('assets/Face_1.png');
    const texture2 = new THREE.TextureLoader().load('assets/Face_2.png');
    const texture3 = new THREE.TextureLoader().load('assets/Face_3.png');
    const texture4 = new THREE.TextureLoader().load('assets/Face_4.png');
    const texture5 = new THREE.TextureLoader().load('assets/Face_5.png');
    const texture6 = new THREE.TextureLoader().load('assets/Face_6.png');
    
    const materials_cube = [
        new THREE.MeshLambertMaterial({ map: texture6 }),
        new THREE.MeshLambertMaterial({ map: texture1 }),
        new THREE.MeshLambertMaterial({ map: texture5 }),
        new THREE.MeshLambertMaterial({ map: texture2 }),
        new THREE.MeshLambertMaterial({ map: texture4 }),
        new THREE.MeshLambertMaterial({ map: texture3 })]
    
    // create sphere geometry
    const material_sphere = new THREE.MeshPhongMaterial({ color: 0x21a6af, shininess: 200 });
    
    // create sphere material
    const geometry_sphere = new THREE.SphereGeometry(0.15, 32, 32);
    
    // create mesh for the cube
    let mesh_cube = new THREE.Mesh(geometry_cube, materials_cube);
    scene.add(mesh_cube);
    mesh_cube.position.x = 0.2;
    mesh_cube.rotation.x += 0.5;
    mesh_cube.rotation.y += 0.5;
    
    // create mesh for sphere
    let mesh_sphere = new THREE.Mesh(geometry_sphere, material_sphere);
    scene.add(mesh_sphere);
    mesh_sphere.position.x = - 0.2;
    
    /*
        ********************************
        *** Animation and Rendering ****
        ********************************
     */
    
    // render function
    function render() {
        renderer.render(scene, camera);
    }
    // animation function
    function animate() {
        requestAnimationFrame(animate);
        const time = Date.now() * 0.001;
        mesh_cube.rotation.x = time;
        mesh_cube.rotation.y = time;
        render();
    }
    animate()
    