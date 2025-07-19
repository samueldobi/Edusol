// FinancialCard.js
import Image from "next/image";
export default function FinancialCardWrapper() {
  return (
    <div className="flex flex-wrap items-start justify-start space-x-0 space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-nowrap sm:justify-center w-full">
      <FinancialCard
        title="Tuition"
        value="5,276,000"
        iconSrc="/up-icon.png"
        color="#1AA939"
        bgColor="#1AA939"
      />
      <FinancialCard
        title="Other Payments"
        value="5,567,476"
        iconSrc="/up-icon.png"
        color="#FFB400"
        bgColor="#FFB400"
      />
    </div>
  );
}

export function FinancialCard({
  title,
  value,
  iconSrc,
  color,
  bgColor,
}: {
  title: string;
  value: string;
  iconSrc: string;
  color: string;
  bgColor: string;
}) {
  return (
    <div className="p-4 rounded-lg flex justify-center items-center space-x-4">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center`}
        style={{ backgroundColor: bgColor }}
      >
        <Image
        width={40}
        height={40}
          src={iconSrc}
          alt={`${title} Icon`}
          className="w-8 h-8" 
        />
      </div>
      <div className="flex flex-col sm:items-center">
        <p className="text-lg text-black font-medium uppercase">{title}</p>
        <p className={`text-2xl font-semibold`} style={{ color: color }}>
          {value}
        </p>
      </div>
    </div>
  );
}

