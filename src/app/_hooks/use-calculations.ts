'use client'

import { useMemo } from 'react'

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
    currentSalary: 50000,// TODO: need to add an input to track this
    existingPensionPot: state.currentPot, // TODO: need to add UI for this
  }

  const pensionResults = calculatePensionProjections(pensionInputs)
  const requiredEmployeeContribution = calculateRequiredContributionPercent(pensionInputs, pensionResults.requiredPensionPot)

  return {
    pensionInputs,
    pensionResults,
    requiredEmployeeContribution,
  }
}
