import { Client } from 'pg';
import { OpenAIEmbeddings } from '@langchain/openai';

const client = new Client({
  user: 'yourusername',
  host: 'yourhost',
  database: 'yourdatabase',
  password: 'yourpassword',
  port: 5432,
});

await client.connect();

const embeddings = new OpenAIEmbeddings({
  openai_api_key: process.env.OPENAI_API_KEY as string,
});

export const indexDocuments = async (documents: string[]) => {
  for (const doc of documents) {
    const embedding = await embeddings.embed([doc]);
    await client.query('INSERT INTO documents (content, embedding) VALUES ($1, $2)', [doc, embedding]);
  }
};

export const similarChunks = async (userQuery: string): Promise<string> => {
  const queryEmbedding = await embeddings.embed([userQuery]);
  const res = await client.query('SELECT content FROM documents ORDER BY embedding <-> $1 LIMIT 15', [queryEmbedding]);

  if (res.rows.length === 0) {
    return 'documentos relevantes não encontrados';
  }

  return res.rows.map((row: any) => row.content).join('\n');
};
