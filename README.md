
# Madrid Signature – Experience Booking App

Book and live the best experiences in Madrid! 
Explore gastronomy, culture, and adventure with a premium interface inspired by wine, wood, and authentic Madrid vibes.

---

## Features

- **SPA in React** with smooth routing and navigation
- **Filterable catalog** by categories: Gastronomy, Culture, Adventure
- **Horizontal experience grid** (premium carousel style)
- **Patanegra & wine-inspired design**: wine, oak, gold, and black tones
- **Full CRUD** for bookings
- **Mock backend (json-server)**, easy to use and customize
- **Responsive**: perfect on mobile, tablet, and desktop

---

## Demo

- [Live app (example)](https://yourdomain.com) <!-- Change to your real URL -->
- [Frontend on GitHub](https://github.com/youruser/travel-booker-frontend)
- [Backend on GitHub](https://github.com/youruser/travel-booker-backend)

---

## Local setup

```bash
# Clone frontend
git clone https://github.com/youruser/travel-booker-frontend.git
cd travel-booker-frontend
npm install

# Clone and start backend (in another terminal)
git clone https://github.com/youruser/travel-booker-backend.git
cd travel-booker-backend
npm install
npm run dev

# Start frontend
npm run dev
```

- The frontend connects by default to `http://localhost:4000` (configurable in `.env`).

---

## Main structure

- `src/components/` – Cards, grids, and reusable UI
- `src/views/` – Main views: Home, Catalog, Bookings, Profile
- `src/services/api.js` – Backend connection logic
- `src/theme.css` – Premium color palette

---

## Customizing experiences

Edit your backend (`db.json` or `experiences.json`) and add free images in the `"image"` field of each experience.  
Example:
```json
{
	"id": 1,
	"title": "Tapas Tour",
	"category": "Gastronomy",
	"price": 45,
	"image": "https://images.unsplash.com/photo-1656423521731-9665583f100c?q=80&w=2072&auto=format&fit=crop",
	"description": "Discover the best tapas in Madrid",
	"city": "Madrid"
}
```

---

## Tech stack

- React 19 + Vite
- React Router v6
- CSS Modules + CSS Variables
- json-server (mock API)
- Unsplash/Pexels for free images

---

## Useful scripts

- `npm run dev` – Start frontend in dev mode
- `npm run build` – Build for production
- `npm run lint` – Lint code

---

## License

MIT.  
Images from Unsplash/Pexels.
