import EChart from "../hooks/useEchars";
import type {
  EChartsOption,
  TooltipComponentFormatterCallbackParams,
} from "echarts";

type ArticleMetrics = {
  name: string;
  count: number;
  views: number;
};

function isArticleMetrics(value: unknown): value is ArticleMetrics {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.name === "string" &&
    typeof candidate.count === "number" &&
    typeof candidate.views === "number"
  );
}

function formatArticleMetricsTooltip(
  params: TooltipComponentFormatterCallbackParams,
) {
  const tooltipParams = Array.isArray(params) ? params : [params];
  const data = tooltipParams[0]?.value;

  if (!isArticleMetrics(data)) {
    return "";
  }

  return `
      ${data.name}<br/>
      ${tooltipParams[0]?.marker ?? ""}Articles: ${data.count}<br/>
      ${tooltipParams[1]?.marker ?? ""}Views: ${data.views}
    `;
}

export default function BarChart() {
  const option: EChartsOption = {
    color: ["#513223", "#91CC75"],
    dataset: {
      source: [
        { name: "React", count: 12, views: 1200 },
        { name: "Vue", count: 18, views: 1600 },
        { name: "Node", count: 9, views: 900 },
        { name: "Algorithms", count: 15, views: 2000 },
        { name: "Life", count: 5, views: 500 },
      ],
    },
    tooltip: {
      trigger: "axis",
      formatter: formatArticleMetricsTooltip,
    },
    legend: {
      top: 30,
    },
    dataZoom: [
      {
        type: "slider",
        start: 0,
        end: 50,
      },
      {
        type: "inside",
      },
    ],
    xAxis: {
      type: "category",
      axisLabel: {
        rotate: 30,
        interval: 0,
        formatter: (value: string) => {
          return value.length > 8 ? `${value.slice(0, 8)}...` : value;
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "#d1d5db",
        },
      },
    },
    yAxis: [
      {
        type: "value",
        name: "Articles",
        axisLabel: {
          color: "#6b7280",
        },
        splitLine: {
          lineStyle: {
            color: "#e5e7eb",
          },
        },
      },
      {
        type: "value",
        name: "Views",
        axisLabel: {
          color: "#6b7280",
        },
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: "Articles",
        type: "bar",
        yAxisIndex: 0,
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
        },
        encode: {
          x: "name",
          y: "count",
        },
      },
      {
        name: "Views",
        type: "line",
        yAxisIndex: 1,
        smooth: true,
        lineStyle: {
          width: 3,
        },
        areaStyle: {
          opacity: 0.15,
        },
        symbolSize: 8,
        encode: {
          x: "name",
          y: "views",
        },
      },
    ],
  };

  return <EChart option={option} />;
}
