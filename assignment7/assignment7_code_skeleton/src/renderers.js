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
        const radius = (vanDerWaal_radii[element] * 0.25);

        const sphereGeometry = new THREE.IcosahedronGeometry( radius, 3 );
        const material = new THREE.MeshPhongMaterial( { color: color } );
        const object = new THREE.Mesh( sphereGeometry, material );
        object.position.copy( position );
        scene.add( object )
    }
}

// CONNECTIONS
// TODO: function -> render connections as lines
export function renderConnectionLines( connectionList, scene ) {

    // following: https://threejs.org/docs/#manual/en/introduction/Drawing-lines
    const material = new THREE.LineBasicMaterial( {color: 0x000000} );
    const geometry = new THREE.BufferGeometry().setFromPoints( connectionList ); // maybe since this is a directory that doesn't work, better to give start and end point?
    const line = new THREE.Line( geometry, material );

    scene.add( line )
}

// TODO: function -> render connections as cylinders

