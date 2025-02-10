const http = require("http");
const mysql = require("mysql");
const url = require("url");
const querystring = require("querystring");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "node_crud_db",
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        return res.end();
    }

    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;

    if (path === "/users" && method === "GET") {
        db.query("SELECT * FROM users", (err, result) => {
            if (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: err.message }));
            } else {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(result));
            }
        });
    } 
    else if (path === "/users" && method === "POST") {
        let body = "";
        req.on("data", chunk => body += chunk);
        req.on("end", () => {
            const { name, email, phone } = JSON.parse(body);
            db.query("INSERT INTO users (name, email, phone) VALUES (?, ?, ?)", [name, email, phone], (err, result) => {
                if (err) {
                    res.writeHead(500);
                    res.end(JSON.stringify({ error: err.message }));
                } else {
                    res.writeHead(201);
                    res.end(JSON.stringify({ message: "User added successfully" }));
                }
            });
        });
    } 
    else if (path.startsWith("/users/") && method === "PUT") {
        const id = path.split("/")[2];
        let body = "";
        req.on("data", chunk => body += chunk);
        req.on("end", () => {
            const { name, email, phone } = JSON.parse(body);
            db.query("UPDATE users SET name=?, email=?, phone=? WHERE id=?", [name, email, phone, id], (err, result) => {
                if (err) {
                    res.writeHead(500);
                    res.end(JSON.stringify({ error: err.message }));
                } else {
                    res.writeHead(200);
                    res.end(JSON.stringify({ message: "User updated successfully" }));
                }
            });
        });
    } 
    else if (path.startsWith("/users/") && method === "DELETE") {
        const id = path.split("/")[2];
        db.query("DELETE FROM users WHERE id=?", [id], (err, result) => {
            if (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: err.message }));
            } else {
                res.writeHead(200);
                res.end(JSON.stringify({ message: "User deleted successfully" }));
            }
        });
    } 
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(5000, () => console.log("Server running on port 5000"));
