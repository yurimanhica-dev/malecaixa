import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const soap = require("soap");

const WSDL_URL = process.env.WSDL_URL;
const API_KEY = process.env.API_KEY;
const ENDPOINT = process.env.ENDPOINT;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email é obrigatório." },
        { status: 400 }
      );
    }

    // Configurações do cliente SOAP
    const soapOptions = {
      endpoint: ENDPOINT,
    };

    // Criação do cliente SOAP
    const client = await soap.createClientAsync(WSDL_URL, soapOptions);

    // Cabeçalho com API Key
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

    // Parâmetros da chamada
    const args = {
      input: {
        EmailMetodo: email,
      },
    };

    const [result] = await client.ConsultaEmailAsync(args);
    const output = result.ConsultaEmailResult;

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
        ...responseData,
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
