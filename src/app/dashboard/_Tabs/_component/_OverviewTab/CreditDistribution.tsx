"use client";

import { FC } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface CreditDistributionProps {
  total: number;
  paid: number;
  pending: number;
  overdue: number;
}

const COLORS = ["#10B981", "#F59E0B", "#EF4444"]; // emerald, amber, rose

const CreditDistribution: FC<CreditDistributionProps> = ({
  total,
  paid,
  pending,
  overdue,
}) => {
  const data = [
    { name: "Quitados", value: paid },
    { name: "Andamento", value: pending },
    { name: "Mora", value: overdue },
  ];

  const performance = total > 0 ? Math.round((paid / total) * 100) : 0;

  return (
    <div className="md:col-span-2 bg-white p-5 rounded-xl shadow-xs border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-medium text-gray-700">
            Distribuição de Créditos
          </h3>
          <span className="text-gray-800">
            <strong>Total:</strong> {total}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Quitados</span>
          <span className="w-2 h-2 rounded-full bg-amber-500 ml-2" />
          <span>Andamento</span>
          <span className="w-2 h-2 rounded-full bg-rose-500 ml-2" />
          <span>Mora</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Performance barra */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Performance</span>
            <span className="font-medium">{performance}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-amber-500"
              style={{ width: `${performance}%` }}
            />
          </div>
        </div>

        {/* Gráfico Circular */}
        <div className="w-full h-32">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                innerRadius={32}
                outerRadius={52}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [
                  `${value} (${Math.round((value / total) * 100)}%)`,
                  name,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CreditDistribution;
