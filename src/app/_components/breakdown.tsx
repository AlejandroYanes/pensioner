import { Card, CardContent } from '@/components/card';
import { cn } from '@/components/helpers';
import { formatCurrency } from '@/utils/numbers';

export default function Breakdown() {
  return (
    <Card>
      <CardContent data-el="stats" className="grid grid-cols-3 py-6">
        <Statline label="What you have" value={34847} secondary="£xx,xx/yr" color="bg-orange-500" />
        <Statline label="What you'll have" value={389529} secondary="£xx,xxx/yr" color="bg-green-500" />
        <Statline label="What you'll need" value={518847} secondary="£xx,xx/yr" color="bg-cyan-500" />
      </CardContent>
    </Card>
  );
}

function Statline({ label, value, secondary, color }: { label: string; value: number; secondary: string; color: string }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1">
        <div data-el="stat-dot" className={cn('size-2 rounded-full', color)} />
        <span className="text-sm text-muted-foreground font-light">{label}</span>
      </div>
      <span className="text-xl font-semibold">{formatCurrency(value)}</span>
      <span>{secondary}</span>
    </div>
  );
}
