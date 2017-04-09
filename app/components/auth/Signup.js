export default function Signup() {
  return (
    <div className="signin ">
      <div className="sign-container">
        <div className="sign-logo">
          <i className="s-logo fa fa-mixcloud" aria-hidden="true"/>
          <p>SongCloud</p>
        </div>
        <form action="submit" className="signin-form">
          <h3>Create account</h3>
          <label htmlFor="user-name">User Name</label>
          <br/>
          <input type="text" id="user-name" className="signin-input"/>
          <br/>
          <label htmlFor="password">Password</label>
          <br/>
          <input type="text" id="password" className="signin-input"/>
          <button className="continue-btn">CONTINUE</button>
          <div className="ca-holder">
            <p>Already have an account?
              <a href="#" className="ca-link">Sign In</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
