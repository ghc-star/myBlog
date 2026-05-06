import EChart from "../hooks/useEchars";
import type { EChartsOption } from "echarts";

export default function BarChart() {
  const option: EChartsOption = {
    //设置全局颜色
    color: ["#513223", "#91CC75"],
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
    //可以控制范围
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
        //防止名字过长
        rotate: 30,
        //控制文字间隔
        interval: 0,
        //文字过长就截断
        formatter: (value: string) => {
          return value.length > 2 ? value.slice(0, 2) + "..." : value;
        },
        //不想省略也可以换行
        // formatter: (value: string) => {
        //   return value.length > 2
        //     ? value.slice(0, 2) + "\n" + value.slice(2)
        //     : value;
        // },
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
        name: "文章数量",
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
        name: "访问量",
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
        name: "文章数量",
        type: "bar",
        //双y轴
        yAxisIndex: 0,
        //加圆角 borderRadius: [左上, 右上, 右下, 左下]
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
        },
        encode: {
          x: "name",
          y: "count",
        },
      },
      {
        name: "访问量",
        type: "line",
        yAxisIndex: 1,
        //曲线变曲折
        smooth: true,
        //加粗
        lineStyle: {
          width: 3,
        },
        //折线下加面积
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
  return (
    <>
      <EChart option={option}></EChart>
    </>
  );
}
