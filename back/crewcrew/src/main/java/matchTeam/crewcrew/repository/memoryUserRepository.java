package matchTeam.crewcrew.repository;


import matchTeam.crewcrew.domain.User;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public class memoryUserRepository implements userRepository {
    private static Map<Long, User> store = new HashMap<>();
    private static long sequence =0L;

    @Override
    public User save(User user) {
        user.setId(++sequence);
        store.put(user.getId(),user);
        return user;
    }

    @Override
    public List<User> findAll() {
        return null;
    }

    @Override
    public Optional<User> findById(Long id) {
        return Optional.ofNullable(store.get(id));
    }

    @Override
    public Optional<User> findByEmail(String Email) {
        return Optional.empty();
    }


}
