import React, { useState, useEffect } from "react";
import CategoryList from "./CategoryList";
import FilteredMockupsList from "./FilteredMockupsList";
import * as Helpers from "./helpers";
import "./styles.css";

const App = () => {
  const initialCategory = { slug: "all", title: "Show all" };
  const [categoriesData, setCategoriesData] = useState();
  const [mockupsData, setMockupsData] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory.slug
  );
  const [filteredMockupsData, setFilteredMockupsData] = useState([]);

  const initCategories = () => {
    fetch(
      "https://5lt31zvq40.execute-api.us-east-1.amazonaws.com/dev/categories"
    )
      .then((result) => result.json())
      .then((data) => setCategoriesData(Helpers.flatten([], data)));
  };

  const initMockups = () => {
    fetch("https://5lt31zvq40.execute-api.us-east-1.amazonaws.com/dev/mockups")
      .then((result) => result.json())
      .then((data) => setMockupsData(data));
  };

  useEffect(() => {
    initCategories();
    initMockups();
  }, []);

  useEffect(() => {
    if (mockupsData.length > 0 && categoriesData) {
      setActiveCategories(
        Helpers.getFilteredUniqueCategoriesWithSlugAndTitle(
          mockupsData,
          categoriesData,
          initialCategory
        )
      );
      setFilteredMockupsData(mockupsData);
    }
  }, [mockupsData, categoriesData]);

  useEffect(() => {
    setFilteredMockupsData(() =>
      selectedCategory === initialCategory.slug
        ? mockupsData
        : mockupsData.filter((v) =>
          v.category.find((o) => o === selectedCategory)
        )
    );
  }, [selectedCategory]);

  return (
    <div>
      <CategoryList
        activeCategories={activeCategories}
        onClick={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <FilteredMockupsList data={filteredMockupsData} />
    </div>
  );
};

export default App;
