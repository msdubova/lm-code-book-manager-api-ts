import { Request, Response } from "express";
import * as bookService from "../services/books";
import { Book } from "../models/book";
export const getBooks = async (req: Request, res: Response) => {
	const books = await bookService.getBooks();
	res.json(books).status(200);
};

export const getBook = async (req: Request, res: Response) => {
	const bookId = req.params.bookId;
	const book = await bookService.getBook(Number(bookId));

	if (book) {
		res.json(book).status(200);
	} else {
		res.status(404).json({ message: `Book with ID ${bookId} is not found` });
	}
};


export const saveBook = async (req: Request, res: Response) => {
	const bookToBeSaved = req.body;
	const bookId: number = Number.parseInt(bookToBeSaved.bookId);
	const existingBook: Book | null = await bookService.getBook(bookId);
	if (Number.isNaN(bookId)) {
		res.status(400).json({ message: "Invalid bookId" });
		return;
	}

	if (existingBook) {
		res.status(400).json({ message: `Book with ID ${bookId} already exists` });
	} else {
		try {
			const book = await bookService.saveBook(bookToBeSaved);
			res.status(201).json(book);
		} catch (error) {
			res.status(400).json({ message: (error as Error).message });
		}
	}
};



// User Story 4 - Update Book By Id Solution

export const updateBook = async (req: Request, res: Response) => {
	const bookUpdateData = req.body;
	const bookId = Number.parseInt(req.params.bookId);

	try {
		await bookService.updateBook(bookId, bookUpdateData);
		const updatedBook = await bookService.getBook(bookId);

		if (!updatedBook) {
			res.status(404).json({ message: `Book with ID ${bookId} is not found` });
		} else {
			res.status(200).json(updatedBook);
		}
	} catch (error) {
		res.status(400).json({ message: (error as Error).message });
	}
};



export const deleteBook = async (req: Request, res: Response) => {
	const bookId = Number.parseInt(req.params.bookId);

	try {
		const existingBook = await bookService.getBook(bookId);
		if (!existingBook) {
			res.status(404).json({ message: `Book with ID ${bookId} is not found` });
		} else {
			await bookService.deleteBook(bookId);
			res.status(200).json({ message: `Book with ID ${bookId} is removed succesfully` });
		}
	} catch (error) {
		res.status(400).json({ message: (error as Error).message });
	}
};
