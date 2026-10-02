import { Collection, Db, ObjectId } from "mongodb";

export type Book = {
	_id: ObjectId;
	title: string;
	author: string;
};

export class BookRepo {
	readonly #col: Collection<Book>;

	constructor(db: Db) {
		this.#col = db.collection("books");
	}

	async existingTitle(title: string): Promise<boolean> {
		const existing_doc = await this.#col.findOne({
			title,
		}, {
			projection: {
				_id: 1,
			}
		})
		return Boolean(existing_doc)
	}

	async insertBook(book: Book) {
		await this.#col.insertOne(book);
	}
}

export type Movie = {
	_id: ObjectId;
	title: string;
	director: string;
}

export class MovieRepo {
	readonly #col: Collection<Movie>;

	constructor(db: Db) {
		this.#col = db.collection("books");
	}

	async existingTitle(title: string): Promise<boolean> {
		const existing_doc = await this.#col.findOne({
			title,
		}, {
			projection: {
				_id: 1,
			}
		})
		return Boolean(existing_doc)
	}

	async insertBook(movie: Movie) {
		await this.#col.insertOne(movie);
	}
}
