import Fastify from 'fastify'
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { Type } from 'typebox'
import { MongoClient, ObjectId } from 'mongodb'
import { BookRepo, type Book } from './db.ts'

const app = Fastify({
	logger: true
}).withTypeProvider<TypeBoxTypeProvider>()

const client = new MongoClient()

const db = client.db('myapp')
const book_repo = new BookRepo(db)

app.post('/book', {
	schema: {
		body: Type.Object({
			author: Type.String({ minLength: 3, maxLength: 100 }),
			title: Type.String({ minLength: 3, maxLength: 100 }),
		}),
		response: {
			200: Type.Object({
				message: Type.String()
			})
		}
	},
}, async (request, reply) => {
	await book_repo.insertBook({
		_id: new ObjectId(),
		author: request.body.author,
		title: request.body.title,
	})

	return reply.send({
		message: 'ok',
	})
})
