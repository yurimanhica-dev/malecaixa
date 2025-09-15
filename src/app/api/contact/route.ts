import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export async function POST(request: Request) {
  const formData = await request.formData();

  // Extract form fields
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const subject = formData.get("subject") as string;
  const phone = formData.get("phone") as string;
  const file = formData.get("file") as File | null;

  // Basic validation
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Todos os campos são obrigatórios" },
      { status: 400 }
    );
  }

  // Email transporter configuration
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Admin Notification Email
  const adminEmailHtml = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nova Mensagem | MALEcaixa</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #009feb;       
      --primary-light: #e6f5fc; 
      --secondary: #fed400;     
      --success: #2ecc71;      
      --text: #2d3436;          
      --text-light: #636e72;    
      --white: #ffffff;
      --light-bg: #f9f9f9;
      --border-radius: 12px;
      --shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      --spacing-unit: 8px;
    }
    
   
    .spacing-1 { margin: var(--spacing-unit); }
    .spacing-2 { margin: calc(var(--spacing-unit) * 2); }
    .spacing-3 { margin: calc(var(--spacing-unit) * 3); }
    .spacing-4 { margin: calc(var(--spacing-unit) * 4); }
    
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
      position: relative;
      overflow: hidden;
    }
    
    .header::after {
      content: "";
      position: absolute;
      bottom: -50px;
      right: -50px;
      width: 150px;
      height: 150px;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
    }
    
    .logo {
      height: 48px;
      margin-bottom: 16px;
      transition: transform 0.3s ease;
    }
    
    .logo:hover {
      transform: scale(1.05);
    }
    
    .content {
      padding: 32px;
    }
    
    .divider {
      height: 4px;
      background: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%);
      margin: 24px 0;
      border-radius: 2px;
    }
    
    .message-card {
      background-color: var(--primary-light);
      border-left: 4px solid var(--primary);
      padding: 20px;
      border-radius: 0 8px 8px 0;
      margin: 24px 0;
    }
    
    .footer {
      text-align: center;
      padding: 24px;
      font-size: 14px;
      color: var(--text-light);
      background-color: var(--light-bg);
    }
    
    .file-badge {
      display: inline-block;
      background-color: var(--secondary);
      color: var(--text);
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
      margin-top: 8px;
    }
    
    
    .details-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      margin: 24px 0;
    }
    
    .details-table th {
      text-align: left;
      padding: 12px 16px;
      background-color: var(--light-bg);
      font-weight: 500;
      color: var(--text-light);
    }
    
    .details-table td {
      padding: 12px 16px;
      border-bottom: 1px solid #eee;
    }
    
   
    a {
      color: var(--primary);
      transition: color 0.2s ease;
    }
    
    a:hover {
      color: #0066cc;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <img src="https://dbmib2q8rj.ufs.sh/f/Lm6xK3J7O1CLDCc1WDKOH3B9iRavr4SYO8pjUdgbsPulQfem" alt="MALEcaixa" class="logo">
      <h1 style="margin: 0; font-size: 24px; font-weight: 600;">Nova Mensagem Recebida</h1>
      <p style="margin: 8px 0 0; opacity: 0.9;">Seu formulário de contato acaba de receber uma nova mensagem</p>
    </div>
    
    <div class="content">
      <p style="margin: 0 0 16px;">Olá equipe MALEcaixa,</p>
      <p style="margin: 0 0 24px;">Você recebeu uma nova mensagem através do formulário de contato do website. Aqui estão os detalhes:</p>
      
      <div class="divider"></div>
      
      <table class="details-table">
        <tr>
          <th>Nome</th>
          <td style="font-weight: 500; color: var(--primary);">${name}</td>
        </tr>
        <tr>
          <th>E-mail</th>
          <td><a href="mailto:${email}">${email}</a></td>
        </tr>
        ${
          phone
            ? `
        <tr>
          <th>Telefone</th>
          <td>${phone}</td>
        </tr>
        `
            : ""
        }
        <tr>
          <th>Assunto</th>
          <td>${subject || "Não especificado"}</td>
        </tr>
        <tr>
          <th>Data/Hora</th>
          <td>${new Date().toLocaleString("pt-BR")}</td>
        </tr>
        ${
          file
            ? `
        <tr>
          <th>Anexo</th>
          <td>
            <span class="file-badge">${file.name}</span>
          </td>
        </tr>
        `
            : ""
        }
      </table>
      
      <div class="message-card">
        <h3 style="margin: 0 0 12px; font-size: 18px; color: var(--primary);">Mensagem:</h3>
        <p style="margin: 0; white-space: pre-line;">${message}</p>
      </div>
      
      <p style="margin: 24px 0 0; font-size: 15px;">Para responder a esta mensagem, basta clicar no endereço de e-mail acima ou responder diretamente a este e-mail.</p>
    </div>
    
    <div class="footer">
      <p style="margin: 0 0 8px;">Este e-mail foi gerado automaticamente pelo sistema de contato da MALEcaixa.</p>
      <p style="margin: 0;">© ${new Date().getFullYear()} MALEcaixa. Todos os direitos reservados.</p>
    </div>
  </div>
</body>
</html>
`;

  // User Confirmation Email
  const userEmailHtml = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmação de Recebimento | MALEcaixa</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    /* Design System Consistente */
    :root {
      --primary: #009feb;
      --primary-light: #e6f5fc;
      --secondary: #fed400;
      --success: #2ecc71;
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
      position: relative;
    }
    
    .confetti {
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: var(--secondary);
      opacity: 0.6;
      border-radius: 50%;
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
    
    .highlight-box {
      background-color: var(--primary-light);
      border-radius: var(--border-radius);
      padding: 20px;
      margin: 24px 0;
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
    
    .contact-method {
      display: flex;
      align-items: center;
      margin: 16px 0;
    }
    
    .contact-method svg {
      margin-right: 12px;
      color: var(--primary);
    }
    
    /* Botão com efeito de brilho sutil */
    .action-button {
      display: inline-block;
      background: linear-gradient(to right, var(--primary), #0066cc);
      color: white;
      padding: 14px 28px;
      text-decoration: none;
      border-radius: 50px;
      font-weight: 500;
      margin: 24px auto;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0, 159, 235, 0.2);
      transition: all 0.3s ease;
    }
    
    .action-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 159, 235, 0.3);
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <!-- Confetti elements for celebration -->
      <div class="confetti" style="top: 20px; left: 15%;"></div>
      <div class="confetti" style="top: 40px; left: 30%;"></div>
      <div class="confetti" style="top: 15px; right: 20%;"></div>
      <div class="confetti" style="top: 35px; right: 10%;"></div>
      
      <img src="https://dbmib2q8rj.ufs.sh/f/Lm6xK3J7O1CLDCc1WDKOH3B9iRavr4SYO8pjUdgbsPulQfem" alt="MALEcaixa" style="height: 48px; margin-bottom: 16px;">
      <h1 style="margin: 0; font-size: 24px; font-weight: 600;">Recebemos sua mensagem!</h1>
    </div>
    
    <div class="content">
      <div class="thank-you">Obrigado, ${name}!</div>
      
      <p style="text-align: center; margin: 0 0 16px;">Sua mensagem sobre <strong>${
        subject || "seu assunto"
      }</strong> foi recebida com sucesso por nossa equipe.</p>
      
      <div class="highlight-box">
        <p style="margin: 0; font-size: 15px;">Estamos analisando sua solicitação e entraremos em contato em breve. Normalmente respondemos em até 24 horas úteis.</p>
      </div>
      
      <div class="divider"></div>
      
      <h3 style="margin: 0 0 16px; font-size: 18px; color: var(--primary);">Detalhes do seu contato:</h3>
      
      <p style="margin: 8px 0;"><strong>Assunto:</strong> ${
        subject || "Não especificado"
      }</p>
      <p style="margin: 8px 0;"><strong>Data/Hora:</strong> ${new Date().toLocaleString(
        "pt-BR"
      )}</p>
      
      ${
        file
          ? `
      <p style="margin: 8px 0;"><strong>Anexo:</strong> ${file.name}</p>
      `
          : ""
      }
      
      <div class="divider"></div>
      
      <h3 style="margin: 24px 0 16px; font-size: 18px; color: var(--primary);">Precisa de ajuda imediata?</h3>
      
      <div class="contact-method">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 16.92V19.92C22 20.47 21.55 20.92 21 20.92H19.92C10.38 20.92 3.08 13.62 3.08 4.08V3C3.08 2.45 3.53 2 4.08 2H7.08C7.63 2 8.08 2.45 8.08 3V4.08C8.08 5.63 8.33 6.92 8.83 7.92L6.58 10.17C7.78 12.87 10.13 15.22 12.83 16.42L15.08 14.17C16.08 14.67 17.37 14.92 18.92 14.92H20C20.55 14.92 21 15.37 21 15.92V16.92Z" fill="currentColor"/>
        </svg>
        <span>(+258) 84 123 4567</span>
      </div>
      
      <div class="contact-method">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" fill="currentColor"/>
          <path d="M22 6L12 13L2 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>contato@malecaixa.co.mz</span>
      </div>
      
      <a href="https://malecaixa.co.mz" class="action-button">Visite nosso website</a>
    </div>
    
    <div class="footer">
      <p style="margin: 0 0 8px;">Este é um e-mail automático, por favor não responda.</p>
      <p style="margin: 0;">© ${new Date().getFullYear()} MALEcaixa. Todos os direitos reservados.</p>
    </div>
  </div>
</body>
</html>
`;

  // Prepare email options
  const mailOptions: Mail.Options = {
    from: `"MALEcaixa" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `[Formulário] ${subject} de ${name}`,
    html: adminEmailHtml,
  };

  // Add file attachment if exists
  if (file) {
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    mailOptions.attachments = [
      {
        filename: file.name,
        content: fileBuffer,
        contentType: file.type,
      },
    ];
  }

  try {
    // Send email to admin
    await transporter.sendMail(mailOptions);

    // Send confirmation email to user
    const confirmationMail = {
      from: `"MALEcaixa" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Recebemos sua mensagem!`,
      html: userEmailHtml,
    };
    await transporter.sendMail(confirmationMail);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return NextResponse.json(
      { error: "Erro ao enviar mensagem" },
      { status: 500 }
    );
  }
}
