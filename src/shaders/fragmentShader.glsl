
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
    
    // Add copper red color to the white texture
    vec3 copperRed = vec3(0.8, 0.4, 0.5); // Copper red color
    vec3 finalColor = textureColor.rgb * copperRed;
    
    gl_FragColor = vec4(finalColor, textureColor.a);
    
    gl_FragColor.a *= circle(gl_PointCoord, 0.2);
}
