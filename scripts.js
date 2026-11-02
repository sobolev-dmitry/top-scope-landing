document.addEventListener("DOMContentLoaded", () => {
  // Плавный скролл по кнопкам с data-scroll-to
  const scrollButtons = document.querySelectorAll("[data-scroll-to]");
  scrollButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-scroll-to");
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Инициализация слайдера отзывов (Swiper)
  const swiper = new Swiper(".my-reviews-slider", {
    slidesPerView: "auto",
    spaceBetween: 20,
    loop: false,

    breakpoints: {
      640: { slidesPerView: 1, spaceBetween: 16 },
      768: { slidesPerView: "auto", spaceBetween: 18 },
      1024: { slidesPerView: "auto", spaceBetween: 20 },
    },
  });

  // Валидация формы
  const form = document.querySelector(".trial-right");
  if (!form) return;

  const inputs = form.querySelectorAll(".form-input:not(.optional)");
  const checkboxInput = form.querySelector(".custom-checkbox-input");

  function getGroup(input) {
    return input.closest(".form-group");
  }

  // Проверяет формат ТОЛЬКО при потере фокуса или при отправке
  function validateFieldStrict(input) {
    const group = getGroup(input);
    const value = input.value.trim();

    // Если пусто — сразу ошибка
    if (!value) {
      group.classList.add("has-error");
      return false;
    }

    // Проверка формата только для спец. типов
    switch (input.type) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          group.classList.add("has-error");
          return false;
        }
        break;

      case "tel":
        const digitsOnly = value.replace(/\D/g, "");
        if (digitsOnly.length < 10) {
          group.classList.add("has-error");
          return false;
        }
        break;

      case "date":
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(value)) {
          group.classList.add("has-error");
          return false;
        }
        break;
    }

    group.classList.remove("has-error");
    return true;
  }

  // Лёгкая проверка: если не пусто — убираем ошибку (чтобы не мешала при вводе)
  function clearErrorOnInput(input) {
    const group = getGroup(input);
    if (input.value.trim() !== "") {
      group.classList.remove("has-error");
    }
  }

  function validateCheckbox() {
    if (!checkboxInput) return true;

    const wrapper = checkboxInput.closest(".custom-checkbox-wrapper");
    const parentGroup = wrapper.parentElement;

    if (!checkboxInput.checked) {
      parentGroup.classList.add("has-error");
      return false;
    } else {
      parentGroup.classList.remove("has-error");
      return true;
    }
  }

  // При каждом нажатии просто убираем ошибку, если что-то ввели
  inputs.forEach((input) => {
    input.addEventListener("input", () => clearErrorOnInput(input));
  });

  // Строгую проверку делаем при потере фокуса
  inputs.forEach((input) => {
    input.addEventListener("blur", () => validateFieldStrict(input));
  });

  if (checkboxInput) {
    checkboxInput.addEventListener("change", () => validateCheckbox());
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    // При отправке принудительно запускаем строгую проверку всех полей
    inputs.forEach((input) => {
      if (!validateFieldStrict(input)) {
        isValid = false;
      }
    });

    if (checkboxInput && !validateCheckbox()) {
      isValid = false;
    }

    if (isValid) {
      alert("Форма отправлена! Спасибо)");
      form.reset();

      inputs.forEach((input) => {
        const group = input.closest(".form-group");
        group.classList.remove("has-error");
      });
      validateCheckbox();
    }
  });
});