import { CREDIT_TYPES } from "@/app/utils/creditCalculations";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export async function POST(request: Request) {
  const formData = await request.json();

  // Extrair dados do formulário
  const {
    creditTypeId,
    fullName,
    phone,
    email,
    salary,
    amount,
    months,

    institution = "",
  } = formData;

  // Validação básica
  if (!fullName || !phone || !email || !salary || !amount || !months) {
    return NextResponse.json(
      { error: "Todos os campos obrigatórios devem ser preenchidos" },
      { status: 400 }
    );
  }

  // Encontrar o tipo de crédito selecionado
  const creditType = CREDIT_TYPES.find((credit) => credit.id === creditTypeId);
  if (!creditType) {
    return NextResponse.json(
      { error: "Tipo de crédito inválido" },
      { status: 400 }
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

  const interestRate = creditType.interestRates[months] || 0;
  // Função auxiliar para calcular o total a pagar (deve ser a mesma usada no frontend)
  function calculateTotalPayback(
    amount: number,
    months: number,
    creditTypeId: number
  ): number {
    const creditType = CREDIT_TYPES.find(
      (credit) => credit.id === creditTypeId
    );
    if (!creditType) return amount;

    const interestRate = creditType.interestRates[months] / 100;
    return amount * Math.pow(1 + interestRate, months);
  }

  // E-mail para a equipe administrativa
  const adminEmailHtml = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Nova Solicitação de Crédito | MALEcaixa</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
:root {
  --primary: #009feb;
  --primary-light: #e6f5fc;
  --secondary: #fed400;
  --text: #2d3436;
  --text-light: #636e72;
  --white: #ffffff;
  --light-bg: #f9f9f9;
  --border-radius: 12px;
  --shadow: 0 4px 12px rgba(0,0,0,0.08);
}

body {
  font-family: 'Poppins', sans-serif;
  background-color: var(--light-bg);
  color: var(--text);
  margin: 0;
  padding: 0;
}

.email-container {
  max-width: 600px;
  margin: 0 auto;
  background-color: var(--white);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow);
}

.header {
  background: linear-gradient(135deg, var(--primary) 0%, #0066cc 100%);
  color: var(--white);
  padding: 32px 24px;
  text-align: center;
}

.header img {
  height: 48px;
  margin-bottom: 16px;
}

.header h1 {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}

.header p {
  margin-top: 8px;
  font-weight: 400;
  opacity: 0.9;
}

.content {
  padding: 32px 24px;
}

.content p {
  margin: 0 0 16px;
  line-height: 1.6;
}

.divider {
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, var(--secondary) 50%, transparent 100%);
  margin: 24px 0;
  border-radius: 2px;
}

.details-table {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
}

.details-table th, .details-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.details-table th {
  background-color: var(--light-bg);
  color: var(--text-light);
  font-weight: 500;
}

.highlight {
  background-color: var(--primary-light);
  padding: 20px;
  border-radius: var(--border-radius);
  margin: 16px 0;
}

.badge {
  display: inline-block;
  padding: 4px 8px;
  background-color: var(--secondary);
  color: var(--text);
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  margin-left: 8px;
}

.footer {
  text-align: center;
  padding: 24px;
  font-size: 14px;
  color: var(--text-light);
  background-color: var(--light-bg);
}

@media (max-width: 640px) {
  .content {
    padding: 24px 16px;
  }
  .header {
    padding: 24px 16px;
  }
  .highlight {
    padding: 16px;
  }
}
</style>
</head>
<body>
<div class="email-container">
  <div class="header">
    <img src="https://dbmib2q8rj.ufs.sh/f/Lm6xK3J7O1CLDCc1WDKOH3B9iRavr4SYO8pjUdgbsPulQfem" alt="MALEcaixa">
    <h1>Nova Solicitação de Crédito</h1>
    <p>Uma nova solicitação foi submetida através do sistema</p>
  </div>

  <div class="content">
    <p>Olá equipe MALEcaixa,</p>
    <p>Você recebeu uma nova solicitação de crédito. Por favor, revise os detalhes abaixo:</p>

    <div class="divider"></div>

    <h3 style="color: var(--primary); margin-bottom: 16px;">Informações do Cliente</h3>
    <table class="details-table">
      <tr><th>Nome Completo</th><td>${fullName}</td></tr>
      <tr><th>E-mail</th><td><a href="mailto:${email}" style="color: var(--primary); text-decoration: none;">${email}</a></td></tr>
      <tr><th>Telefone</th><td>${phone}</td></tr>
      <tr><th>Salário Líquido</th><td>${Number(salary).toLocaleString(
        "pt-BR"
      )} MZN</td></tr>
      ${
        institution
          ? `<tr><th>Instituição</th><td>${institution}</td></tr>`
          : ""
      }
    </table>

    <div class="divider"></div>

    <h3 style="color: var(--primary); margin-bottom: 16px;">Detalhes do Crédito</h3>
    <div class="highlight">
      <table class="details-table">
        <tr><th>Tipo de Crédito</th><td>${
          creditType.name
        }<span class="badge">Taxa de Juros: ${interestRate * 100}%</span></td></tr>
        <tr><th>Montante Solicitado</th><td>${Number(amount).toLocaleString(
          "pt-BR"
        )} MZN</td></tr>
        <tr><th>Prazo</th><td>${months} meses</td></tr>
        <tr><th>Total a Pagar</th><td style="color: var(--primary); font-weight: 600;">${calculateTotalPayback(
          amount,
          months,
          creditTypeId
        ).toLocaleString("pt-BR")} MZN</td></tr>
      </table>
    </div>

    <div class="divider"></div>
    <p style="margin-top:24px; font-size: 15px;">Data/Hora da Solicitação: ${new Date().toLocaleString(
      "pt-BR"
    )}</p>
  </div>

  <div class="footer">
    <p>Este e-mail foi gerado automaticamente pelo sistema de crédito da MALEcaixa.</p>
    <p>© ${new Date().getFullYear()} MALEcaixa. Todos os direitos reservados.</p>
  </div>
</div>
</body>
</html>
`;
  // E-mail de confirmação para o cliente
  const clientEmailHtml = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Solicitação de Crédito Recebida | MALEcaixa</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #009feb;
      --primary-light: #e6f5fc;
      --secondary: #fed400;
      --text: #2d3436;
      --text-light: #636e72;
      --white: #ffffff;
      --light-bg: #f9f9f9;
      --border-radius: 12px;
      --shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
    
    body {
      font-family: 'Poppins', sans-serif;
      line-height: 1.6;
      color: var(--text);
      background-color: var(--light-bg);
      margin: 0;
      padding: 0;
    }
    
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: var(--white);
      border-radius: var(--border-radius);
      overflow: hidden;
      box-shadow: var(--shadow);
    }
    
    .header {
      background: linear-gradient(135deg, var(--primary) 0%, #0066cc 100%);
      color: var(--white);
      padding: 32px 24px;
      text-align: center;
    }
    
    .content {
      padding: 32px;
    }
    
    .thank-you {
      font-size: 28px;
      font-weight: 600;
      color: var(--primary);
      margin: 16px 0;
      text-align: center;
    }
    
    .divider {
      height: 2px;
      background: linear-gradient(90deg, transparent 0%, var(--secondary) 50%, transparent 100%);
      margin: 24px 0;
    }
    
    .footer {
      text-align: center;
      padding: 24px;
      font-size: 14px;
      color: var(--text-light);
      background-color: var(--light-bg);
    }
    
    .summary-card {
      background-color: var(--primary-light);
      border-radius: var(--border-radius);
      padding: 20px;
      margin: 24px 0;
    }
    
    .action-button {
      display: inline-block;
      background: linear-gradient(to right, var(--primary), #0066cc);
      color: white;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 50px;
      font-weight: 500;
      margin: 16px auto;
      text-align: center;
    }
    
    .timeline {
      margin: 24px 0;
      position: relative;
    }
    
    .timeline-step {
      display: flex;
      margin-bottom: 16px;
      position: relative;
      padding-left: 30px;
    }
    
    .timeline-step:before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: var(--primary);
    }
    
    .timeline-step:after {
      content: "";
      position: absolute;
      left: 9px;
      top: 20px;
      width: 2px;
      height: 100%;
      background-color: var(--primary);
    }
    
    .timeline-step:last-child:after {
      display: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <img src="https://dbmib2q8rj.ufs.sh/f/Lm6xK3J7O1CLDCc1WDKOH3B9iRavr4SYO8pjUdgbsPulQfem" alt="MALEcaixa" style="height: 48px; margin-bottom: 16px;">
      <h1 style="margin: 0; font-size: 24px; font-weight: 600;">Solicitação de Crédito Recebida</h1>
    </div>
    
    <div class="content">
      <div class="thank-you">Obrigado, ${fullName}!</div>
      
      <p style="text-align: center; margin: 0 0 16px;">
        Recebemos sua solicitação de <strong>${
          creditType.name
        }</strong> no valor de 
        <strong>${Number(amount).toLocaleString("pt-BR")} MZN</strong>.
      </p>
      
      <div class="summary-card">
        <h3 style="margin: 0 0 12px; font-size: 18px; color: var(--primary);">Resumo da sua solicitação:</h3>
        <p style="margin: 8px 0;"><strong>Tipo de Crédito:</strong> ${
          creditType.name
        }</p>
        <p style="margin: 8px 0;"><strong>Montante:</strong> ${Number(
          amount
        ).toLocaleString("pt-BR")} MZN</p>
        <p style="margin: 8px 0;"><strong>Prazo:</strong> ${months} meses</p>
        <p style="margin: 8px 0;"><strong>Total a Pagar:</strong> ${calculateTotalPayback(
          amount,
          months,
          creditTypeId
        ).toLocaleString("pt-BR")} MZN</p>
        <p style="margin: 8px 0;"><strong>Taxa de Juros:</strong> ${
          interestRate * 100
        }% ao mês</p>
      </div>
      
      <div class="divider"></div>
      
      <h3 style="margin: 0 0 16px; font-size: 18px; color: var(--primary);">Próximos Passos</h3>
      
      <div class="timeline">
        <div class="timeline-step">
          <div>
            <strong>1. Análise da Solicitação</strong>
            <p style="margin: 4px 0 0; font-size: 14px;">Nossa equipe está analisando sua solicitação e documentos.</p>
          </div>
        </div>
        <div class="timeline-step">
          <div>
            <strong>2. Contato</strong>
            <p style="margin: 4px 0 0; font-size: 14px;">Entraremos em contato em até 48 horas úteis para mais informações.</p>
          </div>
        </div>
        <div class="timeline-step">
          <div>
            <strong>3. Aprovação</strong>
            <p style="margin: 4px 0 0; font-size: 14px;">Após análise, informaremos o resultado e condições finais.</p>
          </div>
        </div>
      </div>
      
      <p style="margin: 24px 0 16px; text-align: center;">
        Você pode acompanhar o status da sua solicitação através do nosso site.
      </p>
      
      <div style="text-align: center;">
        <a href="https://malecaixa.co.mz/meus-creditos" class="action-button">Acompanhar Solicitação</a>
      </div>
    </div>
    
    <div class="footer">
      <p style="margin: 0 0 8px;">Este é um e-mail automático, por favor não responda.</p>
      <p style="margin: 0;">© ${new Date().getFullYear()} MALEcaixa. Todos os direitos reservados.</p>
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
    console.error("Erro ao enviar e-mails:", error);
    return NextResponse.json(
      { error: "Erro ao processar solicitação de crédito" },
      { status: 500 }
    );
  }
}
