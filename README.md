  # Track Manager 🎵

Track management web application developed as part of an academy project.

## 🧰 Tech Stack

- **Next.js v15**
- **React Query**
- **React Hook Form**
- **Zod**
- **Tailwind CSS**
- **shadcn/ui**

## 🚀 Features

- Track Management via Modals  
- Create Track Form with Metadata Handling  
- Edit and Update Track Metadata  
- Audio File Upload and Playback  
- List View with Sorting, Filtering, and Search  
⚠️ No additional features beyond the scope were implemented.

## 📦 Getting Started

To run the project locally:

```bash
# Install dependencies
npm install

# Start the development server
npm start
```
Then open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## 📐 Building Setup & Optimization

This project includes several improvements to performance and DX:

- **Code Splitting** – components like modals are dynamically loaded only when needed
- **Lazy Loading** – heavy parts of the UI (e.g. audio player) load only on demand
- **Tree Shaking** – unused code is automatically removed during build
- **Source Maps** – production builds include source maps for easier debugging
- **Bundle Analyzer** – you can visualize the final JS bundle size (see below)
- **Environment Variables** – all configurable settings are moved to `.env.local`
- **gRPC/REST Switch** – architecture allows dynamic API switching via `.env`

## 📊 Bundle Analysis

To analyze the final bundle and see its size:

```bash
ANALYZE=true npm run build
```