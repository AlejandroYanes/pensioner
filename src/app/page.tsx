'use client'

import PensionChart from './_components/pension-chart';
import Summary from './_components/summary';
import Breakdown from './_components/breakdown';
import Calculator from './_components/calculator';
import { usePensionState } from './_hooks/use-pension-state';
import { usePensionCalculations } from './_hooks/use-calculations';

export default function Home() {
  const [state, actions] = usePensionState()
  const { selectedIncome, pensionResults, requiredEmployeeContribution } = usePensionCalculations(state)

  return (
    <main className="min-h-screen min-w-screen flex items-stretch">
      <aside className="bg-cyan-950 w-[25%]" />
      <section className="flex flex-col gap-8 px-14 py-10">
        <h1 className="text-2xl font-bold">Retirement Planner</h1>
        <section className="flex flex-col-reverse xl:grid xl:grid-cols-2 gap-8">
          <div data-el="left-col" className="flex flex-col gap-8">
            <PensionChart
              currentAge={25}
              retirementAge={state.retirementAge}
              projectedPensionPot={pensionResults.projectedPensionPot}
              requiredPensionPot={pensionResults.requiredPensionPot}
              currentSalary={state.currentSalary}
              totalContributionPercent={
                state.mandatoryContribution +
                state.voluntaryContribution +
                state.employerContribution +
                state.employerMatching
              }
              existingPensionPot={state.existingPensionPot}
            />
            <Breakdown />
            <Summary />
          </div>

          <div data-el="right-col">
            <Calculator />
          </div>
        </section>
      </section>
    </main>
  );
}
