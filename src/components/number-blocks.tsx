import { MinusIcon, PlusIcon } from 'lucide-react';

import { cn } from './helpers';
import { Label } from './label';

interface Props {
  label: string;
  value?: number;
  onChange?: React.ReactEventHandler<HTMLInputElement>;
  className?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export function NumberBlocks(props: Props) {
  const { label, value, onChange, className, inputProps } = props;
  return (
    <div className={cn('max-w-xs mx-auto flex flex-col gap-2', className)}>
      <Label htmlFor="quantity-input">
        {label}
      </Label>
      <div className="relative flex items-center">
        <button type="button" id="decrement-button" data-input-counter-decrement="quantity-input" className="border border-neutral-300 hover:border-neutral-900 rounded-s-lg p-3 h-10 focus:ring-ring focus:ring-2 focus:outline-none">
          <MinusIcon className="size-4" />
        </button>

        <input type="number" id="quantity-input" min={1} max={81} value={value} onChange={onChange} data-input-counter className="border-x-0 border-t border-b border-neutral-300 hover:border-neutral-900 h-10 text-center text-sm focus-visible:hover:border-neutral-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 block w-full py-2.5" {...inputProps} />

        <button type="button" id="increment-button" data-input-counter-increment="quantity-input" className="border border-gray-300 rounded-e-lg p-3 h-10 focus:ring-ring focus:ring-2 focus:outline-none">
          <PlusIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}
