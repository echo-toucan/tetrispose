/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as Camera} from './camera'
export {default as CurrentShape} from './CurrentShape'
export {default as PreviewShape} from './PreviewShape'
export {default as GameBoard} from './GameBoard'
export {default as Timer} from './Timer'
// export {default as gameItems} from './icons'
