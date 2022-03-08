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

@Service
@RequiredArgsConstructor
@Transactional
public class LikedCategoryService {
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final LikedCategoryRepository likedCategoryRepository;

    public Long addLikedCategory(Long uid,Long category_id){
        User user= userRepository.findByUid(uid);
        Category category = categoryRepository.findById(category_id).orElseThrow(NotExistCategoryException::new);

        LikedCategory likedCategory = LikedCategory.createLikedCategory(user,category);

        likedCategoryRepository.save(likedCategory);

        return likedCategory.getLikeId();
    }
}
