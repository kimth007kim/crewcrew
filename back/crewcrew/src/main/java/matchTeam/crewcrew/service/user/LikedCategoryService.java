package matchTeam.crewcrew.service.user;


import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.entity.board.Category;
import matchTeam.crewcrew.entity.user.LikedCategory;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.repository.board.CategoryRepository;
import matchTeam.crewcrew.repository.user.LikedCategoryRepository;
import matchTeam.crewcrew.repository.user.UserRepository;
import matchTeam.crewcrew.response.exception.category.NotExistCategoryException;
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

    public List<Long> addLikedCategory(User user, List<Long> input){
        List<Long> userLike= findUsersLike(user);
        System.out.println("-------------------"+userLike);
        for(int i=0;i <input.size();i++){
            if (!userLike.contains(input.get(i))){
                Category category = categoryRepository.findById(input.get(i)).orElseThrow(NotExistCategoryException::new);
                LikedCategory likedCategory = LikedCategory.createLikedCategory(user,category);
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

    public List<Long> findUsersLike(User user) {
        List<Long> categoryList = likedCategoryRepository.findByUser(user);
        return categoryList;
    }

    public List<Long> deleteDuplicateCategory(List<Long> array){
        Set<Long> set = new HashSet<Long>(array);
        List<Long> setFinish = new ArrayList<>(set);
        List<Long> result = new ArrayList<>();
        for (int i =0; i <setFinish.size();i++){
            if (setFinish.get(i)>0 && setFinish.get(i)<15){
                result.add(setFinish.get(i));
            }
        }
        return result;
    }
}
