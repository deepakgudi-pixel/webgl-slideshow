const frag = `

#ifdef GL_ES
precision highp float;
#endif

#define MAX 6

uniform float u_time;
uniform vec2 U_resolution;

uniform float timeline;

uniform sampler2D image1;
uniform sampler2D image2;
uniform sampler2D image3;
uniform sampler2D image4;
uniform sampler2D textures[MAX];

uniform int startIndex;
uniform int endIndex;

varying vec3 v_normal;
varying vec2 v_texcoord;


${includes}

vec4 sampleColor(int index, vec2 uv){
    if (index == 0){
       return texture2D(image1, uv);
    }else if (index == 1){
       return texture2D(image2, uv);
    }else if (index == 2){
        return texture2D(image3, uv); 
    }else if (index == 3){
        return texture2D(image4, uv);
    }
     return vec4(1.0, 1.0, 1.0, 1.0);
   }
   
   
   void main(void)
   {
   
       vec2 uv = v_texcoord;
       uv -= 0.5;
       
       float amplitude = 3.5;
       
       float wave = fbm(amplitude * uv + 0.2 * u_time);
       
       //creating fade in and fade out using timelines
       float strength = smoothstep(0.0, 2.0, timeline) - smoothstep(2.0, 3.0, timeline);
       
       float distortion = mix(1., 1.0 + strength, wave);
       
       uv *= distortion;
       uv += 0.5;
       
       //flip the texture
       uv.y = 1.0 - uv.y;
       
       //get rid of extras
       if(uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0 ){
         discard;
       }
       
       //pick images
       vec4 startTexture = sampleColor(startIndex, uv);
       vec4 endTexture = sampleColor(endIndex, uv);
       
       
       //tween
       float changeTimeline = smoothstep(0.5, 2., timeline);
       float mixer = 1.0 - step(changeTimeline, wave);
       
       vec4 color = mix(startTexture, endTexture, mixer);
       
       gl_FragColor = color;
   }
   




`