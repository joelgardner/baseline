import Login from './Login.jsx'
import { connect } from 'react-redux'
import { 
	attemptLocalAuth 
} from '../actions/actions';

const mapStateToProps = (state) => {
  return { 
  	errors : state.errors
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginClick: (email, password) => {
      dispatch(attemptLocalAuth(email, password))
    }
  }
}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginContainer