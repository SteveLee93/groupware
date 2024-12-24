const API_URL = 'http://localhost:8080/api';

const authApi = {
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        const errorData = await response.json();

        switch (response.status) {
          case 401:
            throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
          case 400:
            throw new Error(errorData.message || '입력값을 확인해주세요.');
          case 500:
            throw new Error('서버 오류가 발생했습니다.');
          default:
            throw new Error('로그인 중 오류가 발생했습니다.');
        }
      }

      const data = await response.json();
      // 토큰 저장
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      return data;
    } catch (error) {
      throw error;
    }
  },

  signup: async (userData) => {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorData = await response.json();

        // HTTP 상태 코드에 따른 에러 처리
        switch (response.status) {
          case 409:
            throw new Error('이미 사용중인 이메일입니다.');
          case 400:
            throw new Error(errorData.message || '입력값을 확인해주세요.');
          case 500:
            throw new Error('서버 오류가 발생했습니다.');
          default:
            throw new Error('회원가입 중 오류가 발생했습니다.');
        }
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/pages/auth/login.html';
  }
};
