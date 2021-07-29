//language=GLSL
// Schumann_Vic-Fabienne__Kopp_Alexandra
export const vertShader  = `

    attribute vec2 texCoords;

    out vec2 v_texCoord;

    void main(){
        v_texCoord = texCoords;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
`
