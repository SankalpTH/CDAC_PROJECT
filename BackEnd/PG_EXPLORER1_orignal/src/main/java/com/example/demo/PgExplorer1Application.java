package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class PgExplorer1Application {
//this is main method
	public static void main(String[] args) {
		SpringApplication.run(PgExplorer1Application.class, args);
		System.out.println("Application started.....");
	}
}