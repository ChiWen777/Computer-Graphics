#version 120

//lighting
varying vec2 vST; // texture coords
varying vec3 vN; // normal vector
varying vec3 vL; // vector from point to light
varying vec3 vE; // vector from point to eye
uniform float uTime;
const float PI = 3.14159;
const float YMIN = -5.;
const float YMAX = 1.;

uniform bool vertPattern;

vec3 LightPosition = vec3( 5., 5., 0. );

void main( )
{
    //lighting
    vST = gl_MultiTexCoord0.st;
    vec4 ECposition = gl_ModelViewMatrix * gl_Vertex;
    vN = normalize( gl_NormalMatrix * gl_Normal ); // normal vector
    vL = LightPosition - ECposition.xyz; // vector from the point to the light position
    vE = vec3( 0., 0., 0. ) - ECposition.xyz; // vector from the point to the eye position
    
    vec3 vert = gl_Vertex.xyz;
    if(vertPattern)
    {
        float t = smoothstep( YMIN, YMAX, gl_Vertex.y );
        float scale = mix(cos(uTime* PI), 1., t);
        vert = gl_Vertex.xyz;
        vert.x = vert.x *scale;
        vert.z = vert.z *scale;
        
        
    }
    
    gl_Position = gl_ModelViewProjectionMatrix * vec4(vert, 1.);
}
