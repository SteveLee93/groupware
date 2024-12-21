package auth_service;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test") // 테스트 시 application-test.yml 활성화
class AuthServiceApplicationTests {

	@Test
	void contextLoads() {
	}

}
