const postgres = require('postgres');

const sql = postgres('postgres://postgres:dijana123@localhost:5432/lab1_db');

(async () => {
  try {
    // Create a table
    await sql`
            CREATE TABLE consumer (
                consumer_id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                birthyear INT
            )
        `;

    // Create a table
    await sql`
            CREATE TABLE product (
                product_id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                barcode INT,
                skadimi INT,
                consumer_id INT NOT NULL REFERENCES consumer(consumer_id) ON DELETE CASCADE
            )
        `;

    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    // Close database connection if needed
    await sql.end();
  }
})();
