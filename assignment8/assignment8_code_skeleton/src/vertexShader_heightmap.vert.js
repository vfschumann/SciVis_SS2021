//language=GLSL
export const vertShader =`

    uniform sampler2D heightmap;
    uniform sampler2D colormap;

    out vec4 posVertex;
    out vec3 normalVertex;
    out vec4 vertex_color;

    void main() {
        ivec2 size = textureSize(heightmap, 0);
        vec3 pos_tmp = position;
        vec2 Vuv = uv;

        // TODO: implement displacement
        // TODO: calculate normals
        // TODO: add color transfer function using the provided colormap

        vertex_color = vec4 (0.5, 0.5, 0.5, 1.0);
        posVertex = modelMatrix * vec4( pos_tmp, 1.0);
        gl_Position = projectionMatrix * modelViewMatrix * vec4( pos_tmp, 1.0);
    }`