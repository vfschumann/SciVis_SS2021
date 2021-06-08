//language=GLSL
export const vertShader_sphere_perPixel =`

// pass vertex coordinate in world space to fragment shader
out vec4 posVertex;
// normals of current vertex: we have to pass this variable to this fragment shader because it order to interpolate the normals
out vec3 normalVertex;

void main() {
    posVertex = ;// TODO
    normalVertex = ;// TODO
    gl_Position = ;// TODO
}`