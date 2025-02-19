import dbConnect from '../../utils/dbConnect';
import User from '../../models/User';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { name, contact, type } = req.body;
      if (!name || !contact || !type) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      const newUser = new User({ name, contact, type });
      await newUser.save();
      return res.status(200).json(newUser);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'GET') {
    const users = await User.find({});
    return res.status(200).json(users);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}