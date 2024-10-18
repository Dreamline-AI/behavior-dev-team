package com.sustainability.mvp.entity;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class Incentive {
    // New fields based on Firebase data
    public String id;
    public String heading;
    public String image;
    public String title;
    public String apply_content;
    public String unlock_content;

    public List<ContentSection> content;

    // Getters and setters for new fields
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getHeading() { return heading; }
    public void setHeading(String heading) { this.heading = heading; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getApply_content() { return apply_content; }
    public void setApply_content(String apply_content) { this.apply_content = apply_content; }

    public String getUnlock_content() { return unlock_content; }
    public void setUnlock_content(String unlock_content) { this.unlock_content = unlock_content; }

    public List<ContentSection> getContent() { return content; }
    public void setContent(List<ContentSection> content) { this.content = content; }

    // Inner class to represent content sections
    public static class ContentSection {
        public String subtitle;
        public List<String> description;

        public String getSubtitle() { return subtitle; }
        public void setSubtitle(String subtitle) { this.subtitle = subtitle; }

        public List<String> getDescription() { return description; }
        public void setDescription(List<String> description) { this.description = description; }
    }
}

