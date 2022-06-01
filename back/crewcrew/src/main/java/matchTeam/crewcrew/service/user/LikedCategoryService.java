package matchTeam.crewcrew.service.user;


import ch.qos.logback.core.net.SyslogOutputStream;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.entity.board.Category;
import matchTeam.crewcrew.entity.user.LikedCategory;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.repository.board.CategoryRepository;
import matchTeam.crewcrew.repository.user.LikedCategoryRepository;
import matchTeam.crewcrew.repository.user.UserRepository;
import matchTeam.crewcrew.response.exception.category.AskNotDetailCategoryException;
import matchTeam.crewcrew.response.exception.category.NotExistCategoryException;
import matchTeam.crewcrew.response.exception.profile.ProfileEmptyCategoryException;
import matchTeam.crewcrew.response.exception.profile.ProfileHobbyNotFoundException;
import matchTeam.crewcrew.response.exception.profile.ProfileStudyNotFoundException;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional

public class LikedCategoryService {
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final LikedCategoryRepository likedCategoryRepository;

    public List<Long> addLikedCategory(User user, List<Long> input) {
        List<Long> userLike = findUsersLike(user);
        System.out.println("-------------------" + userLike);
        for (int i = 0; i < input.size(); i++) {
            if (!userLike.contains(input.get(i))) {
                Category category = categoryRepository.findById(input.get(i)).orElseThrow(NotExistCategoryException::new);
                LikedCategory likedCategory = LikedCategory.createLikedCategory(user, category);
                likedCategoryRepository.save(likedCategory);
            }
        }

        return likedCategoryRepository.findByUser(user);
    }
//    public List<Long> SignUpCategory(User user, List<Long> input, List<Long> userLike){
//        for(int i=0;i <input.size();i++){
//            if (!userLike.contains(input.get(i))){
//                Category category = categoryRepository.findById(input.get(i)).orElseThrow(NotExistCategoryException::new);
//                LikedCategory likedCategory = LikedCategory.createLikedCategory(user,category);
//                likedCategoryRepository.save(likedCategory);
//            }
//        }
//
//        return likedCategoryRepository.findByUser(user);
//    }

    public void validLikedCategory(List<Long> input) {

        if (input == null || input.size() == 0) {
            throw new ProfileEmptyCategoryException();
        }
        int study = 0;
        int hobby = 0;

        for (Long u : input) {
            Long parentId = categoryRepository.findParentIdByCategoryId(u);
            if (parentId == 1L) {
                study += 1;
            } else if (parentId == 2L) {
                hobby += 1;
            } else {
                throw new AskNotDetailCategoryException();
            }
        }

        if (study == 0)
            throw new ProfileStudyNotFoundException();
        if (hobby == 0)
            throw new ProfileHobbyNotFoundException();
    }

    public void ChangeUsersLike(User user, List<Long> input, List<Long> userLike) {
        List<Long> after = new ArrayList<>();


        System.out.println("/////////////////////////////////////////////////////////////////////////");
        System.out.println("넣은값" + input);
        System.out.println("오리지널" + userLike);
        for (Long l : userLike) {
            // 있는지 확인
            if (input.contains(l)) {
                after.add(l);
            } else {
                // delete from 쿼리 날리기
                Category category = categoryRepository.findById(l).orElseThrow(NotExistCategoryException::new);
                likedCategoryRepository.deleteLikedCategoryByUserAndCategory(category, user);
            }
        }
        // insert 쿼리 날리기;
        for (Long u : input) {
            if (!after.contains(u)) {
                Category category = categoryRepository.findById(u).orElseThrow(NotExistCategoryException::new);
                LikedCategory likedCategory = LikedCategory.createLikedCategory(user, category);
                likedCategoryRepository.save(likedCategory);
            }
        }
    }


    public List<Long> findUsersLike(User user) {
        List<Long> categoryList = likedCategoryRepository.findByUser(user);
        return categoryList;
    }

    public List<String> findUsersStudyLike(User user) {
        List<String> studyList = likedCategoryRepository.findStudyListByUser(user);
        return studyList;
    }

    public List<String> findUsersHobbyLike(User user) {
        List<String> hobbyList = likedCategoryRepository.findHobbyListByUser(user);
        return hobbyList;
    }

    public List<Long> deleteDuplicateCategory(List<Long> array) {
        Set<Long> set = new HashSet<Long>(array);
        List<Long> setFinish = new ArrayList<>(set);
        List<Long> result = new ArrayList<>();
        for (int i = 0; i < setFinish.size(); i++) {
            if (setFinish.get(i) > 0 && setFinish.get(i) < 15) {
                result.add(setFinish.get(i));
            }
        }
        return result;
    }
}
