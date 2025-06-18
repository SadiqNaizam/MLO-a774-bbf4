import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit2 } from 'lucide-react'; // Icons
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface MenuItemCardProps {
  id: string | number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  onAddToCart: (id: string | number) => void;
  onCustomize?: (id: string | number) => void; // Optional: for items with customizable options
  isAddedToCart?: boolean; // Optional: visual feedback if item is already in cart
  className?: string;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  onAddToCart,
  onCustomize,
  isAddedToCart = false,
  className,
}) => {
  console.log(`Rendering MenuItemCard: ${name}`);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click if any
    onAddToCart(id);
  };

  const handleCustomize = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click if any
    if (onCustomize) {
      onCustomize(id);
    }
  };

  return (
    <Card className={`w-full flex flex-col md:flex-row overflow-hidden transition-shadow duration-200 hover:shadow-md ${className}`}>
      {imageUrl && (
        <div className="md:w-1/3 lg:w-1/4 flex-shrink-0">
          <AspectRatio ratio={1} className="h-full">
            <img
              src={imageUrl || '/placeholder.svg'}
              alt={name}
              className="object-cover w-full h-full"
              onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
            />
          </AspectRatio>
        </div>
      )}
      <div className="flex flex-col flex-grow">
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-semibold">{name}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow py-2">
          {description && <p className="text-xs text-gray-600 line-clamp-2">{description}</p>}
          <p className="text-sm font-bold text-orange-600 mt-1">${price.toFixed(2)}</p>
        </CardContent>
        <CardFooter className="pt-2 flex flex-col sm:flex-row sm:justify-end gap-2">
          {onCustomize && (
            <Button variant="outline" size="sm" onClick={handleCustomize} className="w-full sm:w-auto">
              <Edit2 className="mr-2 h-4 w-4" /> Customize
            </Button>
          )}
          <Button size="sm" onClick={handleAddToCart} disabled={isAddedToCart} className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
            <PlusCircle className="mr-2 h-4 w-4" /> {isAddedToCart ? "Added" : "Add to Cart"}
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};
export default MenuItemCard;