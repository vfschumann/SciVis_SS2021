import { vanDerWaal_radii, atom_colors } from "./constants";
import { color_wrapper, calculate_connections_elements } from "./utility";
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
export function renderAtoms(atom_list, scene) {


    // const boxGeometry = new THREE.BoxGeometry( 1, 1, 1 ); // nur übernommen, kp ob/warum wir es brauchen



    for (let i = 0; i < atom_list.length; i++) {

        let position = atom_list[i].pos_vector
        const element = atom_list[i].elem;
        const color = atom_colors[element];
        const radius = vanDerWaal_radii[element] * 0.25;

        //const sphereGeometry = new THREE.IcosahedronGeometry( radius, 3 ); // warum ist das detached von "geometryAtom" ?
        const sphereGeometry = new THREE.SphereGeometry(radius, 32, 32);


        const material = new THREE.MeshPhongMaterial({ color: color });

        // was macht der folgende Block?
        const object = new THREE.Mesh(sphereGeometry, material);
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

// Quelle: https://stackoverflow.com/questions/15139649/three-js-two-points-one-cylinder-align-issue
export function renderConnectionsCylinders(connection_list, scene) {
    for (let index = 0; index < connection_list.length; index++) {
        let start = connection_list[index].start
        let end = connection_list[index].end

        const distance = start.distanceTo(end);
        const position = end.clone().add(start).divideScalar(2)

        const material = new THREE.MeshPhongMaterial({ color: 0x5c5c5c });
        let cylinder = new THREE.CylinderGeometry(.1, .1, distance);

        let orientation = new THREE.Matrix4();
        let offsetRotation = new THREE.Matrix4();
        orientation.lookAt(start, end, new THREE.Vector3(0, 1, 0));
        offsetRotation.makeRotationX(Math.PI * .5);
        orientation.multiply(offsetRotation);
        cylinder.applyMatrix(orientation);

        const mesh = new THREE.Mesh(cylinder, material);
        mesh.position.copy(position);
        scene.add(mesh);
    }
}
