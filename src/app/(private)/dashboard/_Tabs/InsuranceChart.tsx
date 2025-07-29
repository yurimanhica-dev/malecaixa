"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", emitidos: 8000000, pagos: 5000000, comissao: 500000 },
  { month: "Fev", emitidos: 10000000, pagos: 8500000, comissao: 600000 },
  { month: "Mar", emitidos: 23000000, pagos: 12500000, comissao: 1200000 },
  { month: "Abr", emitidos: 15000000, pagos: 38000000, comissao: 2500000 },
  { month: "Mai", emitidos: 12000000, pagos: 28000000, comissao: 2100000 },
  { month: "Jun", emitidos: 5000000, pagos: 10000000, comissao: 1300000 },
  { month: "Jul", emitidos: 1000000, pagos: 2500000, comissao: 400000 },
  { month: "Ago", emitidos: 0, pagos: 0, comissao: 0 },
  { month: "Set", emitidos: 0, pagos: 0, comissao: 0 },
  { month: "Out", emitidos: 0, pagos: 0, comissao: 0 },
  { month: "Nov", emitidos: 0, pagos: 0, comissao: 0 },
  { month: "Dez", emitidos: 0, pagos: 0, comissao: 0 },
];

const InsuranceChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
      <h2 className="font-semibold text-gray-700 text-sm mb-4">
        SEGUROS SOLICITADOS{" "}
        <span className="text-gray-400">
          • Vendas Acumuladas Por Tipo de Seguros
        </span>
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorEmitidos" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00C6FF" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#00C6FF" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPagos" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#91EAE4" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#91EAE4" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorComissao" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3CB371" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3CB371" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis dataKey="month" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="emitidos"
            stroke="#00C6FF"
            fillOpacity={1}
            fill="url(#colorEmitidos)"
            name="Seguros Emitidos"
          />
          <Area
            type="monotone"
            dataKey="pagos"
            stroke="#91EAE4"
            fillOpacity={1}
            fill="url(#colorPagos)"
            name="Débitos Pagos"
          />
          <Area
            type="monotone"
            dataKey="comissao"
            stroke="#3CB371"
            fillOpacity={1}
            fill="url(#colorComissao)"
            name="Comissão"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InsuranceChart;
