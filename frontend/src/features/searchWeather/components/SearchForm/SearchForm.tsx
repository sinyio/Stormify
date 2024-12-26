import { FC, FormEvent, useState } from "react";
import { useAuth } from "@/features/auth";
import { searchWeather } from "../../model";

interface SearchFormProps {
  onSearch: (data: any) => void;
}

export const SearchForm: FC<SearchFormProps> = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const { token, refreshToken } = useAuth();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const data = await searchWeather(city, token, refreshToken);
      onSearch(data);
      console.log("search weather", data);
    } catch (error) {
      console.error("Error during search", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
        className="border rounded px-2 py-1 mr-2"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
      >
        Search
      </button>
    </form>
  );
};
