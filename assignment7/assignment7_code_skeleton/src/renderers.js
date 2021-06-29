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
    const geometryAtoms = atom_list.geometryAtoms; // what is that and how does it work?
    const json = atom_list.json; // what is that and why do we need it?

    const boxGeometry = new THREE.BoxGeometry( 1, 1, 1 ); // nur übernommen, kp ob/warum wir es brauchen
    const sphereGeometry = new THREE.IcosahedronGeometry( 1, 3 ); // warum ist das detached von "geometryAtom" ?

    // warum? weshalb wieso?
    geometryAtoms.computeBoundingBox();
    geometryAtoms.boundingBox.getCenter( offset ).negate();

    geometryAtoms.translate( offset.x, offset.y, offset.z );


    let positions = geometryAtoms.getAttribute( 'pos_vector' ); // accessing that tab from the atom_list?
    const colors = atom_colors; // not sure how to write that properly

    const position = new THREE.Vector3();
    const color = new THREE.Color();

    // I hope that loops now through the atm_list
    for ( let i = 0; i < positions.count; i ++ ) {

        position.x = positions.getX( i );
        position.y = positions.getY( i );
        position.z = positions.getZ( i );

        // TODO: somehow get the color value from atom_colors by matching the "elem" value

        const material = new THREE.MeshPhongMaterial( { color: 0x5c5c5c } ); // platzhalter

        // was macht der folgende Block?
        const object = new THREE.Mesh( sphereGeometry, material );
        object.position.copy( position );
        object.position.multiplyScalar( 75 );
        object.scale.multiplyScalar( 25 );
        root.add( object );

        // add atoms to overview of atoms?
        const atom = json.atoms[ i ];
    }
}

// CONNECTIONS
// TODO: function -> render connections as lines


// TODO: function -> render connections as cylinders

