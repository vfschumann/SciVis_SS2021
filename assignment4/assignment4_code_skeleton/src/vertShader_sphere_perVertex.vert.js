//Schumann_Vic-Fabienne__Kopp_Alexandra
//language=GLSL
export const vertShader_sphere_perVertex =`

// colors calculated for the vertex
out vec4 per_vertexShading;

// sphere settings
uniform vec3 sphereCenter;
uniform float sphereShininess;

// light-settings
uniform vec3 lightDir;
uniform vec4 specularColor;
uniform vec4 ambientColor;
uniform vec4 diffuseColor;
uniform vec4 diffSpecLightIntensity;
uniform vec4 ambientLightIntensity;

void main() {
    /* you can always access the transformation matrices (mat4) with the following variable names
    => "modelMatrix", "viewMatrix", "modelViewMatrix" and "projectionMatrix" */

    // transform world coordinates from local to world space
    vec4 pos = ;// TODO
    // also predefine variable: "cameraPosition" (vec3)
    // calculate the direction from vertex to camera
    vec3 camera_direction = ;// TODO;

    // direction from origin to light
    vec3 lightDirNormalized = ;// TODO

    // with this we have all vector needed to calculate shading for this vertex
    // Phong-shading:
    // Iamb = Ia*ka
    vec4 ambientTerm  = ;// TODO

    // also predefined variable: "normal" (vec3)
    // Idiff = IiKd(L*N)  result has to be between 0-1
    vec4 diffuseTerm  = ;// TODO


    // calculate reflection (keep in mind the direction of the vectors: specular highlight in the right place?)
    vec3 reflection = ;// TODO
    // Ispec = (R*C)^n
    float Ispec = ;// TODO
    // IiKs(Ispec) = IiKs(R*C)^n
    vec4 specularTerm = ;// TODO

    // build the final Phong reflection term for the vertex
    per_vertexShading = ;// TODO
    // as this is a regular vertex shader we still have to output the transformed vertex positions to the fragment shader
    gl_Position = ;// TODO
}`
