import { Router, Request, Response } from 'express';
import { TestamentsService } from '../testaments/testaments.service';
import { CreateTestamentDto } from '../testaments/dto/create-testament.dto';
import { UpdateTestamentDto } from '../testaments/dto/update-testament.dto';

const router = Router();
const testamentsService = new TestamentsService();

// Create a new testament
router.post('/', async (req: Request, res: Response) => {
  try {
    const createTestamentDto: CreateTestamentDto = req.body;
    const testament = await testamentsService.create(createTestamentDto);
    res.status(201).json(testament);
  } catch (error) {
    res.status(500).json({ message: 'Error creating testament', error });
  }
});

// Get all testaments
router.get('/', async (req: Request, res: Response) => {
  try {
    const testaments = await testamentsService.findAll();
    res.status(200).json(testaments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching testaments', error });
  }
});

// Get a single testament by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const testament = await testamentsService.findOne(id);
    if (testament) {
      res.status(200).json(testament);
    } else {
      res.status(404).json({ message: 'Testament not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching testament', error });
  }
});

// Update a testament
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updateTestamentDto: UpdateTestamentDto = req.body;
    const testament = await testamentsService.update(id, updateTestamentDto);
    if (testament) {
      res.status(200).json(testament);
    } else {
      res.status(404).json({ message: 'Testament not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating testament', error });
  }
});

// Delete a testament
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    await testamentsService.remove(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting testament', error });
  }
});

export default router;
