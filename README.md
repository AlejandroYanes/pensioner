# Mintago - Retirement Planner

A comprehensive retirement planning platform built with the [T3 Stack](https://create.t3.gg/), helping users calculate and visualize their pension projections and retirement goals.

## Features

- **Interactive Retirement Calculator**: Input your current financial situation and get personalized pension projections
- **Visual Projections**: Charts showing your pension growth over time with current vs required contributions
- **Real-time Calculations**: Instant updates as you adjust your parameters
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Comprehensive Analysis**: Detailed breakdown of your retirement planning metrics

### Key Calculations

- Projected pension pot based on current contributions
- Required pension pot for desired retirement income
- Contribution recommendations to meet retirement goals
- Visual comparison between current trajectory and retirement targets

## Technology Stack

This project is built using the modern T3 Stack:

- **[Next.js](https://nextjs.org)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[tRPC](https://trpc.io)** - End-to-end typesafe APIs
- **[React Hook Form](https://react-hook-form.com/)** - Performant forms with validation
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[Radix UI](https://www.radix-ui.com/)** - Accessible UI components
- **[Recharts](https://recharts.org/)** - Data visualization

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pensioner
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── retirement-planner/     # Main retirement planning interface
│   │   ├── _components/        # Calculator components
│   │   └── _hooks/            # Business logic hooks
│   └── layout.tsx             # Root layout
├── components/                # Reusable UI components
├── types/                     # TypeScript type definitions
├── utils/                     # Utility functions and calculations
└── styles/                    # Global styles
```

## Core Components

- **Calculator**: Input form for financial parameters
- **Pension Chart**: Visual representation of pension projections
- **Summary**: Overview of current vs required contributions
- **Breakdown**: Detailed analysis of pension calculations

### Notes

- For the **Sumary** I did not understand the objective of the first line, what information was it meant to show.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Learn More

To learn more about the T3 Stack and the technologies used:

- [T3 Stack Documentation](https://create.t3.gg/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Deployment

This application can be deployed on various platforms:

- [Vercel](https://create.t3.gg/en/deployment/vercel) (recommended)
- [Netlify](https://create.t3.gg/en/deployment/netlify)
- [Docker](https://create.t3.gg/en/deployment/docker)

## License

[Add your license information here]
