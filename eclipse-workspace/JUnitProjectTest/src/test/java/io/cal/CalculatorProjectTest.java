package io.cal;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class CalculatorProjectTest extends CalculatorProject {

	@Test
	void test() {
		CalculatorProject c= new CalculatorProject();
		
		int expected = 2;
		int actual = c.add(1, 1);
		
		assertEquals(expected, actual,"Add Function Can Calculate two integers");
	}
	
	@Test
	void subtest() {
		CalculatorProject b= new CalculatorProject();
		
		int expected = 2;
		int actual = b.sub(4, 2);
		
		assertEquals(expected, actual,"Add Function Can Calculate two integers");
		
	}
	@Test
	void divide() {
	CalculatorProject a= new CalculatorProject();
		
		int expected = 1;
		int actual = a.div(2, 2);
		
		assertEquals(expected, actual,"Add Function Can Calculate two integers");
	}
	@Test
	void multiple() {
	CalculatorProject e= new CalculatorProject();
		
		int expected = 20;
		int actual = e.mul(10, 2);
		
		assertEquals(expected, actual,"Add Function Can Calculate two integers");
	}


@Test
void AreaOfCircleTest() {
	
	CalculatorProject c= new CalculatorProject();
	assertEquals(314.1592653589793, c.AreaOfCircle(10));

}

void positiveNumberTest()
{
	
}

}



























