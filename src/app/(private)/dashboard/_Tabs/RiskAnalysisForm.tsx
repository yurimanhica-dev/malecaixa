import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// 1. Defina o schema de validação com Zod
const riskAnalysisSchema = z.object({
  creditScore: z.number().min(300).max(850),
  annualIncome: z.number().min(0),
  debtToIncomeRatio: z.number().min(0).max(100),
  creditUtilization: z.number().min(0).max(100),
  paymentHistory: z.enum(["excellent", "good", "fair", "poor"]),
  creditHistoryLength: z.number().min(0),
  recentInquiries: z.number().min(0),
});

type RiskAnalysisFormData = z.infer<typeof riskAnalysisSchema>;

interface RiskAnalysisFormProps {
  onSubmit: (data: RiskAnalysisFormData & { riskLevel: string }) => void;
  initialData?: Partial<RiskAnalysisFormData>;
}

export function RiskAnalysisForm({
  onSubmit,
  initialData,
}: RiskAnalysisFormProps) {
  const [currentStep, setCurrentStep] = useState(1);

  // 2. Configure o formulário com validação
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RiskAnalysisFormData>({
    resolver: zodResolver(riskAnalysisSchema),
    defaultValues: {
      creditScore: 600,
      annualIncome: 50000,
      debtToIncomeRatio: 30,
      creditUtilization: 25,
      paymentHistory: "good",
      creditHistoryLength: 5,
      recentInquiries: 2,
      ...initialData,
    },
  });

  const watchedValues = watch();

  // 3. Função para calcular o nível de risco
  const calculateRiskLevel = (data: RiskAnalysisFormData): string => {
    let score = 0;

    // Lógica de cálculo (pontuação fictícia para exemplo)
    if (data.creditScore >= 800) score += 40;
    else if (data.creditScore >= 700) score += 30;
    else if (data.creditScore >= 600) score += 20;
    else score += 10;

    if (data.debtToIncomeRatio < 20) score += 20;
    else if (data.debtToIncomeRatio < 40) score += 15;
    else if (data.debtToIncomeRatio < 60) score += 10;
    else score += 5;

    if (data.paymentHistory === "excellent") score += 20;
    else if (data.paymentHistory === "good") score += 15;
    else if (data.paymentHistory === "fair") score += 10;
    else score += 5;

    if (data.creditHistoryLength > 7) score += 15;
    else if (data.creditHistoryLength > 3) score += 10;
    else score += 5;

    if (data.recentInquiries === 0) score += 10;
    else if (data.recentInquiries < 3) score += 5;

    // Determinar nível de risco baseado na pontuação
    if (score >= 90) return "Muito Baixo";
    if (score >= 75) return "Baixo";
    if (score >= 60) return "Moderado";
    if (score >= 45) return "Alto";
    return "Muito Alto";
  };

  // 4. Handler para envio do formulário
  const onSubmitHandler = (data: RiskAnalysisFormData) => {
    const riskLevel = calculateRiskLevel(data);
    onSubmit({ ...data, riskLevel });
  };

  // 5. Componente de progresso
  const ProgressBar = ({ step }: { step: number }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${(step / 3) * 100}%` }}
      ></div>
    </div>
  );

  // 6. Visualização prévia do risco
  const RiskPreview = ({ score }: { score: number }) => {
    let riskClass = "";
    if (score >= 700) riskClass = "text-green-600";
    else if (score >= 600) riskClass = "text-yellow-600";
    else riskClass = "text-red-600";

    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-800">Pré-visualização do Risco</h3>
        <div className={`mt-2 text-lg font-semibold ${riskClass}`}>
          {score >= 700
            ? "Baixo Risco"
            : score >= 600
            ? "Risco Moderado"
            : "Alto Risco"}
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Score atual: {watchedValues.creditScore || "N/A"}
        </p>
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="max-w-2xl mx-auto"
    >
      <ProgressBar step={currentStep} />

      {/* Passo 1: Informações Básicas */}
      {currentStep === 1 && (
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Informações Básicas
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Score de Crédito (300-850)
            </label>
            <input
              type="number"
              {...register("creditScore", { valueAsNumber: true })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.creditScore && (
              <p className="mt-1 text-sm text-red-600">
                {errors.creditScore.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Renda Anual (R$)
            </label>
            <input
              type="number"
              step="0.01"
              {...register("annualIncome", { valueAsNumber: true })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.annualIncome && (
              <p className="mt-1 text-sm text-red-600">
                {errors.annualIncome.message}
              </p>
            )}
          </div>

          <RiskPreview score={watchedValues.creditScore || 0} />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Próximo
            </button>
          </div>
        </div>
      )}

      {/* Passo 2: Dívidas e Utilização */}
      {currentStep === 2 && (
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Dívidas e Utilização
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Taxa de Endividamento (%)
            </label>
            <input
              type="number"
              step="0.1"
              {...register("debtToIncomeRatio", { valueAsNumber: true })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.debtToIncomeRatio && (
              <p className="mt-1 text-sm text-red-600">
                {errors.debtToIncomeRatio.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Utilização de Crédito (%)
            </label>
            <input
              type="number"
              step="0.1"
              {...register("creditUtilization", { valueAsNumber: true })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.creditUtilization && (
              <p className="mt-1 text-sm text-red-600">
                {errors.creditUtilization.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Histórico de Pagamentos
            </label>
            <select
              {...register("paymentHistory")}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="excellent">Excelente (sem atrasos)</option>
              <option value="good">Bom (1-2 atrasos menores)</option>
              <option value="fair">Regular (vários atrasos)</option>
              <option value="poor">Ruim (inadimplências)</option>
            </select>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-6 py-2 text-gray-700 rounded-lg border hover:bg-gray-50 transition"
            >
              Voltar
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Próximo
            </button>
          </div>
        </div>
      )}

      {/* Passo 3: Histórico Adicional */}
      {currentStep === 3 && (
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Histórico de Crédito
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tempo de Histórico (anos)
            </label>
            <input
              type="number"
              {...register("creditHistoryLength", { valueAsNumber: true })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.creditHistoryLength && (
              <p className="mt-1 text-sm text-red-600">
                {errors.creditHistoryLength.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Consultas Recentes (últimos 12 meses)
            </label>
            <input
              type="number"
              {...register("recentInquiries", { valueAsNumber: true })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.recentInquiries && (
              <p className="mt-1 text-sm text-red-600">
                {errors.recentInquiries.message}
              </p>
            )}
          </div>

          <div className="pt-4 border-t border-gray-100">
            <h3 className="font-medium text-gray-800 mb-3">
              Resumo da Análise
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Score de Crédito</p>
                  <p className="font-medium">{watchedValues.creditScore}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Endividamento</p>
                  <p className="font-medium">
                    {watchedValues.debtToIncomeRatio}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Utilização</p>
                  <p className="font-medium">
                    {watchedValues.creditUtilization}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Histórico</p>
                  <p className="font-medium capitalize">
                    {watchedValues.paymentHistory}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-6 py-2 text-gray-700 rounded-lg border hover:bg-gray-50 transition"
            >
              Voltar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Concluir Análise
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
