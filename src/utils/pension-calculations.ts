export interface PensionInputs {
  currentAge: number
  retirementAge: number
  desiredAnnualIncome: number
  employeeContributionPercent: number
  employerContributionPercent: number
  currentSalary: number
  existingPensionPot?: number
  includeStatePension: boolean
}

export interface PensionResults {
  projectedPensionPot: number
  requiredPensionPot: number
  currentPensionValue: number
  monthlyContributions: number
  yearsToRetirement: number
  yearsInRetirement: number
  annualContributions: number
  shortfall: number
  statePensionAmount: number
}

const ANNUAL_INTEREST_RATE = 0.049 // 4.9%
const LIFE_EXPECTANCY = 81
const ANNUAL_STATE_PENSION = 10600 // Approximate full state pension 2024
const ASSUMED_CURRENT_AGE = 25 // User starts working at 25
const ASSUMED_SALARY = 50000 // Assumed annual salary for calculations

export function calculatePensionProjections(inputs: PensionInputs): PensionResults {
  const {
    currentAge = ASSUMED_CURRENT_AGE,
    retirementAge,
    desiredAnnualIncome,
    employeeContributionPercent,
    employerContributionPercent,
    currentSalary = ASSUMED_SALARY,
    existingPensionPot = 0,
    includeStatePension,
  } = inputs

  const yearsToRetirement = retirementAge - currentAge
  const yearsInRetirement = LIFE_EXPECTANCY - retirementAge

  // Calculate annual contributions
  const totalContributionPercent = employeeContributionPercent + employerContributionPercent
  const annualContributions = (currentSalary * totalContributionPercent) / 100
  const monthlyContributions = annualContributions / 12

  // Calculate projected pension pot using compound interest formula
  // Future Value = PV * (1 + r)^n + PMT * [((1 + r)^n - 1) / r]
  const futureValueExisting = existingPensionPot * Math.pow(1 + ANNUAL_INTEREST_RATE, yearsToRetirement)
  const futureValueContributions =
    annualContributions * ((Math.pow(1 + ANNUAL_INTEREST_RATE, yearsToRetirement) - 1) / ANNUAL_INTEREST_RATE)

  const projectedPensionPot = futureValueExisting + futureValueContributions

  // Calculate required pension pot for desired income
  // Using annuity formula to determine lump sum needed for annual payments
  const statePensionAmount = includeStatePension ? ANNUAL_STATE_PENSION : 0
  const requiredPrivatePensionIncome = Math.max(0, desiredAnnualIncome - statePensionAmount)

  // Present value of annuity formula: PV = PMT * [(1 - (1 + r)^-n) / r]
  const requiredPensionPot =
    requiredPrivatePensionIncome * ((1 - Math.pow(1 + ANNUAL_INTEREST_RATE, -yearsInRetirement)) / ANNUAL_INTEREST_RATE)

  // Calculate current pension value (what they have now)
  const currentPensionValue = existingPensionPot

  // Calculate shortfall
  const shortfall = Math.max(0, requiredPensionPot - projectedPensionPot)

  return {
    projectedPensionPot,
    requiredPensionPot,
    currentPensionValue,
    monthlyContributions,
    yearsToRetirement,
    yearsInRetirement,
    annualContributions,
    shortfall,
    statePensionAmount,
  }
}

export function calculateRequiredContributionPercent(inputs: PensionInputs, targetPensionPot: number): number {
  const {
    currentAge = ASSUMED_CURRENT_AGE,
    retirementAge,
    currentSalary = ASSUMED_SALARY,
    existingPensionPot = 0,
    employerContributionPercent,
  } = inputs

  const yearsToRetirement = retirementAge - currentAge
  const futureValueExisting = existingPensionPot * Math.pow(1 + ANNUAL_INTEREST_RATE, yearsToRetirement)
  const requiredFromContributions = targetPensionPot - futureValueExisting

  if (requiredFromContributions <= 0) return 0

  // Calculate required annual contributions
  const annuityFactor = (Math.pow(1 + ANNUAL_INTEREST_RATE, yearsToRetirement) - 1) / ANNUAL_INTEREST_RATE
  const requiredAnnualContributions = requiredFromContributions / annuityFactor

  // Calculate total contribution percentage needed
  const totalContributionPercent = (requiredAnnualContributions / currentSalary) * 100

  // Subtract employer contribution to get required employee contribution
  const requiredEmployeeContribution = Math.max(0, totalContributionPercent - employerContributionPercent)

  return requiredEmployeeContribution
}
