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
import { PropertiesIncludeAll } from "@/lib/actions/property-actions";

type IncomeExpenseChartProps = {
  rentalIncome: number;
  monthlyExpense: number;
  mortgage: number;
};

type PropertiesInfoProps = {
  properties: PropertiesIncludeAll[];
};

type PropertiesValueCardProps = {
  topProperties: PropertiesIncludeAll[];
  totalValue: number;
};

const PropertiesValueCard = ({
  topProperties,
  totalValue,
}: PropertiesValueCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Properties Value</CardTitle>
        <CardDescription>
          Showing the total value of all the properties
        </CardDescription>
      </CardHeader>
      <CardContent className="grid place-items-center">
        <div>
          <h2 className="text-2xl text-center">Total Value:</h2>
          <p className="text-green-500 text-2xl sm:text-5xl">
            ${totalValue.toFixed(2)}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <div>
          <h2 className="font-bold text-xl">Top 3 properties:</h2>
          <ul>
            {topProperties.map((prop) => (
              <li key={prop.id} className="text-muted-foreground text-sm">
                <p>
                  -{" "}
                  {prop.purchasePrice > 0
                    ? `${prop.name} $${prop.purchasePrice}`
                    : ""}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </CardFooter>
    </Card>
  );
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
      label: "Value",
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
        break;
      case "incomeCover":
        res = ((rentalIncome / (monthlyExpense + mortgage)) * 100).toFixed(2);
        break;
      case "spending":
        res = ((monthlyExpense / rentalIncome) * 100).toFixed(2);
        break;
      case "mortgage":
        res = ((mortgage / rentalIncome) * 100).toFixed(2);
        break;
    }

    if (res === "Infinity" || res === "-Infinity" || res === "NaN") {
      return "N/A";
    }

    return res;
  };

  const incomeCN =
    Number(calculate("cashflow")) > 0
      ? "text-green-500"
      : Number(calculate("cashflow")) < 0
      ? "text-red-500"
      : "";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Income Vs Expense</CardTitle>
        <CardDescription>
          This chart compares your monthly rental income to your mortgage and
          other property expenses.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData} margin={{ top: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={5}
              axisLine={false}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="value" radius={8}>
              <LabelList
                position="top"
                offset={8}
                className="fill-foreground"
                dataKey="value"
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start pb-6">
        <div className="font-bold flex items-center gap-2">
          <h2 className="text-xl font-bold">Monthly Cashflow of </h2>
          <span className={incomeCN}>{calculate("cashflow")}</span>
        </div>
        <div className="text-muted-foreground text-sm">
          - Rental income covers {calculate("incomeCover")}% of your expenses.
        </div>
        <div className="text-muted-foreground text-sm">
          - You are spending {calculate("spending")}% of your income on property
          expenses.
        </div>
        <div className="text-muted-foreground text-sm">
          - Mortgage takes up {calculate("mortgage")}% of the rental income.
        </div>
      </CardFooter>
    </Card>
  );
};

export const PropertiesInfo = ({ properties }: PropertiesInfoProps) => {
  const rentalIncome = properties
    .flatMap((prop) => prop.units.filter((unit) => unit.tenant !== null))
    .reduce((total, unit) => total + unit.rentAmount, 0);

  const monthlyExpense = properties.reduce(
    (total, prop) => total + prop.monthlyExpense,
    0
  );

  const mortgage = properties.reduce(
    (total, prop) => total + prop.mortgagePayment,
    0
  );

  const topProperties = properties
    .sort((a, b) =>
      a.purchasePrice < b.purchasePrice
        ? 1
        : a.purchasePrice > b.purchasePrice
        ? -1
        : 0
    )
    .slice(0, 3);

  const totalValue = properties.reduce(
    (total, prop) => total + prop.purchasePrice,
    0
  );

  return (
    <section className="mb-8 grid lg:grid-cols-2 gap-5 justify-items-stretch">
      <IncomeExpenseChart
        rentalIncome={rentalIncome}
        monthlyExpense={monthlyExpense}
        mortgage={mortgage}
      />
      <PropertiesValueCard
        topProperties={topProperties}
        totalValue={totalValue}
      />
    </section>
  );
};
