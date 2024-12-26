import { FC } from "react";
import { SearchHistoryDisplayProps } from "./types";

export const SearchHistoryDisplay: FC<SearchHistoryDisplayProps> = ({
  history,
}) => {
  if (!history || history.length === 0) {
    return <p>No search history.</p>;
  }
  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-bold mb-2">Search History</h3>
      <ul>
        {history.map((item) => (
          <li key={item.id}>
            {item.city_name} - {new Date(item.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};
