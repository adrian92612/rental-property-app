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

  const calculate = (
    data: "cashflow" | "incomeCover" | "spending" | "mortgage"
  ) => {
    let res;
    switch (data) {
      case "cashflow":
        res = (rentalIncome - (monthlyExpense + mortgage)).toFixed(2);
      case "incomeCover":
        res = ((rentalIncome / (monthlyExpense + mortgage)) * 100).toFixed(2);
      case "spending":
        res = ((monthlyExpense / rentalIncome) * 100).toFixed(2);
      default:
        res = ((mortgage / rentalIncome) * 100).toFixed(2);
    }

    if (res === "Infinity" || res === "-Infinity" || res === "NaN") {
      return "N/A";
    }
    return res;
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
          Monthly cashflow of {calculate("cashflow")}
        </div>
        <div className="text-muted-foreground text-sm">
          ** Rental income covers {calculate("incomeCover")}% of your expenses.
        </div>
        <div className="text-muted-foreground text-sm">
          ** You are spending {calculate("spending")}% of your income on
          property expenses.
        </div>
        <div className="text-muted-foreground text-sm">
          ** Mortgage takes up {calculate("mortgage")}% of the rental income.
        </div>
      </CardFooter>
    </Card>
  );
};
