const stylingForm = document.getElementById("stylingForm");
const formContainer = document.getElementById("formContainer");

stylingForm.addEventListener("change", function (event) {
  const targetRadio = event.target;
  const controlName = targetRadio.value;

  const relatedForms = {
    fontSize:
      '<label>Font Size: </label> <br> <input type="range" name="fontSizeRange" min="10" max="50">',
    textColor:
      '<label>Text Color: <input type="color" name="textColorPicker"></label>',
    bgColor:
      '<label>Background Color: <input type="color" name="bgColorPicker"></label>',
  };

  if (targetRadio.type == "radio" && targetRadio.checked) {
    formContainer.innerHTML = relatedForms[controlName]
  }

});

stylingForm.addEventListener("input", function (event) {
  const targetInput = event.target;

  if (targetInput.type === "range") {
    document.body.style.fontSize = targetInput.value + "px";
  } else if (targetInput.type === "color") {
    const propertyName = targetInput.name.replace("ColorPicker", "");
    document.body.style[propertyName === "text" ? "color" : "backgroundColor"] =
      targetInput.value;
  }
});

stylingForm.addEventListener("reset", function () {
  document.body.style.fontSize = "16px";
  document.body.style.color = "white";
  document.body.style.backgroundColor = "#4871A9";

  const radioButtons = stylingForm.querySelectorAll('input[type="radio"]');
  radioButtons.forEach((radio) => {
    radio.checked = false;
    formContainer.innerHTML = "";
  });
});
