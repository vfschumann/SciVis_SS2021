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


    vec3 camera_direction = normalize( cameraPosition - posVertex.xyz);

    vec3 lightDirNormalized = normalize(lightDir);

    vec4 ambientTerm  = ambientColor * ambientLightIntensity;

    vec4 diffuseTerm  = diffuseColor * diffSpecLightIntensity * clamp( max( dot( normalVertex,  lightDirNormalized ),0.0 ), 0.0, 1.0 );

    vec3 reflection = reflect(-lightDirNormalized, normalVertex);

    float Ispec = pow( max( 0.0, dot ( reflection, camera_direction )), sphereShininess );

    vec4 specularTerm = specularColor * diffSpecLightIntensity * clamp( Ispec, 0.0, 1.0 );

    out_FragColor = ambientTerm + diffuseTerm + specularTerm;
}`