import { NextRequest, NextResponse } from "next/server";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const soap = require("soap");

const WSDL_URL = process.env.WSDL_URL;
const API_KEY = process.env.API_KEY;
const ENDPOINT = process.env.ENDPOINT;

export async function POST(req: NextRequest) {
  try {
    const { email, password: hashedPassword } = await req.json();

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

    // Parâmetros para ValidaAutenticacao
    const args = {
      input: {
        EmailMetodo: email,
        SenhaInput: hashedPassword,
      },
    };

    // Chama o método ValidaAutenticacao
    const [result] = await client.ValidaAutenticacaoAsync(args);

    const output = result.ValidaAutenticacaoResult;
    const status = output?.$?.status || output?.status || null;

    // Formata a resposta
    const responseData = {
      status: status,
      senhaCliente: output?.senhaCliente,
      detalhe: {
        codErro: output?.Detalhe?.CodErro,
        msgErro: output?.Detalhe?.MsgErro,
      },
    };

    // Verifica se a autenticação foi bem-sucedida
    if (responseData.senhaCliente === "1") {
      return NextResponse.json({
        success: true,
        message: "Autenticação bem-sucedida",
        data: responseData,
      });
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
