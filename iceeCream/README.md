# Simply Scoop - Ice Cream Website

A modern, responsive website for Simply Scoop ice cream shop featuring a beautiful UI with interactive elements and a modal display for ice cream details.

## 📋 Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Basic understanding of web development
- Text editor (VS Code, Sublime Text, or similar)

## 🗂️ Project Structure

```
simply-scoop/
│
├── index.html
├── styles.css
├── script.js
│
└── images/
    ├── Trinity.jpg
    ├── funTimeVanilla.jpg
    └── FairyPink.jpg
```

## 🚀 Getting Started

1. **Clone or Download the Repository**
   ```bash
   git clone <repository-url>
   # or download and extract the ZIP file
   ```

2. **Set Up the Images**
   - Create an `images` folder in the root directory
   - Add your ice cream images with these exact names:
     - `Trinity.jpg` (Neapolitan ice cream)
     - `funTimeVanilla.jpg` (Vanilla soft serve)
     - `FairyPink.jpg` (Pink ice cream with sprinkles)

3. **Running the Website**
   
   Option 1: Using VS Code (Recommended)
   - Install Visual Studio Code
   - Install the "Live Server" extension
   - Right-click on `index.html` and select "Open with Live Server"

   Option 2: Direct Browser Opening
   - Simply double-click the `index.html` file to open it in your default browser
   
## 🎨 Features

- Responsive design that works on all devices
- Interactive ice cream cards with hover effects
- Modal windows with detailed information about each ice cream
- Smooth animations and transitions
- Clean and modern UI

## 📱 Responsive Breakpoints

The website is fully responsive with the following breakpoints:
- Mobile: < 768px
- Tablet & Desktop: ≥ 768px

## 🎯 Key Components

1. **Header**
   - Fixed position at the top
   - Centered "Simply Scoop" logo
   - Eggplant purple background with teal text

2. **Ice Cream Cards**
   - Hover animations
   - Click to view details
   - Responsive grid layout

3. **Modal Window**
   - Detailed ice cream information
   - Ingredients list
   - Pricing
   - High-resolution images

4. **Footer**
   - Contact information
   - Business hours
   - Location details

## 🛠️ Customization

### Colors
The website uses CSS variables for easy color customization:
```css
:root {
    --eggplant: #483248;
    --teal: #40E0D0;
    --black: #000000;
    --white: #ffffff;
}
```

### Images
To replace the ice cream images:
1. Maintain the same file names
2. Place new images in the `images` folder
3. Recommended image dimensions: 800x600px
4. Use JPG format for best performance

## 🔍 Troubleshooting

1. **Images Not Loading**
   - Check if the `images` folder exists
   - Verify image file names match exactly
   - Ensure images are in JPG format

2. **Modal Not Working**
   - Check if JavaScript is enabled in your browser
   - Verify `script.js` is in the root directory
   - Check browser console for errors

3. **Styles Not Applied**
   - Verify `styles.css` is in the root directory
   - Clear browser cache
   - Check if file paths are correct

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📧 Support

For support or questions, please open an issue in the repository or contact us at info@simplyscoop.com 