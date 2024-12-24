const validation = {
  isValidEmail: (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  isValidPassword: (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  },

  isValidName: (name) => {
    return name.length >= 2;
  },

  validateSignupForm: (formData) => {
    const errors = {};

    if (!formData.email) {
      errors.email = '이메일을 입력해주세요.';
    } else if (!validation.isValidEmail(formData.email)) {
      errors.email = '올바른 이메일 형식이 아닙니다.';
    }

    if (!formData.password) {
      errors.password = '비밀번호를 입력해주세요.';
    } else if (!validation.isValidPassword(formData.password)) {
      errors.password = '비밀번호는 8자 이상, 문자와 숫자를 포함해야 합니다.';
    }

    if (!formData.name) {
      errors.name = '이름을 입력해주세요.';
    } else if (!validation.isValidName(formData.name)) {
      errors.name = '이름은 2자 이상이어야 합니다.';
    }

    return errors;
  },

  validateLoginForm: (formData) => {
    const errors = {};

    if (!formData.email) {
      errors.email = '이메일을 입력해주세요.';
    } else if (!validation.isValidEmail(formData.email)) {
      errors.email = '올바른 이메일 형식이 아닙니다.';
    }

    if (!formData.password) {
      errors.password = '비밀번호를 입력해주세요.';
    }

    return errors;
  }
};
