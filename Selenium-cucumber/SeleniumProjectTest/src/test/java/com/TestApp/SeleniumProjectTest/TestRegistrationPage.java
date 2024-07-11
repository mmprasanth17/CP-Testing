package com.TestApp.SeleniumProjectTest;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.Test;

public class TestRegistrationPage {
	
	@Test
	public void testRegistrationPage() throws InterruptedException {
WebDriver driver = new ChromeDriver();
		
		driver.get("http://localhost:3000/");
		Thread.sleep(1000);
		
		driver.findElement(By.xpath("//a[normalize-space()='Signin']")).click();
		
		Thread.sleep(1000);

		driver.findElement(By.xpath("//a[normalize-space()=\"Don't have an account? Sign Up\"]")).click();
		Thread.sleep(1000);

		driver.findElement(By.xpath("//a[normalize-space()=\"Don't have an account? Sign Up\"]")).click();
		Thread.sleep(1000);

		
		driver.findElement(By.xpath("//input[@name='userName']")).sendKeys("Prasanth");

		driver.findElement(By.xpath("//input[@name='userContact']")).sendKeys("9380456741");

		driver.findElement(By.xpath("//input[@name='userId']")).sendKeys("prasanth@gmail.com");

		driver.findElement(By.xpath("//input[@name='userPass']")).sendKeys("Prasanth@123");

		driver.findElement(By.xpath("//button[normalize-space()='Create Account']")).click();

	}

}
