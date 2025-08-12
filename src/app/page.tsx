import { LocateFixedIcon, WalletIcon } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card';
import { NumberBlocks } from '@/components/number-blocks';
import { InputWithLabel } from '@/components/input-with-label';
import { Button } from '@/components/button';
import { Separator } from '@/components/separator';

export default async function Home() {
  return (
    <main className="min-h-screen min-w-screen flex flex-col gap-8 p-10">
      <h1>Retirement Planner</h1>
      <section className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8">
        <div data-el="left-col" className="flex flex-col gap-4">
          <div data-el="graph" className="bg-neutral-200 w-full h-96" />
          <Stats />
          <Summary />
        </div>

        <div data-el="right-col">
          <Calculator />
        </div>
      </section>
    </main>
  );
}

function Stats() {
  return (
    <Card>
      <CardContent data-el="stats" className="grid grid-cols-3 py-6">
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

function Calculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Design your retirement</CardTitle>
        <CardDescription>This is all based on a yearly income of £40,000</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <InputWithLabel label="Desired income in retirement" />
          <div className="flex gap-4 items-end">
            <InputWithLabel label="My contributions" className="flex-1" />
            <InputWithLabel label="Employer contributions" className="flex-1" />
            <NumberBlocks label="Retirement age" className="flex-1" />
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
