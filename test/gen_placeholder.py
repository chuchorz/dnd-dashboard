"""Genera una imagen placeholder para el mapa de Barovia."""
from PIL import Image, ImageDraw, ImageFont
import os

w, h = 800, 600
img = Image.new('RGB', (w, h), color=(26, 18, 21))
draw = ImageDraw.Draw(img)

# Borde
draw.rectangle([2, 2, w-3, h-3], outline=(74, 58, 50), width=2)

# Texto central
draw.text((w//2, h//2 - 20), "MAPA DE BAROVIA", fill=(201, 168, 76), anchor='mm')
draw.text((w//2, h//2 + 20), "Coloca mapa-barovia.png en /img/", fill=(138, 122, 106), anchor='mm')

img.save(os.path.join(os.path.dirname(__file__), 'mapa-placeholder.png'))
print("Placeholder generado.")
