import request from "supertest";
import { app } from "../app";
import { Book } from "../models/book";

import * as bookService from "../services/books";
jest.mock("../services/books");

afterEach(() => {
	jest.clearAllMocks();
});

const dummyBookData = [
	{
		bookId: 1,
		title: "The Hobbit",
		author: "J. R. R. Tolkien",
		description: "Someone finds a nice piece of jewellery while on holiday.",
	},
	{
		bookId: 2,
		title: "The Shop Before Life",
		author: "Neil Hughes",
		description:
			"Before being born, each person must visit the magical Shop Before Life, where they choose what kind of person they will become down on Earth...",
	},
];

describe("GET /api/v1/books endpoint", () => {
	test("status code successfully 200", async () => {
		const res = await request(app).get("/api/v1/books");
		expect(res.statusCode).toEqual(200);
	});

	test("empty array returned when no data from the service", async () => {
		jest.spyOn(bookService, "getBooks").mockResolvedValue([]);
		const res = await request(app).get("/api/v1/books");
		expect(res.body).toEqual([]);
		expect(res.body.length).toEqual(0);
	});

	test("array of books returned", async () => {
		jest.spyOn(bookService, "getBooks").mockResolvedValue(dummyBookData as Book[]);
		const res = await request(app).get("/api/v1/books");
		expect(res.body).toEqual(dummyBookData);
		expect(res.body.length).toEqual(2);
	});
});

describe("GET /api/v1/books/{bookId} endpoint", () => {
	test("status code successfully 200 for a book that is found", async () => {
		const mockGetBook = jest
			.spyOn(bookService, "getBook")
			.mockResolvedValue(dummyBookData[1] as Book);
		const res = await request(app).get("/api/v1/books/2");
		expect(res.statusCode).toEqual(200);
	});

	test("status code successfully 404 for a book that is not found", async () => {
		jest
			.spyOn(bookService, "getBook")
			.mockResolvedValue(undefined as unknown as Book);
		const res = await request(app).get("/api/v1/books/77");
		expect(res.statusCode).toEqual(404);
	});

	test("controller successfully returns book object as JSON", async () => {
		jest
			.spyOn(bookService, "getBook")
			.mockResolvedValue(dummyBookData[1] as Book);
		const res = await request(app).get("/api/v1/books/2");
		expect(res.body).toEqual(dummyBookData[1]);
	});
});

describe("POST /api/v1/books endpoint", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	test("status code successfully 201 for saving a valid book", async () => {
		jest.spyOn(bookService, "getBook").mockResolvedValue(null);
		const res = await request(app)
			.post("/api/v1/books")
			.send({ bookId: 3, title: "Fantastic Mr. Fox", author: "Roald Dahl" });
		expect(res.statusCode).toEqual(201);
	});

	test("status code 400 when saving ill formatted JSON", async () => {
		jest.spyOn(bookService, "saveBook").mockImplementation(() => {
			throw new Error("Error saving book");
		});
		const res = await request(app)
			.post("/api/v1/books")
			.send({ title: "Fantastic Mr. Fox", author: "Roald Dahl" });
		expect(res.statusCode).toEqual(400);
	});
});

describe("DELETE /api/v1/books/{bookId} endpoint", () => {
	test("status code is 200 when a book is deleted successfully", async () => {
		const bookId = 1;
		jest.spyOn(bookService, "deleteBook").mockImplementation(async (id) => {
			if (id === 1) {
				return 1;
			} else {
				return 0;
			}
		});
		const res = await request(app).delete(`/api/v1/books/${bookId}`);
		expect(res.statusCode).toEqual(200);
		expect(res.body).toEqual({
			message: `Book with ID ${bookId} is removed successfully`,
		});
	});

	test("status code is 404 when a book with the given ID does not exist", async () => {
		const bookId = 456;
		jest.spyOn(bookService, "deleteBook").mockResolvedValue(0);
		const res = await request(app).delete(`/api/v1/books/${bookId}`);
		expect(res.statusCode).toEqual(404);
		expect(res.body).toEqual({
			message: `Book with ID ${bookId} is not found`,
		});
	});
});
