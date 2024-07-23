import pg from 'pg';
import { OpenAIEmbeddings } from '@langchain/openai';

const { Client } = pg;

export const client = new Client({
  user: 'postgres',
  host: 'host.docker.internal',
  database: 'vector_db',
  password: 'Soc1alwars.',
  port: 5432,
});

// Inicialize OpenAIEmbeddings
export const embeddings = new OpenAIEmbeddings({
  openAIApiKey: "sk-proj-PcZrHx3E8vsaNYh2rA5nT3BlbkFJ21otWJTFCDTFwTxBnI7b"
});

try {
  await client.connect();
  console.log('Conexão realizada com sucesso');
} catch (err: any) {
  console.error('Erro ao tentar realizar a conexão', err.stack);
}

export const similarChunks = async (userQuery: string): Promise<string> => {
  // Obtenha o embedding da query
  const queryEmbedding = await embeddings.embedDocuments([userQuery]);

  // Execute a query no PostgreSQL utilizando o embedding
  const res = await client.query('SELECT content FROM documents ORDER BY embedding <-> $1 LIMIT 15', [queryEmbedding]);

  if (res.rows.length === 0) {
    return 'Documentos relevantes não encontrados';
  }

  return res.rows.map((row: any) => row.content).join('\n');
};
