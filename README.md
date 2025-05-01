# Resume ATS Tracker

An application for analyzing and tracking resume performance against Applicant Tracking Systems (ATS).

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Rustix69/ResumeFrontend.git
cd ResumeFrontend
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Environment Setup:
   
   Create a `.env.local` file in the root directory with the following variables:
   ```
   BASE_URL=http://localhost:8000
   ```
   
   This environment variable points to your backend API service.

4. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Tech Stack

### Frontend
- **Next.js** - React framework for server-rendered applications
- **TypeScript** - Static type checking
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible UI components
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Framer Motion** - Animation library
- **PDF Processing** - jspdf and html2canvas
- **Recharts** - Composable charting library
- **Three.js** - 3D graphics library

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **TypeScript** - Static type checking

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
