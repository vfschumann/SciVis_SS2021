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

export function search_bonds(atom_list){
   // see pdb_parser.js for structure/content of atom_list
   // TODO: find covalent bonds
}

export function calculate_connections_elements(atom_data) {
   // TODO: calculate further necessary cylinder parameters
}


export function tmpFactor_coloring(tmpFactor, atom_data) {
   // TODO BONUS: perform temperature factor based coloring
   // TODO BONUS: use a diverging color scale (blue to white to red)
}
