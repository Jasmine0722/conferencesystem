package paper.se.lab2.repository;

import paper.se.lab2.domain.Conference;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConferenceRepository extends CrudRepository<Conference, Long> {
   Conference findByFullName(String fullName);
   Iterable<Conference> findByChair(String chair);
   Iterable<Conference> findByState(int state);
}
