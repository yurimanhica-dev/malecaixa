import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const soap = require("soap");

const WSDL_URL = process.env.WSDL_URL;
const API_KEY = process.env.API_KEY;
const ENDPOINT = process.env.ENDPOINT;

export async function POST(req: NextRequest) {
  try {
    const { email, password: hashedPassword, rememberMe } = await req.json();

    if (!email || !hashedPassword) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    const soapOptions = {
      endpoint: ENDPOINT,
    };

    // Cria o cliente SOAP
    const client = await soap.createClientAsync(WSDL_URL!, soapOptions);

    // Adiciona o cabeçalho de API Key
    const headers = {
      APIKeyHeader: {
        API_key: API_KEY,
      },
    };
    client.addSoapHeader(
      headers,
      "APIKeyHeader",
      "tns",
      "http://MALEsoftware/ATServices/"
    );

    // Parâmetros para Valida Autenticação
    const args = {
      input: {
        EmailMetodo: email,
        SenhaInput: hashedPassword,
      },
    };

    // Chama o método Valida Autenticação
    const [result] = await client.ValidaAutenticacaoAsync(args);

    const output = result.ValidaAutenticacaoResult;
    const status = output?.$?.status || output?.status || null;

    // Formata a resposta
    const responseData = {
      status: status,
      SenhaValida: output?.SenhaValida,
      detalhe: {
        codErro: output?.Detalhe?.CodErro,
        msgErro: output?.Detalhe?.MsgErro,
      },
    };

    // Verifica se a autenticação foi bem-sucedida
    if (responseData.SenhaValida === 1) {
      const res = NextResponse.json({
        success: true,
        message: "Autenticação bem-sucedida",
        data: {
          status,
          email,
          contas: output.Contas || [], // Certifique-se de que Contas é um array
          name: output.FullName,
          role: "user", // ou outro papel conforme necessário
          detalhesConta: {
            id: output.Id,
            montanteAprovado: output.ApprovedAmount,
            saldoRestante: output.RemainingBalance,
            mensalidade: output.MonthlyPayment,
            jurosPagos: output.InterestPaid,
            principalPago: output.PrincipalPaid,
            taxaMora: output.totalLateFees,
          },
        },
      });

      const accessToken = jwt.sign(
        { email, role: "user", status },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" } // token curto
      );

      const refreshToken = jwt.sign(
        { email, role: "user" },
        process.env.REFRESH_SECRET!, // segredo diferente e mais forte
        { expiresIn: rememberMe ? "7d" : "1h" }
      );

      res.cookies.set("token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60,
        path: "/",
      });

      res.cookies.set("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: rememberMe ? 60 * 60 * 24 * 7 : 60 * 60 * 7, // 7 dias ou 1 dia
        path: "/",
      });

      return res;
    } else {
      return NextResponse.json(
        {
          error: responseData.detalhe.msgErro || "Falha na autenticação",
          code: responseData.detalhe.codErro,
        },
        { status: 401 }
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Erro na autenticação:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao processar autenticação" },
      { status: 500 }
    );
  }
}
