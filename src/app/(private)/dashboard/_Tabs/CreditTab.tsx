import { FC } from "react";
import CreditRiskAnalysis from "./CreditRiskAnalysis";

interface CreditInfo {
  availableLimit: number;
  usedLimit: number;
  score: number;
  lastUpdate: string;
}

interface Props {
  creditInfo: CreditInfo;
}

const CreditTab: FC<Props> = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 w-full c-space">
      <CreditRiskAnalysis />
    </div>
  );
};
export default CreditTab;
