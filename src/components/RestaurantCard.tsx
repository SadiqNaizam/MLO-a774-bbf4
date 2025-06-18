import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock } from 'lucide-react'; // Icons for rating and delivery time
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface RestaurantCardProps {
  id: string | number;
  name: string;
  imageUrl: string;
  cuisineTypes: string[]; // e.g., ["Italian", "Pizza"]
  rating: number; // e.g., 4.5
  deliveryTime: string; // e.g., "20-30 min"
  onClick?: (id: string | number) => void;
  className?: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  imageUrl,
  cuisineTypes,
  rating,
  deliveryTime,
  onClick,
  className,
}) => {
  console.log(`Rendering RestaurantCard: ${name}`);

  const handleCardClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <Card
      className={`w-full overflow-hidden transition-shadow duration-300 hover:shadow-lg ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={handleCardClick}
      tabIndex={onClick ? 0 : -1}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCardClick();}}
      role={onClick ? "button" : undefined}
      aria-label={`View details for ${name}`}
    >
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9}>
          <img
            src={imageUrl || '/placeholder.svg'} // Use a placeholder if no image
            alt={`Image of ${name}`}
            className="object-cover w-full h-full"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <h3 className="text-lg font-semibold truncate" title={name}>{name}</h3>
        <div className="text-sm text-gray-600 truncate">
          {cuisineTypes.join(', ')}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center text-sm text-gray-700">
        <div className="flex items-center">
          <Star className="h-4 w-4 text-yellow-500 mr-1" />
          <span>{rating.toFixed(1)}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          <span>{deliveryTime}</span>
        </div>
      </CardFooter>
    </Card>
  );
};
export default RestaurantCard;