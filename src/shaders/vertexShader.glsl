uniform float uPointSize;
uniform vec2 uMouse;
uniform float uTime;
uniform float uWaveStrength;
uniform float uWaveRadius;
uniform float uMouseInfluence;

varying vec2 vTexCoords;

// Simple noise function for randomness
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
	vTexCoords = position.xy;
	
	vec3 pos = position;
	
	// Calculate distance from mouse to current particle
	float distanceToMouse = distance(vec2(pos.x, pos.y), uMouse);
	
	// Create spreading effect based on distance to mouse
	float influence = smoothstep(uWaveRadius, 0.0, distanceToMouse) * uMouseInfluence;
	
	// Generate random values for each particle based on its position
	float randomX = random(vec2(pos.x * 0.01, pos.y * 0.01));
	float randomY = random(vec2(pos.y * 0.01, pos.x * 0.01 + 17.0));
	float randomTime = random(vec2(pos.x * 0.02, pos.y * 0.02 + 31.0));
	
	// Create floating/falling motion like leaves or petals
	float timeOffset = randomTime * 6.28; // Random phase offset
	float fallSpeed = 0.3 + randomY * 0.7; // Different fall speeds
	
	// Gentle swaying motion in X axis (like wind)
	float swayX = sin(uTime * fallSpeed + timeOffset) * influence * uWaveStrength * 0.5;
	
	// Floating motion in Y axis (like gentle falling)
	float floatY = sin(uTime * fallSpeed * 0.7 + timeOffset + 1.57) * influence * uWaveStrength * 0.3;
	
	// Random spreading direction
	float spreadAngle = randomX * 6.28; // Random angle for each particle
	float spreadDistance = influence * uWaveStrength;
	
	// Apply random spreading like scattered petals
	pos.x += cos(spreadAngle) * spreadDistance + swayX;
	pos.y += sin(spreadAngle) * spreadDistance + floatY;
	
	// Add gentle rotation effect
	float rotationInfluence = influence * sin(uTime * 2.0 + timeOffset) * 0.2;
	pos.x += rotationInfluence * (randomX - 0.5) * uWaveStrength * 0.3;
	pos.y += rotationInfluence * (randomY - 0.5) * uWaveStrength * 0.3;
	
	#include <begin_vertex>
	// Use our modified position
	transformed = pos;
	#include <project_vertex>
	
	gl_PointSize = uPointSize;
}