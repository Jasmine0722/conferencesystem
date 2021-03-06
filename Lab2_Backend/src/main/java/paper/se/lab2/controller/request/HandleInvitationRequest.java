package paper.se.lab2.controller.request;

import java.util.ArrayList;

public class HandleInvitationRequest {
    String username;
    String conferenceFullname;
    Boolean agreeOrNot;
    ArrayList<String> topics = new ArrayList<>();

    public ArrayList<String> getTopics() {
        return topics;
    }

    public void setTopics(ArrayList<String> topics) {
        this.topics = topics;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getConferenceFullname() {
        return conferenceFullname;
    }

    public void setConferenceFullname(String conferenceFullname) {
        this.conferenceFullname = conferenceFullname;
    }

    public Boolean getAgreeOrNot() {
        return agreeOrNot;
    }

    public void setAgreeOrNot(Boolean agreeOrNot) {
        this.agreeOrNot = agreeOrNot;
    }
}
