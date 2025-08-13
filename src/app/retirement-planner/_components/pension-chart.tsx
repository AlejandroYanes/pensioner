'use client'

import { useMemo } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'

import { Card, CardContent } from '@/components/card';
import { formatCurrency } from '@/utils/numbers'

interface Props {
  currentAge: number
  retirementAge: number
  projectedPensionPot: number
  requiredPensionPot: number
  currentSalary: number
  totalContributionPercent: number
  existingPensionPot: number
}

interface ChartDataPoint {
  age: number
  pensionPot: number
  requiredPot: number
  phase: 'accumulation' | 'retirement'
}

const ANNUAL_INTEREST_RATE = 0.049
const LIFE_EXPECTANCY = 81

export default function PensionChart(props: Props) {
  const {
    currentAge,
    retirementAge,
    projectedPensionPot,
    requiredPensionPot,
    currentSalary,
    totalContributionPercent,
    existingPensionPot,
  } = props;
  const chartData = useMemo(() => {
    const data: ChartDataPoint[] = []
    const annualContributions = (currentSalary * totalContributionPercent) / 100

    // Accumulation phase (current age to retirement)
    for (let age = currentAge; age <= retirementAge; age++) {
      const yearsFromStart = age - currentAge

      // Calculate pension pot growth with compound interest
      const futureValueExisting = existingPensionPot * Math.pow(1 + ANNUAL_INTEREST_RATE, yearsFromStart)
      const futureValueContributions =
        yearsFromStart > 0
          ? annualContributions * ((Math.pow(1 + ANNUAL_INTEREST_RATE, yearsFromStart) - 1) / ANNUAL_INTEREST_RATE)
          : 0

      const pensionPot = futureValueExisting + futureValueContributions

      data.push({
        age,
        pensionPot,
        requiredPot: requiredPensionPot,
        phase: 'accumulation',
      })
    }

    // Retirement phase (retirement age to life expectancy)
    let remainingPot = projectedPensionPot
    const yearsInRetirement = LIFE_EXPECTANCY - retirementAge
    const annualWithdrawal = projectedPensionPot / yearsInRetirement // Simple withdrawal for visualization

    for (let age = retirementAge + 1; age <= LIFE_EXPECTANCY; age++) {
      remainingPot = Math.max(0, remainingPot - annualWithdrawal)

      data.push({
        age,
        pensionPot: remainingPot,
        requiredPot: requiredPensionPot,
        phase: 'retirement',
      })
    }

    return data
  }, [
    currentAge,
    retirementAge,
    projectedPensionPot,
    requiredPensionPot,
    currentSalary,
    totalContributionPercent,
    existingPensionPot,
  ])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{`Age: ${label}`}</p>
          <p className="text-green-600">{`Projected: ${formatCurrency(payload[0].value)}`}</p>
          <p className="text-blue-600">{`Target: ${formatCurrency(payload[1].value)}`}</p>
          <p className="text-sm text-gray-500">
            {data.phase === 'accumulation' ? 'Building pension' : 'Using pension'}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardContent className="pt-6 px-0 md:px-6">
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="age" stroke="#666" fontSize={12} tickFormatter={(value) => `${value}`} />
              <YAxis stroke="#666" fontSize={12} tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`} />
              <Tooltip content={CustomTooltip} />
              <Legend />

              {/* Reference line for retirement age */}
              <ReferenceLine
                x={retirementAge}
                stroke="#ff6b6b"
                strokeDasharray="5 5"
                label={{ value: 'Retirement', position: 'top' }}
              />

              {/* Projected pension pot line */}
              <Line
                type="monotone"
                dataKey="pensionPot"
                stroke="#10b981"
                strokeWidth={3}
                dot={false}
                name="Your projected pot"
              />

              {/* Required pension pot line */}
              <Line
                type="monotone"
                dataKey="requiredPot"
                stroke="#3b82f6"
                strokeWidth={2}
                strokeDasharray="8 4"
                dot={false}
                name="Target pot needed"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>

  )
}
