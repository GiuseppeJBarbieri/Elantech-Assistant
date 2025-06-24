# Elantech Assistant

Elantech Assistant is a full-stack inventory and quoting management system designed to streamline product, inventory, and quote workflows for businesses. It features a React frontend, a Node.js/TypeScript backend (`elantech-server`), and a Python-based migration script for database operations.

## Features

- Product and inventory management
- Quoting system with multi-product support
- Company and order tracking
- Data migration utilities (Python)
- Responsive UI with React and Bootstrap
- RESTful API backend with authentication and session management

## Project Structure

```
elantech-client/         # React frontend application
  src/
    components/          # Reusable UI components
    screens/             # Main application screens
    constants/           # Static values and enums
    types/               # TypeScript type definitions
    utils/               # Utility functions (API, auth, etc.)
elantech-server/         # Node.js/TypeScript backend (REST API)
  src/
    features/            # API features (users, products, inventory, etc.)
    utils/               # Utility modules (logging, constants, etc.)
    models/              # Sequelize models
    config/              # Configuration files
  index.ts               # Server entry point
MigrationScript/         # Python scripts for data migration
  TransferScript.py      # Main migration script
  NewDBSchema.py         # New DB schema definitions
  OldDBSchema.py         # Old DB schema definitions
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- Python 3.8+
- PostgreSQL or compatible SQL database

---

## Setup (Frontend)

1. Navigate to the frontend directory:

   ```bash
   cd elantech-client
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm start
   # or
   yarn start
   ```

   The app will be available at `http://localhost:3000`.

---

## Setup (Backend - elantech-server)

1. Navigate to the backend directory:

   ```bash
   cd elantech-server
   ```

2. Install dependencies:

   ```bash
   yarn install
   # or
   npm install
   ```

3. Configure your environment:

   - Edit the configuration files in `src/config` to match your database and environment settings.

4. Build the backend:

   ```bash
   yarn run build
   # or
   npm run build
   ```

5. Start the backend server (development):

   ```bash
   yarn run start
   # or
   npm run start
   ```

   The backend API will be available at `http://localhost:3001` (or your configured port).

6. For production, run:

   ```bash
   node build/index.js
   ```

### Backend Features

- RESTful API for all core resources (products, inventory, companies, quotes, receiving, etc.)
- JWT or session-based authentication (see `src/middleware/Auth.ts`)
- Sequelize ORM for database access
- Swagger API documentation available at `/api-docs`
- Rate limiting, logging, and error handling middleware
- Easily extensible modular structure

---

## Setup (Migration Script)

1. Navigate to the migration script directory:

   ```bash
   cd MigrationScript
   ```

2. Install required Python packages (if any):

   ```bash
   pip install -r requirements.txt
   ```

3. Run the migration script:

   ```bash
   python TransferScript.py
   ```

---

## Usage

- Use the web interface to manage products, inventory, companies, and quotes.
- Use the backend API for programmatic access or integration.
- Use the migration script to convert and transfer data between old and new database schemas.

## Technologies Used

- **Frontend:** React, TypeScript, Bootstrap, react-bootstrap-table2
- **Backend:** Node.js, TypeScript, Express, Sequelize, PostgreSQL
- **Migration:** Python 3

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.

---

*Created by Giuseppe Barbieri*

