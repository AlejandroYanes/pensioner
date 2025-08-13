import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import type { PensionState } from '@/types/pension';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { NumberBlocks } from '@/components/number-blocks';
import { Button } from '@/components/button';
import { Separator } from '@/components/separator';
import { Label } from '@/components/label';
import { Input } from '@/components/input';

interface Props {
  data: PensionState;
  onChange: (data: PensionState) => void;
}

const schema = z.object({
  income: z.number().min(20000).max(100000),
  retirementAge: z.number().min(50).max(75),
  contributions: z.number().min(0).max(100),
  employerContributions: z.number().min(0).max(100),
});

export default function Calculator(props: Props) {
  const form = useForm({
    defaultValues: props.data,
    resolver: zodResolver(schema),
    mode: 'onSubmit'
  });

  const income = form.watch('income');
  const contributions = form.watch('contributions');
  const employerContributions = form.watch('employerContributions');

  const handleSubmit = form.handleSubmit((data) => {
    props.onChange(data);
  });

  const handleNumberKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value);

    if (isNaN(value)) {
      e.preventDefault();
    }

    // if (e.key === 'ArrowUp') {
    //   e.target.value = (value + 100).toString();
    // } else if (e.key === 'ArrowDown') {
    //   e.target.value = (value - 100).toString();
    // }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Design your retirement</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="income"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-2">
                  <Label>Desired income in retirement</Label>
                  <div className="flex">
                    <div className="border-neutral-300 bg-neutral-100 border-t border-b border-l rounded-md rounded-r-none flex items-center justify-center px-3 shrink-0">£</div>
                    <Input className="border-l-none rounded-none text-right" type="number" {...field} value={field.value} onKeyDown={handleNumberKeyDown} onChange={(e) => field.onChange(Number(e.target.value))} />
                    <div className="border-neutral-300 bg-neutral-100 border-t border-b border-r rounded-md rounded-l-none flex items-center justify-center px-3 shrink-0">/ yr</div>
                  </div>
                  {fieldState.error && <span className="text-red-500 text-sm">{fieldState.error.message}</span>}
                </div>
              )}
            />
            <Controller
              control={form.control}
              name="retirementAge"
              render={({ field, fieldState }) => (
                <NumberBlocks
                  label="Retirement age"
                  className="w-full"
                  {...field}
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Controller
              control={form.control}
              name="contributions"
              render={({ field, fieldState }) => (
                <NumberBlocks
                  label="My contributions"
                  className="w-full"
                  suffix="%"
                  max={15}
                  {...field}
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />
            <Controller
              control={form.control}
              name="employerContributions"
              render={({ field, fieldState }) => (
                <NumberBlocks
                  label="Employer contributions"
                  className="w-full"
                  suffix="%"
                  max={10}
                  {...field}
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />
          </div>
          <Button>Save and see prediction</Button>
        </form>

        <div className="flex flex-col gap-4">
          <span className="font-semibold text-lg">Current contributions</span>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-[auto_40px_60px] gap-y-1 gap-x-2">
              <span>Your contribution</span>
              <span className="text-right">{contributions}%</span>
              <span className="text-right">£{calculateContributions(income, contributions)}</span>
              <span>Employer contribution</span>
              <span className="text-right">{employerContributions}%</span>
              <span className="text-right">£{calculateContributions(income, employerContributions)}</span>
            </div>
            <Separator />
            <div className="grid grid-cols-[auto_40px_60px] gap-y-1 gap-x-2 font-semibold">
              <span>Total</span>
              <span className="text-right">{contributions + employerContributions}%</span>
              <span className="text-right">£{calculateTotalContributions(income, contributions, employerContributions)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function calculateContributions(income: number, contributions: number) {
  return (income * (contributions / 100)).toFixed(0);
}

function calculateTotalContributions(income: number, contributions: number, employerContributions: number) {
  return (income * (contributions + employerContributions) / 100).toFixed(0);
}
