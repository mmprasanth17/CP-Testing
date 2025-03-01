package io.cal;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;


@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class LifeCycleAnnotationTest {

	LifeCycleAnnotation m;
	
//	@BeforeAll
//	static void beforeAll()
//	{
//		
//		System.out.println("this will run before all the method");
//		
//	}
//	
//	@AfterAll
//	static void afterAll()
//	{
//		
//		System.out.println("this will run at last");
//		
//	}
//	
//	@BeforeEach
//	void init()
//	{
//		m=new LifeCycleAnnotation();
//	}
//	
//	@AfterEach
//	void cleanUp()
//	{
//		
//		System.out.println("clean up now");
//		
//	}
//	
//	
//	@Test
//	void testsquare() {
//	
//		int expected=25;
//		int actual=m.square(5);
//		
//		assertEquals(expected, actual, "pass" );
//		
//	}
//	
//	@Test
//	void testcube() {
//	
//		int expected=125;
//		int actual=m.cube(5);
//		
//		assertEquals(expected, actual, "pass" );
//		
//	}
	
	
//	nested
	
	@Nested
	class testPositiveNumber{
		
		@BeforeEach
		void init()
		{
			m=new LifeCycleAnnotation();
		}
		
		@Test
		void testPositiveNo()
		{
			int expected= 2;
			int actual= -2;
			
//			assertEquals(expected, actual, "pass" );
			
			assertEquals(2, m.positive(2, -2), "should return positive value");
		}
		
		@Test
		void testNegativeNo()
		{
			int expected= -2;
			int actual= m.positive(-2, -2);
			 
			
			assertEquals(expected, actual, () -> "should retuen negative value ");
		}
		
	}

//	@Test
//	void test() {
//		
//	}
	
	}