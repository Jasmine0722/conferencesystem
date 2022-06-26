package paper.se.lab2.repository;

import paper.se.lab2.domain.Paper;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PaperRepository extends CrudRepository<Paper, Long> {
    Paper findByid(Long id);
    Iterable<Paper> findByUsernameAndConferenceFullname(String username,String conferenceFullname);
    Iterable<Paper> findByConferenceFullname(String conferenceFullname);
    Paper findByConferenceFullnameAndTitle(String conferenceFullname,String title);
    Iterable<Paper> findByUsername(String username);
}
