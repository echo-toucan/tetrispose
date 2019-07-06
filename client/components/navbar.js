import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Menu, Container} from 'semantic-ui-react'

class Navbar extends Component {
  state = {activeItem: 'home'}

  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  render() {
    const {activeItem} = this.state
    const {handleClick, isLoggedIn} = this.props

    return (
      <Menu secondary fixed="top">
        <Menu.Item
          name="home"
          as={Link}
          to="/"
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        />
        {isLoggedIn ? (
          <Menu.Item
            name="logout"
            as={Link}
            to="#"
            active={activeItem === 'logout'}
            onClick={handleClick}
          />
        ) : (
          <Fragment>
            <Menu.Item
              position="right"
              name="login"
              active={activeItem === 'login'}
              onClick={this.handleItemClick}
              as={Link}
              to="/login"
            />
            <Menu.Item
              name="signup"
              as={Link}
              to="/signup"
              active={activeItem === 'signout'}
              onClick={this.handleItemClick}
            />
          </Fragment>
        )}
      </Menu>
    )
  }
}

// const Navbar = ({handleClick, isLoggedIn}) => (
//   <div>
//     <h1>VR Tetris</h1>
//     <nav>
//       {isLoggedIn ? (
//         <div>
//           {/* The navbar will show these links after you log in */}
//           <Link to="/home">Home</Link>
//           <a href="#" onClick={handleClick}>
//             Logout
//           </a>
//         </div>
//       ) : (
//         <div>
//           {/* The navbar will show these links before you log in */}
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Sign Up</Link>
//         </div>
//       )}
//     </nav>
//     <hr />
//   </div>
// )

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
