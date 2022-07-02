import 'express-session'; // don't forget to import the original module

declare module 'express-session' {
  // eslint-disable-next-line no-unused-vars
  interface SessionData {
    userid: number; // whatever property you like
  }
}
