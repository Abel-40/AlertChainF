# AlertChain Frontend

A modern, real-time cryptocurrency price alert tracking application built with Vue 3, TypeScript, and Tailwind CSS.

![Vue.js](https://img.shields.io/badge/Vue.js-3.3-4FC08D?logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

- **Real-time Crypto Tracking** - Monitor your favorite cryptocurrencies with live price updates
- **Smart Price Alerts** - Set custom alerts for when prices go above or below your target
- **Beautiful UI** - Modern glassmorphism design with smooth animations and gradients
- **Asset Management** - Search, add, and track up to 10 cryptocurrencies
- **Price History** - Visualize historical price data with interactive charts
- **Notifications** - Get notified when your alerts are triggered
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Authentication** - Secure login/register with JWT tokens
- **Dark Mode** - Eye-friendly dark theme

## 📸 Screenshots

### Dashboard
![Dashboard](./screenshots/dashboard.png)

### Asset Search
![Asset Search](./screenshots/asset-search.png)

### Asset Details
![Asset Details](./screenshots/asset-detail.png)

### Price Alerts
![Alerts](./screenshots/alerts.png)

## Tech Stack

### Frontend
- **Framework**: Vue 3 (Composition API)
- **Language**: TypeScript
- **State Management**: Pinia
- **Routing**: Vue Router
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS 4
- **UI Components**: Custom glassmorphism components
- **Icons**: Lucide Icons
- **Forms**: Vee-Validate + Zod
- **Charts**: Lightweight Charts
- **Build Tool**: Vite

### Backend API
- FastAPI (Python)
- PostgreSQL
- Redis (caching)
- Celery (background tasks)

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn
- Backend API running (see [crypto_mate](https://github.com/yourusername/crypto_mate))

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/alertchain-frontend.git
   cd alertchain-frontend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file:
   ```env
   # Backend API URL
   VITE_API_BASE_URL=http://localhost:8080
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏃‍♂️ Running the Application

### Development
```bash
pnpm dev
```

### Build for Production
```bash
pnpm build
```

### Preview Production Build
```bash
pnpm preview
```

### Type Checking
```bash
pnpm check
```

### Format Code
```bash
pnpm format
```

##  Project Structure

```
alertchain-frontend/
├── client/
│   ├── index.html                     # Vite HTML entry
│   └── src/
│       ├── components/                # Shared Vue components
│       │   ├── data-display/          # Dashboard metric cards
│       │   ├── layout/                # Branding, headers, section shells
│       │   ├── navigation/            # Sidebar, tabs, and mobile nav
│       │   └── ui/                    # Base UI primitives
│       ├── composables/               # Reusable Vue composition utilities
│       ├── constants/                 # App navigation and static config
│       ├── layouts/                   # Auth and dashboard page layouts
│       ├── lib/                       # Shared helper functions
│       ├── router/                    # Route definitions and guards
│       ├── services/                  # API client layer
│       ├── stores/                    # Pinia state modules
│       ├── styles/                    # Design tokens and CSS utilities
│       ├── types/                     # Shared TypeScript types
│       ├── views/
│       │   └── auth/                  # Login, register, forgot/reset password pages
│       ├── App.vue                    # Root app shell
│       ├── index.css                  # Global CSS entry
│       └── main.ts                    # Vue bootstrap
├── patches/                           # Local package patches
├── server/
│   └── index.ts                       # Express server entry for production builds
├── shared/
│   └── const.ts                       # Shared constants used across app/server
├── .env                               # Local environment variables
├── .env.example                       # Environment template
├── docker-compose.yml                 # Docker dev setup
├── Dockerfile                         # Container image definition
├── package.json                       # Scripts and dependencies
├── tsconfig.json                      # TypeScript config
├── vite.config.ts                     # Vite configuration
└── README.md
```

## Key Features

### Asset Management
- **Search Assets**: Search for cryptocurrencies by name
- **Track Assets**: Add up to 10 assets to your watchlist
- **Asset Details**: View detailed information including price history
- **Remove Assets**: Remove assets from your watchlist

### Price Alerts
- **Create Alerts**: Set alerts for when price goes above/below target
- **Active Alerts**: View all your active alerts
- **Alert History**: Track triggered alerts

### Notifications
- **Real-time Updates**: Get notified when alerts are triggered
- **Mark as Read**: Manage your notifications
- **Unread Count**: See how many notifications you have

### User Experience
- **Smooth Animations**: Beautiful transitions and hover effects
- **Loading States**: Skeleton loaders for better perceived performance
- **Error Handling**: User-friendly error messages
- **Responsive**: Works on all screen sizes

## 🔗 API Integration

This frontend connects to the AlertChain backend API. Make sure the backend is running before starting the frontend.

**Backend Repository**: [AlertChain](https://github.com/Abel-40/AlertChain)

### API Endpoints Used

- `POST /alertchain/auth/*` - Authentication
- `GET /alertchain/assets/popular` - Get popular assets
- `GET /alertchain/assets/search` - Search assets
- `GET /alertchain/assets/tracked` - Get user's tracked assets
- `POST /alertchain/assets/add/` - Add assets to database
- `GET /alertchain/assets/detail/{id}` - Get asset details
- `GET /alertchain/assets/price/snapshot/{id}` - Get price history
- `DELETE /alertchain/assets/tracked/{id}` - Remove asset
- `GET /alertchain/alerts/*` - Manage price alerts
- `GET /alertchain/notifications/*` - Manage notifications

## Customization

### Theme
The application uses Tailwind CSS with custom configuration. Edit `tailwind.config.ts` to customize:
- Colors
- Spacing
- Typography
- Animations

### Components
All UI components are located in `client/src/components/ui/`. You can customize or extend them as needed.

##  Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Docker
```bash
docker build -t alertchain-frontend .
docker run -p 80:80 alertchain-frontend
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Abel** - *Initial work* - [Abel-40](https://github.com/Abel-40)

## 🙏 Acknowledgments

- [Vue.js](https://vuejs.org/) - The Progressive JavaScript Framework
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [CoinGecko API](https://www.coingecko.com/api) - Cryptocurrency data
- [Pinia](https://pinia.vuejs.org/) - The Vue Store that enjoys updating
- [Lucide Icons](https://lucide.dev/) - Beautiful & consistent icons

##  Support

If you have any questions or need help, please open an issue or contact me directly.

## 🔮 Future Enhancements

- [ ] Price prediction charts
- [ ] Portfolio performance tracking
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] Multi-currency support
- [ ] Social features (share alerts)
- [ ] Advanced charting tools
- [ ] Watchlist categories

---

Made with  by [Abel](https://github.com/Abel-40)
