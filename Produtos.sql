BEGIN TRANSACTION;
CREATE TABLE "Produto" (
    "CdProduto" INTEGER UNIQUE,
    "CdStatus"  INTEGER NOT NULL CHECK (CdStatus IN (0, 1)),
    "NomeProduto"   TEXT NOT NULL,
    "DescricaoProduto"  TEXT NOT NULL,
    "ValorProduto"  REAL NOT NULL,
    PRIMARY KEY("CdProduto" AUTOINCREMENT)
);
COMMIT;

