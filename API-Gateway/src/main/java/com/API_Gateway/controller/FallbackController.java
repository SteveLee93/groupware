package com.API_Gateway.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/fallback")
public class FallbackController {

  @GetMapping("/auth")
  public ResponseEntity<String> authServiceFallback() {
    return ResponseEntity
        .status(503)
        .body("Auth Service is not available at the moment. Please try again later");
  }
}
