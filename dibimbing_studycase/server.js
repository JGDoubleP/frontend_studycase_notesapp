import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import pool from './db.mjs';  // Import the pool from your database connection file
import { notes } from "./dummy data/data.js";

const typeDefs = `#graphql
type Note {
    id: String!
    title: String!
    body: String
    CreatedAt: String!
}

# Queries
type Query {
    getNoteById(id: String!): Note
    getAllNotes: [Note]
}

# Mutations
type Mutation {
    createNote(id: String!, title: String!, body: String): Note
}
`;

const resolvers = {
    Query: {
        getNoteById: async (parent, args) => {
            const res = await pool.query('SELECT * FROM notes WHERE id = $1', [args.id]);
            return res.rows[0] || null;
        },
        getAllNotes: () => {
            return notes;
        }
    },
    Mutation: {
        createNote: async (parent, args) => {
            const newNote = {
                id: args.id,
                title: args.title,
                body: args.body || '',
                CreatedAt: new Date().toISOString()
            };
            const res = await pool.query(
                'INSERT INTO notes (id, title, body, CreatedAt) VALUES ($1, $2, $3, $4) RETURNING *',
                [newNote.id, newNote.title, newNote.body, newNote.CreatedAt]
            );
            return res.rows[0];
        }
    }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server);

console.log(`🚀 Server ready at ${url}`);