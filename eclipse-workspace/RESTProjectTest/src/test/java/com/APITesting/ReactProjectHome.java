package com.APITesting;

import org.testng.Assert;
import org.testng.annotations.Test;

import static io.restassured.RestAssured.*; //make a static to RestAssured package
import io.restassured.response.Response;

import static io.restassured.matcher.RestAssuredMatchers.*;
import static org.hamcrest.Matchers.*;

public class ReactProjectHome {
	
    @Test
	public void GETApiTest1(){
    	
    	Response response = get("http://localhost:8888/foodMenu");
	
    	System.out.println(response.getStatusCode());
    	System.out.println(response.getTime());
    	System.out.println(response.getBody().asString());
    	System.out.println(response.getStatusLine());
    	System.out.println(response.getStatusCode());
    	System.out.println(response.getHeader("content-type"));
    	
    	int statuscode = response.getStatusCode();    	
    	Assert.assertEquals(statuscode, 200);
    	
	}
    @Test                     //BDD FRAMEWORK 
    public void GETApiTest2()
    {
    	
    	baseURI="http://localhost:8888";
    	given().get("/foodMenu").then().statusCode(200).body("find { it.id == '1' }.foodItems[1].id", equalTo("2")).log().all();
    	given().get("/foodMenu").then().statusCode(200).body("find { it.id == '1' }.foodItems[0].price", equalTo("450"));   	
    }
    
    
    }

