const express = require('express');
const { v4: uuid } = require('uuid');

class Book {
    constructor(
        id = uuid(), 
        title = "", 
        description = "",
        authors = "",
        favorite = "",
        fileCover = "",
        fileName = ""
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
    }
};

const library = {
    book: [
        // {   id: uuid(),
        //     title: "Книга 1",
        //     description: "Описание книги 1",
        //     authors: "Автор 1",
        //     favorite: "Да",
        //     fileCover: "cover1.jpg",
        //     fileName: "book1.pdf"
        //   },
        //   {
        //     id: uuid(),
        //     title: "Книга 2",
        //     description: "Описание книги 2",
        //     authors: "Автор 2",
        //     favorite: "Нет",
        //     fileCover: "cover2.jpg",
        //     fileName: "book2.pdf"
        //   }
    ]
};

class UserLogin {
    constructor(id, mail) {
        this.id = id;
        this.mail = mail;
    }
}

const app = express();
app.use(express.json());

app.post('/api/user/login', (req, res) => {
    //const {id, mail} = req.body;

    const newUserLogin = new UserLogin(1, "test@mail.ru");
    res.status(201);
    res.json(newUserLogin);
    //res.json({ id: 1, mail: "test@mail.ru" });
});

app.get('/api/books', (req, res) => {
    const {book} = library;
    res.json(book);
});

app.get('/api/books/:id', (req, res) => {
    const {book} = library;
    const {id} = req.params;
    const index = book.findIndex(el => el.id === id);

    if(index !== -1) {
        res.json(book[index]);
    } else {
        res.status(404);
        res.json('404');
    }
});

app.post('/api/books', (req, res) => {
    const {book} = library;
    const {id, title, description, authors, favorite, fileCover, fileName} = req.body;
    
    const newBook = new Book(id, title, description, authors, favorite, fileCover, fileName);
    book.push(newBook);

    res.status(201);
    res.json(newBook);
});

app.put('/api/books/:id', (req, res) => {
    const {book} = library;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const {id} = req.params;
    const index = book.findIndex(el => el.id === id);

    if(index !== -1) {
        book[index] = {
            ...book[index],
            title, 
            description, 
            authors, 
            favorite, 
            fileCover, 
            fileName
        }
        res.json(book[index])
    } else {
        res.status(404);
        res.json('404 | Record not found');
    }
});

app.delete('/api/books/:id', (req, res) => {
    const {book} = library;
    const {id} = req.params;
    const index = book.findIndex(el => el.id === id);

    if(index !== -1) {
        book.splice(index, 1);
        res.json('ok')
    } else {
        res.status(404);
        req.json('404 | Book not found')
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});