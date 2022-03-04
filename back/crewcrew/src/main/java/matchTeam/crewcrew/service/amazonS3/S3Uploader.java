package matchTeam.crewcrew.service.amazonS3;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Component
public class S3Uploader {
    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    public String bucket;

    public String upload(MultipartFile multipartFile, String dirName) throws IOException{
        File uploadFile = convert(multipartFile).orElseThrow(()-> new IllegalArgumentException("MultipartFile -> File로 전환이 실패했습니다."));
        return upload(uploadFile, dirName);

    }

    private String upload(File uploadFile, String dirName){
//        String fileName = dirName + "/" + UUID.randomUUID() + uploadFile.getName();
        String fileName = dirName + "/"+ uploadFile.getName();
        String uploadImageUrl = putS3(uploadFile,fileName);
        removeNewFile(uploadFile);
        return uploadImageUrl;
    }
    private void deleteS3(String source) {
        amazonS3Client.deleteObject(bucket, source);
    }

    private void removeNewFile(File targetFile) {       //로컬에서 삭제하기
        if (targetFile.delete()) {
            log.info("파일 삭제 성공");
            return;
        }
        log.info("파일 삭제 실패");
    }

    private String putS3(File uploadFile, String fileName) {
        amazonS3Client.putObject(new PutObjectRequest(bucket,fileName,uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));
        return amazonS3Client.getUrl(bucket,fileName).toString();
    }

    private Optional<File> convert(MultipartFile file) throws IOException {
        File convertFile = new File(file.getOriginalFilename());
        if(convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }
        return Optional.empty();
    }

}
