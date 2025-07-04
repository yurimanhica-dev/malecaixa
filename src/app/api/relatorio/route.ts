import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

interface AmortizationEntry {
  n: number;
  date: string;
  payment: string;
  principal: string;
  interest: string;
  balance: string;
}

export async function POST(req: NextRequest) {
  try {
    const { name, amount, months, interestRate } = await req.json();
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment =
      (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    let balance = amount;

    // Generate amortization table
    const amortizationTable: AmortizationEntry[] = [];
    const currentDate = new Date();

    for (let i = 1; i <= months; i++) {
      const interest = balance * monthlyRate;
      const principal = monthlyPayment - interest;
      const paymentDate = new Date(currentDate);
      paymentDate.setMonth(paymentDate.getMonth() + i);

      amortizationTable.push({
        n: i,
        date: paymentDate.toLocaleDateString("pt-MZ"),
        payment: monthlyPayment.toFixed(2),
        principal: principal.toFixed(2),
        interest: interest.toFixed(2),
        balance: (balance - principal).toFixed(2),
      });

      balance -= principal;
    }

    const generateHtml = () => {
      const formatCurrency = (value: string) => {
        return parseFloat(value).toLocaleString("pt-MZ", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      };

      const now = new Date();
      const formattedDate = now.toLocaleDateString("pt-MZ");
      const formattedTime = now.toLocaleTimeString("pt-MZ", {
        hour: "2-digit",
        minute: "2-digit",
      });

      return `
<!DOCTYPE html>
<html lang="pt-MZ">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Relatório de Amortização</title>
  <style>
    body { 
      font-family: 'Arial', sans-serif; 
      font-size: 12px; 
      padding: 20px; 
      line-height: 1.5;
      color: #333;
      position: relative;
      background-image: url('https://dbmib2q8rj.ufs.sh/f/Lm6xK3J7O1CLDCc1WDKOH3B9iRavr4SYO8pjUdgbsPulQfem');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 40%;
      background-attachment: fixed;
      background-opacity: 0.1;
    }
    
    body::before {
      content: "";
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url('https://dbmib2q8rj.ufs.sh/f/Lm6xK3J7O1CLDCc1WDKOH3B9iRavr4SYO8pjUdgbsPulQfem');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 40%;
      opacity: 0.1;
      z-index: -1;
      pointer-events: none;
    }
      
    .header { 
      display: flex; 
      align-items: center; 
      border-bottom: 2px solid #009FEB; 
      padding-bottom: 10px; 
      margin-bottom: 15px;
      background-color: rgba(255,255,255,0.9);
    }
    
    .content-wrapper {
      background-color: rgba(255,255,255,0.9);
      padding: 15px;
      border-radius: 5px;
      
    }
    
    .logo {
      width: 140px;
      height: auto;
      object-fit: contain;
    }
    
    .title-box {
      background-color: #FED400 !important;
      padding: 12px 20px;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      flex-grow: 1;
    }

    .info-section { 
      margin-bottom: 20px; 
    }
    
    .info-section h2 {
      background-color: #FED400 !important;
      color: white;
      padding: 6px 10px;
      font-size: 14px;
      margin: 15px 0 10px 0;
      border-radius: 3px;
    }
    
    .info-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }
    
    .info-item {
      margin-bottom: 5px;
    }
    
    .info-item strong {
      display: inline-block;
      width: 150px;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
      font-size: 11px;
      background-color: white;
    }
    
    th {
      background-color: #FED400;
      text-align: left;
      color: #000;
    }
    
    th, td {
      border: 1px solid #ddd;
      padding: 6px 8px;
    }
    
    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
    
    .footer {
      margin-top: 20px;
      padding-top: 10px;
      border-top: 1px solid #eee;
      font-size: 10px;
      color: #666;
      text-align: center;
      background-color: rgba(255,255,255,0.9);
    }
    
    .highlight {
      font-weight: bold;
      color: #009FEB;
      font-size: 13px;
    }
    
    .title {
      font-size: 16px;
      font-weight: bold;
      color: #000;
      margin-bottom: 10px;
    }
    
    .summary-box {
      border: 1px solid #009FEB;
      padding: 10px;
      margin: 15px 0;
      border-radius: 5px;
      background-color: #f5faff;
    }
  </style>
</head>
<body>
  <div class="content-wrapper">
    <div class="header">
      <img
        src="https://dbmib2q8rj.ufs.sh/f/Lm6xK3J7O1CLDCc1WDKOH3B9iRavr4SYO8pjUdgbsPulQfem"
        class="logo"
        alt="Logo do Banco"
      />
      <div class="title title-box">
        Relatório de Amortização
      </div>
    </div>

    <div class="info-section">
      <div class="info-grid">
        <div class="info-item"><strong>Data:</strong> ${formattedDate}</div>
        <div class="info-item"><strong>Hora:</strong> ${formattedTime}</div>
        <div class="info-item"><strong>Cliente:</strong> ${name}</div>
        <div class="info-item"><strong>Relatório:</strong> Plano de Amortização</div>
      </div>
    </div>

    <div class="summary-box">
      <div class="info-grid">
        <div class="info-item"><strong>Valor do Empréstimo:</strong> <span class="highlight">${formatCurrency(
          amount
        )} MZN</span></div>
        <div class="info-item"><strong>Prazo:</strong> ${months} meses</div>
        <div class="info-item"><strong>Taxa de Juros:</strong> ${interestRate}% anual</div>
        <div class="info-item"><strong>Pagamento Mensal:</strong> <span class="highlight">${formatCurrency(
          monthlyPayment.toFixed(2)
        )} MZN</span></div>
        <div class="info-item"><strong>Total de Juros:</strong> <span class="highlight">${formatCurrency(
          (monthlyPayment * months - amount).toFixed(2)
        )} MZN</span></div>
        <div class="info-item"><strong>Total a Pagar:</strong> <span class="highlight">${formatCurrency(
          (monthlyPayment * months).toFixed(2)
        )} MZN</span></div>
      </div>
    </div>

    <div class="info-section">
      <div class="title">
        Plano de Amortização
      </div>
      <table>
        <thead>
          <tr>
            <th>Parcela</th>
            <th>Data</th>
            <th>Valor (MZN)</th>
            <th>Capital (MZN)</th>
            <th>Juros (MZN)</th>
            <th>Saldo (MZN)</th>
          </tr>
        </thead>
        <tbody>
          ${amortizationTable
            .map(
              (row) => `
            <tr>
              <td>${row.n}</td>
              <td>${row.date}</td>
              <td>${formatCurrency(row.payment)}</td>
              <td>${formatCurrency(row.principal)}</td>
              <td>${formatCurrency(row.interest)}</td>
              <td>${formatCurrency(row.balance)}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    </div>

    <div class="footer">
      Documento gerado automaticamente em ${formattedDate} às ${formattedTime} |
      Sistema de Gestão de Crédito
    </div>
  </div>
</body>
</html>
      `;
    };

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const html = generateHtml();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({
      format: "A4",
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
      },
    });
    await browser.close();

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="plano_amortizacao_${name.replace(
          /\s+/g,
          "_"
        )}.pdf"`,
      },
    });
  } catch (err) {
    console.error("Error generating PDF:", err);
    return NextResponse.json({ error: "Erro ao gerar PDF" }, { status: 500 });
  }
}
