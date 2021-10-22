const FilteredMockupsList = ({ data }) => {
  return (
    <div className="mockups-list">
      {data.map((item) => (
        <div className="mockup-item" key={item.id}>
          <span>{item.title}</span>
          <img src={item.thumb} />
        </div>
      ))}
    </div>
  );
};

export default FilteredMockupsList;
