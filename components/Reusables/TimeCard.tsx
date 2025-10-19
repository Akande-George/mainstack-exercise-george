import React from "react";

interface TimeCardProps {
  time: string;
  onClick?: () => void;
}

const TimeCard = ({ time, onClick }: TimeCardProps) => {
  return (
    <div
      className="bg-[#EFF1F6] rounded-full px-4 py-2 text-[#131316] text-[14px] font-medium cursor-pointer hover:bg-[#ddd] transition-colors"
      onClick={onClick}
    >
      {time}
    </div>
  );
};

export default TimeCard;
