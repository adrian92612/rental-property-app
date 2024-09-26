"use client";

import { Tenant } from "@prisma/client";
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
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { format, subMonths, isWithinInterval, endOfMonth } from "date-fns";

// Helper function to get last 12 months
const getLast6Months = () => {
  const months = [];
  const currentDate = new Date();
  for (let i = 0; i < 6; i++) {
    const monthDate = subMonths(currentDate, i);
    months.unshift(format(monthDate, "MMM yyyy"));
  }
  return months;
};

// Generate tenant growth data for the past 12 months
const generateTenantGrowthData = (tenants: Tenant[]) => {
  const months = getLast6Months();

  // Initialize tenant count for each month
  const tenantGrowthData = months.map((month) => ({
    month,
    tenants: 0,
  }));

  // Iterate over tenants and count those active in each month
  tenants.forEach((tenant) => {
    // Only count tenants with a valid unitId
    if (tenant.unitId !== null) {
      const leaseStart = new Date(tenant.leaseStart);
      const leaseEnd = new Date(tenant.leaseEnd);

      tenantGrowthData.forEach((data) => {
        const [month, year] = data.month.split(" ");
        const currentMonth = new Date(`${month} 1, ${year}`);
        const monthEnd = endOfMonth(currentMonth);

        // Check if tenant lease is active within the current month using date-fns
        if (
          isWithinInterval(currentMonth, {
            start: leaseStart,
            end: leaseEnd,
          }) ||
          isWithinInterval(monthEnd, { start: leaseStart, end: leaseEnd })
        ) {
          data.tenants += 1;
        }
      });
    }
  });

  return tenantGrowthData;
};

type TenantListInfoProps = {
  tenants: Tenant[];
};

const TenantTermDistribution = ({ tenants }: TenantListInfoProps) => {
  const distribution = [
    { label: "1-12", minTerm: 1, maxTerm: 12, tenants: 0 },
    { label: "13-24", minTerm: 13, maxTerm: 24, tenants: 0 },
    { label: "25-36", minTerm: 25, maxTerm: 36, tenants: 0 },
    { label: "37-48", minTerm: 37, maxTerm: 48, tenants: 0 },
    { label: "49-60", minTerm: 49, maxTerm: 60, tenants: 0 },
  ];

  // Update distribution counts based on tenant terms
  tenants.forEach((tenant) => {
    for (let i = 0; i < distribution.length; i++) {
      if (
        tenant.termInMonths >= distribution[i].minTerm &&
        tenant.termInMonths <= distribution[i].maxTerm
      ) {
        distribution[i].tenants++;
        break; // Stop once the tenant is added to the correct range
      }
    }
  });

  const chartConfig: ChartConfig = {
    term: {
      label: "Terms in months",
      color: "hsl(var(--chart-1))",
    },
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Term Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={distribution} // Use the updated distribution data
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            barSize={30}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              label={{
                value: "Term (months)",
                position: "insideBottom",
                offset: -10,
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="tenants" fill="var(--color-term)" radius={8}>
              <LabelList dataKey="tenants" position="top" />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

const TenantGrowthLineChart = ({ tenants }: TenantListInfoProps) => {
  const chartData = generateTenantGrowthData(tenants);
  console.log(chartData);
  // Get the last two months for comparison
  const currentMonthData = chartData[chartData.length - 1].tenants;
  const previousMonthData = chartData[chartData.length - 2].tenants;

  // Calculate the difference and percentage change
  const tenantDifference = currentMonthData - previousMonthData;
  const hasIncreased = tenantDifference > 0;

  // Calculate percentage change
  const percentChange =
    previousMonthData > 0
      ? ((tenantDifference / previousMonthData) * 100).toFixed(2)
      : NaN; // Handle cases where the previous month count is 0

  const diffText =
    tenantDifference > 0
      ? `increased by ${tenantDifference}`
      : tenantDifference < 0
      ? `decreased by ${tenantDifference}`
      : `remained unchanged`;

  const chartConfig: ChartConfig = {
    tenants: {
      label: "Tenants",
      color: "hsl(var(--chart-1))",
    },
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tenant Growth</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 30,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Line
              dataKey="tenants"
              type="monotone"
              stroke="var(--color-tenants)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-tenants)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground">
          Tenant has {diffText}{" "}
          {!Number.isNaN(percentChange) ? `(${percentChange}%)` : ""} from last
          month
        </div>
      </CardFooter>
    </Card>
  );
};

export const TenantListInfo = ({ tenants }: TenantListInfoProps) => {
  return (
    <section className="mb-8 grid lg:grid-cols-2 gap-5 justify-items-stretch">
      <TenantGrowthLineChart tenants={tenants} />
      <TenantTermDistribution tenants={tenants} />
    </section>
  );
};
