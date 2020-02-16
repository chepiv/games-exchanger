package com.chepiv.accountservice.clients;

import com.chepiv.accountservice.clients.reponsedata.UploadFileResponse;
import feign.codec.Encoder;
import feign.form.spring.SpringFormEncoder;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created by chepiv on 16/02/2020.
 * Contact: chepurin.ivan@gmail.com
 * Github:chepiv
 */
@FeignClient(value = "storage-service",  configuration = {StorageClient.MultipartSupportConfig.class})
public interface StorageClient {

    @PostMapping(value = "/uploadFile", consumes = "multipart/form-data")
    UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file);

    class MultipartSupportConfig {
        @Bean
        @Primary
        @Scope("prototype")
        public Encoder feignFormEncoder() {
            return new SpringFormEncoder();
        }
    }
}
