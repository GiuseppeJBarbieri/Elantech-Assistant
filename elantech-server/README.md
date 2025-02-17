# Commands
- `yarn run start` Starts the backend development server via ts-node.
- `yarn run build` Builds API in `/build` directory.

# Deployment on Windows

1. **Install Node.js**: Download and install Node.js from the [official website](https://nodejs.org/).
2. **Install Dependencies**: Run `yarn install` to install all necessary dependencies.
3. **Build the Project**: Run `yarn run build` to compile the TypeScript code into JavaScript.
4. **Run the Server**: Execute `node build/index.js` to start the server.
5. **Configure Firewall**: Ensure that the Windows Firewall allows traffic on the port your server is running on (default is 3000).
6. **Set Up as a Service (Optional)**: Use a tool like [NSSM (Non-Sucking Service Manager)](https://nssm.cc/) to set up your Node.js server as a Windows service for easier management.
