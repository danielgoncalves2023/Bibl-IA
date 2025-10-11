import { Router, Request, Response } from 'express';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';

const router = Router();
const usersService = new UsersService();

// Create a new user
router.post('/', async (req: Request, res: Response) => {
  try {
    const createUserDto: CreateUserDto = req.body;
    const user = await usersService.create(createUserDto);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// Get all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await usersService.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

// Get a single user by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await usersService.findOne(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
});

// Get user by Auth0 ID
router.get('/auth0/:auth0Id', async (req: Request, res: Response) => {
  try {
    const auth0Id = req.params.auth0Id;
    const user = await usersService.findByAuth0Id(auth0Id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user by Auth0 ID', error });
  }
});

// Get user by email
router.get('/email/:email', async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const user = await usersService.findByEmail(email);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user by email', error });
  }
});

// Update a user
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updateUserDto: UpdateUserDto = req.body;
    const user = await usersService.update(id, updateUserDto);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
});

// Delete a user
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    await usersService.remove(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});

export default router;
