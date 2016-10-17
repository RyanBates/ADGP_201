// classic Phong equation
#version 410

//diffuse
uniform vec3 Kd;
uniform vec3 Id;
	
//specular
uniform vec3 Ka;
uniform vec3 Ia;
uniform float specularPower;

//ambient
uniform vec3 Ks;
uniform vec3 Is;

uniform vec3 lightDirection;
uniform vec3 cameraPosition;

in vec4 vNormal;
in vec4 vPosition;
out vec4 fragColour;

void main()
{
	//specular
	vec3 eye = normalize(cameraPosition - vPosition.xyz);
	vec3 N = normalize(vNormal.xyz);
	vec3 lm = normalize(lightDirection);

	vec3 reflection = 2 * dot(lm, N) * N - lm;

	float lambert = max(0, dot(N, lm));

	float a = dot(N,vec3(0,1.f,0));
	vec3 hemisphere = .5f * mix(vec3(255,0,0), vec3(0,0,255), a) * .5f;

	float specularTerm = pow(max( 0, dot( reflection, eye )), specularPower);
	vec3 Specular = Is * Ks * specularTerm;
	
	//diffuse
	vec3 SurfacetoLight = normalize(lightDirection - vNormal.xyz);
	vec3 Diffuse = Id * Kd * lambert;

	//ambient
	vec4 Ambient = vec4(Ia * Ka * hemisphere, 1);


	//fragColour = Ambient;
	//fragColour = vec4(Diffuse, 1);
	//fragColour = vec4(Specular, 1)
	fragColour =  Ambient * .02f + vec4(Diffuse, 1) + vec4(Specular, 1);
}