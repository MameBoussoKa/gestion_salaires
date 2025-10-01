import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/AuthRoute.js';
import userRoutes from './routes/UserRoute.js';
import entrepriseRoutes from './routes/EntrepriseRoute.js';
import employeRoutes from './routes/EmployeRoute.js';
import cyclePaieRoutes from './routes/CyclePaieRoute.js';
import bulletinRoutes from './routes/BulletinRoute.js';
import paiementRoutes from './routes/PaiementRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/entreprises', entrepriseRoutes);
app.use('/api/v1/employes', employeRoutes);
app.use('/api/v1/cycles-paie', cyclePaieRoutes);
app.use('/api/v1/bulletins', bulletinRoutes);
app.use('/api/v1/paiements', paiementRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
