# VaporChat

## Overview
I'm building a mobile app called VaporChat that allows users to sign up, create a room, or be able to join a room. Users can chat back and forth with each other and also delete (vaporize) the chat history.

## Initial Instructions
- I want you to play the role of expert full-stack developer.
- I will be supplying you with an initial prompt filled with lots of information
about the application.
- Your first task will be to review the instructions and confirm that you
understand the context.
- Do NOT write any code just yet.
- Propose a plan on how to approach building the app

## Technologies 
- Express.js (backend server)
- React Native + Expo (to build and deploy iOS and Android apps)
- Tailwind.css (for styling)
- MongoDB via MongoDB Atlas (to store chats and user data)

## Style
- You can find inspiration photos under the folder inspo_images/ and I will attach them as well
- I want to use the colors black, white, and gray primarily for this app. Background of the app should be black and everything else can be a gradient or shades of  black, white, and gray. Aim to use gradients for buttons when possible
- For the logo, use the file VaporChatLogo.png

## Funtionality
- Refer to the mockup that I am providing called mockup.png
- The basic functionality of the app is composed of 5 pages

1. Login (not in mockup)
- This page should be a bisic login page with a email and password field
- it should have an option for the user to create an account (sign up page)

2. Singup (not in mockup)
- allow user to input: email, password, retype password and submit
- has an option to allow users to click Login to navigate back to the login screen
- once authenticated, user will land on the home screen

3. Home (first wireframe in the mockup)
- Header (the rest of the screens should use this)
-- logo to the left
-- button to create a room on the right
-- button to join a room to the right of that
-- logout button
- Body (the buttons in the header will act like tabs)
-- buttons to: specify room name, specify password, specify display name, and create/join accordingly
- Footer (the rest of the screens should use this)
-- Copyright VaporChat 2025

4. Chat Room
- Room name at the top
- chat box with scroll feature, should include user display names and their messages
- display the logged in user on the right, other users on the left
- input field to type a text with send button to the right
- Buttons toward the bottom:
-- Exit Room: takes users back to home, should land on the Create a Room option
-- Vaporize History: wipe all history for that room for all users

## Requirements
- manage the user's auth state via a context on the frontend to keep the user logged in
- keep all sensitive information safe in a .env file
- create all the required collections in the db for this: users, rooms, messages. adjust the tables as needed
- create a system for creating and associating user chats with rooms
- identify and create all necessary api endpoints
