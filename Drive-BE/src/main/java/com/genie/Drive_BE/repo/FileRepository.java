package com.genie.Drive_BE.repo;

import com.genie.Drive_BE.entity.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileRepository extends JpaRepository<FileEntity,Long> {
    List<FileEntity> findByDeletedTrue();
    List<FileEntity> findByStarredTrueAndDeletedFalse();
}
