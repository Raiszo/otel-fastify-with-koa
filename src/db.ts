import { Collection, Db, MongoClient, ObjectId } from "mongodb";

export type Book = {
	_id: ObjectId
	title: string
	author: string
}

export class BookRepo {
	readonly #col: Collection<Book>

	constructor(db: Db) {
		this.#col = db.collection('books')
	}

	async insertBook(book: Book) {
		await this.#col.insertOne(book)
	}
}
