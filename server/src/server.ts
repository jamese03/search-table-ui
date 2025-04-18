import express, { Request, Response } from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3001;

// Serve static files from the 'dist' folder (where your frontend is built)
app.use(express.static(path.resolve(__dirname, '../../frontend/dist')));

// Basic route
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '../../frontend/dist/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});