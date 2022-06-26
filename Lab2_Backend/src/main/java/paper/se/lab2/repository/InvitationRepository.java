package paper.se.lab2.repository;

import paper.se.lab2.domain.Invitation;
import org.springframework.data.repository.CrudRepository;

public interface InvitationRepository extends CrudRepository<Invitation, Long> {
    Iterable<Invitation> findByInvitedParty(String invitedParty);
    Iterable<Invitation> findByState(int state);
    Invitation findByInvitedPartyAndConferenceFullname(String invitedParty,String conferenceFullname);
}
