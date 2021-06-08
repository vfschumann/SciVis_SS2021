//language=GLSL
export const fragShader_sphere_perPixel =`

precision highp float;
precision highp int;

out vec4 out_FragColor;
in vec4 posVertex;
in vec3 normalVertex;

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
    // scale with w in case of != 0
    vec3 fragment_pos = posVertex.xyz / posVertex.w;
    // adapt code from shader "vertShader_sphere_perVertex" !
    // TODO:
}`