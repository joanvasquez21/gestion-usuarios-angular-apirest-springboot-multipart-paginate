package springboot.backend.apirest.models.dao;
import org.springframework.data.jpa.repository.JpaRepository;
import springboot.backend.apirest.models.entity.Cliente;

public interface IClienteDAO extends JpaRepository<Cliente, Long> {

	
	
}
