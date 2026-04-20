import sys
from PIL import Image

def remove_white(src, dst):
    try:
        img = Image.open(src).convert("RGBA")
    except Exception as e:
        print(f"Failed to open {src}: {e}")
        return
        
    width, height = img.size
    pixels = img.load()
    
    # Simple flood fill from corners isn't enough because of enclosed spaces (like inside letters 'O', 'D', 'R', etc.)
    # However, for a simple logo, just thresholding white works beautifully if the logo has no white inside.
    # To reduce hard edges, we can apply an alpha mask based on brightness!
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            # Calculate brightness relative to 255
            brightness = (r + g + b) / 3.0
            
            # If all are close to 255, we reduce alpha.
            # But we want black (0) to stay 255 alpha.
            # And red (say 200, 50, 50) to stay 255 alpha.
            # So let's check max component and min component.
            
            # If the pixel is very close to white (brightness > 220 and difference between max and min color < 30)
            if brightness > 220 and (max(r,g,b) - min(r,g,b)) < 40:
                # Calculate alpha drop off:
                # higher brightness = lower alpha
                # 220 -> 255 alpha
                # 255 -> 0 alpha
                alpha = int(255 - ((brightness - 220) / 35.0) * 255)
                alpha = max(0, min(255, alpha))
                pixels[x, y] = (r, g, b, alpha)
                
    img.save(dst)
    print(f"Saved {dst}")

remove_white("logo.jpeg", "logo_transparent.png")
remove_white("logo.png", "logo_transparent2.png")
