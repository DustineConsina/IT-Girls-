import { FC } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
}

const SearchBar: FC<SearchBarProps> = ({
  placeholder = "Search products...",
  value,
  onChange,
  onSubmit,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && onSubmit) {
      onSubmit();
    }
  };

  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 transition"
      />
    </div>
  );
};

export default SearchBar;
