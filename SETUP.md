# Setup Instructions

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**

## Installation Steps

### 1. Install Dependencies

Open PowerShell or Command Prompt in the project directory and run:

```bash
npm install
```

Or if you prefer yarn:

```bash
yarn install
```

This will install all required packages:
- React & React DOM
- TypeScript
- Vite
- Tailwind CSS
- Chart.js & React-ChartJS-2
- Lucide React (icons)
- And all dev dependencies

### 2. Start Development Server

```bash
npm run dev
```

Or with yarn:

```bash
yarn dev
```

The application will start at `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### 4. Preview Production Build

```bash
npm run preview
```

## Troubleshooting

### PowerShell Script Execution Error

If you get an error about script execution being disabled:

1. Open PowerShell as Administrator
2. Run: `Set-ExecutionPolicy RemoteSigned`
3. Type `Y` to confirm

### Port Already in Use

If port 5173 is already in use, Vite will automatically use the next available port.

## Project Structure

```
krishi-setu-ai/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Sidebar.tsx      # Left navigation sidebar
│   │   ├── TopBar.tsx       # Top navigation bar
│   │   ├── ProfitAnalyzer.tsx  # Profit analyzer form
│   │   └── PriceChart.tsx   # Chart.js price chart
│   ├── pages/               # Page components
│   │   └── PricePrediction.tsx  # Main prediction page
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Entry point
│   ├── index.css            # Global styles + Tailwind
│   └── vite-env.d.ts        # TypeScript definitions
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json             # Dependencies & scripts
├── tsconfig.json            # TypeScript config
├── vite.config.ts           # Vite config
├── tailwind.config.js       # Tailwind CSS config
└── postcss.config.js        # PostCSS config
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Next Steps

1. Customize the components in `src/components/`
2. Add your API integration in `src/pages/PricePrediction.tsx`
3. Update colors and theme in `tailwind.config.js`
4. Add more pages as needed

## Support

For issues or questions, refer to:
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
