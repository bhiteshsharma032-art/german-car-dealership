import sys
from PIL import Image

def process_logo(src, dst):
    try:
        img = Image.open(src).convert("RGBA")
    except Exception as e:
        print(f"Error opening {src}: {e}")
        return
        
    width, height = img.size
    pixels = img.load()
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            brightness = (r + g + b) / 3.0
            color_diff = max(r,g,b) - min(r,g,b)
            
            # 1. Remove white/light-gray background
            # If it's bright and has low color saturation
            if brightness > 180 and color_diff < 50:
                # We use a threshold to make it transparent
                # completely transparent for > 220
                if brightness > 240:
                    alpha = 0
                else:
                    alpha = int(255 * ((240 - brightness) / 60.0))
                    alpha = max(0, min(a, alpha))
                pixels[x, y] = (r, g, b, alpha)
                
            # 2. Convert dark text to white so it's visible on dark backgrounds
            elif brightness < 150 and color_diff < 60:
                # It's a dark pixel (likely the black text)
                # Map brightness to keep some anti-aliasing details
                pixels[x, y] = (255, 255, 255, a)
                
    img.save(dst)
    print(f"Saved {dst}")

process_logo("logo.png", "logo_processed.png")
