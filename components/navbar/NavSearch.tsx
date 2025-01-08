"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect } from "react";

function NavSearch() {
  const searchParams = useSearchParams();
  const getSearchParams = searchParams.get("search");
  const { replace } = useRouter();
  const [search, setSearch] = useState(getSearchParams?.toString() || "");

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`/products?${params.toString()}`);
  }, 400);

  useEffect(() => {
    if (!getSearchParams) {
      setSearch("");
    }
  }, [getSearchParams]);

  return (
    <Input
      type="search"
      placeholder="search product..."
      className="max-w-xs dark:bg-muted"
      onChange={(e) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
      }}
      value={search}
    />
  );
}

export default NavSearch;
