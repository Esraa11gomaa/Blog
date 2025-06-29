import express from 'express';
import userRoutes from './src/routes/UserRoutes.js';
import postRoutes from './src/routes/PostRoutes.js'
import commentRoutes from './src/routes/CommentRoutes.js'
import './src/Association/associations.js'
import sequelize from './src/DB/db.js';

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/posts', postRoutes)
app.use('/comments', commentRoutes);


sequelize.sync().then(() => {
  console.log('Database synchronized');
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});
