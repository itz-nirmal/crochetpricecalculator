# Crochet Price Calculator

A modern, user-friendly web application designed for crochet artisans to calculate accurate selling prices for their handmade products. This calculator helps account for material costs, packaging, add-ons, and platform fees.


## Features

### 📝 Input Fields
- **Yarn Weight** - Enter the yarn weight in grams (₹2 per gram)
- **Additional Packaging** - Optional extra packaging costs beyond the standard
- **Custom Margin** - Set your desired profit margin

### 🎁 Optional Add-ons
- Keychain (₹2)
- Soft Eyes (₹2)
- Hair Clip Small (₹2)
- Rubber Band (₹2)
- Hair Clip Large (₹20)

### 💰 Price Calculation
- Standard packaging: ₹10 (included)
- Platform fee: 3% of subtotal
- Complete price breakdown display

### 🎨 UI/UX Features
- Clean, modern design
- Responsive layout (works on mobile and desktop)
- Real-time validation
- Animated result display
- Easy reset functionality

## Pricing Structure

| Component | Cost |
|-----------|------|
| Yarn | ₹2 per gram |
| Standard Packaging | ₹10 (fixed) |
| Additional Packaging | User-defined |
| Add-ons | ₹2 - ₹20 |
| Platform Fee | 3% of subtotal |

## Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs entirely in the browser

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser

That's it! No installation or setup required.

## Project Structure

```
CrochetPriceCalculator/
├── index.html      # Main HTML file
├── script.js      # JavaScript logic
├── style.css      # Styling
├── logo.png       # Project logo
└── Readme.md      # This file
```

## Usage Guide

1. **Enter Yarn Weight** - Input the total weight of yarn used in grams (required field)
2. **Add Packaging Costs** - Optionally add any extra packaging expenses
3. **Select Add-ons** - Check any additional items included with the product
4. **Set Profit Margin** - Enter your desired profit amount
5. **Click Calculate** - View the complete price breakdown
6. **Reset** - Clear all fields to start a new calculation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with flexbox
- **JavaScript (ES6+)** - Interactive functionality

## Customization

### Modifying Yarn Price
To change the yarn price per gram, edit [`script.js`](script.js:8):
```javascript
const YARN_PRICE_PER_GRAM = 2; // Change this value
```

### Modifying Platform Fee
To change the platform fee percentage, edit [`script.js`](script.js:10):
```javascript
const PLATFORM_FEE_PERCENTAGE = 0.03; // 3% = 0.03
```

### Adding New Add-ons
To add new add-ons, edit [`index.html`](index.html:51) and add a new checkbox:
```html
<label class="checkbox-item">
    <input type="checkbox" name="addons" value="10" data-name="New Item">
    <span class="checkbox-label">New Item</span>
    <span class="checkbox-price">₹10</span>
</label>
```

## License

This project is open source and available for personal and commercial use.

## Author

Created for crochet artisans to help price their handmade products accurately.

---

*Made with ❤️ for the crochet community*
