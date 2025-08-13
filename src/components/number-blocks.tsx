import { MinusIcon, PlusIcon } from 'lucide-react';

import { cn } from './helpers';
import { Label } from './label';
import { Button } from './button';

type Props = React.ComponentProps<'div'> & {
  label: string;
  value?: number;
  onChange?: (next: number) => void;
  min?: number;
  max?: number;
  step?: number;
  error?: string;
  suffix?: React.ReactNode;
  className?: string;
}

export function NumberBlocks(props: Props) {
  const { label, value = 0, onChange, suffix = null, min = 0, max = 100, step = 1, error, className, ...rest } = props;

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
    <div className={cn('flex flex-col gap-2', className)} {...rest}>
      <Label>{label}</Label>
      <div className="relative flex items-center">
        <Button onClick={decrement} variant="outline" type="button" className="rounded-r-none">
          <MinusIcon className="size-4" />
        </Button>

        <div className="flex-1 border-t border-b h-10 flex items-center justify-center">{value}{suffix}</div>

        <Button onClick={increment} variant="outline" type="button" className="rounded-l-none">
          <PlusIcon className="size-4" />
        </Button>
      </div>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
