package com.genie.Drive_BE.services;

import com.genie.Drive_BE.entity.FileEntity;

import java.util.List;

public interface FileService {
    void moveFileToTrash(Long fileId);
    List<FileEntity> getTrashedFiles();
}

