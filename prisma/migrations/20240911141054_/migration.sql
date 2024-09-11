-- CreateTable
CREATE TABLE "Colaborador" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,

    CONSTRAINT "Colaborador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_documents_geral" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "vector" vector NOT NULL,

    CONSTRAINT "tbl_documents_geral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_documents_rh" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "vector" vector NOT NULL,

    CONSTRAINT "tbl_documents_rh_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_documents_comercial" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "vector" vector NOT NULL,

    CONSTRAINT "tbl_documents_comercial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_documents_qualidade" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "vector" vector NOT NULL,

    CONSTRAINT "tbl_documents_qualidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_documents_ibr" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "vector" vector NOT NULL,

    CONSTRAINT "tbl_documents_ibr_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Colaborador_matricula_key" ON "Colaborador"("matricula");
