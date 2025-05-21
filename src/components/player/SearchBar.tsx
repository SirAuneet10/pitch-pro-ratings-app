
import React from "react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <Input
        placeholder="Search players by name or email..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="max-w-md"
      />
    </div>
  );
};

export default SearchBar;
