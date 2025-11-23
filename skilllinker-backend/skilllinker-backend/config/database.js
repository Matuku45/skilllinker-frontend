const { Sequelize } = require('sequelize');

// IMPORTANT: In a production environment, database credentials
// should be loaded from environment variables (e.g., process.env.DB_PASSWORD)

// Initialize the Sequelize connection for PostgreSQL (Render)
const sequelize = new Sequelize(
    'skilllinker', 
    'user', 
    'enJjGw5p51QV61J8gpMidKCMxYbeOlaq', 
    {
        host: 'dpg-d4hn31khg0os738i4n40-a.oregon-postgres.render.com',
        port: 5432,
        dialect: 'postgres',
        // Optional: Set logging to false to keep console clean during runtime
        logging: false, 
        
        // CRITICAL: Required for connecting to cloud-hosted PostgreSQL (like Render)
        // that enforces SSL/TLS connections.
        dialectOptions: {
            ssl: {
                // Allows connection to Render's self-signed server certificate
                rejectUnauthorized: false 
            }
        }
    }
);

// Export the initialized Sequelize instance so models can use it with .define()
module.exports = sequelize;