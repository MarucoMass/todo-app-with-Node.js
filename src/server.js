import express from "express";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const app = express();
const PORT = process.env.PORT || 5000;
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";


const __filename = fileURLToPath(import.meta.url)

const __dirname = dirname(__filename)

// Middleware
app.use(express.json())

app.use(express.static(path.join(__dirname, '../public')))

// Serving up the HTML file from the /public directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Routes
app.use("/auth", authRoutes);
app.use("/todos", authMiddleware, todoRoutes);

app.listen(PORT, () => {
    console.log(`Server funcionando correctamente en puerto ${PORT}`);
})