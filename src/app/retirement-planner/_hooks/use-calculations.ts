'use client'

import {
  calculatePensionProjections,
  calculateRequiredContributionPercent,
  type PensionInputs,
} from '@/utils/pension-calculations'
import type { PensionState } from '@/types/pension'

export function usePensionCalculations(state: PensionState) {

  const pensionInputs: PensionInputs = {
    currentAge: 25,
    retirementAge: state.retirementAge,
    desiredAnnualIncome: state.income,
    employeeContributionPercent: state.contributions,
    employerContributionPercent: state.employerContributions,
    currentSalary: state.income,
    existingPensionPot: state.currentPot,
  }

  const pensionResults = calculatePensionProjections(pensionInputs)
  const requiredContributions = calculateRequiredContributionPercent(pensionInputs, pensionResults.requiredPensionPot)

  return {
    pensionResults,
    requiredContributions,
  }
}
