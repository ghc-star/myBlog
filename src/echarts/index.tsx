import { useEffect, useRef } from "react";
import * as echarts from "echarts";
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
  const chartRef = useRef<HTMLDivElement | null>(null);
  const lineChartRef = useRef<HTMLDivElement | null>(null);
  const pieChartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    chart.setOption({
      title: {
        text: "Article Categories",
      },
      tooltip: { trigger: "axis" },
      xAxis: {
        type: "category",
        data: ["React", "Vue", "Node", "Algorithms", "Life"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Articles",
          type: "bar",
          data: [12, 18, 9, 15, 5],
        },
      ],
    });

    chart.on("click", (params) => {
      console.log(params);
    });

    return () => {
      chart.dispose();
    };
  }, []);

  useEffect(() => {
    if (!lineChartRef.current) return;

    const chart = echarts.init(lineChartRef.current);

    chart.setOption({
      title: {
        text: "Article Trend",
      },
      tooltip: { trigger: "axis" },
      xAxis: {
        type: "category",
        data: ["React", "Vue", "Node", "Algorithms", "Life"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Articles",
          type: "line",
          smooth: true,
          areaStyle: {},
          showSymbol: false,
          data: [12, 18, 9, 15, 5],
        },
      ],
    });

    return () => {
      chart.dispose();
    };
  }, []);

  useEffect(() => {
    if (!pieChartRef.current) return;

    const chart = echarts.init(pieChartRef.current);

    chart.setOption({
      title: {
        text: "Tech Stack Share",
        left: "center",
      },
      tooltip: { trigger: "item" },
      legend: {
        bottom: 0,
      },
      series: [
        {
          name: "Stack",
          type: "pie",
          radius: ["20%", "40%"],
          data: [
            { name: "React", value: 40 },
            { name: "Vue", value: 35 },
            { name: "Node", value: 15 },
            { name: "Other", value: 10 },
          ],
        },
      ],
    });

    return () => {
      chart.dispose();
    };
  }, []);

  const option: EChartsOption = {
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
    xAxis: {
      type: "category",
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Articles",
        type: "bar",
        encode: {
          x: "name",
          y: "count",
        },
      },
      {
        name: "Views",
        type: "line",
        encode: {
          x: "name",
          y: "views",
        },
      },
    ],
  };

  return (
    <>
      <EChart option={option} />
      <div ref={chartRef} style={{ width: "600px", height: "400px" }} />
      <div ref={lineChartRef} style={{ width: "600px", height: "400px" }} />
      <div ref={pieChartRef} style={{ width: "600px", height: "400px" }} />
    </>
  );
}
