import { Card, CardContent } from '@/components/card';
import { cn } from '@/components/helpers';
import { formatCurrency } from '@/utils/numbers';

interface Props {
  currentPension: number;
  projectedPension: number;
  requiredPension: number;
}

export default function Breakdown(props: Props) {
  const { currentPension, projectedPension, requiredPension } = props;
  return (
    <Card>
      <CardContent data-el="stats" className="flex flex-row flex-wrap *:w-1/2 gap-y-6 py-6 md:grid md:grid-cols-3 md:*:w-auto md:gap-0">
        <Statline label="What you have" value={currentPension} color="bg-orange-300" />
        <Statline label="What you'll have" value={projectedPension} color="bg-green-500" />
        <Statline label="What you'll need" value={requiredPension} color="bg-cyan-500" />
      </CardContent>
    </Card>
  );
}

interface StatlineProps {
  label: string;
  value: number;
  color: string;
  className?: string;
}

function Statline({ label, value, color }: StatlineProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1">
        <div data-el="stat-dot" className={cn('size-2 rounded-full', color)} />
        <span className="text-sm text-muted-foreground font-light">{label}</span>
      </div>
      <span className="text-xl font-semibold">{formatCurrency(value)}</span>
    </div>
  );
}
