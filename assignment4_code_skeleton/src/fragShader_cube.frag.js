//language=GLSL
export const fragShader_cube =`

// turns on high precision calculation for floats and ints
precision highp float;
precision highp int;

// recieve 'in' from the vertex shader --> which is now interpolated
in vec3 localposVertex;

// default color output
out vec4 out_FragColor;


void main(){
    // assign the interpolated colors to color output
    out_FragColor = ;// TODO
}`