"use client";

import { UnitFormData } from "@/lib/actions/unit-actions";
import {
  Card,
  CardContent,
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
import { PieChart, Pie } from "recharts";

type UnitListInfoProps = {
  units: UnitFormData[];
};

type VacancyPieChartProps = {
  vacant: number;
  occupied: number;
};

const VacancyPieChart = ({ vacant, occupied }: VacancyPieChartProps) => {
  const chartData = [
    { category: "Occupied", value: occupied, fill: "hsl(var(--chart-1))" },
    { category: "Vacant", value: vacant, fill: "hsl(var(--chart-2))" },
  ];

  const chartConfig: ChartConfig = {
    value: {
      label: "value",
      color: "hsl(var(--chart-1))",
    },
  };

  const getOccupancyRate = () => {
    return ((occupied / (occupied + vacant)) * 100).toFixed(2);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Occupancy vs Vacancy</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="value" label nameKey="category" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="justify-between">
        <div className="">
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 bg-chart-1" />
            <p>Occupied</p>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 bg-chart-2" />
            <p>Vacant</p>
          </div>
        </div>
        <div>
          <h5>Occupancy Rate:</h5>
          <span
            className={
              Number(getOccupancyRate()) < 50
                ? "text-red-500"
                : "text-green-500"
            }
          >
            {getOccupancyRate()}%
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export const UnitListInfo = ({ units }: UnitListInfoProps) => {
  console.log(units[0]);
  const getVacancy = () => {
    return units.filter((unit) => unit.tenant === null).length;
  };

  const getOccupancy = () => {
    return units.filter((unit) => unit.tenant !== null).length;
  };

  return (
    <section className="mb-5 grid xl:grid-cols-3">
      <VacancyPieChart vacant={getVacancy()} occupied={getOccupancy()} />
    </section>
  );
};
