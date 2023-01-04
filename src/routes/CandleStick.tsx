import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function CandleStick({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  const exceptData = data ?? [];
  const chartData = exceptData?.map((i) => {
    return {
      x: i.time_close * 1000,
      y: [i.open, i.high, i.low, i.close],
    };
  });

  return (
    <div>
      {isLoading ? (
        "Loading candlestick chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data: chartData,
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              show: true,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              type: "datetime",
              labels: {
                show: false,
              },
              categories: exceptData?.map((price) =>
                new Date(price.time_close).toLocaleDateString()
              ),
            },
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(2)}`,
              },
            },
            plotOptions: {
              candlestick: {
                wick: {
                  useFillColor: true,
                },
                colors: {
                  upward: "#8A0808",
                  downward: "#084B8A",
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default CandleStick;
