import { LocateFixedIcon, WalletIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';

export default function Summary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>your retirement summary</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex gap-2">
          <WalletIcon className="size-4 mt-1" />
          <span>You could have {`{£20,000}`} per year from {`{67}`} to until the age of {`{95}`}</span>
        </div>
        <div className="flex gap-2">
          <LocateFixedIcon className="size-4 mt-1 shrink-0" />
          <span>In order to achieve your desired income of {`{£30,000}`}, you’ll need to contribute {`{XXX%}`} per month into your pension.</span>
        </div>
      </CardContent>
    </Card>
  )
}
