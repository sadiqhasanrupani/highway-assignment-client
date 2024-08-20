# Highway Client

This is the frontend of the Highway Assignment project, built using [Vite](https://vitejs.dev/) and [React](https://reactjs.org/). This documentation provides a guide for setting up, running, and understanding the structure of the project.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Deployment](#deployment)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To get started with the project, you'll need to clone the repository and install the necessary dependencies.

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/highway-assignment-client.git
   cd highway-assignment-client
   ```

2. **Install dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

## Project Structure

The project follows a standard React structure. Here's an overview:

```
highway-assignment-client/
├── public/               # Static assets (index.html, icons, etc.)
├── src/                  # Source files
│   ├── assets/           # Images, fonts, etc.
│   ├── components/       # Reusable React components
│   ├── core/             # Animated React components
│   ├── pages/            # React pages
│   ├── routes/           # React Router configuration
│   ├── http/             # API calls
│   ├── App.jsx           # Main App component
│   ├── main.jsx          # Entry point of the app
│   └── ...
├── .gitignore            # Git ignore file
├── index.html            # HTML template
├── package.json          # Node.js dependencies and scripts
├── README.md             # This file
└── vite.config.js        # Vite configuration
```

## Available Scripts

In the project directory, you can run:

- **`npm run dev`** or **`yarn dev`**: Starts the development server with hot reloading.

- **`npm run build`** or **`yarn build`**: Builds the app for production in the `dist` folder.

- **`npm run preview`** or **`yarn preview`**: Serves the production build locally to preview.

- **`npm run lint`** or **`yarn lint`**: Lints the code for potential errors.

## Environment Variables

To configure the project, create a `.env` file in the root directory. Here's an example:

```bash
VITE_API_URL=http://localhost:8080/api/v1
```

## Usage

After setting up, you can start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Deployment

The project can be deployed to any static hosting provider, such as Vercel, Netlify, or GitHub Pages.

To deploy, first build the project:

```bash
npm run build
```

Then, deploy the contents of the `dist` folder to your hosting service.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast frontend build tool and development server.
- **React Router**: For managing navigation in the app.
- **Axios**: For making HTTP requests to the backend.
- **Tailwind CSS**: For scoped CSS styles.
- **Tanstack Query**: For managing server state and data fetching.
- **Tanstack Table**: For creating flexible and customizable tables.