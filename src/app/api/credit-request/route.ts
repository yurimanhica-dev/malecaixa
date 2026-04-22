import { CREDIT_TYPES } from "@/app/utils/creditCalculations1";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export async function POST(request: Request) {
  const formData = await request.formData();

  // Extrair dados do formulário
  const creditTypeId = parseInt(formData.get("creditTypeId") as string);
  const fullName = formData.get("fullName") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const salary = parseFloat(formData.get("salary") as string);
  const monthlyIncome = parseFloat(formData.get("monthlyIncome") as string);
  const amount = parseFloat(formData.get("amount") as string);
  const months = parseInt(formData.get("months") as string);
  const totalPayback = parseFloat(formData.get("totalPayback") as string);
  const totalEncargos = parseFloat(formData.get("totalEncargos") as string);
  const monthlyPayment = parseFloat(formData.get("monthlyPayment") as string);
  const interestRate = parseFloat(formData.get("interestRate") as string);

  // Coletar múltiplos arquivos de comprovativo
  const proofDocuments: File[] = [];
  let index = 0;
  while (true) {
    const file = formData.get(`proofDocument_${index}`) as File;
    if (!file) break;
    proofDocuments.push(file);
    index++;
  }

  // Validação básica
  if (
    !fullName ||
    !phone ||
    !email ||
    !salary ||
    !amount ||
    !months ||
    proofDocuments.length === 0
  ) {
    return NextResponse.json(
      { error: "Todos os campos obrigatórios devem ser preenchidos" },
      { status: 400 },
    );
  }

  // Encontrar o tipo de crédito selecionado
  const creditType = CREDIT_TYPES.find((credit) => credit.id === creditTypeId);
  if (!creditType) {
    return NextResponse.json(
      { error: "Tipo de crédito inválido" },
      { status: 400 },
    );
  }

  // Configuração do transporter de e-mail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // E-mail para a equipe administrativa
  const adminEmailHtml = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet">
<title>Nova Solicitação de Crédito | MALEcaixa (Admin)</title>
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 40px 20px;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    font-family: 'DM Sans', sans-serif;
    color: #1a1d29;
    line-height: 1.6;
  }
  .wrapper {
    max-width: 680px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0,0,0,0.12);
    border: 1px solid #e5e7eb;
  }

  /* Header */
  .header {
    background: linear-gradient(135deg, #0078b9 0%, #005f93 100%);
    text-align: center;
    padding: 48px 32px 56px;
    border-bottom: 4px solid #00a2ff;
  }
  .header img {
    height: 56px;
    max-width: 80%;
    width: auto;
    margin-bottom: 16px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .header h1 {
    font-size: 22px;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
    letter-spacing: 0.3px;
  }

  /* Intro */
  .intro {
    padding: 36px 40px 24px;
  }
  .intro p { margin: 0 0 12px; }
  .intro p:last-child { margin: 0; }

  /* Content area */
  .content { padding: 0 40px 8px; }

  /* Section heading */
  .section-title {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    color: #0078b9;
    font-size: 18px;
    font-weight: 600;
  }
  .section-title span {
    width: 4px;
    height: 22px;
    background: linear-gradient(135deg, #009feb 0%, #0078b9 100%);
    border-radius: 2px;
    margin-right: 12px;
    display: inline-block;
    flex-shrink: 0;
  }

  /* Info rows */
  .info-grid { display: grid; gap: 12px; margin-bottom: 36px; }
  .info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    padding: 16px 18px;
    background: #f8fafc;
    border-radius: 8px;
    border-left: 4px solid #0078b9;
  }
  .info-row .label { font-weight: 500; color: #6b7280; font-size: 14px; }
  .info-row .value { font-weight: 700; color: #1a1d29; font-size: 14px; text-align: right; }
  .info-row .value a { color: #0078b9; text-decoration: none; }

  /* Divider */
  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, #e5e7eb 50%, transparent 100%);
    margin: 28px 0;
  }

  /* Detalhes */
  .details-box {
    background: linear-gradient(135deg, #e8f6fd 0%, #f0f9ff 100%);
    padding: 24px;
    border-radius: 16px;
    border: 1px solid #e5e7eb;
    margin-bottom: 20px;
  }
  .detail-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    padding: 14px 0;
    border-bottom: 1px solid rgba(0,159,235,0.1);
  }
  .detail-row:last-child { border-bottom: none; padding-bottom: 0; }
  .detail-row .label { font-weight: 500; color: #6b7280; font-size: 14px; }
  .detail-row .value { font-weight: 700; color: #0078b9; font-size: 14px; text-align: right; }
  .badge {
    display: inline-block;
    padding: 4px 10px;
    background: #fed400;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    color: #1a1d29;
    margin-left: 8px;
    vertical-align: middle;
  }

  /* Total */
  .total-box {
    background: linear-gradient(135deg, #00c896 0%, #00a87e 100%);
    color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    margin-bottom: 24px;
  }
  .total-box .total-label { font-size: 13px; opacity: 0.9; margin-bottom: 4px; }
  .total-box .total-value { font-size: 22px; font-weight: 700; }

  /* Contact note */
  .contact-note {
    margin-top: 4px;
    text-align: center;
    background: #f1f5f9;
    border-radius: 8px;
    padding: 16px 20px;
    font-size: 14px;
    color: #1a1d29;
    border: 1px solid #e2e8f0;
    margin-bottom: 8px;
  }
  .contact-note p { margin: 0; }
  .contact-note a { color: #0078b9; text-decoration: none; font-weight: 700; }

  /* Timestamp */
  .timestamp {
    text-align: center;
    padding: 16px 20px;
    background: #f8fafc;
    border-radius: 8px;
    border: 1px dashed #e5e7eb;
    margin: 20px 40px 28px;
    font-size: 13px;
    color: #6b7280;
  }

  /* Footer */
  .footer {
    text-align: center;
    padding: 36px 32px;
    background: #f8fafc;
    border-top: 1px solid #e5e7eb;
  }
  .footer img {
    height: 28px;
    max-width: 60%;
    width: auto;
    margin-bottom: 16px;
    opacity: 0.7;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .footer p { margin: 6px 0; font-size: 13px; color: #6b7280; }
  .footer-links { margin-top: 16px; }
  .footer-links a {
    color: #0078b9;
    text-decoration: none;
    font-size: 13px;
    display: inline-block;
    margin: 4px 10px;
  }

  /* Mobile */
  @media (max-width: 600px) {
    body { padding: 16px 12px; }

    .header { padding: 36px 20px 44px; }
    .header img { height: 44px; }
    .header h1 { font-size: 18px; }

    .intro { padding: 24px 20px 16px; }
    .content { padding: 0 20px 8px; }

    .info-row {
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
    }
    .info-row .value { text-align: left; }

    .details-box { padding: 16px; }
    .detail-row {
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
    }
    .detail-row .value { text-align: left; }

    .total-box .total-value { font-size: 20px; }
    .timestamp { margin: 16px 20px 24px; }

    .footer { padding: 28px 20px; }
    .footer-links a { display: block; margin: 6px 0; }

    .section-title { font-size: 16px; }
  }
</style>
</head>
<body>
<div class="wrapper">

  <!-- Header -->
  <div class="header">
    <img src="https://dbmib2q8rj.ufs.sh/f/Lm6xK3J7O1CLDCc1WDKOH3B9iRavr4SYO8pjUdgbsPulQfem" alt="MALEcaixa" />
    <h1>Nova Solicitação de Crédito Recebida</h1>
  </div>

  <!-- Intro -->
  <div class="intro">
    <p style="font-size: 15px; color: #1a1d29;">
      Uma nova solicitação de crédito foi submetida através do sistema da
      <strong style="color: #0078b9;">MALEcaixa</strong>.
    </p>
    <p style="font-size: 14px; color: #3d4653;">
      Solicitamos à equipa administrativa que verifique os detalhes abaixo e prossiga com a análise da solicitação.
    </p>
  </div>

  <!-- Content -->
  <div class="content">

    <!-- Informações do Cliente -->
    <h2 class="section-title"><span></span>Informações do Cliente</h2>
    <div class="info-grid">
      <div class="info-row">
        <span class="label">Nome Completo</span>
        <span class="value">${fullName}</span>
      </div>
      <div class="info-row">
        <span class="label">E-mail</span>
        <span class="value"><a href="mailto:${email}">${email}</a></span>
      </div>
      <div class="info-row">
        <span class="label">Telefone</span>
        <span class="value"><a href="tel:${phone}">${phone}</a></span>
      </div>
      <div class="info-row">
        <span class="label">Salário Líquido</span>
        <span class="value">${Number(salary).toLocaleString("pt-BR")} MZN</span>
      </div>
      <div class="info-row">
        <span class="label">Rendimento Mensal</span>
        <span class="value">${monthlyIncome ? Number(monthlyIncome).toLocaleString("pt-BR") : "N/A"} MZN</span>
      </div>
    </div>

    <div class="divider"></div>

    <!-- Detalhes da Solicitação -->
    <h2 class="section-title"><span></span>Detalhes da Solicitação</h2>
    <div class="details-box">
      <div class="detail-row">
        <span class="label">Tipo de Crédito</span>
        <span class="value">
          ${creditType.name}
          <span class="badge">Pessoal</span>
        </span>
      </div>
      <div class="detail-row">
        <span class="label">Montante Solicitado</span>
        <span class="value">${Number(amount).toLocaleString("pt-BR")} MZN</span>
      </div>
      <div class="detail-row">
        <span class="label">Taxa de Juros</span>
        <span class="value">${(interestRate * 100).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}%</span>
      </div>
      <div class="detail-row">
        <span class="label">Prazo de Pagamento</span>
        <span class="value">${months} meses</span>
      </div>
      <div class="detail-row">
        <span class="label">Encargos Totais</span>
        <span class="value">${Number(totalEncargos).toLocaleString("pt-BR")} MZN</span>
      </div>
      <div class="detail-row">
        <span class="label">Prestação Mensal</span>
        <span class="value">${Number(monthlyPayment).toLocaleString("pt-BR")} MZN</span>
      </div>
    </div>

    <div class="total-box">
      <div class="total-label">Total a Pagar</div>
      <div class="total-value">${Number(totalPayback).toLocaleString("pt-BR")} MZN</div>
    </div>

    <div class="contact-note">
      <p>
        💬 Caso precise de mais informações ou queira atualizar esta solicitação,
        <strong>responda directamente a este e-mail: <a href="mailto:${email}">${email}</a></strong>
        ou entre em contacto pelo número <a href="tel:${phone}">${phone}</a>.
      </p>
    </div>

    <div class="divider"></div>
  </div>

  <!-- Timestamp -->
  <div class="timestamp">
    <strong>Data/Hora da Submissão:</strong><br>
    ${new Date().toLocaleString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}
  </div>

  <!-- Footer -->
  <div class="footer">
    <img src="https://dbmib2q8rj.ufs.sh/f/Lm6xK3J7O1CLDCc1WDKOH3B9iRavr4SYO8pjUdgbsPulQfem" alt="MALEcaixa" />
    <p>E-mail interno para equipa <strong style="color: #0078b9;">MALEcaixa</strong>.</p>
    <p>Gerado automaticamente — não responder.</p>
    <div class="footer-links">
      <a href="#">Painel Administrativo</a>
      <a href="#">Gestão de Solicitações</a>
      <a href="#">Suporte Técnico</a>
    </div>
    <p style="margin-top: 16px;">© ${new Date().getFullYear()} MALEcaixa. Todos os direitos reservados.</p>
  </div>
</div>
</body>
</html>
`;

  const clientEmailHtml = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet">
<title>Confirmação da Solicitação de Crédito | MALEcaixa</title>
</head>
<body style="margin: 0; padding: 40px 20px; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); font-family: 'DM Sans', sans-serif; color: #1a1d29; line-height: 1.6;">
<div style="max-width: 680px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12); border: 1px solid #e5e7eb;">
  
  <!-- Header -->
<div style="
  background: linear-gradient(135deg, #0078b9 0%, #005f93 100%);
  text-align: center;
  padding: 48px 32px 56px;
  border-bottom: 4px solid #00a2ff;
">
  <img 
    src="https://dbmib2q8rj.ufs.sh/f/Lm6xK3J7O1CLDCc1WDKOH3B9iRavr4SYO8pjUdgbsPulQfem" 
    alt="MALEcaixa" 
    style="height: 56px; margin-bottom: 16px;"
  />
  <h1 style="
    font-size: 26px;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
    letter-spacing: 0.5px;
  ">
    Solicitação de Crédito Recebida
  </h1>
</div>


  <!-- Content -->
  <div style="padding: 48px 40px;">
    <p style="font-size: 16px; margin-bottom: 24px;">Olá <span style="color: #009feb; font-weight: 600">${fullName}</span>,</p>
    <p style="margin-bottom: 24px;">Agradecemos por confiar em nós. Sua solicitação de crédito foi recebida com sucesso e está em fase de análise pela nossa equipe administrativa.</p>
    
    <div style="background: #f8fafc; padding: 24px; border-left: 4px solid #009feb; border-radius: 8px; margin-bottom: 32px;">
      <p style="margin: 0; font-size: 15px; color: #6b7280;">
        Entraremos em contacto através do número <a href="tel:${phone}" style="color: #009feb; text-decoration: none;"> ${phone}</a> ou do e-mail <a href="mailto:${email}" style="color: #009feb; text-decoration: none;"> ${email}</a> assim que a análise estiver concluída.
      </p>
    </div>

    <!-- Detalhes do Pedido -->
    <h2 style="display: flex; align-items: center; margin-bottom: 24px; color: #0078b9; font-size: 20px; font-weight: 600;">
      <span style="width: 4px; height: 24px; background: linear-gradient(135deg, #009feb 0%, #0078b9 100%); border-radius: 2px; margin-right: 12px;"></span>
      Detalhes da Sua Solicitação
    </h2>

    <div style="background: linear-gradient(135deg, #e8f6fd 0%, #f0f9ff 100%); padding: 32px; border-radius: 16px; border: 1px solid #e5e7eb;">
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(0, 159, 235, 0.1);">
        <span style="font-weight: 500; color: #6b7280;">Tipo de Crédito: </span>
        <span style="font-weight: 700; color: #0078b9;">${
          creditType.name
        }</span>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(0, 159, 235, 0.1);">
        <span style="font-weight: 500; color: #6b7280;">Montante Solicitado: </span>
        <span style="font-weight: 700; color: #0078b9;">${Number(
          amount,
        ).toLocaleString("pt-BR")} MZN</span>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(0, 159, 235, 0.1);">
        <span style="font-weight: 500; color: #6b7280;">Taxa de Juros: </span>
        <span style="font-weight: 700; color: #0078b9;">${(
          interestRate * 100
        ).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}%</span>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(0, 159, 235, 0.1);">
        <span style="font-weight: 500; color: #6b7280;">Prazo: </span>
        <span style="font-weight: 700; color: #0078b9;">${months} mes(es)</span>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0;">
        <span style="font-weight: 500; color: #6b7280;">Prestação Mensal: </span>
        <span style="font-weight: 700; color: #0078b9;">${Number(
          monthlyPayment,
        ).toLocaleString("pt-BR")} MZN</span>
      </div>
    </div>

    <div style="background: linear-gradient(135deg, #00c896 0%, #00a87e 100%); color: #ffffff; padding: 20px; border-radius: 8px; margin-top: 24px; text-align: center;">
      <div style="font-size: 14px; opacity: 0.9;">Total a Pagar</div>
      <div style="font-size: 20px; font-weight: 700;">${Number(
        totalPayback,
      ).toLocaleString("pt-BR")} MZN</div>
    </div>

    <div style="text-align: center; margin-top: 32px;">
      <div style="display: inline-flex; align-items: center; padding: 10px 20px; background: #fed400; color: #1a1d29; border-radius: 20px; font-size: 13px; font-weight: 600;">
        🕓 Solicitação em Análise
      </div>
    </div>

    <!-- Data -->
    <div style="text-align: center; margin-top: 40px; font-size: 14px; color: #6b7280;">
      <strong>Data da Solicitação: </strong>${new Date().toLocaleString(
        "pt-BR",
        {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        },
      )}     
    </div>
  </div>

  <!-- Footer -->
  <div style="text-align: center; padding: 40px 32px; background: #f8fafc; border-top: 1px solid #e5e7eb;">
    <img src="https://dbmib2q8rj.ufs.sh/f/Lm6xK3J7O1CLDCc1WDKOH3B9iRavr4SYO8pjUdgbsPulQfem" alt="MALEcaixa" style="height: 32px; margin-bottom: 20px; opacity: 0.7;" />
    <p style="margin: 8px 0; font-size: 14px; color: #6b7280;">Esta mensagem confirma o recebimento da sua solicitação.</p>
    <p style="margin: 8px 0; font-size: 14px; color: #6b7280;">© ${new Date().getFullYear()}. Todos os direitos reservados.</p>
  </div>

</div>
</body>
</html>
`;

  // Configurar opções de e-mail para a equipe
  const mailOptions: Mail.Options = {
    from: `"MALEcaixa Créditos" <${process.env.EMAIL_USER}>`,
    to: process.env.CREDIT_TEAM_EMAIL || process.env.EMAIL_USER,
    subject: `[Solicitação de Crédito] ${fullName} - ${creditType.name}`,
    html: adminEmailHtml,
    attachments: await Promise.all(
      proofDocuments.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      })),
    ),
  };

  // Configurar e-mail de confirmação para o cliente
  const clientMailOptions: Mail.Options = {
    from: `"MALEcaixa Créditos" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Recebemos sua solicitação de ${creditType.name}`,
    html: clientEmailHtml,
  };

  try {
    // Enviar e-mail para a equipe
    await transporter.sendMail(mailOptions);

    // Enviar e-mail de confirmação para o cliente
    await transporter.sendMail(clientMailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao enviar o e-mail:", error);
    return NextResponse.json(
      { error: "Erro ao processar solicitação de crédito" },
      { status: 500 },
    );
  }
}
