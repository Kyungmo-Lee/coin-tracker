import { fetchCoinHistory } from "../api";
import { useQuery } from "react-query";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  text-align: center;
  font-size: 13px;
  colgroup {
    col {
      width: 16%;
    }
  }
  th {
    width: 96px;
    font-weight: 400;
    background: rgba(0, 0, 0, 0.5);
    padding: 10px 0;
    font-size: 14px;
    color: white;
  }
  tr {
    color: ${(props) => props.theme.textColor};
    &:nth-child(2n) {
      background: rgba(0, 0, 0, 0.5);
      td {
        width: 96px;
        color: #fff;
      }
    }
  }
  td {
    padding: 5px 0;
  }
`;

interface IHeader {
  accessor: string;
  Header: string;
}

interface PriceProps {
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

const tableHeader: IHeader[] = [
  {
    accessor: "time_open",
    Header: "Day",
  },
  {
    accessor: "open",
    Header: "Open",
  },
  {
    accessor: "high",
    Header: "High",
  },
  {
    accessor: "low",
    Header: "Low",
  },
  {
    accessor: "close",
    Header: "Close",
  },
];

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcvTable", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading table..."
      ) : (
        <Table>
          <thead>
            <tr>
              {tableHeader.map((header) => (
                <th key={header.accessor}>{header.Header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((price, i) => (
              <tr key={i}>
                <td>{new Date(price.time_open * 1000).toLocaleDateString()}</td>
                <td>{price.open}</td>
                <td>{price.high}</td>
                <td>{price.low}</td>
                <td>{price.close}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Price;
