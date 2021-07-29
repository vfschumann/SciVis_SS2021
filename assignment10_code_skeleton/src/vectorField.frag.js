//language=GLSL
// Schumann_Vic-Fabienne__Kopp_Alexandra
export const vectorFieldFrag =`

precision highp float;
precision mediump sampler3D;
precision mediump sampler2D;

uniform sampler2D u_vecFieldTex;
uniform sampler2D u_noiseTexture;

in vec2 v_texCoord;

out vec4 fragColor;

void main(){
    vec2 UVpos = v_texCoord;
    vec2 vecVal = normalize(texture(u_vecFieldTex, UVpos).rg);

   // TODO: LIC (Line Integral Convolution)
    
    fragColor =  vec4(vecVal.r,vecVal.g,0.0,1.0);
}
`
