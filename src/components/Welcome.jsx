
import studyGirl from "../assets/study-girl.png";

function Welcome() {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <div className="welcome-card">

      {/* Welcome Text */}
      <div className="welcome-text">
        <p className="welcome-date">{formattedDate}</p>

        <h2>Welcome to FocusFlow! 💜</h2>

        <p className="welcome-message">
          Small steps today,
          <br />
          big achievements tomorrow!
        </p>
      </div>

      {/* Study Illustration */}
      <div className="welcome-image">
        <img src={studyGirl} alt="Girl studying with laptop and notebook" />
      </div>

    </div>
  );
}

export default Welcome;
