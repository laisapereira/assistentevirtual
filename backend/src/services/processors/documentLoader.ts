import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { IDocument } from './types'; // Certifique-se de criar um arquivo types.ts com a interface IDocument
import { indexDocuments } from './vectorstore';

export const loadAndNormalizeDocuments = async (): Promise<string[]> => {
  const loader = new DirectoryLoader('./documents', {
    '.pdf': (path: string) => new PDFLoader(path),
    '.txt': (path: string) => new TextLoader(path),
  });

  const docs: IDocument[] = await loader.load();
  const normalizedDocs = docs
    .map((doc: IDocument) => {
      if (typeof doc.pageContent === 'string') {
        return doc.pageContent;
      } else if (Array.isArray(doc.pageContent)) {
        return doc.pageContent.join('\n');
      }
      return '';
    })
    .filter((doc) => doc !== '');

  const textSplitter = new RecursiveCharacterTextSplitter({
    separators: ['\n', '.', '!', '?', ';', ' ', ''],
    chunkSize: 200,
    chunkOverlap: 50,
    lengthFunction: (str: string) => str.length,
  });

  const combinedText = normalizedDocs.join('\n');
  const documents = await textSplitter.splitText(combinedText);

  await indexDocuments(documents);

  return documents;
};
