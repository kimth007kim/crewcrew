package matchTeam.crewcrew.controller.api.v1.profile;

public class ProfileController {
    //    @PostMapping("/user/changeProfileImage")
//    @ApiOperation(value ="프로필 이미지 변경" ,notes="이미지를 입력받아서 s3에 등록하고 db에 그 url을 저장합니다.")
//    public ResponseEntity<Object> changeProfileImage( @RequestParam MultipartFile files,String email,String provider) throws IOException {
//        User user=userService.findByEmailAndProvider(email,"local").orElseThrow(CUserNotFoundException::new);
//
//        StringBuilder sb = new StringBuilder();
//        sb.append(email);
//        sb.append("_local");
//
//            String filename =s3Uploader.upload(files,sb.toString(),"profile");
//            userService.setProfileImage(user,filename);
//
//
//        return ResponseHandler.generateResponse("성공", HttpStatus.OK,filename);
//    }
//
//
//    @PostMapping("/user/changeDefaultImage")
//    @ApiOperation(value ="프로필 이미지 변경" ,notes="기본이미지로 변경하기")
//    public ResponseEntity<Object> changeDefaultImage( Integer number, String email) throws IOException {
//        User user=userService.findByEmailAndProvider(email,"local").orElseThrow(CUserNotFoundException::new);
//
//        String filename =s3Uploader.setDefaultImage(email,number);
//
//        return ResponseHandler.generateResponse("성공", HttpStatus.OK,filename);
//    }
//    @PostMapping("/user/password/change")
//    public ResponseEntity<Object> changePwd(@PathVariable String email, String previous, String change_password) {
//        userService.findByEmailAndProvider(email, "local").orElseThrow(LoginFailedByEmailNotExistException::new);
//        User user = userService.findByEmailAndProvider(email, "local").get();
//        userService.passwordCheck(user, previous);
//        userService.changePassword(user, change_password);
//        return ResponseHandler.generateResponse("성공", HttpStatus.OK, change_password);
//    }
//    @PostMapping("/user/addCategory")
//    public ResponseEntity<Object> addCategory(@RequestBody LikedCategoryDto likedCategoryDto) {
//        System.out.println(likedCategoryDto.getEmail()+"      -     "+likedCategoryDto.getProvider());
//        User user= userService.findByEmailAndProvider(likedCategoryDto.getEmail(),likedCategoryDto.getProvider()).orElseThrow(LoginFailedByEmailNotExistException::new);
//        List<Long> input=likedCategoryService.deleteDuplicateCategory(likedCategoryDto.getCategoryId());
//        List<Long> usersLike=   likedCategoryService.findUsersLike(user);
//        List<Long> result =likedCategoryService.addLikedCategory(user,input,usersLike);
//        return ResponseHandler.generateResponse("성공", HttpStatus.OK,result);
//    }

}
