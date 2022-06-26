package paper.se.lab2.repository;

import paper.se.lab2.domain.Comment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends CrudRepository<Comment, Long> {
    Iterable<Comment> findByPaperTitle(String paperTitle);
}
