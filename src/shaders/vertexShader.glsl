uniform float uPointSize;
uniform vec2 uMouse;
uniform float uTime;
uniform float uWaveStrength;
uniform float uWaveRadius;

varying vec2 vTexCoords;

void main() {
	vTexCoords = position.xy;
	
	vec3 pos = position;
	
	// Calculate distance from mouse to current particle
	float distanceToMouse = distance(vec2(pos.x, pos.y), uMouse);
	
	// Create wave effect based on distance to mouse
	float wave = smoothstep(uWaveRadius, 0.0, distanceToMouse);
	
	// Apply Z displacement
	pos.z += wave * uWaveStrength * sin(uTime * 3.0 + distanceToMouse * 0.1);
	
	#include <begin_vertex>
	// Use our modified position
	transformed = pos;
	#include <project_vertex>
	
	gl_PointSize = uPointSize;
}