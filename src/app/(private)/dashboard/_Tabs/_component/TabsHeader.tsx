import { FC } from "react";

interface TabsHeaderProps {
  title: string;
  description?: string;
  breadcrumb?: string[];
}

const TabsHeader: FC<TabsHeaderProps> = ({
  title,
  description,
  breadcrumb,
}) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold text-primary">{title}</h1>

      {description && (
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      )}

      {breadcrumb && breadcrumb.length > 0 && (
        <div className="text-xs text-primary mt-2 space-x-1">
          {breadcrumb.map((item, idx) => (
            <span key={idx} className="inline">
              {idx !== 0 && <span className="text-gray-400"> - </span>}
              <span>{item}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TabsHeader;
