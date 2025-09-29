import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/AuthRoute.js';
import userRoutes from './routes/UserRoute.js';
import entrepriseRoutes from './routes/EntrepriseRoute.js';
import employeRoutes from './routes/EmployeRoute.js';
import cyclePaieRoutes from './routes/CyclePaieRoute.js';
import bulletinRoutes from './routes/BulletinRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/entreprises', entrepriseRoutes);
app.use('/employes', employeRoutes);
app.use('/cycles-paie', cyclePaieRoutes);
app.use('/bulletins', bulletinRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
