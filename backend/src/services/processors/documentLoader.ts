import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { TextLoader} from "langchain/document_loaders/fs/text";

import { Department }  from "../../utils/types/types"

interface Document {
    pageContent: string | string[];
}

export const loadAndNormalizeDocuments = async (departments: Department[]): Promise<string[]> => {
    
  const repositoryPath = `./documents/${departments.map(department => department.name).join('/')}`;
  
    const loader = new DirectoryLoader(repositoryPath, {
        ".pdf": (path: string) => new PDFLoader(path),
        ".txt": (path: string) => new TextLoader(path)
    });

    console.log("Loading docs...");
    const docs: Document[] = await loader.load();
    console.log("Docs loaded.");

    return docs.map((doc: Document) => {
        if (typeof doc.pageContent === "string") {
            return doc.pageContent;
        } else if (Array.isArray(doc.pageContent)) {
            return doc.pageContent.join("\n");
        }
        return "";
    }).filter(doc => doc !== "");
};
