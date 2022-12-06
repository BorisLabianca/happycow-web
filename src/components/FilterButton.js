const FilterButton = ({
  cat,
  type,
  backgroundColor,
  icon,
  categoryButtons,
  setCategoryButtons,
  index,
  params,
  setParams,
}) => {
  const handleOnclick = () => {
    const newCategoryButtons = [...categoryButtons];
    newCategoryButtons.splice(index, 1, !newCategoryButtons[index]);
    setCategoryButtons(newCategoryButtons);
    const newParams = { ...params };
    const indexOfCat = newParams.category.indexOf(cat);
    // console.log(indexOfCat);
    if (indexOfCat !== -1) {
      newParams.category.splice(indexOfCat, 1);
      setParams(newParams);
    } else {
      newParams.category.push(cat);
      setParams(newParams);
    }
  };
  return (
    <div
      className={
        categoryButtons[index] === true
          ? "filter-button-checked"
          : "filter-button-unchecked"
      }
      style={
        categoryButtons[index] === true
          ? {
              backgroundColor: backgroundColor,
              borderColor: backgroundColor,
              borderWidth: "1px",
              borderStyle: "solid",
            }
          : { backgroundColor: "white" }
      }
      onClick={handleOnclick}
    >
      <img src={icon} alt="Shop type" className="tag-icon" />
      <span>{type}</span>
    </div>
  );
};

export default FilterButton;
