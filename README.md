# Article Management System

## Overview

The Article Management System is a Next.js application for managing and displaying articles. It includes functionalities for creating, reading, and updating articles, and uses modern technologies such as TypeScript, Prisma, and Tailwind CSS.

## Features

- **Article Management**: Create, update, and view articles.
- **Rich Text Formatting**: Handle and display rich text, including links.
- **Responsive Design**: Styled with Tailwind CSS for a responsive and modern interface.

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **TypeScript**: Adds static typing to JavaScript for improved development.
- **Prisma**: ORM for interacting with the database.
- **Tailwind CSS**: Utility-first CSS framework for custom styling.
- **Axios**: HTTP client for making API requests.
- **Clerk**: Authentication and user management.

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/mariia/article-management.git
    cd article-management
    ```

2. **Install dependencies**

    Using npm:

    ```bash
    npm install
    ```

    Or using yarn:

    ```bash
    yarn install
    ```

3. **Set up environment variables**

    Create a `.env` file in the root directory of the project and add the necessary environment variables. Use `.env.example` as a reference.

    ```plaintext
    DATABASE_URL=your_database_url
    ```

4. **Run database migrations**

    ```bash
    npx prisma migrate dev
    ```

5. **Seed the database (optional)**

    ```bash
    npx ts-node prisma/seed.ts
    ```

6. **Start the development server**

    Using npm:

    ```bash
    npm run dev
    ```

    Or using yarn:

    ```bash
    yarn dev
    ```

    The application will be available at [http://localhost:3000](http://localhost:3000).

## Scripts

- **Development**: `npm run dev` or `yarn dev` - Starts the Next.js development server.
- **Build**: `npm run build` or `yarn build` - Builds the application for production.
- **Start**: `npm start` or `yarn start` - Starts the production server.
- **Lint**: `npm run lint` or `yarn lint` - Runs ESLint for code quality checks.

## API Endpoints

### GET `/api/articles`

Fetches a list of all articles.

### POST `/api/articles/create`

Creates a new article. Requires article data in the request body.

### PATCH `/api/articles/:id`

Updates an existing article by ID. Requires updated article data in the request body.

## Components

- **ArticlePage**: Displays a single article with rich text formatting and links.
- **SkeletonArticle**: Provides a loading skeleton for articles.
- **ProductPlate**: Displays product information with functionality for favorites.

## Usage

1. **Viewing Articles**: Navigate to the main page to view the list of articles.
2. **Creating Articles**: Use the provided form to create new articles.
3. **Editing Articles**: Select an article to update its details.
4. **Rich Text Handling**: Links within articles are clickable and styled.

## Contributing

Contributions are welcome! Please submit issues and pull requests. Make sure to follow the code style and test your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

- **Mariia** - [GitHub Profile](https://github.com/mariia)
