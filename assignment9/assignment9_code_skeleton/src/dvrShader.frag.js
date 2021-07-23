//Schumann_Vic-Fabienne__Kopp_Alexandra
//language=GLSL
export const dvrShaderFrag =`
    
precision highp float;
precision mediump sampler3D;
precision mediump sampler2D;

uniform sampler3D u_volumeTexture;
uniform sampler2D u_tfTexture;
uniform vec3 u_volumeTexSize;
uniform vec3 u_dimsBBox;

uniform bool u_toggleLight;

in vec3 v_texCoord;
in vec3 v_origPos;

out vec4 fragColor;

//directVolumeRenderer
void main(){


    // TODO: implement Direct Volume Renderer

}
`
