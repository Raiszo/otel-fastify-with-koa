import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import Fastify from "fastify";
import { MongoClient, ObjectId } from "mongodb";
import { Type } from "typebox";
import { BookRepo } from "./db.ts";

const app = Fastify({
	logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

const client = new MongoClient(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`, {
	auth: {
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
	},
});

const db = client.db(process.env.DB_NAME);
const book_repo = new BookRepo(db);

app.post(
	"/book",
	{
		schema: {
			body: Type.Object({
				author: Type.String({ minLength: 3, maxLength: 100 }),
				title: Type.String({ minLength: 3, maxLength: 100 }),
			}),
			response: {
				200: Type.Object({
					message: Type.String(),
				}),
			},
		},
	},
	async (request, reply) => {
		await book_repo.insertBook({
			_id: new ObjectId(),
			author: request.body.author,
			title: request.body.title,
		});

		return reply.send({
			message: "ok",
		});
	},
);
