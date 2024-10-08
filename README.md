# Rental Property Dashboard

A simple CRUD-based rental property dashboard that allows management of properties, units, tenants, and users. The app includes end-to-end testing and is built using modern web development technologies like Next.js, TailwindCSS, ShadCN, PostgreSQL, Prisma, Auth.js, and TypeScript.

> **Note:** Some features are missing and the project is not fully functioning. This is still a work in progress.

## Features

- **CRUD Operations**:

  - Property Management: Create, read, update, and delete property records, including property details like name, address, owner, and image.
  - Unit Management: Manage units within properties, specifying unit number, rent amount, and lease terms.
  - Tenant Management: Handle tenant information, assign tenants to units, manage leases, and track rent payments.
  - User Management: Manage user settings and details like password, image etc.

- **Authentication**:

  - User authentication using **Auth.js** to ensure secure access to user-specific data, handling both sessions and credentials seamlessly.

- **End-to-End Testing**:

  - Uses Cypress for testing the entire flow of the application, ensuring data integrity and feature correctness.

## Live Demo

Check out the live demo of the app here:

[Vercel Deployment](https://rental-property-app.vercel.app/)

## Tech Stack

- **Next.js**: Server-side rendering and static site generation for performance and SEO.
- **TypeScript**: Strongly typed JavaScript for type safety and code scalability.
- **TailwindCSS**: Utility-first CSS framework for rapid UI development.
- **ShadCN**: Collection of accessible components built on top of Radix UI primitives.
- **PostgreSQL**: Relational database for managing data.
- **Prisma**: Type-safe ORM for database access.
- **Auth.js**: Lightweight authentication library for managing sessions and credentials.

## Getting Started

### Prerequisites

- Node.js v16+
- PostgreSQL

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/rental-property-dashboard.git
   cd rental-property-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables:

Create a .env file in the root of your project and add your PostgreSQL database connection string and other necessary environment variables. See the .env.example

4. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

### Running Tests

End-to-end tests are written with Cypress.

1. Run the Cypress test:
   ```bash
   npm run cypress:open
   ```

### Deployment

For deployment, you can use platforms like Vercel or Netlify. Ensure you add the necessary environment variables in your deployment settings.

### License

This project is licensed under the MIT License.

### Contributing

Contributions are welcome! If you have any ideas for improving the app or fixing bugs, feel free to submit a pull request.
