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

    for (let i = 0; i < atom_list.length; i++) {
        const position1 = atom_list[i].pos_vector
        const element1 = atom_list[i].elem;
        const radius1 = vanDerWaal_radii[element1];

        for (let j = 0; j < atom_list.length; j++) {
            const position2 = atom_list[j].pos_vector
            const element2 = atom_list[j].elem;
            const radius2 = vanDerWaal_radii[element2];

            if (position1 != position2) {
                if (position1.distanceTo(position2) <= radius1 * 0.6 + radius2 * 0.6) {
                    //check if the pair exists
                    if (connection_list.findIndex(con => con == { start: position2, end: position1 }) == -1) {
                        connection_list.push({ start: position1, end: position2 })
                    }
                }
            }
        }
    }
    return connection_list
}

export function calculate_connections_elements(atom_data) {
    // TODO: calculate further necessary cylinder parameters
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