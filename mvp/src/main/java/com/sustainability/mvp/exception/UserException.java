package com.sustainability.mvp.exception;

import lombok.Data;

@Data
public class UserException extends RuntimeException{
    private String msg;
    public UserException(String msg) {
        super(msg);
        this.msg = msg;
    }
}
