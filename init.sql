CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE tbl_colaboradores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    matricula VARCHAR(100) NOT NULL UNIQUE,
    setor VARCHAR(100) NOT NULL,
    status BOOLEAN NOT NULL
);

CREATE TABLE tbl_documents_geral(
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  embedding VECTOR(2048)
);

SELECT * FROM documents;
