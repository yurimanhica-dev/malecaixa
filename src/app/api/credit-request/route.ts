import { CREDIT_TYPES } from "@/app/utils/creditCalculations1";
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
    totalPayback,
    totalEncargos,
    monthlyPayment,
    interestRate,
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

  // const interestRates = creditType.interestRates[months] || 0;
  // Função auxiliar para calcular o total a pagar (deve ser a mesma usada no frontend)
  // function calculateTotalPayback(
  //   amount: number,
  //   months: number,
  //   creditTypeId: number
  // ): number {
  //   const creditType = CREDIT_TYPES.find(
  //     (credit) => credit.id === creditTypeId
  //   );
  //   if (!creditType) return amount;

  //   const interestRate = creditType.interestRates[months] / 100;
  //   return amount * Math.pow(1 + interestRate, months);
  // }

  // E-mail para a equipe administrativa
  const adminEmailHtml = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet">
<title>Nova Solicitação de Crédito | MALEcaixa (Admin)</title>
</head>
<body style="margin: 0; padding: 40px 20px; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); font-family: 'DM Sans', sans-serif; font-style: normal; font-optical-sizing: auto; color: #1a1d29; line-height: 1.6;">
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
    Nova Solicitação de Crédito Recebida
  </h1>
</div>

<!-- Corpo -->
<div style="
  background: #ffffff;
  text-align: left;
  padding: 40px 48px 32px;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
">
  <p style="
    max-width: 600px;
    font-size: 16px;
    color: #1a1d29;
    line-height: 1.7;
    margin: 0 0 16px;
  ">
    Uma nova solicitação de crédito foi submetida através do sistema da 
    <strong style="color: #0078b9;">MALEcaixa</strong>.
  </p>
  <p style="
    max-width: 600px;
    font-size: 15px;
    color: #3d4653;
    line-height: 1.6;
    margin: 0;
  ">
    Solicitamos à equipa administrativa que verifique os detalhes abaixo e prossiga com a análise da solicitação.
  </p>
</div>

  <!-- Content -->
  <div style="padding: 0px 40px;">

    <!-- Informações do Cliente -->
    <div style="margin-bottom: 40px;">
      <h2 style="display: flex; align-items: center; margin-bottom: 24px; color: #0078b9; font-size: 20px; font-weight: 600;">
        <span style="width: 4px; height: 24px; background: linear-gradient(135deg, #009feb 0%, #0078b9 100%); border-radius: 2px; margin-right: 12px;"></span>
        Informações do Cliente
      </h2>

      <div style="display: grid; grid-template-columns: 1fr; gap: 16px;">
        <div style="display: flex; justify-content: space-between; padding: 20px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #0078b9;">
          <span style="font-weight: 500; color: #6b7280;">Nome Completo: </span>
          <span style="font-weight: 700; color: #1a1d29;"> ${fullName}</span>
        </div>

        <div style="display: flex; justify-content: space-between; padding: 20px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #0078b9;">
          <span style="font-weight: 500; color: #6b7280;">E-mail: </span>
          <a href="mailto:${email}" style="font-weight: 700; color: #0078b9; text-decoration: none;"> ${email}</a>
        </div>

        <div style="display: flex; justify-content: space-between; padding: 20px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #0078b9;">
          <span style="font-weight: 500; color: #6b7280;">Telefone: </span>
           <a href="tel:${phone}" style="color: #0078b9; font-weight: 700; text-decoration: none; underline: none;"> ${phone}</a>
        </div>

        <div style="display: flex; justify-content: space-between; padding: 20px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #0078b9;">
          <span style="font-weight: 500; color: #6b7280;">Salário Líquido: </span>
          <span style="font-weight: 700; color: #1a1d29;"> ${Number(
            salary
          ).toLocaleString("pt-BR")} MZN</span>
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div style="height: 1px; background: linear-gradient(90deg, transparent 0%, #e5e7eb 50%, transparent 100%); margin: 32px 0;"></div>
    
    <!-- Detalhes da Solicitação -->
    <div style="margin-bottom: 40px;">
      <h2 style="display: flex; align-items: center; margin-bottom: 24px; color: #0078b9; font-size: 20px; font-weight: 600;">
        <span style="width: 4px; height: 24px; background: linear-gradient(135deg, #009feb 0%, #0078b9 100%); border-radius: 2px; margin-right: 12px;"></span>
        Detalhes da Solicitação
      </h2>
      <div style="background: linear-gradient(135deg, #e8f6fd 0%, #f0f9ff 100%); padding: 32px; border-radius: 16px; border: 1px solid #e5e7eb;">
        <div style="display: flex; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid rgba(0, 159, 235, 0.1);">
          <span style="font-weight: 500; color: #6b7280;">Tipo de Crédito: </span>
          <span style="font-weight: 700; color: #0078b9;"> ${creditType.name}
            <span style="padding: 6px 12px; background: #fed400; border-radius: 20px; font-size: 12px; font-weight: 600; margin-left: 8px;">Pessoal</span>
          </span>
        </div>

        <div style="display: flex; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid rgba(0, 159, 235, 0.1);">
          <span style="font-weight: 500; color: #6b7280;">Montante Solicitado: </span>
          <span style="font-weight: 700; color: #0078b9;"> ${Number(
            amount
          ).toLocaleString("pt-BR")} MZN</span>
        </div>

        <div style="display: flex; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid rgba(0, 159, 235, 0.1);">
          <span style="font-weight: 500; color: #6b7280;">Taxa de Juros: </span>
          <span style="font-weight: 700; color: #0078b9;"> ${(
            interestRate * 100
          ).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}%</span>
        </div>

        <div style="display: flex; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid rgba(0, 159, 235, 0.1);">
          <span style="font-weight: 500; color: #6b7280;">Prazo de Pagamento: </span>
          <span style="font-weight: 700; color: #0078b9;"> ${months} meses</span>
        </div>

        <div style="display: flex; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid rgba(0, 159, 235, 0.1);">
          <span style="font-weight: 500; color: #6b7280;">Encargos Totais: </span>
          <span style="font-weight: 700; color: #0078b9;"> ${Number(
            totalEncargos
          ).toLocaleString("pt-BR")} MZN</span>
        </div>

        <div style="display: flex; justify-content: space-between; padding: 16px 0;">
          <span style="font-weight: 500; color: #6b7280;">Prestação Mensal: </span>
          <span style="font-weight: 700; color: #0078b9;"> ${Number(
            monthlyPayment
          ).toLocaleString("pt-BR")} MZN</span>
        </div>
      </div>
      
      <div style="background: linear-gradient(135deg, #00c896 0%, #00a87e 100%); color: #ffffff; padding: 20px; border-radius: 8px; margin-top: 24px; text-align: center;">
      <div style="font-size: 14px; opacity: 0.9;">Total a Pagar</div>
      <div style="font-size: 20px; font-weight: 700;">${Number(
        totalPayback
      ).toLocaleString("pt-BR")} MZN</div>
    </div>

      
    </div>

      <div style="margin-top: 24px; text-align: center; background: #f1f5f9; border-radius: 8px; padding: 16px 20px; font-size: 15px; color: #1a1d29; border: 1px solid #e2e8f0;">
        <p style="margin: 0;">
          💬 Caso precise de mais informações ou queira atualizar esta solicitação, 
          <strong>responda diretamente a este e-mail:<a href="mailto:${email}" style="font-weight: 700; color: #0078b9; text-decoration: none;"> ${email}</a></strong> ou entre em contacto pelo número 
          <a href="tel:${phone}" style="color: #0078b9; font-weight: 700; text-decoration: none;underline: none;">${phone}</a>.
        </p>
      </div>


    <!-- Divider -->
    <div style="height: 1px; background: linear-gradient(90deg, transparent 0%, #e5e7eb 50%, transparent 100%); margin: 32px 0;"></div>

    <!-- Timestamp -->
    <div style="text-align: center; padding: 20px; background: #f8fafc; border-radius: 8px; border: 1px dashed #e5e7eb; margin: 20px; font-size: 14px; color: #6b7280;">
      <strong>Data/Hora da Submissão:</strong> ${new Date().toLocaleString(
        "pt-BR",
        {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      )}
    </div>
  </div>


  <!-- Footer -->
  <div style="text-align: center; padding: 40px 32px; background: #f8fafc; border-top: 1px solid #e5e7eb;">
    <img src="https://dbmib2q8rj.ufs.sh/f/Lm6xK3J7O1CLDCc1WDKOH3B9iRavr4SYO8pjUdgbsPulQfem" alt="MALEcaixa" style="height: 32px; margin-bottom: 20px; opacity: 0.7;" />
    <p style="margin: 8px 0; font-size: 14px; color: #6b7280;">E-mail interno para equipa <strong style="color: #0078b9;">MALEcaixa</strong>.</p>
    <p style="margin: 8px 0; font-size: 14px; color: #6b7280;">Gerado automaticamente — não responder.</p>
    <div style="margin-top: 20px;">
      <a href="#" style="color: #0078b9; text-decoration: none; margin: 0 12px; font-size: 14px;">Painel Administrativo</a>
      <a href="#" style="color: #0078b9; text-decoration: none; margin: 0 12px; font-size: 14px;">Gestão de Solicitações</a>
      <a href="#" style="color: #0078b9; text-decoration: none; margin: 0 12px; font-size: 14px;">Suporte Técnico</a>
    </div>
    <p style="margin-top: 20px; font-size: 14px; color: #6b7280;">© ${new Date().getFullYear()} MALEcaixa. Todos os direitos reservados.</p>
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
          amount
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
          monthlyPayment
        ).toLocaleString("pt-BR")} MZN</span>
      </div>
    </div>

    <div style="background: linear-gradient(135deg, #00c896 0%, #00a87e 100%); color: #ffffff; padding: 20px; border-radius: 8px; margin-top: 24px; text-align: center;">
      <div style="font-size: 14px; opacity: 0.9;">Total a Pagar</div>
      <div style="font-size: 20px; font-weight: 700;">${Number(
        totalPayback
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
        }
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
      { status: 500 }
    );
  }
}
