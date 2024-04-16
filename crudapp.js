const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

const pool = require("./connectToDb");

app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = uuidv4();
    const result = await pool.query(
      "INSERT INTO users (id,name, email) VALUES ($1, $2,$3) RETURNING *",
      [userId, name, email]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING id, name",
      [id]
    );
    console.log(result.rows);
    if (result.rowCount === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      const { id, name } = result.rows[0];
      res.json({ message: `User ${name} (ID: ${id}) deleted successfully` });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "404 - Not found" });
});
