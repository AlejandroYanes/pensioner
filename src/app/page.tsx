import { HydrateClient } from '@/trpc/server';

export default async function Home() {
  return (
    <HydrateClient>
      <main className="min-h-screen min-w-screen flex flex-col">
        <h1>Retirement Planner</h1>
        <section className="flex flex-col-reverse md:grid md:grid-cols-2">
          <div data-el="left-col">
            <div data-el="graph" className="bg-neutral-200 w-full h-96" />

            <Stats />

            <div data-el="summary"></div>
          </div>

          <div data-el="right-col"></div>
        </section>
      </main>
    </HydrateClient>
  );
}

function Stats() {
  return (
    <div data-el="stats" className="grid grid-cols-3">
      <Statline label="What you have" value={34847} secondary="£xx,xx/yr" color="orange" />
      <Statline label="What you'll have" value={389529} secondary="£xx,xxx/yr" color="green" />
      <Statline label="What you'll need" value={518847} secondary="£xx,xx/yr" color="blue" />
    </div>
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
