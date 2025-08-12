import { LocateFixedIcon, WalletIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';

export default async function Home() {
  return (
    <main className="min-h-screen min-w-screen flex flex-col gap-8 p-10">
      <h1>Retirement Planner</h1>
      <section className="flex flex-col-reverse md:grid md:grid-cols-2">
        <div data-el="left-col" className="flex flex-col gap-4">
          <div data-el="graph" className="bg-neutral-200 w-full h-96" />
          <Stats />
          <Summary />
        </div>

        <div data-el="right-col"></div>
      </section>
    </main>
  );
}

function Stats() {
  return (
    <Card>
      <CardContent data-el="stats" className="grid grid-cols-3">
        <Statline label="What you have" value={34847} secondary="£xx,xx/yr" color="orange" />
        <Statline label="What you'll have" value={389529} secondary="£xx,xxx/yr" color="green" />
        <Statline label="What you'll need" value={518847} secondary="£xx,xx/yr" color="blue" />
      </CardContent>
    </Card>
  );
}

function Statline({ label, value, secondary }: { label: string; value: number; secondary: string; color: 'green' | 'orange' | 'blue' }) {
  return (
    <div className="flex flex-col">
      <span>{label}</span>
      <span>{value}</span>
      <span>{secondary}</span>
    </div>
  );
}

function Summary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>your retirement summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <WalletIcon className="size-4 mt-1" />
          <span>You could have {`{£20,000}`} per year from {`{67}`} to until the age of {`{95}`}</span>
        </div>
        <div className="flex gap-2">
          <LocateFixedIcon className="size-4 mt-1" />
          <span>In order to achieve your desired income of {`{£30,000}`}, you’ll need to contribute {`{XXX%}`} per month into your pension.</span>
        </div>
      </CardContent>
    </Card>
  )
}
