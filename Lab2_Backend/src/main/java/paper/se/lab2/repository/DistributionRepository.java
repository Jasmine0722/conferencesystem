package paper.se.lab2.repository;

import paper.se.lab2.domain.Distribution;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DistributionRepository extends CrudRepository<Distribution, Long> {
    Distribution findByUsernameAndConferenceFullname(String username,String conferenceFullname);
    Iterable<Distribution> findByUsername(String username);
    Iterable<Distribution> findByConferenceFullname(String conferenceFullname);
}
