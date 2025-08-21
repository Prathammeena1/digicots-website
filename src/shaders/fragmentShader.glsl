
uniform sampler2D uTexture;
uniform float uNbColumns;
uniform float uNbLines;
varying vec2 vTexCoords;

float circle(vec2 uv, float border) {
    float radius = 0.5;
    float dist = radius - distance(uv, vec2(0.5));
    return smoothstep(0.0, border, dist);
}

void main() {
    // We get the coordinate inside 1 particle: gl_PointCoord
    vec2 uv = gl_PointCoord;
    
    // Convert position coordinates from centered (-nbCol/2 to nbCol/2) to normalized (0 to 1)
    // vTexCoords contains the raw position (i, j) from the loop
    float normalizedX = (vTexCoords.x + uNbColumns * 0.5) / uNbColumns;
    float normalizedY = (vTexCoords.y + uNbLines * 0.5) / uNbLines;
    
    // Calculate texture coordinates based on particle position
    float texOffsetU = normalizedX;
    float texOffsetV = normalizedY; // No Y flip
    
    // Get the texture coordinates for this specific particle
    uv = vec2(texOffsetU, texOffsetV);
    
    vec4 textureColor = texture2D(uTexture, uv);
    
    // Use #FD4161 color for the effect
    vec3 effectColor = vec3(255.0/255.0, 149.0/255.0, 177.0/255.0); // #ff95b1ff precise RGB
    gl_FragColor = vec4(effectColor, textureColor.a);
    gl_FragColor.a *= circle(gl_PointCoord, 0.2);
}
