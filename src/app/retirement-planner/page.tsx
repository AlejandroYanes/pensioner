'use client'
import { useState } from 'react';

import type { PensionState } from '@/types/pension';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/sidebar';
import { AppSidebar } from '@/components/app-sidebar'

import PensionChart from './_components/pension-chart';
import Summary from './_components/summary';
import Breakdown from './_components/breakdown';
import Calculator from './_components/calculator';
import { usePensionCalculations } from './_hooks/use-calculations';

const DEFAULT_STATE: PensionState = {
  income: 50000,
  retirementAge: 65,
  contributions: 5,
  employerContributions: 3,
  currentPot: 5000,
}

export default function Home() {
  const [state, setState] = useState<PensionState>(DEFAULT_STATE)
  const { pensionResults, requiredContributions } = usePensionCalculations(state)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <section className="flex flex-col">
          <div className="bg-accent text-white flex items-center justify-between p-4 md:hidden">
            <h1 className="text-3xl font-bold">Mintago</h1>
            <SidebarTrigger />
          </div>
          <div className="flex flex-col gap-8 px-4 md:px-14 py-10">
            <h1 className="text-2xl font-bold">Retirement Planner</h1>
            <section className="flex flex-col-reverse xl:grid xl:grid-cols-2 gap-8">
              <div data-el="left-col" className="flex flex-col gap-8">
                <PensionChart
                  currentAge={25}
                  retirementAge={state.retirementAge}
                  projectedPensionPot={pensionResults.projectedPensionPot}
                  requiredPensionPot={pensionResults.requiredPensionPot}
                  currentSalary={state.income}
                  totalContributionPercent={state.contributions + state.employerContributions}
                  existingPensionPot={state.currentPot}
                />
                <Breakdown
                  currentPension={pensionResults.currentPension}
                  projectedPension={pensionResults.projectedPensionPot}
                  requiredPension={pensionResults.requiredPensionPot}
                />
                <Summary data={state} requiredContributions={requiredContributions} />
              </div>

              <div data-el="right-col">
                <Calculator data={state} onChange={(next) => setState((prev) => ({ ...prev, ...next }))} />
              </div>
            </section>
          </div>
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
}
