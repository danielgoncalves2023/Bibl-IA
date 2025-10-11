import { Router, Request, Response } from 'express';
import { ChaptersService } from '../chapters/chapters.service';
import { CreateChapterDto } from '../chapters/dto/create-chapter.dto';
import { UpdateChapterDto } from '../chapters/dto/update-chapter.dto';

const router = Router();
const chaptersService = new ChaptersService();

// Create a new chapter
router.post('/', async (req: Request, res: Response) => {
  try {
    const createChapterDto: CreateChapterDto = req.body;
    const chapter = await chaptersService.create(createChapterDto);
    res.status(201).json(chapter);
  } catch (error) {
    res.status(500).json({ message: 'Error creating chapter', error });
  }
});

// Get all chapters
router.get('/', async (req: Request, res: Response) => {
  try {
    const chapters = await chaptersService.findAll();
    res.status(200).json(chapters);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chapters', error });
  }
});

// Get a single chapter by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const chapter = await chaptersService.findOne(id);
    if (chapter) {
      res.status(200).json(chapter);
    } else {
      res.status(404).json({ message: 'Chapter not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chapter', error });
  }
});

// Get chapters by book
router.get('/book/:bookId', async (req: Request, res: Response) => {
  try {
    const bookId = parseInt(req.params.bookId, 10);
    const chapters = await chaptersService.findByBook(bookId);
    res.status(200).json(chapters);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chapters by book', error });
  }
});

// Update a chapter
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updateChapterDto: UpdateChapterDto = req.body;
    const chapter = await chaptersService.update(id, updateChapterDto);
    if (chapter) {
      res.status(200).json(chapter);
    } else {
      res.status(404).json({ message: 'Chapter not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating chapter', error });
  }
});

// Delete a chapter
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    await chaptersService.remove(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting chapter', error });
  }
});

export default router;
