import { describe, it, expect } from 'vitest'

import { calculatePensionProjections, calculateRequiredContributionPercent } from '../pension-calculations'
import type { PensionInputs } from '../pension-calculations'

describe('calculatePensionProjections', () => {
  const baseInputs: PensionInputs = {
    currentAge: 30,
    retirementAge: 65,
    desiredAnnualIncome: 40000,
    employeeContributionPercent: 8,
    employerContributionPercent: 3,
    currentSalary: 50000,
    existingPensionPot: 10000,
  }

  it('should calculate basic pension projections correctly', () => {
    const result = calculatePensionProjections(baseInputs)

    expect(result.yearsToRetirement).toBe(35)
    expect(result.yearsInRetirement).toBe(16) // 81 - 65
    expect(result.annualContributions).toBe(5500) // 50000 * 11% = 5500
    expect(result.monthlyContributions).toBeCloseTo(458.33, 2) // 5500 / 12
    expect(result.currentPension).toBe(10000)
    expect(result.projectedPensionPot).toBeGreaterThan(0)
    expect(result.requiredPensionPot).toBeGreaterThan(0)
  })

  it('should handle zero existing pension pot', () => {
    const inputs = { ...baseInputs, existingPensionPot: 0 }
    const result = calculatePensionProjections(inputs)

    expect(result.currentPension).toBe(0)
    expect(result.projectedPensionPot).toBeGreaterThan(0)
  })

  it('should handle missing existing pension pot (undefined)', () => {
    const inputs = { ...baseInputs }
    delete inputs.existingPensionPot
    const result = calculatePensionProjections(inputs)

    expect(result.currentPension).toBe(0)
    expect(result.projectedPensionPot).toBeGreaterThan(0)
  })

  it('should use default values when age and salary are not provided', () => {
    const inputs = {
      retirementAge: 65,
      desiredAnnualIncome: 40000,
      employeeContributionPercent: 8,
      employerContributionPercent: 3,
    } as PensionInputs

    const result = calculatePensionProjections(inputs)

    expect(result.yearsToRetirement).toBe(40) // 65 - 25 (default current age)
    expect(result.annualContributions).toBe(5500) // 50000 (default salary) * 11%
  })

  it('should calculate compound interest correctly for existing pension pot', () => {
    const inputs = {
      ...baseInputs,
      currentAge: 25,
      retirementAge: 65,
      existingPensionPot: 10000,
      employeeContributionPercent: 0,
      employerContributionPercent: 0,
    }

    const result = calculatePensionProjections(inputs)

    // With 40 years of 4.9% growth: 10000 * (1.049)^40
    const expectedExistingGrowth = 10000 * Math.pow(1.049, 40)
    expect(result.projectedPensionPot).toBeCloseTo(expectedExistingGrowth, 0)
  })

  it('should calculate required pension pot using present value of annuity', () => {
    const result = calculatePensionProjections(baseInputs)

    // Present value of annuity: 40000 * [(1 - (1.049)^-16) / 0.049]
    const yearsInRetirement = 16
    const annuityFactor = (1 - Math.pow(1.049, -yearsInRetirement)) / 0.049
    const expectedRequiredPot = 40000 * annuityFactor

    expect(result.requiredPensionPot).toBeCloseTo(expectedRequiredPot, 0)
  })

  it('should calculate shortfall correctly when projected pot is less than required', () => {
    const inputs = {
      ...baseInputs,
      desiredAnnualIncome: 100000, // Very high income requirement
      employeeContributionPercent: 1,
      employerContributionPercent: 1,
    }

    const result = calculatePensionProjections(inputs)

    expect(result.shortfall).toBeGreaterThan(0)
    expect(result.shortfall).toBe(result.requiredPensionPot - result.projectedPensionPot)
  })

  it('should have zero shortfall when projected pot exceeds required', () => {
    const inputs = {
      ...baseInputs,
      desiredAnnualIncome: 10000, // Low income requirement
      employeeContributionPercent: 15,
      employerContributionPercent: 10,
    }

    const result = calculatePensionProjections(inputs)

    expect(result.shortfall).toBe(0)
  })

  it('should handle edge case with zero years to retirement', () => {
    const inputs = {
      ...baseInputs,
      currentAge: 65,
      retirementAge: 65,
    }

    const result = calculatePensionProjections(inputs)

    expect(result.yearsToRetirement).toBe(0)
    expect(result.projectedPensionPot).toBe(baseInputs.existingPensionPot) // No growth or contributions
  })

  it('should handle very high contribution percentages', () => {
    const inputs = {
      ...baseInputs,
      employeeContributionPercent: 50,
      employerContributionPercent: 25,
    }

    const result = calculatePensionProjections(inputs)

    expect(result.annualContributions).toBe(37500) // 50000 * 75%
    expect(result.monthlyContributions).toBeCloseTo(3125, 2)
  })

  it('should maintain precision in financial calculations', () => {
    const result = calculatePensionProjections(baseInputs)

    // All monetary values should be finite numbers
    expect(Number.isFinite(result.projectedPensionPot)).toBe(true)
    expect(Number.isFinite(result.requiredPensionPot)).toBe(true)
    expect(Number.isFinite(result.shortfall)).toBe(true)
    expect(Number.isFinite(result.annualContributions)).toBe(true)
    expect(Number.isFinite(result.monthlyContributions)).toBe(true)

    // Values should be non-negative
    expect(result.projectedPensionPot).toBeGreaterThanOrEqual(0)
    expect(result.requiredPensionPot).toBeGreaterThanOrEqual(0)
    expect(result.shortfall).toBeGreaterThanOrEqual(0)
  })
})

describe('calculateRequiredContributionPercent', () => {
  const baseInputs: PensionInputs = {
    currentAge: 30,
    retirementAge: 65,
    desiredAnnualIncome: 40000,
    employeeContributionPercent: 8,
    employerContributionPercent: 3,
    currentSalary: 50000,
    existingPensionPot: 10000,
  }

  it('should calculate required employee contribution percentage', () => {
    const targetPensionPot = 500000
    const result = calculateRequiredContributionPercent(baseInputs, targetPensionPot)

    expect(result).toBeGreaterThanOrEqual(0)
    expect(Number.isFinite(result)).toBe(true)
  })

  it('should return zero when existing pension pot is sufficient', () => {
    const inputs = {
      ...baseInputs,
      existingPensionPot: 1000000, // Very large existing pot
    }
    const targetPensionPot = 500000

    const result = calculateRequiredContributionPercent(inputs, targetPensionPot)

    expect(result).toBe(0)
  })

  it('should account for employer contributions', () => {
    const targetPensionPot = 500000

    // Test with high employer contribution
    const inputsHighEmployer = {
      ...baseInputs,
      employerContributionPercent: 10,
    }

    // Test with low employer contribution
    const inputsLowEmployer = {
      ...baseInputs,
      employerContributionPercent: 1,
    }

    const resultHigh = calculateRequiredContributionPercent(inputsHighEmployer, targetPensionPot)
    const resultLow = calculateRequiredContributionPercent(inputsLowEmployer, targetPensionPot)

    // Higher employer contribution should result in lower required employee contribution
    expect(resultHigh).toBeLessThan(resultLow)
  })

  it('should handle zero target pension pot', () => {
    const result = calculateRequiredContributionPercent(baseInputs, 0)
    expect(result).toBe(0)
  })

  it('should use default values when age and salary are not provided', () => {
    const inputs = {
      retirementAge: 65,
      desiredAnnualIncome: 40000,
      employeeContributionPercent: 8,
      employerContributionPercent: 3,
    } as PensionInputs

    const targetPensionPot = 500000
    const result = calculateRequiredContributionPercent(inputs, targetPensionPot)

    expect(Number.isFinite(result)).toBe(true)
    expect(result).toBeGreaterThanOrEqual(0)
  })

  it('should handle scenario where employer contribution alone is sufficient', () => {
    const inputs = {
      ...baseInputs,
      currentAge: 25,
      retirementAge: 65,
      existingPensionPot: 0,
      employerContributionPercent: 20, // Very high employer contribution
      currentSalary: 100000,
    }

    const targetPensionPot = 100000 // Relatively low target

    const result = calculateRequiredContributionPercent(inputs, targetPensionPot)

    expect(result).toBe(0)
  })

  it('should calculate correctly with different time horizons', () => {
    const shortTimeHorizon = {
      ...baseInputs,
      currentAge: 60,
      retirementAge: 65,
    }

    const longTimeHorizon = {
      ...baseInputs,
      currentAge: 25,
      retirementAge: 65,
    }

    const targetPensionPot = 500000

    const shortResult = calculateRequiredContributionPercent(shortTimeHorizon, targetPensionPot)
    const longResult = calculateRequiredContributionPercent(longTimeHorizon, targetPensionPot)

    // Shorter time horizon should require higher contribution percentage
    expect(shortResult).toBeGreaterThan(longResult)
  })

  it('should handle large target pension pot amounts', () => {
    const targetPensionPot = 5000000 // Very large target
    const result = calculateRequiredContributionPercent(baseInputs, targetPensionPot)

    expect(Number.isFinite(result)).toBe(true)
    expect(result).toBeGreaterThan(0)
  })

  it('should never return negative contribution percentage', () => {
    const inputs = {
      ...baseInputs,
      existingPensionPot: 2000000, // Very large existing pot
      employerContributionPercent: 50, // Very high employer contribution
    }

    const targetPensionPot = 100000
    const result = calculateRequiredContributionPercent(inputs, targetPensionPot)

    expect(result).toBeGreaterThanOrEqual(0)
  })
})

describe('pension calculations integration tests', () => {
  it('should provide consistent results between both functions', () => {
    const inputs: PensionInputs = {
      currentAge: 30,
      retirementAge: 65,
      desiredAnnualIncome: 40000,
      employeeContributionPercent: 8,
      employerContributionPercent: 3,
      currentSalary: 50000,
      existingPensionPot: 10000,
    }

    const projections = calculatePensionProjections(inputs)

    // If there's a shortfall, calculate what contribution would be needed
    if (projections.shortfall > 0) {
      const requiredContribution = calculateRequiredContributionPercent(
        inputs,
        projections.requiredPensionPot
      )

      expect(requiredContribution).toBeGreaterThan(inputs.employeeContributionPercent)
      expect(Number.isFinite(requiredContribution)).toBe(true)
    }
  })

  it('should handle realistic retirement scenarios', () => {
    // Realistic scenario: 35-year-old earning £60k, wants £35k annual income in retirement
    const realisticInputs: PensionInputs = {
      currentAge: 35,
      retirementAge: 67,
      desiredAnnualIncome: 35000,
      employeeContributionPercent: 5,
      employerContributionPercent: 3,
      currentSalary: 60000,
      existingPensionPot: 25000,
    }

    const result = calculatePensionProjections(realisticInputs)

    expect(result.yearsToRetirement).toBe(32)
    expect(result.yearsInRetirement).toBe(14)
    expect(result.annualContributions).toBe(4800) // 60000 * 8%
    expect(result.monthlyContributions).toBe(400)
    expect(result.projectedPensionPot).toBeGreaterThan(result.currentPension)
  })

  it('should handle early retirement scenario', () => {
    const earlyRetirementInputs: PensionInputs = {
      currentAge: 40,
      retirementAge: 55,
      desiredAnnualIncome: 30000,
      employeeContributionPercent: 15,
      employerContributionPercent: 5,
      currentSalary: 80000,
      existingPensionPot: 50000,
    }

    const result = calculatePensionProjections(earlyRetirementInputs)

    expect(result.yearsToRetirement).toBe(15)
    expect(result.yearsInRetirement).toBe(26) // 81 - 55
    expect(result.annualContributions).toBe(16000) // 80000 * 20%
  })

  it('should handle late career starter scenario', () => {
    const lateStarterInputs: PensionInputs = {
      currentAge: 45,
      retirementAge: 68,
      desiredAnnualIncome: 25000,
      employeeContributionPercent: 12,
      employerContributionPercent: 6,
      currentSalary: 45000,
      existingPensionPot: 5000,
    }

    const result = calculatePensionProjections(lateStarterInputs)

    expect(result.yearsToRetirement).toBe(23)
    expect(result.yearsInRetirement).toBe(13)
    expect(result.annualContributions).toBe(8100) // 45000 * 18%
  })
})

describe('edge cases and error conditions', () => {
  it('should handle zero contribution percentages', () => {
    const inputs: PensionInputs = {
      currentAge: 30,
      retirementAge: 65,
      desiredAnnualIncome: 40000,
      employeeContributionPercent: 0,
      employerContributionPercent: 0,
      currentSalary: 50000,
      existingPensionPot: 10000,
    }

    const result = calculatePensionProjections(inputs)

    expect(result.annualContributions).toBe(0)
    expect(result.monthlyContributions).toBe(0)
    expect(result.projectedPensionPot).toBeGreaterThan(0) // Should still have existing pot growth
  })

  it('should handle zero salary', () => {
    const inputs: PensionInputs = {
      currentAge: 30,
      retirementAge: 65,
      desiredAnnualIncome: 40000,
      employeeContributionPercent: 8,
      employerContributionPercent: 3,
      currentSalary: 0,
      existingPensionPot: 10000,
    }

    const result = calculatePensionProjections(inputs)

    expect(result.annualContributions).toBe(0)
    expect(result.monthlyContributions).toBe(0)
  })

  it('should handle zero desired annual income', () => {
    const inputs: PensionInputs = {
      currentAge: 30,
      retirementAge: 65,
      desiredAnnualIncome: 0,
      employeeContributionPercent: 8,
      employerContributionPercent: 3,
      currentSalary: 50000,
      existingPensionPot: 10000,
    }

    const result = calculatePensionProjections(inputs)

    expect(result.requiredPensionPot).toBe(0)
    expect(result.shortfall).toBe(0)
  })

  it('should handle same current age and retirement age', () => {
    const inputs: PensionInputs = {
      currentAge: 65,
      retirementAge: 65,
      desiredAnnualIncome: 40000,
      employeeContributionPercent: 8,
      employerContributionPercent: 3,
      currentSalary: 50000,
      existingPensionPot: 10000,
    }

    const result = calculatePensionProjections(inputs)

    expect(result.yearsToRetirement).toBe(0)
    expect(result.projectedPensionPot).toBe(10000) // No time for growth
  })
})

describe('mathematical accuracy tests', () => {
  it('should correctly apply compound interest formula', () => {
    const inputs: PensionInputs = {
      currentAge: 25,
      retirementAge: 65,
      desiredAnnualIncome: 40000,
      employeeContributionPercent: 10,
      employerContributionPercent: 0,
      currentSalary: 50000,
      existingPensionPot: 0,
    }

    const result = calculatePensionProjections(inputs)

    // Manual calculation: PMT * [((1 + r)^n - 1) / r]
    // Where PMT = 5000, r = 0.049, n = 40
    const annualContributions = 5000
    const years = 40
    const rate = 0.049
    const expectedFutureValue = annualContributions * ((Math.pow(1 + rate, years) - 1) / rate)

    expect(result.projectedPensionPot).toBeCloseTo(expectedFutureValue, 0)
  })

  it('should correctly calculate present value of annuity', () => {
    const inputs: PensionInputs = {
      currentAge: 30,
      retirementAge: 65,
      desiredAnnualIncome: 50000,
      employeeContributionPercent: 8,
      employerContributionPercent: 3,
      currentSalary: 50000,
    }

    const result = calculatePensionProjections(inputs)

    // Manual calculation: PMT * [(1 - (1 + r)^-n) / r]
    // Where PMT = 50000, r = 0.049, n = 16
    const annualIncome = 50000
    const yearsInRetirement = 16
    const rate = 0.049
    const expectedPresentValue = annualIncome * ((1 - Math.pow(1 + rate, -yearsInRetirement)) / rate)

    expect(result.requiredPensionPot).toBeCloseTo(expectedPresentValue, 0)
  })

  it('should calculate required contribution percentage accurately', () => {
    const inputs: PensionInputs = {
      currentAge: 30,
      retirementAge: 65,
      desiredAnnualIncome: 40000,
      employeeContributionPercent: 0,
      employerContributionPercent: 3,
      currentSalary: 50000,
      existingPensionPot: 0,
    }

    const targetPensionPot = 500000
    const requiredContribution = calculateRequiredContributionPercent(inputs, targetPensionPot)

    // Verify by calculating what the projection would be with this contribution
    const testInputs = {
      ...inputs,
      employeeContributionPercent: requiredContribution,
    }

    const testResult = calculatePensionProjections(testInputs)

    // The projected pot should be close to the target (within small margin for rounding)
    expect(testResult.projectedPensionPot).toBeCloseTo(targetPensionPot, -2) // Within £100
  })

  it('should handle fractional years correctly', () => {
    const inputs: PensionInputs = {
      currentAge: 30.5, // 30 years and 6 months
      retirementAge: 65.25, // 65 years and 3 months
      desiredAnnualIncome: 40000,
      employeeContributionPercent: 8,
      employerContributionPercent: 3,
      currentSalary: 50000,
      existingPensionPot: 10000,
    }

    const result = calculatePensionProjections(inputs)

    expect(result.yearsToRetirement).toBeCloseTo(34.75, 2)
    expect(Number.isFinite(result.projectedPensionPot)).toBe(true)
  })
})

describe('boundary value tests', () => {
  it('should handle minimum realistic values', () => {
    const inputs: PensionInputs = {
      currentAge: 18,
      retirementAge: 65,
      desiredAnnualIncome: 10000,
      employeeContributionPercent: 0.1,
      employerContributionPercent: 0.1,
      currentSalary: 20000,
      existingPensionPot: 0,
    }

    const result = calculatePensionProjections(inputs)

    expect(result.yearsToRetirement).toBe(47)
    expect(result.annualContributions).toBeCloseTo(40, 2) // 20000 * 0.2%
    expect(result.projectedPensionPot).toBeGreaterThan(0)
  })

  it('should handle high-earning scenario', () => {
    const inputs: PensionInputs = {
      currentAge: 35,
      retirementAge: 60,
      desiredAnnualIncome: 100000,
      employeeContributionPercent: 20,
      employerContributionPercent: 10,
      currentSalary: 200000,
      existingPensionPot: 100000,
    }

    const result = calculatePensionProjections(inputs)

    expect(result.annualContributions).toBe(60000) // 200000 * 30%
    expect(result.projectedPensionPot).toBeGreaterThan(100000)
  })
});
