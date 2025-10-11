import { Router, Request, Response } from 'express';
import { VersesService } from '../verses/verses.service';
import { CreateVerseDto } from '../verses/dto/create-verse.dto';
import { UpdateVerseDto } from '../verses/dto/update-verse.dto';

const router = Router();
const versesService = new VersesService();

// Create a new verse
router.post('/', async (req: Request, res: Response) => {
  try {
    const createVerseDto: CreateVerseDto = req.body;
    const verse = await versesService.create(createVerseDto);
    res.status(201).json(verse);
  } catch (error) {
    res.status(500).json({ message: 'Error creating verse', error });
  }
});

// Get all verses
router.get('/', async (req: Request, res: Response) => {
  try {
    const verses = await versesService.findAll();
    res.status(200).json(verses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching verses', error });
  }
});

// Get a single verse by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const verse = await versesService.findOne(id);
    if (verse) {
      res.status(200).json(verse);
    } else {
      res.status(404).json({ message: 'Verse not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching verse', error });
  }
});

// Get verses by chapter
router.get('/chapter/:chapterId', async (req: Request, res: Response) => {
  try {
    const chapterId = parseInt(req.params.chapterId, 10);
    const verses = await versesService.findByChapter(chapterId);
    res.status(200).json(verses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching verses by chapter', error });
  }
});

// Get verses by version
router.get('/version/:version', async (req: Request, res: Response) => {
  try {
    const version = req.params.version;
    const verses = await versesService.findByVersion(version);
    res.status(200).json(verses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching verses by version', error });
  }
});

// Update a verse
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updateVerseDto: UpdateVerseDto = req.body;
    const verse = await versesService.update(id, updateVerseDto);
    if (verse) {
      res.status(200).json(verse);
    } else {
      res.status(404).json({ message: 'Verse not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating verse', error });
  }
});

// Delete a verse
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    await versesService.remove(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting verse', error });
  }
});

export default router;
