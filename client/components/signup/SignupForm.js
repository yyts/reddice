import React from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';
import classnames from 'classnames';
import validateInput from '../../../server/shared/validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';

// import { browserHistory } from 'react-router';

class SignupForm extends React.Component{
	constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      timezone: '',
      errors: {},
      isLoading: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

	
	onChange(e){
		this.setState({
			[e.target.name]:e.target.value
		});
	}
	
	isValid(){
		// console.log(this.state);
		const { errors, isValid } = validateInput(this.state);
		
		if(!isValid){
			this.setState({ errors });
		}
		setTimeout(()=>console.log(this.state),300)
		return isValid;
	}

	// onSubmit(e) {
	//   e.preventDefault();

	//   if (this.isValid()) {
	//     this.setState({ errors: {}, isLoading: true });
	//     this.props.userSignupRequest(this.state).then(
	//       () => {
	//         this.props.addFlashMessage({
	//           type: 'success',
	//           text: 'You signed up successfully. Welcome!'
	//         });
	//         this.context.router.push('/');
	//       },
	//       ({ data }) => this.setState({ errors: data, isLoading: false })
	//     );
	//   }
	// }

	onSubmit(e) {
	  e.preventDefault();
		
	  if( this.isValid() ){
		  this.setState({ errors:{}, isLoadding:true });
		  let _this = this;
		  this.props.userSignupRequest(this.state)
			  .then(
				()=>{
					console.log(this);
					this.props.addFlashMessage({
						type:'success',
						text:'You signed up successfully. welcome!'
					});
					this.context.router.push('/');
				})
			  .catch( 
			  	(error) => {
			  		_this.setState({ errors: error.response['data'], isLoadding:false });
			  		console.log(error.response['data']);
		  });
	  }

	    // this.setState({ errors:{}, isLoadding:true });
	    // let _this = this;
	    // this.props.userSignupRequest(this.state)
	  	 //  .then(
	  		// ()=>{})
	  	 //  .catch( 
	  	 //  	(error) => {
	  	 //  		_this.setState({ errors: error.response['data'], isLoadding:false });
	  	 //  		console.log(error.response['data']);
	    // });

	  

	}

	render(){
		// console.log(timezones);
		const { errors } = this.state; 
		const options = map(timezones, (val,key)=>
			<option key={val} value={val}>{key}</option>
		);
	

		return (
			<form onSubmit={this.onSubmit}>
				<h1>Join our community!</h1>
				
				<TextFieldGroup
					error={errors.username}
					label="Username"
					onChange={this.onChange}
					value={this.state.username}
					field="username" />

				<TextFieldGroup
					error={errors.email}
					label="Email"
					onChange={this.onChange}
					value={this.state.email}
					field="email" />

				<TextFieldGroup
					error={errors.password}
					label="Password"
					onChange={this.onChange}
					value={this.state.password}
					field="password" />

				<TextFieldGroup
					error={errors.passwordConfirmation}
					label="Password Confirmation"
					onChange={this.onChange}
					value={this.state.passwordConfirmation}
					field="passwordConfirmation" />

				
				<div className="form-group">
					<lable className="control-label">Timezone</lable>
					<select name="timezone" className="form-control" onChange={this.onChange} value
					={this.state.timezone}>
						<option disabled> Choose your Timezone</option>
						{options}
					</select>
				</div>

				<div className="form-group">
					<button disabled={this.state.isLoadding} className="btn btn-primary btn-lg">
						Sign up
					</button>
				</div>

			</form>
		)
	}
}

SignupForm.propTypes = {
	userSignupRequest: React.PropTypes.func.isRequired,
	addFlashMessage: React.PropTypes.func.isRequired
}

SignupForm.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default SignupForm;