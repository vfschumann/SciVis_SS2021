//Schumann_Vic-Fabienne__Kopp_Alexandra
//language=GLSL
export const mipShaderFrag =`
    

precision highp float;
precision mediump sampler3D;
precision mediump sampler2D;

uniform sampler3D u_volumeTexture;
uniform vec3 u_volumeTexSize;
uniform vec3 u_dimsBBox;

in vec3 v_texCoord;
in vec3 v_origPos;

out vec4 fragColor;

//maximumIntensityProjection
void main(){
    // TODO: determine MAX_STEPS and stepSize
    int MAX_STEPS ;
    float stepSize  ;
    
    // TODO: implement Maximum Intensity Projection
    for(int i = 0; i < MAX_STEPS; i++){

        //intensity = theta_k * intensity + b_k;

    }

    //fragColor = vec4(178.0/255.0, 34.0/255.0, 34.0/255.0,1.0);
    fragColor = vec4(v_texCoord.x, v_texCoord.y, v_texCoord.z, 1.0);
}
`
