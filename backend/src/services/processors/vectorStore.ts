import pg from 'pg';
import { OpenAIEmbeddings } from '@langchain/openai';

import * as dotenv from 'dotenv';

const { Client } = pg;

dotenv.config();

export const client = new Client({
  user: 'postgres',
  host: 'host.docker.internal',
  database: 'vector_db',
  password: 'Soc1alwars.',
  port: 5432,
});

try {
  await client.connect();
  console.log('Conexão realizada com sucesso');
} catch (err: any) {
  console.error('Erro ao tentar realizar a conexão', err.stack);
}

export const similarChunks = async (userQuery: string): Promise<string> => {

  const embeddingFunction = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY as string,
});

  const queryEmbedding = await embeddingFunction.embedDocuments([userQuery])

  console.log(`Querying for: ${userQuery}`);
  const { rows } = await client.query(
    'SELECT content FROM documents ORDER BY vector <-> $1 LIMIT 10', 
    [queryEmbedding]
  );

  console.log("Query results:", JSON.stringify(rows, null, 2));
  if (rows.length === 0) {
    return "No relevant documents found.";
  }

  return rows.map((row: { content: any; }) => row.content).join("\n");
};

