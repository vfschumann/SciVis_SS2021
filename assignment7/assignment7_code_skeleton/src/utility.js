import * as THREE from 'three'
import {vanDerWaal_radii,atom_colors} from "./constants";


// remove all meshes, lines, geometries and materials from the actual scene
export function clean(scene) {
    //modified from threejs example https://github.com/mrdoob/three.js/blob/master/examples/webgl_instancing_performance.html

    const meshes = [];
    const groups = [];

    scene.traverse( function ( object ) {
        if ( object.isMesh || object.isLine) meshes.push( object );
        if ( object.isGroup ){
            object.traverse( function ( group_obj ){
                if ( group_obj.isMesh || object.isLine) meshes.push( group_obj );
            });
            groups.push(object);
        }
    } );

    meshes.forEach(element => {
        element.material.dispose();
        element.geometry.dispose();
        scene.remove( element );
    });

    groups.forEach(element => {
        scene.remove(element)
    });
}

export function search_bonds( atom_list ){
   // see pdb_parser.js for structure/content of atom_list
   // TODO: find covalent bonds

    let bonded_atoms = [];

    for ( let i = 0; i < atom_list.length; i ++ ) {
        for ( let j = 0; j < atom_list.length; j ++ ) {

            const i_position = atom_list[i].pos_vector;
            const j_position = atom_list[j].pos_vector;

            const i_rad = vanDerWaal_radii[atom_list[i].elem];
            const j_rad = vanDerWaal_radii[atom_list[j].elem];
            // TODO: can we organize it that e have to do this only once? (get the radii)

            let distance = i_position.distanceTo( j_position );
            let radii_combined = (i_rad + j_rad);

            if ( distance > ( radii_combined * 0.6 )) {
                bonded_atoms.push( {start: i_position, end: j_position} );
                // // loop trough output array to check if string pair exists already
                // for ( let k = 0; k < bonded_atoms.length; k ++ ) {
                //     if ( !(Object.entries(bonded_atoms[k]).includes(i_position)) &&
                //                 !(Object.entries(bonded_atoms[k]).includes(j_position)) ) {
                //         bonded_atoms.push( {start: i_position, end: j_position} );
                // TODO: How to do that check properly?
                //     } maybe check: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
                // }
            }
        }
    }
    return ( bonded_atoms )
}

export function calculate_connections_elements(atom_data) {
   // TODO: calculate further necessary cylinder parameters
}


export function tmpFactor_coloring(tmpFactor, atom_data) {
   // TODO BONUS: perform temperature factor based coloring
   // TODO BONUS: use a diverging color scale (blue to white to red)
}
