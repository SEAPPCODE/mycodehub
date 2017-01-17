package web.test;
import org.openqa.selenium.By;		
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;	
import org.openqa.selenium.htmlunit.HtmlUnitDriver;	

public class WeatherAppTest {

	public static void main (String args[]) {
		
		                     // Creating a new instance of the HTML unit driver
		                      
		                     WebDriver driver = new HtmlUnitDriver(true);
		                     ((HtmlUnitDriver) driver).setJavascriptEnabled(true);
		           		     // Navigate to weather app home page		
		                     driver.get("http://localhost:8180/WeatherApp/Weather.html");					
		          
		            		// This code will print the page title		
		                    System.out.println("Page title is: " + driver.getTitle());		
		                    
		                    driver.quit();			
		         }		

}
