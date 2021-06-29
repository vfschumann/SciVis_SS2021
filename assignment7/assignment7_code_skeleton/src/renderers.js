import {vanDerWaal_radii, atom_colors} from "./constants";
import {color_wrapper, calculate_connections_elements} from "./utility";
import * as THREE from 'three';

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
export function renderAtoms( atom_list ) {


    const boxGeometry = new THREE.BoxGeometry( 1, 1, 1 ); // nur übernommen, kp ob/warum wir es brauchen

     // const colors = atom_colors; // not sure how to write that properly

    // I hope that loops now through the atm_list
    for ( let i = 0; i < atom_list.length; i ++ ) {
        /* radii
        /* color */


        let position = atom_list[i].pos_vector
        const element = atom_list[i].elem;
        const color = atom_colors[element];
        const radius = vanDerWaal_radii[element];

        const sphereGeometry = new THREE.IcosahedronGeometry( radius, 3 ); // warum ist das detached von "geometryAtom" ?

        const material = new THREE.MeshPhongMaterial( { color: color } );

        // was macht der folgende Block?
        // const object = new THREE.Mesh( sphereGeometry, material );
        // object.position.copy( position );
        // object.position.multiplyScalar( 75 );
        // object.scale.multiplyScalar( 25 );

    }
}

// CONNECTIONS
// TODO: function -> render connections as lines


// TODO: function -> render connections as cylinders

