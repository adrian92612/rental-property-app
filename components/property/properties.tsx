"use client";

import { PropertyIncludeUnits } from "@/lib/actions/property-actions";
import { PropertiesCard } from "./properties-card";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../ui/select";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type PropertiesProp = {
  properties: PropertyIncludeUnits[];
};

const categories = [
  { value: "name", label: "Name" },
  { value: "owner", label: "Owner" },
  { value: "unit", label: "Units" },
];

export const Properties = ({ properties }: PropertiesProp) => {
  const [sortCategory, setSortCategory] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedProperties, setSortedProperties] = useState(properties);

  const handleSort = (value: string) => setSortCategory(value);

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
  }, 500);

  useEffect(() => {
    let filteredProperties = properties;

    if (searchQuery) {
      filteredProperties = properties.filter((property) =>
        property.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const sorted = [...filteredProperties].sort((a, b) => {
      if (sortCategory === "name") {
        return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
      } else if (sortCategory === "owner") {
        return a.owner.localeCompare(b.owner, undefined, {
          sensitivity: "base",
        });
      } else if (sortCategory === "unit") {
        return a.units.length - b.units.length;
      }
      return 0;
    });

    setSortedProperties(sorted);
  }, [properties, sortCategory, searchQuery]);

  return (
    <section className="space-y-5 mt-5">
      <div className="flex items-center justify-end gap-2">
        <Select onValueChange={handleSort} defaultValue="name">
          <SelectTrigger className="w-40 border">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                Sorted By {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          placeholder="Search properties..."
          defaultValue={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-52"
        />
      </div>
      {sortedProperties && sortedProperties.length > 0 ? (
        <ul className="grid justify-items-stretch gap-5 lg:grid-cols-2 xl:grid-cols-3 pb-5">
          {sortedProperties.map((property) => (
            <li key={property.id}>
              <PropertiesCard property={property} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No properties found.</p>
      )}
    </section>
  );
};
