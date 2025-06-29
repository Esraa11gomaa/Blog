import User from "../models/user.js";

export const createUser = async (req, res) => {
  const { name, email, role, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = await User.build({ name, email, role, password }).save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createOrUpdateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role, password } = req.body;

  const roles = ['user', 'admin']
  if (role && !roles.includes(role)){
    return res.status(400).json({ message: 'Invalid role value' });
  }
  try {
    const user = await User.findByPk(id);

    if (user) {
      await user.update({ name, email, role, password }); 
      return res.status(200).json(user);
    } else {
      const newUser = await User.create({ name, email, role, password });
      return res.status(201).json(newUser);
    }
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ message: 'Validation error', errors: error.errors });
      }
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ message: 'Email already exists' });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  
};


export const getUserByEmail = async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ message: 'Email query parameter is required' });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const {role, ...userData} = user.toJSON()
    res.status(200).json(userData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
