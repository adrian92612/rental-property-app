"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Content } from "./properties-card";

type IncomeExpenseChartProps = {
  rentalIncome: number;
  monthlyExpense: number;
  mortgage: number;
};

export const IncomeExpenseChart = ({
  rentalIncome,
  monthlyExpense,
  mortgage,
}: IncomeExpenseChartProps) => {
  const chartData = [
    {
      category: "Rental Income",
      value: rentalIncome,
      fill: "hsl(var(--chart-2))",
    },
    {
      category: "Other Expenses",
      value: monthlyExpense,
      fill: "hsl(var(--chart-1))",
    },
    { category: "Mortgage", value: mortgage, fill: "hsl(var(--chart-1))" },
  ];

  const chartConfig: ChartConfig = {
    value: {
      label: "value",
      color: "hsl(var(--chart-1))",
    },
  };

  const getRentalIncomeCover = () => {
    return `${((rentalIncome / (monthlyExpense + mortgage)) * 100).toFixed(
      2
    )}%`;
  };

  const getSpending = () => {
    return ((monthlyExpense / rentalIncome) * 100).toFixed(2);
  };

  const getMortgageRatio = () => {
    return ((mortgage / rentalIncome) * 100).toFixed(2);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Monthly Income Vs Expense</CardTitle>
        <CardDescription>
          This chart compares your monthly rental income to your mortgage and
          other property expenses.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData} className="mt-5">
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="bg-white" />}
            />
            <Bar dataKey="value" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                dataKey="value"
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start ">
        <div className="font-bold">
          {`Monthy cashflow of 
          ${(rentalIncome - (monthlyExpense + mortgage)).toFixed(2)}
          `}
        </div>
        <div className="text-muted-foreground text-sm">
          ** Rental income covers {getRentalIncomeCover()}% of your expenses.
        </div>
        <div className="text-muted-foreground text-sm">
          {rentalIncome === 0
            ? "** No rental income"
            : `** You are spending ${getSpending()}% of your income on property expenses.`}
        </div>
        <div className="text-muted-foreground text-sm">
          ** Mortgage takes up {getMortgageRatio()}% of the rental income.
        </div>
      </CardFooter>
    </Card>
  );
};
