#Instructions to Run the App
1. Unzip the folder and place it in the webapps folder of Apache Tomcat server
apache-tomcat-8.0.30-windows-x64\apache-tomcat-8.0.30\webapps

2. To Access the home page of this App enter the following url in your web browser
http://localhost:8180/WeatherApp/Weather.html

(Please change the port to where your tomcat is listening)

3. This displays the weather forecast for City of Edinburgh, metrics displayed in Celcius


Technical Improvements:
---------------------
1. Can cache the result in the browser's localStorage/sessionStorage and first search it in localStorage if the object is not there then we could hit the server to get the new
weather report and also save it in the localStorage for future use. 

2. Can be improved further by giving an option for the user to select city of their choice to check the weather forecast. 


Running Unit Test :
------------------



