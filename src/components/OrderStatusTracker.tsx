import React from 'react';
import { CheckCircle, Loader2, Truck, Package, XCircle } from 'lucide-react'; // Icons for different statuses
import { cn } from "@/lib/utils";

type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'FAILED';

interface OrderStep {
  status: OrderStatus;
  label: string;
  timestamp?: string; // e.g., "2023-10-27 10:30 AM"
  Icon: React.ElementType;
}

interface OrderStatusTrackerProps {
  currentStatus: OrderStatus;
  steps?: OrderStep[]; // Allow customizing steps if needed
  className?: string;
}

const DEFAULT_STEPS: OrderStep[] = [
  { status: 'CONFIRMED', label: 'Order Confirmed', Icon: CheckCircle },
  { status: 'PREPARING', label: 'Preparing Food', Icon: Loader2 }, // Loader2 can have spin animation
  { status: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', Icon: Truck },
  { status: 'DELIVERED', label: 'Delivered', Icon: Package },
];

const OrderStatusTracker: React.FC<OrderStatusTrackerProps> = ({
  currentStatus,
  steps = DEFAULT_STEPS,
  className,
}) => {
  console.log(`Rendering OrderStatusTracker, Current Status: ${currentStatus}`);

  const currentStepIndex = steps.findIndex(step => step.status === currentStatus);

  const getStepSpecifics = (status: OrderStatus) => {
    if (status === 'PENDING') return { label: 'Order Pending', Icon: Loader2, color: 'text-gray-500' };
    if (status === 'CANCELLED') return { label: 'Order Cancelled', Icon: XCircle, color: 'text-red-500' };
    if (status === 'FAILED') return { label: 'Order Failed', Icon: XCircle, color: 'text-red-500' };
    return null;
  }

  const specialStatus = getStepSpecifics(currentStatus);

  if (specialStatus) {
    return (
      <div className={cn("flex flex-col items-center p-4 border rounded-lg shadow-sm bg-white", className)}>
        <specialStatus.Icon className={cn("h-12 w-12 mb-2", specialStatus.color)} />
        <p className={cn("text-lg font-semibold", specialStatus.color)}>{specialStatus.label}</p>
        {/* Optionally display a timestamp or more details */}
      </div>
    );
  }

  return (
    <div className={cn("p-4 space-y-6 bg-white rounded-lg shadow", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const IconComponent = step.Icon;

          return (
            <React.Fragment key={step.status}>
              <div className="flex flex-col items-center text-center w-1/4">
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full border-2 mb-1 transition-colors duration-300",
                    isActive ? "bg-orange-500 border-orange-500 text-white" : "bg-gray-100 border-gray-300 text-gray-400"
                  )}
                >
                  <IconComponent className={cn("h-5 w-5", isCurrent && step.status === 'PREPARING' && "animate-spin")} />
                </div>
                <p className={cn("text-xs sm:text-sm font-medium", isActive ? "text-orange-600" : "text-gray-500")}>
                  {step.label}
                </p>
                {step.timestamp && isActive && (
                  <p className="text-xs text-gray-400">{step.timestamp}</p>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={cn(
                    "flex-1 h-1 rounded",
                    index < currentStepIndex ? "bg-orange-500" : "bg-gray-300"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
export default OrderStatusTracker;