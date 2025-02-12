import { action } from "./action";
import firebase, { store } from "../firebase/FirebaseConfig";

/**
 * Auth Actions
 * @module actions/auth
 *
 */

export const SIGNED_IN = "SIGNED_IN";

/**
 * Marks a user signed in in state.
 *
 * @function
 * @param {Object} user - google auth user object.
 * @param {Dispatch} dispatch - useReducer dispatch function
 */
export const signedIn = ( user, dispatch ) => {
  dispatch( action( SIGNED_IN, user ) );
};

export const SIGNED_OUT = "SIGNED_OUT";

/**
 * Sign a googleAuthUser out.
 *
 * @function
 * @param {Dispatch} dispatch
 */
export const signedOut = ( dispatch ) => {
  dispatch( action( SIGNED_OUT ) );
};

export const GOOGLE_PROVIDER = "GOOGLE_PROVIDER";
export const FACEBOOK_PROVIDER = "FACEBOOK_PROVIDER";
export const TWITTER_PROVIDER = "TWITTER_PROVIDER";
export const EMAIL_PROVIDER = "EMAIL_PROVIDER";
const providers = {
  GOOGLE_PROVIDER: new firebase.auth.GoogleAuthProvider(),
  FACEBOOK_PROVIDER: new firebase.auth.FacebookAuthProvider(),
  TWITTER_PROVIDER: new firebase.auth.TwitterAuthProvider(),
  EMAIL_PROVIDER: new firebase.auth.EmailAuthProvider(),
};

export const SIGNIN_INIT = "SIGNIN_INIT";
export const SIGNIN_NEW_USER = "SIGNIN_NEW_USER";
export const SIGNIN_FAILED = "SIGNIN_FAILED";
export const GET_USER_ACCOUNT_SUCCESSFUL = "GET_USER_ACCOUNT_SUCCESSFUL";

/**
 * Log a googleAuthUser in.
 *
 * @function
 * @param {string} authType
 * @param {Dispatch} dispatch
 * @param {string} [email]
 * @param {string} [password]
 */
export const signIn = ( authType, dispatch, email, password ) => {
  
  dispatch( { type: SIGNIN_INIT } );
  if( authType === EMAIL_PROVIDER ){
    firebase.auth()
      .signInWithEmailAndPassword( email, password )
      .then( result => {
        signedIn( result.user, dispatch );
        checkUserRegistered( result.user.uid, dispatch );
        
      } )
      .catch( error => {
        console.log( error );
        dispatch( action( SIGNIN_FAILED ) );
      } );
    return;
  }
  
  const provider = providers[ authType ];
  firebase
    .auth()
    .signInWithPopup( provider )
    .then( function( result ){
      
      if( result.user ){
        signedIn( result.user, dispatch );
        checkUserRegistered( result.user.uid, dispatch );
      }else{
        dispatch( action( SIGNIN_FAILED ) );
      }
    } )
    .catch( function( error ){
      console.log( error );
      dispatch( action( SIGNIN_FAILED ) );
      
    } );
  
};

export const signOut = ( dispatch ) => {
  firebase.auth().signOut().then( () => {
    signedOut( dispatch );
  } ).catch( err => {
    console.log( err );
  } );
};

/**
 * Checks a user is registered.
 *
 * @function
 * @param {string} uid - unique user id from google auth
 * @param {Dispatch} dispatch - function from useStateValue() hook.
 */
export const checkUserRegistered = ( uid, dispatch ) => {
  store.collection( "users" )
    .doc( uid )
    .get()
    .then( res => {
      
      if( res.exists ){
        const data = res.data();
        dispatch( action( GET_USER_ACCOUNT_SUCCESSFUL, data ) );
      }else{
        dispatch( action( SIGNIN_NEW_USER ) );
      }
    } )
    .catch( err => {
      console.log( err );
    } );
};

export const REGISTER_INIT = "REGISTER_INIT";
export const REGISTER_SUECESSFUL = "REGISTER_SUECESSFUL";
export const REGISTER_FAILED = "REGISTER_FAILED";

/**
 * Register a new User
 *
 * @function
 * @param {User} user
 * @param {function} dispatch
 */
export const register = ( user, dispatch ) => {
  
  dispatch( action( REGISTER_INIT ) );
  store.collection( "users" ).doc( user.uid ).set( user ).then( res => {
    dispatch( action( REGISTER_SUECESSFUL, user ) );
  } ).catch( err => {
    console.log( err );
    dispatch( action( REGISTER_FAILED ) );
  } );
};