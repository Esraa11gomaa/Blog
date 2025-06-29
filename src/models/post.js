import { DataTypes ,Model } from 'sequelize';
import sequelize from '../DB/db.js';
class Post extends Model{}

Post.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users', 
          key: 'id',
        },
    },
},{
    sequelize,
    modelName:'Post',
    timestamps: true,
    paranoid: true
})

export default Post;