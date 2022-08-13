# Finest & Co

## Finest & Co | The Epitome of Luxury Funiture

Welcome to Finest and Co, an e-commerce platform for luxury funiture. We offer a wide range of furniture styles to suit every taste, from traditional to contemporary to modern.

## Description

Finest & Co. is an e-commerce platform for a luxury funiture company. The app allows authenticated users to browse through the available furniture styles, and to add them to their cart or wishlist.

This project uses Firebase as the backend, and communicates with the Firestore database to store user data. The Firebase authentication system is used to authenticate users and to manage user permissions. If a user does not wish to provide their credentials they have the option to sign in anonymously. Anonymous users, upon loging out of the app, are provided with the option to convert their anonymous account to a permanent one. Guests who refuse this feature are logged out and their data is deleted.

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

## Motivation

## Tools and Technologies

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Technologies used include:

- React
- React Router
- Redux Toolkit
- RTK Query
- The Context API
- The Course API
- Firebase

## Installation

To install and run the project locally, download the repo and run the following commands:

```bash
npm install
npm start
```

This runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
