# tiko Coding Challange

## How to start this project?

You can follow [this guide](https://reactnative.dev/docs/environment-setup) to setup your environment.

Just make sure that you initialize your project like so:

Clone the repository:
```bash
$ git clone https://github.com/aaronkarpati/tiko-todo.git
```
Make sure you are in the project folder
```bash
$ npm install
$ cd ios && pod install
```
Run the application either for iOS or android
```bash
$ npx react-native run-android
$ npx react-native run-ios
```
## What's included
Here's a list of what this app provides.

- The user must be able to register an account ✅
- The user must be able to log in into his account ✅
- A system of token rotation must be implemented. For this the API provides you an access_token and a refresh_token. There are endpoints to refresh and validate the access_token. The lifetime of the access_token is 1 hour and the lifetime of the refresh_token is 1 day ✅
- The user must be able to create todos ✅
- The user must be able to change the "done" state of a todo ✅
- The user must be able to logout ✅
- The design of the app is up to you, but it would be nice to have a good UI/UX experience ✅
- Documentation of your code ✅
- The user can change the "description" of a todo ✅
- The user must be able to delete todos ✅
- Display loading when data is fetched from the network ✅
- Handle errors properly and display them in the UI. In case the token is invalid the app should go to log out state ✅
