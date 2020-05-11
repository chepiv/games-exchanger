package com.chepiv.emailservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;

@RestController
@CrossOrigin
@RequestMapping("email")
public class MailRestController {

    private final MailService mailService;

    @Autowired
    public MailRestController(MailService mailService) {
        this.mailService = mailService;
    }

    @PostMapping
    public String sendEmail(@RequestParam("to") String to,
                            @RequestParam("subject") String subject,
                            @RequestParam("body") String body) {
        try {
            mailService.sendingMail(to,subject,body);
        } catch (MessagingException e) {
            e.printStackTrace();
            return "failed";
        }
        return "success";
    }

}
