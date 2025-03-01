package com.APITesting;

//import static io.restassured.RestAssured.baseURI;

import static io.restassured.RestAssured.*;
import static io.restassured.RestAssured.given;

import org.json.simple.JSONObject;
import org.testng.annotations.Test;

import io.restassured.http.ContentType;

public class PutPatchAndDeleteRequest {
	
	@Test
	public void PUTRequest() {
		
		JSONObject request = new JSONObject();
		request.put("name","prasanth");
		request.put("Job","Developer");
		System.out.println(request.toJSONString());
		
		baseURI = "https://reqres.in/api";
		
		given().header("content-type","application/json").
		contentType(ContentType.JSON).
		accept(ContentType.JSON).
		body(request.toJSONString()).post("/users").then().statusCode(201).log().all();	
		
	}
	
	@Test
	public void PATCHRequest() {
		
		JSONObject request = new JSONObject();
		request.put("name","prasanth");
		request.put("Job","Developer");
		
         baseURI = "https://reqres.in";
		
		given().header("content-type","application/json").
		contentType(ContentType.JSON).
		accept(ContentType.JSON).
		body(request.toJSONString()).post("/api/users/2").then().statusCode(201).log().all();
		
		
		
	}
	
	
	@Test
	public void DELETERequest() {
		
		baseURI = "https://reqres.in";
		
		when().delete("/api/users?page=2").then().statusCode(204).log().all();
		
		
	}
			

}