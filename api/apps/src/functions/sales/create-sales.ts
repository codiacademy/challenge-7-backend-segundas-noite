// src/routes/sales.ts
import express from "express";
import { prisma } from "../../lib/prisma.js";
import { z } from "zod";

export const router = express.Router();

export const saleSchemaBody = z.object({
  modalidade: z.enum(["ONLINE", "PRESENCIAL"], {
    message: "A modalidade é obrigatória",
  }),
  courseId: z.string({
    message: "O ID do curso é obrigatório",
  }),
  nomeAluno: z.string({
    message: "O nome do aluno é obrigatório",
  }),
  email: z
    .string({
      message: "Digite um email válido",
    })
    .email(),
  telefone: z.string({
    message: "O telefone é obrigatório",
  }),
  valorBruto: z.number({
    message: "O valor bruto é obrigatório",
  }),
  desconto: z.number({
    message: "O desconto é obrigatório",
  }),
  comisao: z.number({
    message: "A comissão é obrigatória",
  }),
  imposto: z.number({
    message: "O imposto é obrigatório",
  }),
  taxaCartao: z.number({
    message: "A taxa do cartão é obrigatória",
  }),
  valorLiquido: z.number().optional(), // calculado no back
  dataVenda: z.date().optional(), // gerado no back
});

interface CalculoValorLiquidoParams {
  valorBruto: number;
  desconto: number;
  comisao: number;
  taxaCartaoPercent: number;
  impostoPercent: number;
  impostoSobre?: "bruto" | "aposDesconto";
}

function calcularValorLiquido({
  valorBruto,
  desconto,
  comisao,
  taxaCartaoPercent,
  impostoPercent,
  impostoSobre = "aposDesconto",
}: CalculoValorLiquidoParams) {
  valorBruto = Number(valorBruto) || 0;
  desconto = Number(desconto) || 0;
  comisao = Number(comisao) || 0;
  taxaCartaoPercent = Number(taxaCartaoPercent) || 0;
  impostoPercent = Number(impostoPercent) || 0;

  const valorAposDesconto = valorBruto - desconto;
  const baseImposto = impostoSobre === "bruto" ? valorBruto : valorAposDesconto;

  const valorComissao = valorAposDesconto * (comisao / 100);
  const valorTaxaCartao = valorAposDesconto * (taxaCartaoPercent / 100);
  const valorImposto = baseImposto * (impostoPercent / 100);

  const valorLiquido =
    valorAposDesconto - valorComissao - valorTaxaCartao - valorImposto;

  return valorLiquido;
}

router.post("/sales", async (req, res) => {
  try {
    const {
      modalidade,
      courseId,
      nomeAluno,
      email,
      telefone,
      valorBruto,
      desconto,
      comisao,
      imposto,
      taxaCartao,
    } = saleSchemaBody.parse(req.body);

    const valorLiquido = calcularValorLiquido({
      valorBruto,
      desconto,
      comisao,
      taxaCartaoPercent: taxaCartao,
      impostoPercent: imposto,
    });

    const dataVenda = new Date();

    await prisma.sale.create({
      data: {
        modalidade,
        nomeAluno,
        email,
        telefone,
        valorBruto,
        desconto,
        comisao,
        imposto,
        taxaCartao,
        valorLiquido,
        dataVenda,
        course: {
          connect: { id: courseId },
        },
      },
    });

    return res.status(201).json({ message: "Venda criada com sucesso!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao criar venda" });
  }
});
