export default function Login() {
  return (
    <div className="signin ">
      <div className="sign-container">
        <div className="sign-logo">
          <i className="s-logo fa fa-mixcloud" aria-hidden="true"/>
          <p>SongCloud</p>
        </div>
        <form action="submit" className="signin-form">
          <h3>Log in</h3>
          <label htmlFor="user-name">User Name</label>
          <br/>
          <input type="text" id="user-name" className="signin-input"/>
          <br/>
          <label htmlFor="password">Password</label>
          <br/>
          <input type="text" id="password" className="signin-input"/>
          <div className="ca-holder">
            <p>Don’t have an account yet?
              <a href="#" className="ca-link">Create Account</a>
            </p>
          </div>
        </form>

      </div>
    </div>
  );
};
