'use client'

import { useMemo } from 'react'

import {
  calculatePensionProjections,
  calculateRequiredContributionPercent,
  type PensionInputs,
  type PensionResults,
} from '@/utils/pension-calculations'

import type { PensionState } from './use-pension-state'

const INCOME_LEVELS = [
  { label: 'Basic', amount: 12800 },
  { label: 'Moderate', amount: 23300 },
  { label: 'Comfortable', amount: 37300 },
]

export function usePensionCalculations(state: PensionState) {
  const selectedIncome = useMemo(() => {
    return INCOME_LEVELS.find((level) => level.label === state.selectedIncomeLevel)?.amount || 23300
  }, [state.selectedIncomeLevel])

  const pensionInputs = useMemo(
    (): PensionInputs => ({
      currentAge: 25,
      retirementAge: state.retirementAge,
      desiredAnnualIncome: selectedIncome,
      employeeContributionPercent: state.mandatoryContribution + state.voluntaryContribution,
      employerContributionPercent: state.employerContribution + state.employerMatching,
      currentSalary: state.currentSalary,
      existingPensionPot: state.existingPensionPot,
      includeStatePension: state.includeStatePension,
    }),
    [
      state.retirementAge,
      selectedIncome,
      state.mandatoryContribution,
      state.voluntaryContribution,
      state.employerContribution,
      state.employerMatching,
      state.currentSalary,
      state.existingPensionPot,
      state.includeStatePension,
    ],
  )

  const pensionResults = useMemo((): PensionResults => calculatePensionProjections(pensionInputs), [pensionInputs])

  const requiredEmployeeContribution = useMemo(
    () => calculateRequiredContributionPercent(pensionInputs, pensionResults.requiredPensionPot),
    [pensionInputs, pensionResults.requiredPensionPot],
  )

  return {
    selectedIncome,
    pensionInputs,
    pensionResults,
    requiredEmployeeContribution,
  }
}
