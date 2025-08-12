import { MinusIcon, PlusIcon } from 'lucide-react';

import { cn } from './helpers';
import { Label } from './label';

interface Props {
  label: string;
  value?: number;
  suffix?: React.ReactNode;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (next: number) => void;
  className?: string;
}

export function NumberBlocks(props: Props) {
  const { label, value = 0, suffix = null, min = 0, max = 100, step = 1, onChange, className } = props;

  const increment = () => {
    if (value < max) {
      onChange?.(value + step);
    }
  }

  const decrement = () => {
    if (value > min) {
      onChange?.(value - step);
    }
  }

  return (
    <div className={cn('max-w-xs mx-auto flex flex-col gap-2', className)}>
      <Label htmlFor="quantity-input">
        {label}
      </Label>
      <div className="relative flex items-center">
        <button onClick={decrement} type="button" className="border border-neutral-300 hover:border-neutral-900 rounded-s-lg p-3 h-10 focus:ring-ring focus:ring-2 focus:outline-none">
          <MinusIcon className="size-4" />
        </button>

        <div className="flex-1 border-t border-b h-10 flex items-center justify-center">{value}{suffix}</div>

        <button onClick={increment} type="button" className="border border-gray-300 rounded-e-lg p-3 h-10 focus:ring-ring focus:ring-2 focus:outline-none">
          <PlusIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}
