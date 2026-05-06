import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import EChart from "../hooks/useEchars";
import type { EChartsOption } from "echarts";

export default function BarChart() {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const charttwoRef = useRef<HTMLDivElement | null>(null);
  const chartthreeRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    chart.setOption({
      title: {
        text: "博客文章分类统计",
      },
      tooltip: { trigger: "axis" },
      xAxis: {
        type: "category",
        data: ["React", "Vue", "Node", "算法", "生活"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "文章数量",
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
    if (!charttwoRef.current) return;

    const chart = echarts.init(charttwoRef.current);

    chart.setOption({
      title: {
        text: "博客文章分类统计",
      },
      tooltip: { trigger: "axis" },
      xAxis: {
        type: "category",
        data: ["React", "Vue", "Node", "算法", "生活"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "文章数量",
          type: "line",
          smooth: true, //折线变平滑曲线
          areaStyle: {}, //表示折线下面有面积填充
          showSymbol: false, //取消折线上的点
          data: [12, 18, 9, 15, 5],
        },
      ],
    });

    return () => {
      chart.dispose();
    };
  }, []);
  useEffect(() => {
    if (!chartthreeRef.current) return;

    const chart = echarts.init(chartthreeRef.current);

    chart.setOption({
      title: {
        text: "技术栈占比",
        left: "center",
      },
      tooltip: { trigger: "item" },
      legend: {
        bottom: 0, //表示图例放到底部
      },

      series: [
        {
          name: "技术栈",
          type: "pie",
          radius: ["20%", "40%"], //控制饼图大小
          data: [
            { name: "React", value: 40 },
            { name: "Vue", value: 35 },
            { name: "Node", value: 15 },
            { name: "其他", value: 10 },
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
        { name: "算法", count: 15, views: 2000 },
        { name: "生活", count: 5, views: 500 },
      ],
    },
    tooltip: {
      trigger: "axis",
      formatter: (params: any) => {
        const data = params[0].value;

        return `
      ${data.name}<br/>
      ${params[0].marker}文章数量：${data.count} 篇<br/>
      ${params[1].marker}访问量：${data.views} 次
    `;
      },
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
        name: "文章数量",
        type: "bar",
        encode: {
          x: "name",
          y: "count",
        },
      },
      {
        name: "访问量",
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
      <EChart option={option}></EChart>
      <div ref={chartRef} style={{ width: "600px", height: "400px" }} />
      <div ref={charttwoRef} style={{ width: "600px", height: "400px" }} />
      <div ref={chartthreeRef} style={{ width: "600px", height: "400px" }} />
    </>
  );
}
