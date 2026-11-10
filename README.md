# Diwali lamps -> heart (Day 15 of 100)

70 diyas light up one by one into a glowing heart, drawn entirely by one GLSL fragment shader (`shader.frag`).

- `shader.frag` - the shader (heart curve, flickering flames, sparks, bloom)
- `render.html` - WebGL page that runs the shader; call `draw(seconds)` to render a frame
- `capture.py` - Playwright script that steps `draw()` at 30 fps and saves PNG frames

Render: `mkdir fr && python3 capture.py $PWD 0 510` then `ffmpeg -framerate 30 -i fr/%04d.png -pix_fmt yuv420p out.mp4`.

By @hack.n.code - 100 Days Daily Reel Challenge.
