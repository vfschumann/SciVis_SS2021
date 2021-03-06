import { vanDerWaal_radii, atom_colors } from "./constants";
import { color_wrapper, calculate_connections_elements, tmpFactor_coloring } from "./utility";
import * as THREE from 'three';
import { Vector3 } from "three";

/********************************
 * ATOM AND CONNECTION RENDERING *
 *********************************/

// ATOMS
// TODO: function -> render atoms as spheres
// create sphere geometry
/*
1. loop through list of atoms (atom_list from parser) -> input
2. for every atom create a sphere
    * radius -> element given with "elem"
    * match with radius list from constants.js -> get radius
    * widthSeg and heightSeg is fixed 32
3. apply phongmaterial
    * color -> same procedure as with radius
4. position -> pos_vector
 */
export function renderAtoms(atom_data, scene) {
    const atom_list = atom_data.atom_list

    // const boxGeometry = new THREE.BoxGeometry( 1, 1, 1 ); // nur ├╝bernommen, kp ob/warum wir es brauchen



    for (let i = 0; i < atom_list.length; i++) {

        let position = atom_list[i].pos_vector
        const element = atom_list[i].elem;
        const radius = vanDerWaal_radii[element] * 0.25;

        //const sphereGeometry = new THREE.IcosahedronGeometry( radius, 3 ); // warum ist das detached von "geometryAtom" ?
        const sphereGeometry = new THREE.SphereGeometry(radius, 32, 32);

        let color = atom_colors[element];


        // temp
        color = tmpFactor_coloring(atom_list[i].temp_fact, atom_data)
        const material = new THREE.MeshPhongMaterial({ color: color });


        
        // was macht der folgende Block?
        const object = new THREE.Mesh(sphereGeometry, material);
        // object.setAttribute('color', new THREE.Float32BufferAttribute(color, 3));
        object.position.copy(position);
        // object.position.multiplyScalar( 75 );
        // object.scale.multiplyScalar( 25 );
        scene.add(object);

    }
}

// CONNECTIONS
export function renderConnectionsLines(connection_list, scene) {
    for (let index = 0; index < connection_list.length; index++) {
        const material = new THREE.LineBasicMaterial({ color: 0x000000 });

        const geometry = new THREE.BufferGeometry().setFromPoints([connection_list[index].start, connection_list[index].end]);
        const line = new THREE.Line(geometry, material);
        scene.add(line);
    }
}

export function renderConnectionsCylinders(atom_data, scene) {
    const cylinderParams = calculate_connections_elements(atom_data)
    cylinderParams.forEach( params => {
        const material = new THREE.MeshPhongMaterial( {color: 0x5c5c5c})
        const geometry = new THREE.CylinderBufferGeometry( .15, .15, params.connection_length, 8 )
        const cylinderMesh = new THREE.Mesh( geometry, material )
        const base_direction = new THREE.Vector3(0,1,0)
        cylinderMesh.position.copy( params.connection_center )
        cylinderMesh.quaternion.setFromUnitVectors( // what is happening here?
            base_direction, params.connection_direction.clone().normalize()
        )
        scene.add(cylinderMesh)
    })
}