# Lab8_Starter

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.

No because we want our program to extract what we wrote in a textfield and also send the message to another user which would require a sequence of things happening not one unit.

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters

Yes because we're testing out the textfield where the user inputs their message to see if they can not type more than 80 characters.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?

I expect our program to run in the background without a visible chrome window which could help with decreasing resources.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?

