"use client";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "./Input";
import qs from "query-string";

const SearchInput = () => {
  const router = useRouter();
  const [value, setVal] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: "/search",
      query,
    });

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <div>
      <Input
        placeholder="What do you want to listen to?"
        value={value}
        onChange={(e) => setVal(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
