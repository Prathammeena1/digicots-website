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
	float mouseInfluence = smoothstep(uWaveRadius, 0.0, distanceToMouse) * uMouseInfluence;
	
	// Generate random values for each particle based on its position
	float randomX = random(vec2(pos.x * 0.01, pos.y * 0.01));
	float randomY = random(vec2(pos.y * 0.01, pos.x * 0.01 + 17.0));
	float randomTime = random(vec2(pos.x * 0.02, pos.y * 0.02 + 31.0));
	
	// Create continuous animation even without mouse hover
	float timeOffset = randomTime * 6.28; // Random phase offset
	float animationCycle = sin(uTime * 0.5 + timeOffset); // Slow infinite cycle
	
	// Base animation influence (always active)
	float baseInfluence = (animationCycle + 1.0) * 0.1; // 0.0 to 0.6 range
	
	// Combine mouse influence with base animation
	float totalInfluence = max(mouseInfluence, baseInfluence);
	
	// Create floating/falling motion like leaves or petals
	float fallSpeed = 0.3 + randomY * 0.7; // Different fall speeds
	
	// Gentle swaying motion in X axis (like wind)
	float swayX = sin(uTime * fallSpeed + timeOffset) * totalInfluence * uWaveStrength * 0.4;
	
	// Floating motion in Y axis (like gentle falling)
	float floatY = sin(uTime * fallSpeed * 0.7 + timeOffset + 1.57) * totalInfluence * uWaveStrength * 0.3;
	
	// Random spreading direction
	float spreadAngle = randomX * 6.28; // Random angle for each particle
	float spreadDistance = totalInfluence * uWaveStrength;
	
	// Apply random spreading like scattered petals
	pos.x += cos(spreadAngle) * spreadDistance + swayX;
	pos.y += sin(spreadAngle) * spreadDistance + floatY;
	
	// Add gentle rotation effect with continuous animation
	float rotationInfluence = totalInfluence * sin(uTime * 1.5 + timeOffset) * 0.2;
	pos.x += rotationInfluence * (randomX - 0.5) * uWaveStrength * 0.3;
	pos.y += rotationInfluence * (randomY - 0.5) * uWaveStrength * 0.3;
	
	// Particle appearance/disappearance effect
	float appearanceCycle = sin(uTime * 0.3 + randomTime * 6.28);
	float visibility = smoothstep(-0.8, 0.8, appearanceCycle);
	
	// Random point size with smaller range
	float randomSize = 2.25 + randomX * 1.5; // 2.25 to 3.5 range (reduced from 1.5-6.5)
	
	#include <begin_vertex>
	// Use our modified position
	transformed = pos;
	#include <project_vertex>
	
	// Vary point size based on visibility and random size
	gl_PointSize = randomSize * (0.3 + visibility * 0.7);
}