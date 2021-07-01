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
    // transfer rgb values to percentages
    // got help from Rebecca & Simon
    let valueRange = atom_data.tmpFactorMinMax[0] - atom_data.tmpFactorMinMax[1];
    let percentage = ( (tmpFactor - atom_data.tmpFactorMinMax[0]) ) / ( valueRange );
    let r,g,b = 0;
    // let color;

    if (percentage <= 0.5) {
        r = math.round(255 * (2 * percentage));
        g = math.round(255 * (2 * percentage));
        b = 255;
        // color = [1, (math.round(1*(2*percentage))), (math.round(1*(2*percentage)))]
    // } else if (percentage == atom_data.temp_factor_mean) {
    //     r = 255;
    //     g = 255;
    //     b = 255;
    //     //  color = [1, 1, 1]
    } else {
        r = 255;
        g = math.round(510 - percentage*510);
        b = math.round(510 - percentage*510);
        // color = [(math.round(1*(2*percentage))), (math.round(1*(2*percentage))), 1]
    }
    console.log("r",r,"g",g,"b",b)
    let h = r * 0x10000 + g * 0x100 + b * 0x1;
    return '#' + ('000000' + h.toString(16)).slice(-6);
    // return color
}