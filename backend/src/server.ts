import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './config/database.config';
import testamentsRouter from './routes/testaments.routes';
import booksRouter from './routes/books.routes';
import chaptersRouter from './routes/chapters.routes';
import versesRouter from './routes/verses.routes';
import usersRouter from './routes/users.routes';
import verseInteractionsRouter from './routes/verse-interactions.routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/testaments', testamentsRouter);
app.use('/books', booksRouter);
app.use('/chapters', chaptersRouter);
app.use('/verses', versesRouter);
app.use('/users', usersRouter);
app.use('/verse-interactions', verseInteractionsRouter);

app.get('/', (req, res) => {
  res.send('Bibl-IA API is running!');
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
