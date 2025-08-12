import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card';
import { NumberBlocks } from '@/components/number-blocks';
import { Button } from '@/components/button';
import { Separator } from '@/components/separator';
import { Label } from '@/components/label';
import { Input } from '@/components/input';

interface Props {
  data: {
    income: number;
    retirementAge: number;
    contributions: number;
    employerContributions: number;
  };
  onChange: (data: Props['data']) => void;
}

export default function Calculator(props: Props) {
  const form = useForm({
    defaultValues: props.data,
    resolver: zodResolver(schema),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Design your retirement</CardTitle>
        <CardDescription>This is all based on a yearly income of £50,000</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Desired income in retirement</Label>
              <div className="flex">
                <div className="border-neutral-300 bg-neutral-100 border-t border-b border-l rounded-md rounded-r-none flex items-center justify-center px-3">£</div>
                <Input className="border-l-none rounded-l-none text-right" type="number" />
              </div>
            </div>
            <NumberBlocks label="Retirement age" className="w-full" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <NumberBlocks label="My contributions" suffix="%" className="w-full" />
            <NumberBlocks label="Employer contributions" suffix="%" className="w-full" />
          </div>
          <Button>Save and see prediction</Button>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-semibold text-lg">Current contributions</span>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-[auto_40px_60px] gap-y-1 gap-x-2">
              <span>Your contribution</span>
              <span className="text-right">5%</span>
              <span className="text-right">£500</span>
              <span>Employer contribution</span>
              <span className="text-right">5%</span>
              <span className="text-right">£500</span>
            </div>
            <Separator />
            <div className="grid grid-cols-[auto_40px_60px] gap-y-1 gap-x-2 font-semibold">
              <span>Total</span>
              <span className="text-right">10%</span>
              <span className="text-right">£1000</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
