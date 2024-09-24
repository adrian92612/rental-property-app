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
import {
  PieChart,
  Pie,
  BarChart,
  CartesianGrid,
  XAxis,
  Legend,
  Bar,
  YAxis,
  LabelList,
} from "recharts";

type UnitListInfoProps = {
  units: UnitFormData[];
};

type VacancyPieChartProps = {
  vacant: number;
  occupied: number;
};

type GroupedUnits = {
  [key: string]: {
    propertyName: string;
    units: UnitFormData[];
  };
};

type UnitsPerPropertyBarChartProps = {
  groupedUnits: GroupedUnits;
};

const UnitsPerPropertyBarChart = ({
  groupedUnits,
}: UnitsPerPropertyBarChartProps) => {
  console.log(groupedUnits);
  const chartData = Object.entries(groupedUnits).map(([propertyId, group]) => ({
    propertyName: group.propertyName,
    units: group.units.length,
    occupied: group.units.filter((unit) => unit.tenant !== null).length,
  }));

  const topProperties = Object.entries(groupedUnits)
    .sort(([, a], [, b]) => b.units.length - a.units.length)
    .slice(0, 3);

  const chartConfig: ChartConfig = {
    units: {
      label: "Units",
      color: "hsl(var(--chart-3))",
    },
    occupied: {
      label: "Occupied",
      color: "hsl(var(--chart-4))",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Units per Property</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="propertyName"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar
              dataKey="occupied"
              stackId="a"
              fill="var(--color-occupied)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="units"
              stackId="a"
              fill="var(--color-units)"
              radius={[4, 4, 0, 0]}
            >
              <LabelList
                dataKey="units"
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
            <Legend />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="text-[12px]">
          <h5 className="font-bold">Properties with most units</h5>
          <ul>
            {topProperties.length &&
              topProperties.map(([id, prop], i) => (
                <li key={i}>
                  {prop.propertyName}: {prop.units.length}
                </li>
              ))}
          </ul>
        </div>
      </CardFooter>
    </Card>
  );
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
      <CardContent className="">
        <ChartContainer config={chartConfig}>
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="value" label nameKey="category" />
            <Legend />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="gap-2 text-sm">
        Occupancy Rate:
        <span
          className={
            Number(getOccupancyRate()) < 50 ? "text-red-500" : "text-green-500"
          }
        >
          {getOccupancyRate()}%
        </span>
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

  const groupedByPropertyId: GroupedUnits = units.reduce((acc, unit) => {
    const propertyId = unit.propertyId;

    if (!acc[propertyId]) {
      acc[propertyId] = {
        propertyName: unit.property.name,
        units: [],
      };
    }

    acc[propertyId].units.push(unit);
    return acc;
  }, {} as GroupedUnits);

  return (
    <section className="mb-8 grid lg:grid-cols-2 gap-5 justify-items-stretch">
      <VacancyPieChart vacant={getVacancy()} occupied={getOccupancy()} />
      <UnitsPerPropertyBarChart groupedUnits={groupedByPropertyId} />
    </section>
  );
};
