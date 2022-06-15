package matchTeam.crewcrew.controller.api.v1;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.response.ResponseHandler;
import matchTeam.crewcrew.service.amazonS3.S3Uploader;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
public class S3Controller {
    private final S3Uploader s3Uploader;

    @PostMapping("/s3/upload")
    public ResponseEntity<Object> uploadImage(MultipartFile multipartFile, String dirname) {
        String filename="";
        try {
           filename =s3Uploader.upload(multipartFile, dirname);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ResponseHandler.generateResponse("이미지 등록 성공", HttpStatus.OK, filename);

    }
//    @PostMapping("/s3/upload")
//    public ResponseEntity<Object> uploadImage(MultipartFile multipartFile, String email) {
//        String filename="";
//
//            StringBuilder sb = new StringBuilder();
//            sb.append(email);
//            sb.append("_local");
//
////        uploadProfileImage(File uploadFile, String dirName,String email,String provider)
//
//            try {
//               filename =s3Uploader.upload(multipartFile,sb.toString(),"profile");
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//        return ResponseHandler.generateResponse("이미지 등록 성공", HttpStatus.OK, filename);

//    }
}