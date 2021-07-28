export function sampleVectorField(x,y,t){
    //from https://cgl.ethz.ch/research/visualization/data.php
    // https://cgl.ethz.ch/research/visualization/code/forceddampedduffing2d.py

    const alpha = -0.25;
    const beta = 0.4;

    let u = y;
    let v = alpha * y - x*x*x + x + beta * Math.cos(t);
    return [u,v];
}

// TODO BONUS: Implement the "Four Rotating Centers"