const Login = (state = localStorage.getItem('token'), action) => {
   switch (action.type) {
	  case "LOGIN":
		 return state = true;
	  case "LOGOUT":
		 return state = false;
	  case "TODO_DETAILS":
		 return state = false;
	  default:
		 return state;
   }
};

export default Login;