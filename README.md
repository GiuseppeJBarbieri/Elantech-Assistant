# Elantech-Inventory-Management

Elantech Assistant is a full-stack inventory and quoting management system designed to streamline product, inventory, and quote workflows for businesses. It features a React frontend and a Python-based migration script for database operations.

## Features

- Product and inventory management
- Quoting system with multi-product support
- Company and order tracking
- Data migration utilities (Python)
- Responsive UI with React and Bootstrap

## Project Structure

```
elantech-client/         # React frontend application
  src/
    components/          # Reusable UI components
    screens/             # Main application screens
    constants/           # Static values and enums
    types/               # TypeScript type definitions
    utils/               # Utility functions (API, auth, etc.)
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

### Setup (Frontend)

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

### Setup (Migration Script)

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

## Usage

- Use the web interface to manage products, inventory, companies, and quotes.
- Use the migration script to convert and transfer data between old and new database schemas.

## Technologies Used

- **Frontend:** React, TypeScript, Bootstrap, react-bootstrap-table2
- **Backend/Migration:** Express, Sequalize, PostgreSQL, Python

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.

---

*Created by Giuseppe Barbieri*

