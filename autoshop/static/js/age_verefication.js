const birthDatePrompted = localStorage.getItem("birthDatePrompted");

if (!birthDatePrompted) {
  const birthDateInput = prompt(
    "Введите вашу дату рождения в формате YYYY-MM-DD:"
  );

  if (birthDateInput === null) {
    window.location.href = "https://google.com/";
    
  } else {
    const birthDate = new Date(birthDateInput);
    const isAdult = new Date().getFullYear() - birthDate.getFullYear() >= 18;
    console.log(birthDate.getFullYear());
    const age = new Date().getFullYear() - birthDate.getFullYear();
    const daysOfWeek = [
      "Воскресенье",
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
    ];
    const dayOfWeek = daysOfWeek[birthDate.getDay()];

    console.log(`Ваш возраст: ${age} лет`);
    console.log(`День недели вашего рождения: ${dayOfWeek}`);

    if (
      isAdult ||
      confirm(
        `Вы несовершеннолетний. День недели вашего рождения: ${dayOfWeek}. Для использования сайта требуется разрешение родителей. Подтверждаете?`
      )
    ) {
      localStorage.setItem("birthDatePrompted", true);
    } else {
        window.location.href = "https://google.com/";
    }
    //localStorage.setItem("birthDatePrompted", true);
  }
} else {
  
  console.log("Запрос даты рождения уже выполнен." + new Date().getFullYear());
}
