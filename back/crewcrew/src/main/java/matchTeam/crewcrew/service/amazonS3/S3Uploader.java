package matchTeam.crewcrew.service.amazonS3;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.CopyObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.response.exception.auth.MalformedURLImageException;
import matchTeam.crewcrew.response.exception.auth.S3FileNotFoundException;
import matchTeam.crewcrew.response.exception.auth.S3UploadException;
import matchTeam.crewcrew.service.user.UserService;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

@Slf4j
@RequiredArgsConstructor
@Component
public class S3Uploader {
    private final AmazonS3Client amazonS3Client;
    private final UserService userService;

    @Value("${cloud.aws.s3.bucket}")
    public String bucket;


    public String setDefaultImage(String email, Integer number) {
        StringBuilder sb = new StringBuilder();
        sb.append(email);
        sb.append("_local");


        StringBuilder start = new StringBuilder();
        start.append("default/");
        start.append(Integer.toString(number));
        start.append(".png");
        String source = start.toString();

//                도착경로 만드는 메서드
        String destination = sb.toString() + "/profile";
        copy(source, destination);

        return destination;

    }


    public String addImageWhenSignUp(String email, Integer Default,String provider) {
            if (Default == null || 0 >= Default || Default > 5) {
                throw new S3FileNotFoundException();
            }
//                시작경로 만든 메서드
                StringBuilder start = new StringBuilder();
                start.append("default/");
                start.append(Integer.toString(Default));
                start.append(".png");
                String source = start.toString();

//                도착경로 만드는 메서드
                String destination = nameFile(email, provider);
                copy(source, destination);

                return destination;

    }

    public String addImageWhenSignUp(String email, MultipartFile file, Integer Default,String provider) {
        if (file.isEmpty()) {
            if (Default == null || 0 >= Default || Default > 5) {
                throw new S3FileNotFoundException();
            } else {
//                시작경로 만든 메서드
                StringBuilder start = new StringBuilder();
                start.append("default/");
                start.append(Integer.toString(Default));
                start.append(".png");
                String source = start.toString();

//                도착경로 만드는 메서드
                String destination = nameFile(email, provider);
                copy(source, destination);

                return destination;
            }
        }

        String filename;


        try {
            String email_url = nameFile(email, provider);
            filename = upload(file, email_url, "profile");
        } catch (IOException e) {
            throw new S3UploadException();
        }

        return filename;
    }

    public String upload(MultipartFile multipartFile, String dirName, String filename) throws IOException {
//        File uploadFile = convert(multipartFile).orElseThrow(()-> new IllegalArgumentException("MultipartFile -> File로 전환이 실패했습니다."));
        File uploadFile = convert(multipartFile);
        return upload(uploadFile, dirName, filename);

    }

    public String upload(File uploadFile, String dirName, String filename) {
//        String fileName = dirName + "/" + UUID.randomUUID() + uploadFile.getName();
        String fileName = dirName + "/" + filename;
//        String fileName = dirName + "/"+ uploadFile.getName();
        String uploadImageUrl = putS3(uploadFile, fileName);
        removeNewFile(uploadFile);
        return uploadImageUrl;
    }

    public String uploadURL(String uploadFile, String dirName, String filename) {
//        String fileName = dirName + "/" + UUID.randomUUID() + uploadFile.getName();
        String fileName = dirName + "/" + filename;
//        String fileName = dirName + "/"+ uploadFile.getName();
        String uploadImageUrl = putS3(uploadFile, fileName);
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
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    private String putS3(String uploadFile, String fileName) {
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    //    private Optional<File> convert(MultipartFile file) throws IOException {
//        File convertFile = new File(file.getOriginalFilename());
//        if(convertFile.createNewFile()) {
//            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
//                fos.write(file.getBytes());
//            }
//            return Optional.of(convertFile);
//        }
//        return Optional.empty();
//    }
    private File convert(MultipartFile mfile) {
        try {
            File file = new File(mfile.getOriginalFilename());
            file.createNewFile();
            FileOutputStream fos = new FileOutputStream(file);
            fos.write(mfile.getBytes());
            fos.close();
            return file;
        } catch (FileNotFoundException e) {
            throw new S3UploadException();
        } catch (IOException e) {
            throw new S3UploadException();
        }
    }


    public String nameFile(String email, String provider) {
        StringBuilder sb = new StringBuilder();
        String email_url = email.replace("@", "_");
        sb.append(email_url);
        sb.append("_");
        sb.append(provider);
        return sb.toString();
    }

    public void copy(String source, String destination) {
        try {
            CopyObjectRequest copyObjectRequest = new CopyObjectRequest(this.bucket, source, this.bucket, destination);
            this.amazonS3Client.copyObject(copyObjectRequest);
        } catch (S3UploadException s3UploadException) {
            throw new S3UploadException();
        }
    }

    public void urlConvert(String emailUrl, String imageUrl, User user) {
        try {
            URL url = new URL(imageUrl);
            File file = new File("temp.jpg");
            FileUtils.copyURLToFile(url, file);
            String filename = upload(file, emailUrl, "profile");
            userService.setProfileImage(user, filename);

        } catch (MalformedURLException e) {
            throw new MalformedURLImageException();
        } catch (IOException e) {
            throw new S3UploadException();
        }

    }
}
