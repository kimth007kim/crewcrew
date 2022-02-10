package matchTeam.crewcrew.repository.user;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.data.redis.core.ValueOperations;

import java.util.LinkedList;
import java.util.List;

@SpringBootTest
public class RedisTest {
    @Autowired
    RedisTemplate redisTemplate;

    @Test
    void redisConnectionTest(){
        final String key = "a";
        final String data = "1";

        final ValueOperations<String,String > valueOperations= redisTemplate.opsForValue();
        valueOperations.set(key,data);


        final String result = valueOperations.get(key);
        Assertions.assertEquals(data,result);
    }
    @Test
    public void redisSetOperationSortedsetTest() {
        String setKey = "setKey";
        String str1 = "str1";
        String str2 = "str2";
        String str3 = "str3";

        redisTemplate.delete(setKey);
        SetOperations<String, String> setOperations = redisTemplate.opsForSet();

        List<String> list = new LinkedList<>();

        list.add(str3);
        list.add(str2);
        list.add(str1);

        setOperations.add(setKey, list.get(0), list.get(1), list.get(2));

        for (String s : setOperations.members(setKey))
        {
            System.out.println(s);
        }

    }
}
