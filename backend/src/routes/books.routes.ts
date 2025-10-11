import { Router, Request, Response } from 'express';
import { BooksService } from '../books/books.service';
import { CreateBookDto } from '../books/dto/create-book.dto';
import { UpdateBookDto } from '../books/dto/update-book.dto';

const router = Router();
const booksService = new BooksService();

// Create a new book
router.post('/', async (req: Request, res: Response) => {
  try {
    const createBookDto: CreateBookDto = req.body;
    const book = await booksService.create(createBookDto);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error });
  }
});

// Get all books
router.get('/', async (req: Request, res: Response) => {
  try {
    const books = await booksService.findAll();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
});

// Get a single book by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const book = await booksService.findOne(id);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book', error });
  }
});

// Get books by testament
router.get('/testament/:testamentId', async (req: Request, res: Response) => {
  try {
    const testamentId = parseInt(req.params.testamentId, 10);
    const books = await booksService.findByTestament(testamentId);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books by testament', error });
  }
});

// Update a book
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updateBookDto: UpdateBookDto = req.body;
    const book = await booksService.update(id, updateBookDto);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error });
  }
});

// Delete a book
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    await booksService.remove(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error });
  }
});

export default router;
