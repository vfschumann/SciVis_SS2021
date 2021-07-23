import * as THREE from 'three'
import { vanDerWaal_radii, atom_colors } from "./constants";
import * as math from 'mathjs'

// remove all meshes, lines, geometries and materials from the actual scene
export function clean(scene) {
    //modified from threejs example https://github.com/mrdoob/three.js/blob/master/examples/webgl_instancing_performance.html

    const meshes = [];
    const groups = [];

    scene.traverse(function (object) {
        if (object.isMesh || object.isLine) meshes.push(object);
        if (object.isGroup) {
            object.traverse(function (group_obj) {
                if (group_obj.isMesh || object.isLine) meshes.push(group_obj);
            });
            groups.push(object);
        }
    });

    meshes.forEach(element => {
        element.material.dispose();
        element.geometry.dispose();
        scene.remove(element);
    });

    groups.forEach(element => {
        scene.remove(element)
    });
}

export function search_bonds(atom_list) {
    let connection_list = []
    for ( let i = 0; i < atom_list.length; i++ ) {
        let connection_entry = [i + 1]
        for (let j = 0; j < atom_list.length; j++) {
            let radiiSum = vanDerWaal_radii[atom_list[i].elem] + vanDerWaal_radii[atom_list[j].elem]
            let centerDist = atom_list[i].pos_vector.distanceTo(atom_list[j].pos_vector)
            if (centerDist < 0.6 * radiiSum) {
                // push connection
                connection_entry.push(j + 1)
            }
        }
        // push connection list of an atom
        connection_list.push(connection_entry)
    }
    console.log("connection_list", connection_list)
    return connection_list
}

export function calculate_connections_elements(atom_data) {
    // TODO: calculate further necessary cylinder parameters
    let cylinderParams = []

    let atom1ID, atom2ID
    let atom1Pos, atom2Pos

    let connection_center
    let connection_length
    let connection_direction

    atom_data.connection_list.forEach( // calling a function for each element in an array, in order
        atomConnectList => {
            atom1ID = parseInt( atomConnectList[0]) - 1 // what's happening here?
            atom1Pos = atom_data.atom_list[atom1ID].pos_vector;
            for ( let i = 1; i < atomConnectList.length; i++ ) {
                atom2ID = parseInt(atomConnectList[i]) - 1
                if ( atom1ID < atom2ID ) {
                    atom2Pos = atom_data.atom_list[atom2ID].pos_vector
                    connection_length = atom1Pos.distanceTo(atom2Pos)
                    connection_center = new THREE.Vector3(
                    ( atom1Pos.x + atom2Pos.x ) / 2,
                    ( atom1Pos.y + atom2Pos.y ) / 2,
                    ( atom1Pos.z + atom2Pos.z ) / 2
                )
                    connection_direction = atom2Pos.clone().sub(atom1Pos.clone())
                    const params = {
                        connection_center: connection_center,
                        connection_length: connection_length,
                        connection_direction: connection_direction
                    }
                    cylinderParams.push(params)
                }
            }
        }
    )
    return cylinderParams
}

export function tmpFactor_coloring(tmpFactor, atom_data) {
    let mean = atom_data.temp_factor_mean

    if ( tmpFactor <= mean ){
        // blue to white
        let scale_blue = ( tmpFactor - atom_data.tmpFactorMinMax[0]) / ( mean - atom_data.tmpFactorMinMax[0])
        let color = new THREE.Color( scale_blue, scale_blue, 1 )
        return color
    } else {
        // white to red
        let scale_red = 1 - ( tmpFactor - mean ) / ( atom_data.tmpFactorMinMax[1] - mean )
        let color = new THREE.Color( 1, scale_red, scale_red)
        return color
    }
}