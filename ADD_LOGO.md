# How to Add Your Company Logo

## Steps to Add Your WhatsApp Image as Logo:

### 1. Copy Your Logo Image
Copy your WhatsApp image "WhatsApp Image 2026-05-08 at 4.33.49 PM.jpeg" to:
```
C:\Users\Ish\Desktop\ADV\public\images\logo.png
```

Or rename it to `logo.png` and place it in the `public/images/` folder.

### 2. The Website Will Automatically Show It
The logo has been added to all pages at:
- Navigation bar (all pages)
- Footer (all pages)
- Admin panel

### 3. Logo Sizes Used:
- **Navigation**: 40x40px (w-10 h-10)
- **Footer**: 40x40px (w-10 h-10)
- **Admin Panel**: 40x40px (w-10 h-10)

### 4. If You Want to Use Different Logo Sizes:
Edit the img tag in HTML files:
```html
<img src="images/logo.png" alt="Advocate Law Logo" class="w-10 h-10 rounded-lg object-cover">
```

Change `w-10 h-10` to:
- `w-12 h-12` for larger
- `w-8 h-8` for smaller

### 5. Recommended Logo Specs:
- **Format**: PNG with transparent background
- **Size**: 200x200px or larger (square)
- **File name**: logo.png
- **Location**: `public/images/logo.png`
