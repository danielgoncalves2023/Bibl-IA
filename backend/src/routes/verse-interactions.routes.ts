import { Router, Request, Response } from 'express';
import { VerseInteractionsService } from '../verse-interactions/verse-interactions.service';
import { CreateVerseInteractionDto } from '../verse-interactions/dto/create-verse-interaction.dto';
import { UpdateVerseInteractionDto } from '../verse-interactions/dto/update-verse-interaction.dto';

const router = Router();
const verseInteractionsService = new VerseInteractionsService();

// Create a new verse interaction
router.post('/', async (req: Request, res: Response) => {
  try {
    const createVerseInteractionDto: CreateVerseInteractionDto = req.body;
    const interaction = await verseInteractionsService.create(
      createVerseInteractionDto,
    );
    res.status(201).json(interaction);
  } catch (error) {
    res.status(500).json({ message: 'Error creating verse interaction', error });
  }
});

// Get all verse interactions
router.get('/', async (req: Request, res: Response) => {
  try {
    const interactions = await verseInteractionsService.findAll();
    res.status(200).json(interactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching verse interactions', error });
  }
});

// Get a single verse interaction by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const interaction = await verseInteractionsService.findOne(id);
    if (interaction) {
      res.status(200).json(interaction);
    } else {
      res.status(404).json({ message: 'Verse interaction not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching verse interaction', error });
  }
});

// Get verse interactions by user
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const interactions = await verseInteractionsService.findByUser(userId);
    res.status(200).json(interactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching verse interactions by user', error });
  }
});

// Get verse interactions by verse
router.get('/verse/:verseId', async (req: Request, res: Response) => {
  try {
    const verseId = parseInt(req.params.verseId, 10);
    const interactions = await verseInteractionsService.findByVerse(verseId);
    res.status(200).json(interactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching verse interactions by verse', error });
  }
});

// Get user favorites
router.get('/user/:userId/favorites', async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const interactions = await verseInteractionsService.findUserFavorites(userId);
    res.status(200).json(interactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user favorites', error });
  }
});

// Get user read verses
router.get('/user/:userId/read', async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const interactions = await verseInteractionsService.findUserReadVerses(userId);
    res.status(200).json(interactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user read verses', error });
  }
});

// Mark a verse as read
router.post('/verse/:verseId/user/:userId/read', async (req: Request, res: Response) => {
  try {
    const verseId = parseInt(req.params.verseId, 10);
    const userId = parseInt(req.params.userId, 10);
    const interaction = await verseInteractionsService.markAsRead(verseId, userId);
    res.status(201).json(interaction);
  } catch (error) {
    res.status(500).json({ message: 'Error marking verse as read', error });
  }
});

// Toggle favorite status for a verse
router.post('/verse/:verseId/user/:userId/favorite', async (req: Request, res: Response) => {
  try {
    const verseId = parseInt(req.params.verseId, 10);
    const userId = parseInt(req.params.userId, 10);
    const result = await verseInteractionsService.toggleFavorite(verseId, userId);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error toggling favorite status', error });
  }
});

// Add a comment to a verse
router.post('/verse/:verseId/user/:userId/comment', async (req: Request, res: Response) => {
  try {
    const verseId = parseInt(req.params.verseId, 10);
    const userId = parseInt(req.params.userId, 10);
    const { comment } = req.body;
    const interaction = await verseInteractionsService.addComment(verseId, userId, comment);
    res.status(201).json(interaction);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error });
  }
});

// Add an observation to a verse
router.post('/verse/:verseId/user/:userId/observation', async (req: Request, res: Response) => {
  try {
    const verseId = parseInt(req.params.verseId, 10);
    const userId = parseInt(req.params.userId, 10);
    const { observation } = req.body;
    const interaction = await verseInteractionsService.addObservation(verseId, userId, observation);
    res.status(201).json(interaction);
  } catch (error) {
    res.status(500).json({ message: 'Error adding observation', error });
  }
});


// Update a verse interaction
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updateVerseInteractionDto: UpdateVerseInteractionDto = req.body;
    const interaction = await verseInteractionsService.update(
      id,
      updateVerseInteractionDto,
    );
    if (interaction) {
      res.status(200).json(interaction);
    } else {
      res.status(404).json({ message: 'Verse interaction not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating verse interaction', error });
  }
});

// Delete a verse interaction
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    await verseInteractionsService.remove(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting verse interaction', error });
  }
});

export default router;
