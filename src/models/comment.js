import { DataTypes, Model } from 'sequelize';
import sequelize from '../DB/db.js';

class Comment extends Model{}

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Posts',
      key: 'id',
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull:false,
    references: {
      model: 'Users', 
      key: 'id',
    },
  },
},{
    sequelize,
    modelName:'Comment',
    timestamps:true
});

export default Comment;

