package web.test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.openqa.selenium.remote.DesiredCapabilities;	

public class WeatherAppScriptTest {

	public static void main (String args[]) {

		System.setProperty("webdriver.chrome.driver",
				"/Users/meena/Downloads/chromedriver");
		
			ChromeOptions options = new ChromeOptions();
			options.addArguments("window-size=1024,768");

			DesiredCapabilities capabilities = DesiredCapabilities.chrome();
			capabilities.setCapability(ChromeOptions.CAPABILITY, options);
			WebDriver driver = new ChromeDriver(capabilities);

			driver.get("http://localhost:8180/WeatherApp/Weather.html");

			if (driver instanceof JavascriptExecutor) {
				((JavascriptExecutor) driver)
					.executeScript("alert('Weather forecast!');");
			}
	}
}
