import React from 'react';
import { cn } from "@/lib/utils"; // For conditional class names
import { X } from 'lucide-react'; // Optional: for a clear/remove icon if needed

interface CuisineFilterChipProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  onRemove?: () => void; // Optional: if the chip can be actively removed
  className?: string;
}

const CuisineFilterChip: React.FC<CuisineFilterChipProps> = ({
  label,
  isSelected,
  onClick,
  onRemove,
  className,
}) => {
  console.log(`Rendering CuisineFilterChip: ${label}, Selected: ${isSelected}`);

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500",
        isSelected
          ? "bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400",
        className
      )}
      aria-pressed={isSelected}
    >
      {label}
      {onRemove && isSelected && (
        <span
          onClick={(e) => {
            e.stopPropagation(); // Prevent chip click when removing
            onRemove();
          }}
          className="ml-1.5 p-0.5 rounded-full hover:bg-orange-400"
          aria-label={`Remove ${label} filter`}
        >
          <X className="h-3 w-3" />
        </span>
      )}
    </button>
  );
};
export default CuisineFilterChip;