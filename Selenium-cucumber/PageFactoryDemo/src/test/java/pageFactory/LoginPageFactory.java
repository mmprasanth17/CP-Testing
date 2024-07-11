package pageFactory;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class LoginPageFactory {
	
	WebDriver driver;

	@FindBy(id = "user-name")
	WebElement txt_username;


	@FindBy(id = "user-password")
	WebElement txt_password;


	@FindBy(id = "login-button")
	WebElement btn_login;
	

	public LoginPageFactory(WebDriver driver) {
		// TODO Auto-generated constructor stub
		this.driver = driver;
		PageFactory.initElements(driver, this);
	}

	public void enterUsername(String username) {
		// TODO Auto-generated method stub
		txt_username.sendKeys(username);
		
	}

	public void enterPassword(String password) {
		// TODO Auto-generated method stub
		txt_password.sendKeys(password);
	}

	public void clickLoginButton() {
		// TODO Auto-generated method stub
		btn_login.click();
		
	}
	
	

}
