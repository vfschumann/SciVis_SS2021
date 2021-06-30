import {vanDerWaal_radii, atom_colors} from "./constants";
import {color_wrapper, calculate_connections_elements} from "./utility";
import * as THREE from 'three';

/********************************
* ATOM AND CONNECTION RENDERING *
*********************************/

// ATOMS
// TODO: function -> render atoms as spheres

export function renderAtoms( atom_list, scene ) {

    const boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );

    for ( let i = 0; i < atom_list.length; i ++ ) {

        let position = atom_list[i].pos_vector
        const element = atom_list[i].elem;
        const color = atom_colors[element];
        const radius = vanDerWaal_radii[element];

        const sphereGeometry = new THREE.IcosahedronGeometry( radius, 3 );
        const material = new THREE.MeshPhongMaterial( { color: color } );
        const object = new THREE.Mesh( sphereGeometry, material );
        object.position.copy( position );
     //   object.position.multiplyScalar( 75 );
     //   object.scale.multiplyScalar( 25 );
        scene.add( object )
    }
}

// CONNECTIONS
// TODO: function -> render connections as lines


// TODO: function -> render connections as cylinders

