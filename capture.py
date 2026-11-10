
import sys
from playwright.sync_api import sync_playwright
D=sys.argv[1]; a=int(sys.argv[2]); b_=int(sys.argv[3])
with sync_playwright() as p:
    b=p.chromium.launch(args=["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader","--ignore-gpu-blocklist"])
    pg=b.new_page(viewport={"width":1080,"height":1920})
    pg.goto("file://"+D+"/shader.html")
    for f in range(a,b_):
        pg.evaluate(f"draw({f/30})")
        pg.screenshot(path=f"{D}/fr/{f:04d}.png")
    b.close()
