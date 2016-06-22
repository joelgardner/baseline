import Signup from './Signup.jsx'
import { connect } from 'react-redux'
import { 
	signUp 
} from '../actions/actions';

const mapStateToProps = (state) => {
  return { 
  	errors : state.errors
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignupClick: (email, password, companyName) => {
      dispatch(signUp(email, password, companyName))
    }
  }
}

const SignupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup)

export default SignupContainer
