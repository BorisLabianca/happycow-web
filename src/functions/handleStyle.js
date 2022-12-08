const handleStyle = (preference) => {
  if (preference === "Vegan") {
    return {
      backgroundColor: "#22820E",
      borderColor: "#22820E",
      borderStle: "solid",
      borderWidth: "1px",
    };
  } else if (preference === "Vegetarian") {
    return {
      backgroundColor: "#842091",
      borderColor: "#842091",
      borderStle: "solid",
      borderWidth: "1px",
    };
  } else if (preference === "Raw") {
    return {
      backgroundColor: "#78AA06",
      borderColor: "#78AA06",
      borderStle: "solid",
      borderWidth: "1px",
    };
  } else if (preference === "Mostly Veg") {
    return {
      backgroundColor: "#9C722A",
      borderColor: "#9C722A",
      borderStle: "solid",
      borderWidth: "1px",
    };
  } else if (preference === "Non Veg") {
    return {
      backgroundColor: "#3775C5",
      borderColor: "#3775C5",
      borderStle: "solid",
      borderWidth: "1px",
    };
  } else if (preference === "Herbivore") {
    return {
      backgroundColor: "#24AEA0",
      borderColor: "#24AEA0",
      borderStle: "solid",
      borderWidth: "1px",
    };
  } else if (preference === "Fruitarian") {
    return {
      backgroundColor: "#CD4400",
      borderColor: "#CD4400",
      borderStle: "solid",
      borderWidth: "1px",
    };
  }
};

export default handleStyle;
