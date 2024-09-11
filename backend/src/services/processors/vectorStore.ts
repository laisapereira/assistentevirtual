import pg from 'pg';
import { OpenAIEmbeddings } from '@langchain/openai';

import * as dotenv from 'dotenv';
import { toSql } from 'pgvector';
import { loadAndNormalizeDocuments } from './documentLoader.js';

const { Client } = pg;

dotenv.config();

/* 
1- precisamos chunkenizar os documentos e/ou perguntas do usuário 
sera que precisa chunkenizar a pergunta do usuário? sera que isso nao é feito pelo openai?
2 - transformar os chunks em embeddings
3 - salvar os chunks e embeddings no banco de dados

*/

export const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
});


try {
  await client.connect();
  console.log('Conexão realizada com sucesso');
} catch (err: any) {
  console.error('Erro ao tentar realizar a conexão', err.stack);
}

export const SimilarChunks = async (userQuery: string): Promise<string> => {

  const embeddingFunction = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY as string,
});



const queryEmbedding = await embeddingFunction.embedDocuments([userQuery])


  console.log(`Querying for: ${userQuery}`);
  const { rows } = await client.query(
    'SELECT (content) FROM tbl_documents_geral ORDER BY vector <-> $1 LIMIT 10', 
    [queryEmbedding]
  );

  console.log("Query results:", JSON.stringify(rows, null, 2));
  if (rows.length === 0) {
    return "No relevant documents found.";
  }

  return rows.map((row: { content: any; }) => row.content).join("\n")

};

export const SaveEmbeddings = async (chunks: string[]) => {
  try {
    // Assumindo que chunks é um array de strings JSON que representa os embeddings
    for (let chunk of chunks) {
      let embeddingArray = JSON.parse(chunk); // converte string JSON para array
      embeddingArray = embeddingArray.map(Number); // converte os elementos para números

      const embeddingVector = toSql(embeddingArray); // converte o array para o formato SQL

      const insertQuery = `
        INSERT INTO tbl_documents_geral (content, embedding) VALUES ($1, $2)
      `;

      await client.query(insertQuery, [embeddingVector]);
    }

    console.log("Embeddings salvos com sucesso!");
  } catch (error) {
    console.error("Erro ao salvar embeddings:", error.message);
    throw error;
  }
};





