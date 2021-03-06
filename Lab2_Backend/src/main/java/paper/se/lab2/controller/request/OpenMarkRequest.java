package paper.se.lab2.controller.request;

public class OpenMarkRequest {
    private String conferenceFullname;
    private Boolean markable;
    private String strategy;//"0" for the simple strategy


    public String getStrategy() {
        return strategy;
    }

    public void setStrategy(String strategy) {
        this.strategy = strategy;
    }

    public String getConferenceFullname() {
        return conferenceFullname;
    }

    public void setConferenceFullname(String conferenceFullname) {
        this.conferenceFullname = conferenceFullname;
    }

    public Boolean getMarkable() {
        return markable;
    }

    public void setMarkable(Boolean markable) {
        this.markable = markable;
    }
}
