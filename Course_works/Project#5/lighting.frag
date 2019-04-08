#version 120

//lighting
uniform float uKa, uKd, uKs;    // coefficients of each type of lighting
uniform vec3 uColor;    // object color
uniform vec3 uSpecularColor;    // light color
uniform float uShininess;   // specular exponent

uniform float Ds, Dt;
uniform float uS;

varying vec2 vST;   // texture cords
varying vec3 vN;    // normal vector
varying vec3 vL;    // vector from point to light
varying vec3 vE;    // vector from point to eye

uniform float uTime;
const float PI = 3.14159;

uniform bool fragPattern;

void main( )
{
	//lighting
	vec3 Normal = normalize(vN);
	vec3 Light = normalize(vL);
	vec3 Eye = normalize(vE);
	
	vec3 myColor = uColor;

    if(fragPattern)
    {
        if( -Ds-uS/2. <= vST.s*vST.t && vST.s*vST.t <= Dt+uS/2.)
        {
            myColor = vec3( 0.5, 0.5, 1. );
        }
        if( 1+(-Ds-uS/2.) <= vST.s*vST.t && vST.s*vST.t <= 1+(Dt+uS/2.))
        {
            myColor = vec3( 1., 0.5, .5 );
        }
    }


	float d = max(dot(Normal, Light), 0. ); // only do diffuse if the light can see the point
	vec3 diffuse = uKd * d * uColor;
	float s = 0.;
	if( dot(Normal, Light) > 0. ) // only do specular if the light can see the point
	{
		vec3 ref = normalize( reflect( -Light, Normal ) );
		s = pow(max(dot(Eye, ref),0. ), uShininess);

	}
	vec3 ambient = uKa * myColor;
	vec3 specular = uKs * s * uSpecularColor * 10.;
	gl_FragColor = vec4( ambient + diffuse + specular, 1. );
}
