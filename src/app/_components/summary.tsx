import { LocateFixedIcon, WalletIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import type { PensionState } from '@/types/pension';
import type { PensionResults } from '@/utils/pension-calculations';
import { formatCurrency } from '@/utils/numbers';

interface Props {
  data: PensionState;
  requiredContributions: number;
}

export default function Summary(props: Props) {
  const { data, requiredContributions } = props;

  return (
    <Card>
      <CardHeader>
        <CardTitle>your retirement summary</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex gap-2">
          <WalletIcon className="size-4 mt-1" />
          <span>You could have <strong>{formatCurrency(data.income)}</strong> per year from <strong>{data.retirementAge}</strong> to until the age of <strong>{81}</strong></span>
        </div>
        <div className="flex gap-2">
          <LocateFixedIcon className="size-4 mt-1 shrink-0" />
          <span>In order to achieve your desired income of <strong>{formatCurrency(data.income)}</strong>, you’ll need to contribute <strong>{requiredContributions.toFixed(1)}%</strong> per month into your pension.</span>
        </div>
      </CardContent>
    </Card>
  )
}
