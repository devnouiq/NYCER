import React, { useState } from 'react';

interface SignInState {
  username: string;
  password: string;
  errorMessage: string;
}

const SignIn: React.FC = () => {
  const [signInState, setSignInState] = useState<SignInState>({
    username: '',
    password: '',
    errorMessage: ''
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setSignInState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    // Basic input validation
    if (!signInState.username || !signInState.password) {
      setSignInState(prevState => ({
        ...prevState,
        errorMessage: 'Please enter both username and password.'
      }));
      return;
    }

    // Clear error message if inputs are valid
    setSignInState(prevState => ({
      ...prevState,
      errorMessage: ''
    }));

    // Here you can proceed with the authentication logic
    // For example, you can use AWS Amplify Auth.signIn method
    // or any other authentication service.
    console.log('Username:', signInState.username);
    console.log('Password:', signInState.password);
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            value={signInState.username} 
            onChange={handleInputChange} 
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={signInState.password} 
            onChange={handleInputChange} 
          />
        </div>
        {signInState.errorMessage && <div>{signInState.errorMessage}</div>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
