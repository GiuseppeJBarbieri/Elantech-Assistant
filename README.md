# Elantech Assistant

Elantech Assistant is a full-stack inventory and quoting management system designed to streamline product, inventory, and quote workflows for businesses. It features a React frontend, a Node.js/TypeScript backend (`elantech-server`), and a Python-based migration script for database operations.

## Features

- Product and inventory management
- Quoting system with multi-product support
- Company and order tracking
- Data migration utilities (Python)
- Responsive UI with React and Bootstrap
- RESTful API backend with authentication and session management

![image](https://github.com/user-attachments/assets/9bbfe6d5-8dfe-49e2-acd1-22417d1292f1)
![image](https://github.com/user-attachments/assets/2b66c345-8e94-4706-a1f5-13bb905ca496)
![image](https://github.com/user-attachments/assets/c26c3edf-e03b-40d6-9411-86a6c54ad235)
![image](https://github.com/user-attachments/assets/987207c8-0159-401c-948c-a3ca0653d5f8)
![image](https://github.com/user-attachments/assets/150bee9f-7239-4722-9599-53cf3030d9fc)
![image](https://github.com/user-attachments/assets/54373365-c17a-48bd-ab76-1b97637acbdc)


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

List of features to be completed:
https://trello.com/b/ENUemrVV/elantech-management-system

## License

This project is licensed under the MIT License.

---

*Created by Giuseppe Barbieri*

