'use client'

import { useState, useEffect, useCallback } from 'react'

export interface PensionState {
  retirementAge: number
  selectedIncomeLevel: string
  voluntaryContribution: number
  includeStatePension: boolean
  mandatoryContribution: number
  employerContribution: number
  employerMatching: number
  currentSalary: number
  existingPensionPot: number
}

export interface PensionStateActions {
  setRetirementAge: (age: number) => void
  setSelectedIncomeLevel: (level: string) => void
  setVoluntaryContribution: (contribution: number) => void
  setIncludeStatePension: (include: boolean) => void
  resetToDefaults: () => void
  saveState: () => void
}

const DEFAULT_STATE: PensionState = {
  retirementAge: 65,
  selectedIncomeLevel: 'Moderate',
  voluntaryContribution: 3,
  includeStatePension: true,
  mandatoryContribution: 5,
  employerContribution: 5,
  employerMatching: 3,
  currentSalary: 50000,
  existingPensionPot: 34847,
}

const STORAGE_KEY = 'pension-tracker-state'

export function usePensionState(): [PensionState, PensionStateActions] {
  const [state, setState] = useState<PensionState>(DEFAULT_STATE)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY)
      if (savedState) {
        const parsedState = JSON.parse(savedState)
        // Validate that the saved state has all required properties
        const validatedState = { ...DEFAULT_STATE, ...parsedState }
        setState(validatedState)
      }
    } catch (error) {
      console.warn('Failed to load pension state from localStorage:', error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
      } catch (error) {
        console.warn('Failed to save pension state to localStorage:', error)
      }
    }
  }, [state, isLoaded])

  const setRetirementAge = useCallback((age: number) => {
    const validatedAge = Math.max(50, Math.min(75, age))
    setState((prev) => ({ ...prev, retirementAge: validatedAge }))
  }, [])

  const setSelectedIncomeLevel = useCallback((level: string) => {
    const validLevels = ['Basic', 'Moderate', 'Comfortable']
    if (validLevels.includes(level)) {
      setState((prev) => ({ ...prev, selectedIncomeLevel: level }))
    }
  }, [])

  const setVoluntaryContribution = useCallback((contribution: number) => {
    const validatedContribution = Math.max(0, Math.min(20, contribution))
    setState((prev) => ({ ...prev, voluntaryContribution: validatedContribution }))
  }, [])

  const setIncludeStatePension = useCallback((include: boolean) => {
    setState((prev) => ({ ...prev, includeStatePension: include }))
  }, [])

  const resetToDefaults = useCallback(() => {
    setState(DEFAULT_STATE)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.warn('Failed to clear pension state from localStorage:', error)
    }
  }, [])

  const saveState = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (error) {
      console.warn('Failed to save pension state to localStorage:', error)
    }
  }, [state])

  const actions: PensionStateActions = {
    setRetirementAge,
    setSelectedIncomeLevel,
    setVoluntaryContribution,
    setIncludeStatePension,
    resetToDefaults,
    saveState,
  }

  return [state, actions]
}
