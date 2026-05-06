import { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function BarChart() {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    chart.setOption({
      title: {
        text: "博客文章分类统计",
      },
      tooltip: {
        trigger: "axis",
      },
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

    return () => {
      chart.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: "600px", height: "400px" }} />;
}
