# <p align="center"> National University of Singapore <br> CP2106 (Orbital) </p>
![icon](https://user-images.githubusercontent.com/103088135/180934522-54b0c8e9-1d1a-447f-be1d-5f6dd12aee3c.png)

## Team Name
*Walkaholics*
## Team Member
Shang Feiyang<br>Ho Jia We
## Date
2022 May - 2022 August
## Proposed Level of Achievement
*Project Gemini*
## Motivation
As more people are becoming aware of the significance of health, there is an even greater need for reliable health information. **Especially some university students like us, who spend most of their time studying hard; they might face a variety of health problems** such as anxiety disorders, Binge Eating Disorders, and obesity. However, it is difficult for them to understand their personal health conditions and make efficient approaches to alleviate them. This discourages them from taking the first step toward their health goals. 
 
Thus, we want to provide a professional analysis of users’ personal health data(e.g. age, height, weight, body fat percentage, sleep time) to recommend ways to improve their quality of life. We want to show our users that **even a small change like 2000 more steps per day could lead to their health improvements.** We also want to provide **a basic fitness plan for fitness beginners to start with and allow them to customize the plan while they become more professional at fitness.**
## Aim
We hope that our app could help users tackle some health issues(psychologically and physically) and have a healthier lifestyle.
We also hope to make managing one’s health easy and enjoyable for everyone. 
## User Stories
1. As a person who is looking for a healthier diet, I can input personal data of weight, height, and gender, and receive customized weekly diet plans.
2. As a person who is looking to lose weight, I want to be able to have a personalized exercise plan that can ensure the desired result.
3. As a person who is looking to build muscle, I want to be able to follow a reliable workout and nutrition plan that allows me to efficiently gain muscle mass.
4.  As a person who wants to track body data and see the changes,  I want to be able to see easier-understood plots and receive notifications when there are negative changes in my body
5. As a student who wants to manage stress, I want to be able to see personal health reports and what to do to release pressure.
## Scope of Project
**The App provides an interface for users to input their key health data such as age, height, weight, as well as their health goals; a weekly plan would also be recommended.**
- Features to be completed by the mid of June:
1. Fitness planner

   Provides users with a recommended weekly fitness plan
   Display details of each workout

2. Personal report

   Analysis based on user’s health data
   Display details with some data visualization and how their health levels are

- Features to be completed by the mid of July:
1. Customized diet plan

   Develop a personalized and editable weekly diet plan for users(they could change the specific food in the same category)

2. Report Page Add-on

   A TDEE Calculator that calculates user’s TDEE based on the activity rate they chose and their BMR
- By end of July:

A complete Settings page for users to change personal data, fitness goal, and upload a profile picture
## Tech Stack
 1. React Native (Frontend)
 2. Supabase (Backend)
 3. Expo CLI
 4. HTML/CSS/Javascript
## Our strengths compared to other similar apps:
- No ads, entirely free for all features, including customized plans for fitness and diet
- Beginner-friendly:  start with a basic fitness plan, and can change the level of exercise by changing to a different fitness plan as the user feels their - fitness level is improved (e.g. become healthier to build muscles)
Good UI/UX design, easy and comfortable to use
## Development Plan
May 9 to May 15: Complete Mockup, poster, and video

May 16 to May 22: Pick up necessary technologies - Javascript/HTML/CSS, React, Nodejs, Supabase

May 23 to May 29: Start building the register/login page

May 30 to June 5: Finalize the features and start building a user-health data input page.

June 6 to June 12: Start building the data reports page

June 13 to June 19: Finalize data report and fitness plan pages

June 20 to June 26: Testing and debugging

June 27 to July 3: Implementation of peer teams’ suggestions

July 4 to July 10: Implement additional capabilities – Diet plan Page

July 11 to July 17: Finalize the settings page, video, and poster

July 18 to July 24: Finalize README file, testing and debugging
## User Flow(MS1)
<img width="420" alt="image" src="https://user-images.githubusercontent.com/103088135/180937661-7c4f28d6-cb3c-4af1-a53c-9a10653cf06d.png">

## Problems Encountered
1.	For the data visualization part of the report page, firstly we decided to use stacked bar charts and add a marker showing the user’s data level in those ranges. However, the number labels on stacked bar charts are not cumulative, which is not suitable for displaying BMI and BFP ranges.<img width="200" alt="image" src="https://user-images.githubusercontent.com/103088135/180938890-bde1c262-3b3a-4104-8e42-c1ec6ce9b1c0.png"><br>Then we tried a few npm packages but all of them have error messages ‘View config getter callback for component `div` must be a function (received   `undefined`)’; finally realized that those are for web development only, and found a react native speedometer package.

2.	As for the plans page part, we discussed many times the customization part and how to recommend plans for users. Especially for the diet plan, to make the plan very detailed, we might need to learn machine learning and train models, which is too complicated for us and hard to complete before the end of July. <br>After several meetings, we decided in mid-June that for milestone 2, we will do a fitness plan only, and provide a basic plan based on the user's fitness   goal, then allow them to customize the amount of each exercise. 

3.	Since we want to allow users to change their fitness goal as their fitness level is improved, or they feel that their initial goal is too hard to achieve, we need to ensure that their diet and fitness plans are updated when they change their goals. However, the update() command will not work as the old and new plans are different and we didnot set primary keys but made it auto-generated. Besides, updating with different rows once at a time would make code very long complicated. Then we tried with deleting and inserting plans, but didn’t know why deleting and immediately insert when user clicks on ‘confim’ caused errors that only new diet plan inserted but fitness plan not. We thought it might be problems with async function or supabase bugs, but couldnt resolve this.<br>We finally decided to delete user plans once they click into the edit profile page, and since the only button users can click to exit that  page is ‘confirm’, we insert plans when user clicks on ‘confirm’ button. This fixes the problem for now, but we will certainly try to  find better ways, if   possible.

## Bugs Squashed
1. Diet Page shows nothing on Sunday
<img width="88" alt="image" src="https://user-images.githubusercontent.com/103088135/180940617-79bb9727-bba5-4795-a2f1-915ad771d4d6.png">
<img width="297" alt="image" src="https://user-images.githubusercontent.com/103088135/180940627-1da1e9c8-d10c-4325-ad75-855f6bd0099d.png">

Debugging: firstly checks if it is the issue with variable day:
Change it to 0, and diet page shows Sunday’s diet plan.
![image](https://user-images.githubusercontent.com/103088135/180940715-de982199-6a7f-4eca-8657-e035abf71034.png)

Then research on Supabase async function to check if the index of data returned from getPlan() starts from 0, after confirming, remove the - 1 code, and Sunday’s diet plan shows correctly on diet page.

<img width="92" alt="image" src="https://user-images.githubusercontent.com/103088135/180940649-39870c76-b7e6-46e3-a812-b54052534654.png">

2. Circular Progress causing app to freeze
<img width="319" alt="image" src="https://user-images.githubusercontent.com/103088135/180940786-51d3c988-17cf-4da2-85ef-91607ed341d7.png">

Added additional if-else statement to check if result is infinity as plan.length could be null as the async request for the plan details from supabase might not have been carried out yet. This is so that the “progress” value would not be infinity which when input into circular progress would cause the program to hang.

3. Main page data is not updated after editing profile
<img width="345" alt="image" src="https://user-images.githubusercontent.com/103088135/180940819-e55606a3-8ecc-444f-b0a8-888fc1d2e266.png">

Upon toggling back to the main page from the profile page, the page is not re-rendered. So using react navigation, the function  “setDetailedData” would be called upon toggling back and this function updates the data displayed on the page.

4. BMI and BMR returned null or incorrect number in both userdata and editprofile pages
<img width="118" alt="image" src="https://user-images.githubusercontent.com/103088135/180940842-7dece5b6-bc30-4abc-b851-4f9dd26cd080.png">

After clicking confirm, user profile data in supabase is updated, but bmr and bmi returned are null;
<img width="358" alt="image" src="https://user-images.githubusercontent.com/103088135/180940852-894f3ed8-76f8-4f49-bbc4-f64aa25bb36e.png">
<img width="359" alt="image" src="https://user-images.githubusercontent.com/103088135/180940858-98c01e38-955f-464f-8c57-f73e191aebcd.png">

Added a useffect function to update bmi and bmi when data values are updated;
Then test again with edit profile feature - now the BMI and BMR is updated in supabase.
<img width="357" alt="image" src="https://user-images.githubusercontent.com/103088135/180940873-91dc587c-6997-40ee-8ea6-c75ef4519e0d.png">

## Core Features
### Report Page
<img width="117" alt="image" src="https://user-images.githubusercontent.com/103088135/180941671-592bbd77-0fa9-4cde-835f-768897526893.png">
<img width="109" alt="image" src="https://user-images.githubusercontent.com/103088135/180941677-030b25af-cb82-4004-bb78-a850b8c090cd.png">
<img width="125" alt="image" src="https://user-images.githubusercontent.com/103088135/180941697-c9f37975-b760-4f63-940b-66cf09be4688.png">

Based on the user’s height and weight, calculated their BMI and display their health level based on BMI health ranges - 
* Below 18.5 – underweight range
* Between 18.5 and 24.9 – normal/healthy weight range
* Above 24.9 – overweight range
Based on the user’s gender and Body Fat Percentage, display their health conditions-
Female:
* Between 15 and 18 - underfat range
* Between 18 and 24 - healthy range
* Between 25 and 30- slightly overweight range
* Between 31 and 36 - moderately overfat range
* Above 36 - extremely overfat range

Male:
* Between 15 and 19: healthy range
* Between 20 and 24- slightly overweight range
* Between 25 and 29- moderately overfat range
* Above 30: extremely overfat range
	
Based on the user’s gender, weight, height, and age, we calculate their BMR(basal metabolic rate), the formula used is [88.362 + (13.397 x weight in kg) + (4.799 x height in cm) – (5.677 x age in years)]; also display a self-made picture in excel showing the composition of TDEE, i.e. BMR, eat, NEAT, TEF.

### TDEE Calculator Page
We added a page that calculates user’s TDEE based on their chosen activity rate. 

This is how we calculated TDEE:
* Sedentary: BMR x 1.2 (little or no exercise, desk job) 
* Lightly active: BMR x 1.375 (light exercise/ sports 1-3 days/week)
* Moderately active:  BMR x 1.55 (moderate exercise/ sports 6-7 days/week) 
* Very active:  BMR x 1.725 (hard exercise every day, or exercising 2 xs/day) 
* Extra active: BMR x 1.9 (hard exercise 2 or more times per day, or training for marathon, or triathlon, etc. 
### Plans Page
<img width="98" alt="image" src="https://user-images.githubusercontent.com/103088135/180942037-62eae0b0-6da1-4c1f-a68f-bc25b66fad86.png">
<img width="102" alt="image" src="https://user-images.githubusercontent.com/103088135/180942050-4d74c4c7-6045-4730-8b48-0195fc8e5941.png">
<img width="105" alt="image" src="https://user-images.githubusercontent.com/103088135/180942068-326ab321-fc6c-4661-8a4c-c55cac5dbb06.png">

Provide a  very basic weekly fitness plan and a diet plan  based on the user’s selected goal. (6 templates in total, 3 each for fitness and diet, and each for different fitness goals)
### Exercise Page
Users can update their exercise completed status by clicking on switches. Based on this, the progress circle at the top will show the percentage of weekly goal completion status
### Diet Page
- As for each diet, we don’t recommend a specific amount of food or calories. Instead, user controls their daily calorie intake themselves based on the daily recommended calories intake which we have calculated for them(BMR times the lightly active rate, which is a reference for most people’s TDEE). They could also see each section for their diet plan - breakfast, lunch, dinner, and snack. 
- There are also diet tips of high-protein food choices for users, including pictures, names, and amount of protein in 100g of that food. Users can substitue the food in diet plan if they don’t like, based on the tips on diet page. (e.g. Fish ➡️chicken, beef  ➡️ tofu if they are vegetarian)
## Edge Features
### Main Page
<img width="129" alt="image" src="https://user-images.githubusercontent.com/103088135/180942352-cc03c9f5-a599-43e9-8cd0-2ee4eabe1cf8.png">

Users can view the health data that they had previously input as well as their profile picture
### Settings Page
<img width="129" alt="image" src="https://user-images.githubusercontent.com/103088135/180942394-0d6f1d9d-8d90-4289-8db4-0507bcd56c01.png">

Users sign out or edit their profile details
### Change Profile Picture
<img width="113" alt="image" src="https://user-images.githubusercontent.com/103088135/180942490-9979c212-572c-4d22-bd53-6b7e1b220c1e.png">
<img width="112" alt="image" src="https://user-images.githubusercontent.com/103088135/180942513-e393dcdc-bb17-4798-8701-4cd8a3420a7a.png">
<img width="113" alt="image" src="https://user-images.githubusercontent.com/103088135/180942526-ff81c5fd-140c-441f-b87c-0177a06fead8.png">

Users can either choose to take a picture from their camera or photo library.  For the camera, access would be requested and it would bring the user to a screen where he can flip the camera, take a picture or cancel to go back to the previous page. For the photo library, access to the library would also be requested and users would be able to select any photo from it.

### Weekly refresh of fitness plan
<img width="298" alt="image" src="https://user-images.githubusercontent.com/103088135/180942637-08f8f586-5009-4ae4-8e54-53879ab83a2a.png">

This function would be carried out in Supabase every Monday at 12:00 am to refresh all user’s progress in their exercises to zero.
### Procedure to run Walkaholics locally
Git: https://github.com/Walkaholics/team_5378

Stack: React Native

**Do not have Expo CLI installed - run npm install -g expo-cli**
1. Change directory to this project
2. Run npm install in the terminal
3. Run expo start in the terminal
* Have iOS simulator installed- press  ‘i’
* Have  Andriod emulator installed - press ‘a’
* Have Expo Go app installed on mobile phone - open camera on your phone and scan the QR code to open the project

## User Testing
**For detailed User testing content of table, please see pdf version of README file at**
https://github.com/Walkaholics/team_5378/blob/MS3_master/Walkaholics_README.pdf 




