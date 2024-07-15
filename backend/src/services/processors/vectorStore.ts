import { ChromaClient, OpenAIEmbeddingFunction } from "chromadb";

import * as dotenv from "dotenv";
dotenv.config();

export const similarChunks = async (userQuery: string): Promise<string> => {
  const client = new ChromaClient({
    path: process.env.CHROMADB_PATH,
  });
  const collection = await client.getOrCreateCollection({
    name: "mvp-jo",
    embeddingFunction: new OpenAIEmbeddingFunction({
      openai_api_key: process.env.OPENAI_API_KEY as string,
    }),
  });

  console.log(`Querying for: ${userQuery}`);
  const results = await collection.query({
    queryTexts: [userQuery],
    nResults: 15,
  });

  
  console.log("Query results:", JSON.stringify(results, null, 2));
  if (results.documents[0].length === 0) {
    return "No relevant documents found.";
  }

  return results.documents[0].join("\n");
};

