export default function Signup() {
  return (
    <div className="signin ">
      <div className="sign-container g--6 m--6">
        <div className="sign-logo">
          <i className="s-logo fa fa-mixcloud" aria-hidden="true"/>
          <p>SongCloud</p>
        </div>
        <form action="submit" className="signin-form">
          <h3>Create Account</h3>
          <label htmlFor="user-name">User Name</label>
          <br/>
          <input type="text" id="user-name" className="signin-input"/>
          <br/>
          <label htmlFor="password">Password</label>
          <br/>
          <input type="text" id="password" className="signin-input"/>
        </form>

      </div>
    </div>
  );
};
