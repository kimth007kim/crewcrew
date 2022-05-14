package matchTeam.crewcrew.service.mail;

import lombok.AllArgsConstructor;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;

@AllArgsConstructor
@Service
public class TotalEmailService {
    private JavaMailSender javaMailSender;
    private TemplateEngine templateEngine;

    public void sendJavaMail(String title, String receiverEmail, String template, Context context) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setSubject(title); // 제목
        helper.setTo(receiverEmail); // 받는 이

        String html = templateEngine.process(template, context);  //html에 변수세팅
        helper.setText(html, true);

        //메일 보내기
        javaMailSender.send(message);
    }
}
