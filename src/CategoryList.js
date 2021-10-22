const CategoryList = ({ activeCategories, onClick, selectedCategory }) => {
  return (
    <div className="category-list">
      {activeCategories.map((category) => (
        <div key={category.slug}>
          <a
            href="#"
            onClick={() => onClick(category.slug)}
            className={`${selectedCategory === category.slug ? "active" : ""}`}
          >
            {category.title}
          </a>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
