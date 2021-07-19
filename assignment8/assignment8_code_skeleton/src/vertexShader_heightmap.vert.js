// adapted by: Simon Kochsiek & Rebekka Ziegler
// language=GLSL
export const vertShader =`

    uniform sampler2D heightmap;
    uniform sampler2D colormap;
    uniform float scaleFactor;

    out vec4 posVertex;
    out vec4 normalVertex;
    out vec4 vertex_color;

    void main() {
        ivec2 size = textureSize(heightmap, 0);
        vec3 pos_tmp = position;
        vec2 Vuv = uv;
        float du = 2.0/float(size[0]);
        float dv = 2.0/float(size[1]);
        
        // TODO: implement displacement
        float displacement = texture2D(heightmap, Vuv)[0];
        // subtract displacement  (see upside-down comment in index.js ~ line 132) 
        pos_tmp = vec3(pos_tmp.x, pos_tmp.y - scaleFactor*(displacement-0.5), pos_tmp.z);
        
        // TODO: calculate normals
        float dy_x = texture2D(heightmap, vec2(Vuv.x + du, Vuv.y))[0] - texture2D(heightmap, vec2(Vuv.x - du, Vuv.y))[0];
        float dy_z = texture2D(heightmap, vec2(Vuv.x, Vuv.y + dv))[0] - texture2D(heightmap, vec2(Vuv.x, Vuv.y - dv))[0];
        // two vectors that describe the slope at the given position
        vec3 vector_x = normalize(vec3(du, dy_x , 0.0));
        vec3 vector_z = normalize(vec3(0.0, dy_z, dv));
        normalVertex = vec4(normalize(cross(vector_x,vector_z)),1.0);
        
        // TODO: add color transfer function using the provided colormap
        vertex_color = texture2D(colormap, vec2(displacement, 0.0));

        posVertex = modelMatrix * vec4( pos_tmp, 1.0);
        gl_Position = projectionMatrix * modelViewMatrix * vec4( pos_tmp, 1.0);
    }`