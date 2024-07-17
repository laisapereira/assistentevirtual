import pg from 'pg';
import { OpenAIEmbeddings } from '@langchain/openai';

const { Client } = pg;

const client = new Client({
  user: 'postgres',
  host: 'host.docker.internal',
  database: 'vector_db',
  password: 'sua senha',
  port: 5432,
});

try {
  await client.connect();
  console.log('conexão realizada com sucesso');
} catch (err: any) {
  console.error('erro ao tentar realizar a conexão', err.stack);
}

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: "sk-proj-PcZrHx3E8vsaNYh2rA5nT3BlbkFJ21otWJTFCDTFwTxBnI7b"
});

export const indexDocuments = async (documents: string[]) => {
  for (const doc of documents) {
    const embedding = await embeddings.embedDocuments([doc]);
    await client.query('INSERT INTO documents (content, embedding) VALUES ($1, $2)', [doc, embedding]);
  }
};

export const similarChunks = async (userQuery: string): Promise<string> => {
  const queryEmbedding = await embeddings.embedDocuments([userQuery]);
  const res = await client.query('SELECT content FROM documents ORDER BY embedding <-> $1 LIMIT 15', [queryEmbedding]);

  if (res.rows.length === 0) {
    return 'documentos relevantes não encontrados';
  }

  return res.rows.map((row: any) => row.content).join('\n');
};
