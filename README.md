Recipe Finder App

This is a Recipe Finder App built with Next.js that allows users to search for recipes based on various filters like query, cuisine, and preparation time. The app fetches recipes from the Spoonacular API and displays them in a responsive and clean layout. Additionally, users can view detailed information about each recipe.

Features

- Search Page: Users can search for recipes using a query (e.g., "pasta"), choose a cuisine (Italian, Mexican, etc.), and specify a maximum preparation time.
- Recipes Page: Displays a list of recipes based on the search criteria. Each recipe has a title and image, and users can click on a recipe to view its details.
- Recipe Details: Displays detailed information for each recipe, including the title, ingredients, preparation time, servings, and more.
- Error Handling: Includes error handling for failed API requests and user input.
- Suspense Component: Uses React's `Suspense` to handle loading states for data fetching.

Tech Stack

- Next.js - A React framework that enables server-side rendering (SSR) and static site generation (SSG).
- TypeScript - A typed superset of JavaScript that provides type safety and improves development productivity.
- Tailwind CSS - A utility-first CSS framework for building responsive, custom designs quickly.

Prerequisites

- Node.js: You need Node.js installed on your machine. You can download it from [here](https://nodejs.org/).
- Spoonacular API Key: You must sign up for a free account on [Spoonacular](https://spoonacular.com/food-api/docs#Authentication) and obtain your API key.

Getting Started

# 1. Clone the Repository

git clone https://github.com/yourusername/recipe-finder-app.git
cd recipe-finder-app


# 2. Install Dependencies

npm install


# 3. Set Up Environment Variables

Create a `.env.local` file at the root of the project and add your Spoonacular API key:

SPOONACULAR_API_KEY=your_api_key_here


# 4. Run the Development Server

npm run dev

Visit `http://localhost:3000` to see the app in action!


# 5. Build for Production

npm run build
npm start

This will build the app for production and serve it on the server.
