package com.chepiv.accountservice.commonservices;

import com.chepiv.accountservice.clients.StorageClient;
import com.chepiv.accountservice.clients.reponsedata.UploadFileResponse;
import com.chepiv.accountservice.domain.Account;
import com.chepiv.accountservice.domain.AccountPrincipal;
import com.chepiv.accountservice.repository.AccountRepository;
import com.google.common.hash.Hashing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Objects;

/**
 * Created by chepiv on 05/01/2020.
 * Contact: chepurin.ivan@gmail.com
 * Github:chepiv
 */
@Service
public class AccountCommonService implements UserDetailsService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final StorageClient storageClient;

    @Autowired
    public AccountCommonService(AccountRepository accountRepository, StorageClient storageClient) {
        this.accountRepository = accountRepository;
        this.storageClient = storageClient;
        passwordEncoder = new BCryptPasswordEncoder();
    }

    public List<Account> getAll() {
        return accountRepository.findAll();
    }

    public Account createAccount(Account account, MultipartFile file) throws IOException {
        account.setPassword(passwordEncoder.encode(account.getPassword()));
        if (Objects.nonNull(file)) {
            MultiValueMap<String, Object> multiValueMap = new LinkedMultiValueMap<>();
            ByteArrayResource contentsAsResource = new ByteArrayResource(file.getBytes()) {
                @Override
                public String getFilename() {
                    return file.getOriginalFilename();
                }
            };
            multiValueMap.add("file", contentsAsResource);
            multiValueMap.add("fileType", file.getContentType());
            UploadFileResponse uploadFileResponse = storageClient.uploadFile(multiValueMap);
            account.setImageUrl(uploadFileResponse.getFileDownloadUri());
        }
        return accountRepository.save(account);
    }

    public Account getByLogin(String login) {
        return accountRepository.findAccountByLogin(login);
    }

    public String hashPassword(String password){
        return Hashing.sha512().hashString(password, StandardCharsets.UTF_8).toString();
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Account login = getByLogin(s);
        return new AccountPrincipal(login);
    }


}
