package matchTeam.crewcrew.service.amazonS3;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.CopyObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.response.ErrorCode;
import matchTeam.crewcrew.response.exception.CrewException;
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
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Component
public class S3Uploader {
    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    public String bucket;


    public String setDefaultImage(String email,String provider) {
        int random = (int) ((Math.random() * 5 + 1));
        String result = setDefaultImage(email, provider,random);
        return result;

    }

    private String setDefaultImage(String email,String provider, int number) {
        String folder = nameFile(email,provider);


        StringBuilder start = new StringBuilder();
        start.append("default/");
        start.append(Integer.toString(number));
        start.append(".png");
        String source = start.toString();

//                도착경로 만드는 메서드
        StringBuilder sb = new StringBuilder();
        sb.append(folder);
        sb.append("/");
        sb.append(generateName());
        String destination =sb.toString();
        copy(source, destination);

        return amazonS3Client.getUrl(bucket, destination).toString();
    }


    public String addImageWhenSignUp(String email, MultipartFile file, Integer Default, String provider) {
        if (file == null) {
            System.out.println("1 발동");
            if (Default == null || 0 >= Default || Default > 5) {
                System.out.println("2 ");
                throw new CrewException(ErrorCode.S3_FILE_NOT_FOUND);
            } else {
                System.out.println("3잘 넘어온 경우");
//                시작경로 만든 메서드
                StringBuilder start = new StringBuilder();
                start.append("default/");
                start.append(Integer.toString(Default));
                start.append(".png");
                String source = start.toString();

//                도착경로 만드는 메서드
                StringBuilder destination = new StringBuilder();
                destination.append(nameFile(email, provider));
                destination.append("/");
                destination.append(generateName());

                String result = destination.toString();
//                String destination = nameFile(email, provider);
                copy(source, result);
                return amazonS3Client.getUrl(bucket, result).toString();
            }
        } else {
            String filename;
            try {
                String email_url = nameFile(email, provider);
                filename = upload(file, email_url);
            } catch (IOException e) {
                throw new CrewException(ErrorCode.S3_UPLOAD_FAIL);
            }
            return filename;
        }

    }

    public String upload(MultipartFile multipartFile, String dirName) throws IOException {
//        File uploadFile = convert(multipartFile).orElseThrow(()-> new IllegalArgumentException("MultipartFile -> File로 전환이 실패했습니다."));
        File uploadFile = convert(multipartFile);
        return upload(uploadFile, dirName);

    }

    public String upload(File uploadFile, String dirName) {
//        String fileName = dirName + "/" + UUID.randomUUID() + uploadFile.getName();
        String fileName = dirName + "/" + generateName();
//        String fileName = dirName + "/"+ uploadFile.getName();
        String uploadImageUrl = putS3(uploadFile, fileName);
        removeNewFile(uploadFile);
        return uploadImageUrl;
    }

    public String uploadURL(String uploadFile, String dirName) {
//        String fileName = dirName + "/" + UUID.randomUUID() + uploadFile.getName();
        String fileName = dirName + "/" + generateName();
//        String fileName = dirName + "/"+ uploadFile.getName();
        String uploadImageUrl = putS3(uploadFile, fileName);
        return uploadImageUrl;
    }

    public String generateName() {
        return String.valueOf(UUID.randomUUID());
    }

    public void deleteS3(String source) {
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
            throw new CrewException(ErrorCode.S3_UPLOAD_FAIL);
        } catch (IOException e) {
            throw new CrewException(ErrorCode.S3_UPLOAD_FAIL);
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
        } catch (Exception e) {
            throw new CrewException(ErrorCode.S3_UPLOAD_FAIL);
        }
    }

    public String urlConvert(String emailUrl, String imageUrl, User user) {
        try {
            URL url = new URL(imageUrl);
            File file = new File("temp.jpg");
            FileUtils.copyURLToFile(url, file);
            String filename = upload(file, emailUrl);
            return filename;

        } catch (MalformedURLException e) {
            throw new CrewException(ErrorCode.URL_MALFORMED_EXCEPTION);
        } catch (IOException e) {
            throw new CrewException(ErrorCode.S3_UPLOAD_FAIL);
        }

    }
}
