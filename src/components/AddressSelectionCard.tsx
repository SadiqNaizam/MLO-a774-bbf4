import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroupItem } from "@/components/ui/radio-group"; // Assuming this is part of a RadioGroup
import { Button } from "@/components/ui/button";
import { Edit3, Trash2, Home } from 'lucide-react'; // Icons

interface Address {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  line1: string;
  line2?: string;
  city: string;
  postalCode: string;
  isDefault?: boolean;
}

interface AddressSelectionCardProps {
  address: Address;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

const AddressSelectionCard: React.FC<AddressSelectionCardProps> = ({
  address,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  className,
}) => {
  console.log(`Rendering AddressSelectionCard: ${address.line1}, Selected: ${isSelected}`);

  return (
    <Card
      className={`transition-all duration-150 ${className} ${isSelected ? 'border-orange-500 ring-2 ring-orange-500' : 'border-gray-200 hover:border-gray-300'}`}
      onClick={() => onSelect(address.id)}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(address.id);}}
      role="radio"
      aria-checked={isSelected}
    >
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="flex items-center space-x-2">
           <RadioGroupItem value={address.id} id={`address-${address.id}`} checked={isSelected} aria-label={`Select address ${address.line1}`} />
           <CardTitle className="text-base font-medium flex items-center">
             <Home className="h-5 w-5 mr-2 text-gray-600" /> {address.type}
           </CardTitle>
        </div>
        {address.isDefault && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Default</span>}
      </CardHeader>
      <CardContent className="pl-10 space-y-1 text-sm text-gray-700">
        <p>{address.line1}</p>
        {address.line2 && <p>{address.line2}</p>}
        <p>{address.city}, {address.postalCode}</p>
        {(onEdit || onDelete) && (
          <div className="flex space-x-2 pt-2">
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => { e.stopPropagation(); onEdit(address.id); }}
                aria-label={`Edit address ${address.line1}`}
              >
                <Edit3 className="h-3.5 w-3.5 mr-1" /> Edit
              </Button>
            )}
            {onDelete && (
              <Button
                variant="destructive"
                size="sm"
                onClick={(e) => { e.stopPropagation(); onDelete(address.id); }}
                aria-label={`Delete address ${address.line1}`}
              >
                <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export default AddressSelectionCard;