package matchTeam.crewcrew.Repository;


import matchTeam.crewcrew.Entity.User;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

public class JpaUserRepository implements UserRepository {
    private final EntityManager em;


    public JpaUserRepository(EntityManager em) {
        this.em = em;
    }

    @Override
    public User save(User user) {
        em.persist(user);
        return user;
    }

    @Override
    public Optional<User> findById(Long id) {
        User user = em.find(User.class,id);
        return Optional.ofNullable(user);
    }

    @Override
    public Optional<User> findByEmail(String Email) {
        List<User> result = em.createQuery("select m from User m where m.email = :Email",User.class).setParameter("Email",Email).getResultList();
        return result.stream().findAny();
    }

    @Override
    public List<User> findAll() {
        return em.createQuery("select m from User m",User.class).getResultList();
    }

}
