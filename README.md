# Finest & Co

## Demo

[View Live Site](https://finest-co-furniture.vercel.app/)

## Finest & Co | The Epitome of Luxury Funiture

Welcome to Finest and Co, an e-commerce platform for a luxury funiture company that provides the perfect piece to complete any home. We believe that furniture should be more than just functional, it should be beautiful and luxurious. Our selection of high-end furniture is the perfect way to add a touch of class to any room.

![Screenshot of the home page](/src/images/homepage.jpeg)
![Screenshot of the shop page](/src/images/shoppage.jpeg)
![Screenshot of the account page](/src/images/accountpage.jpeg)

## Description

Finest & Co. is an e-commerce platform for a luxury funiture company. The app allows users to browse through the available furniture styles, and when authenticated, they can manage items in their cart and wishlist.

This project uses Firebase as the backend, and communicates with the Firestore database to store and manage user data. The Firebase authentication system is used to authenticate users and manage user credentials.

If a user does not wish to provide their credentials, they have the option to sign in anonymously. Anonymous users, upon logging out of the app, are provided with the option to convert their anonymous account to a permanent one. Guests who refuse this feature are logged out and their data is deleted.

## Features

The app has the following features:

- Allows a user to sign in and out
  - Users can choose to sign in anonymously or to provide their credentials
  - Anonymous users can convert their anonymous account to a permanent one
  - Deletes guest data upon logout if they do not want to convert their account
- Users can browse through the available products
- Users can search and filter through the available products
- Authenticated users can view their cart and wishlist, and can remove items from them.
- Authenticated users can view their wishlist items and move them to their cart
- Authenticated users can view their cart and order details/summary

## Tools and Technologies

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Technologies used include:

- React
- React Router
- React Toastify
- Redux Toolkit
- RTK Query
- The Context API
- The Course API
- Firebase

## Design File

[Figma Design File](https://www.figma.com/file/2kMItgEasTn7cs5DXdvXwX/finest%26co?node-id=0%3A1)

## Installation

To install and run the project locally, download/clone the repo and run the following commands:

```bash
npm install
npm start
```

This runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Environment Variables

This project requires the following environment variables in order to run. Environment variables can be set in a .env file in the root directory of the project.

````bash

```bash
# example .env file
REACT_APP_API_KEY=gfhjk12345

# keys
REACT_APP_FIREBASE_API_KEY=<your-api-key>
REACT_APP_FIREBASE_AUTH_DOMAIN=<your-auth-domain>
REACT_APP_FIREBASE_DATABASE_URL=<your-database-url>
REACT_APP_FIREBASE_PROJECT_ID=<your-project-id>
REACT_APP_FIREBASE_STORAGE_BUCKET=<your-storage-bucket>
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<your-messaging-sender-id>
REACT_APP_FIREBASE_APP_ID=<your-app-id>
````
