precision highp float;
uniform vec2 R;
uniform float T;

float h(float n){
  return fract(sin(n * 91.7) * 4375.5);
}

vec2 heart(float a, float s){
  float x = 16. * sin(a) * sin(a) * sin(a);
  float y = 13. * cos(a) - 5. * cos(2. * a)
        - 2. * cos(3. * a) - cos(4. * a);
  return vec2(x, y + 2.) * s + vec2(0., .03);
}

vec3 diya(vec2 p, vec2 c, float on, float k){
  vec2 d = p - c;
  float fl = 1. + .15 * sin(T * 11. + k * 5.);
  float bowl = smoothstep(.003, -.003,
    length(vec2(d.x * .8, d.y * 1.9 + .006))
    - .011)
    * step(d.y, .002);
  float flame = smoothstep(.02, .0,
    length(vec2(d.x * 2.2, (d.y - .014) * .75)));
  float glow = .00022 * fl / (dot(d, d) + .00006);
  vec3 c1 = vec3(.45, .17, .06) * bowl
          * (.4 + on);
  vec3 c2 = vec3(1., .72, .25) * flame * fl;
  vec3 c3 = vec3(1., .5, .12) * glow;
  return c1 + on * (c2 + c3);
}

void main(){
  vec2 p = (gl_FragCoord.xy - .5 * R) / R.x;
  vec3 col = mix(vec3(.2, .03, .08),
                 vec3(.03, .01, .09), p.y + .5);

  for (int i = 0; i < 36; i++) {
    float f = float(i);
    vec2 s = vec2(h(f) - .5,
      mod(h(f + 9.) * 2. - T * (.02 + .04
      * h(f + 3.)), 1.9) - .95);
    s.x += .02 * sin(T + f);
    vec2 d = p - s;
    col += vec3(1., .65, .25) * .00006
         / (dot(d, d) + .00003);
  }

  for (int i = 0; i < 44; i++) {
    float a = 6.2832 * float(i) / 44.;
    float t0 = 1. + abs(a - 3.1416) / 3.1416 * 6.;
    float on = smoothstep(0., .35, T - t0);
    col += diya(p, heart(a + .07, .0235),
                on, float(i));
  }

  for (int i = 0; i < 26; i++) {
    float a = 6.2832 * float(i) / 26.;
    float t0 = 7.6 + abs(a - 3.1416)
             / 3.1416 * 2.4;
    float on = smoothstep(0., .35, T - t0);
    col += diya(p, heart(a + .1, .0143),
                on, float(i) + 50.);
  }

  float beat = 1. + .04 * sin(T * 6.)
             * step(10.5, T);
  vec2 q = (p - vec2(0., .03)) / (.225 * beat);
  q.y += .1;
  float u = q.x * q.x + q.y * q.y - 1.;
  float m = u * u * u
          - q.x * q.x * q.y * q.y * q.y;
  float fill = smoothstep(.3, -.9, m);
  col += vec3(1., .35, .25) * fill * .4
       * smoothstep(10.2, 12.5, T);

  float w = T - 10.2;
  float r = length(p - vec2(0., .03));
  float ring = exp(-pow((r - w * .5) * 22., 2.));
  col += vec3(1., .8, .45) * ring
       * step(0., w) * exp(-w * 1.3);

  gl_FragColor = vec4(pow(col, vec3(.9)), 1.);
}
