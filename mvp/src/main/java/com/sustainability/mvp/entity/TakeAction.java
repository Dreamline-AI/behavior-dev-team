package com.sustainability.mvp.entity;

import java.util.List;
import java.util.Map;

public class TakeAction {

    private String id;
    private String userId;
    private Map<String, Object> checkedItems; // Adjusted to Map<String, Object>
    private List<String> photos;
    private String timestamp;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public Map<String, Object> getCheckedItems() { return checkedItems; } // Adjusted getter
    public void setCheckedItems(Map<String, Object> checkedItems) { this.checkedItems = checkedItems; } // Adjusted setter

    public List<String> getPhotos() { return photos; }
    public void setPhotos(List<String> photos) { this.photos = photos; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
}
