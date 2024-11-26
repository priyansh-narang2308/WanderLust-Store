import React, { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";

interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}

const Sidebar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMaxPrice,
    maxPrice,
    setMinPrice,
    setKeyword,
  } = useFilter();

  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "Fashion",
    "trend",
    "shoes",
    "shirt",
  ]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data: FetchResponse = await response.json();
        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error Fetching Product", error);
      }
    };

    fetchCategories();
  }, []);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };

  const handleRadioChangeCategories = (category: string) => {
    setSelectedCategory(category);
  };

  const handleKeyWordClick = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword("");
  };

  return (
    <div className="w-64 p-5 h-screen border-r-2 border-gray-300">
      <h1 className="text-2xl font-bold mb-10 mt-4">Wanderlust Bazaar</h1>
      <section>
        <input
          type="text"
          className="border-2 rounded px-2 py-3 w-full sm:mb-0"
          placeholder="Search Product"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex justify-center mt-3 items-center">
          <input
            type="text"
            className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            placeholder="Min"
            value={minPrice ?? ""}
            onChange={handleMinPriceChange}
          />
          <input
            type="text"
            className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            placeholder="Max"
            value={maxPrice ?? ""}
            onChange={handleMaxPriceChange}
          />
        </div>

        {/* Categories */}

        <div className="mb-5">
          <h2 className="text-xl font-semibold mb-3">Categories</h2>
        </div>

        <section>
          {categories.map((category, index) => (
            <label key={index} className="block mb-2">
              <input
                type="radio"
                name="category"
                value={category}
                onChange={() => handleRadioChangeCategories(category)}
                className="mr-2 w-[16px] h-[16px]"
                checked={selectedCategory == category}
              />
              {category.toUpperCase()}
            </label>
          ))}
        </section>

        {/* Keywords */}

        <div className="mb-5 mt-5">
          <h2 className="text-xl font-semibold mb-3">KeyWords</h2>
          <div>
            {keywords.map((keyword, index) => (
              <button
                key={index}
                onClick={() => handleKeyWordClick(keyword)}
                className="block mb-2 px-4 py-2 w-full text-full border rounded hover:bg-gray-200"
              >
                {keyword.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleResetFilters}
          className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-5  hover:bg-violet-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-violet-300 ..."
        >
          Reset Filters
        </button>
      </section>
    </div>
  );
};
export default Sidebar;
