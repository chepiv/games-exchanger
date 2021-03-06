package com.chepiv.offersservice.client;


import com.chepiv.offersservice.client.reponsedata.UploadFileResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;

/**
 * Created by chepiv on 16/02/2020.
 * Contact: chepurin.ivan@gmail.com
 * Github:chepiv
 */
@FeignClient(value = "storage-service")
public interface StorageClient {

    @PostMapping(value = "/uploadFile", consumes = "multipart/form-data")
    UploadFileResponse uploadFile(@RequestPart("file") MultiValueMap<String, Object> file);

    @GetMapping("/downloadFile/{fileName:.+}")
    ResponseEntity<Resource> downloadFile(@PathVariable String fileName);

}
