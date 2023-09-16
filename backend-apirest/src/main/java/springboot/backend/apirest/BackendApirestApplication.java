package springboot.backend.apirest;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
public class BackendApirestApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApirestApplication.class, args);
	}

}
