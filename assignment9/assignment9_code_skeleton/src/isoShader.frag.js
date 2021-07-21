//Schumann_Vic-Fabienne__Kopp_Alexandra
//language=GLSL
export const isoShaderFrag =`
    
precision highp float;
precision mediump sampler3D;
precision mediump sampler2D;

uniform sampler3D u_volumeTexture;
uniform vec3 u_volumeTexSize;
uniform vec3 u_dimsBBox;

uniform float u_isoValue;
uniform float u_isoAlphaValue;
uniform bool u_toggleLight;

in vec3 v_texCoord;
in vec3 v_origPos;

out vec4 fragColor;

// isoSurfaceRenderer
void main(){

    // TODO: implement Isosurface Renderer
    
}
`
