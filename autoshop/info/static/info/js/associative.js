const getColorFromString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + (hash*37 - hash);
  }
  const hexColor = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  return '#' + '00000'.substring(0, 6 - hexColor.length) + hexColor;
};


function getValueAndClear(inputElement) {
  const value = inputElement.value;
  inputElement.value = '';
  return value;
}

function validateClass(classValue) {
  const validationResultElement = document.getElementById("validationResult");

  const classRegex = /^(10|11|[1-9])[A-Z]$/;

  if (classRegex.test(classValue)) {
    validationResultElement.textContent = "Valid class input!";
    return true;
  } else {
    validationResultElement.textContent = "Invalid class input. Please enter a valid class (e.g., 5A, 11B).";
    return false;
  }
}

function associativeMain() {
  const studentList = document.getElementById('student-list');
  const firstnameInput = document.getElementById('firstname');
  const lastnameInput = document.getElementById('lastname');
  const studentClassInput = document.getElementById('studentClass');

  const studentMap = new Map();

  const associativeForm = document.forms.namedItem('associative-form');
  associativeForm.onsubmit = (e) => {
    e.preventDefault();

    const firstname = getValueAndClear(firstnameInput);
    const lastname = getValueAndClear(lastnameInput);
    const studentClass = getValueAndClear(studentClassInput);
    if(!validateClass(studentClass)){
      return;
    }

    const studentListItem = document.createElement('li');
    studentListItem.textContent = `${firstname} ${lastname} ${studentClass}`;
    studentList.appendChild(studentListItem);

    const newStudent = { firstname, lastname, studentClass, studentListItem };

    if (studentMap.has(lastname)) {
      const students = studentMap.get(lastname);
      students.push(newStudent);
 
      const randomColor = getColorFromString(lastname);
      students.forEach((student) => {
        student.studentListItem.style.backgroundColor = randomColor;
      });
    } else {
      studentMap.set(lastname, [newStudent]);
    }
  };
}

associativeMain();