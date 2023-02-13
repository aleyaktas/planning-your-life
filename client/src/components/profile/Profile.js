import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import iconUser from "../../img/user-icon.png";
import ResetPassword from "../modals/ResetPassword";
import showNotice from "../../utils/showNotice";
import { resetPassword } from "../../actions/auth";

const Profile = ({ user, resetPassword }) => {
  // for reset password
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const modalClose = () => setShowModal(false);
  const modalShow = () => setShowModal(true);

  const onChange = (e) => setPassword(e.target.value);

  const onClickChangePassword = async () => {
    var status = await resetPassword({ password });
    if (status == 200) {
      showNotice("😺 Password updated", "success");
    }
    modalClose();
  };

  return (
    <section>
      <div className="profile" style={{ height: "93vh" }}>
        <div className="profile-inner">
          <div style={{ borderRadius: 10 }}>
            <div class="card-container">
              <img class="round" src={iconUser} alt="user" />
              <h3 style={{ marginBottom: 9 }}>
                {user?.firstname} {user?.lastname}
              </h3>
              <h6 style={{ marginBottom: 9, marginTop: 7 }}>{user?.email}</h6>
              <button
                onClick={modalShow}
                style={{ color: "white", marginTop: 13, borderRadius: 10 }}
                className="btn btn-success"
              >
                Change password
              </button>
            </div>
          </div>
        </div>
      </div>
      <ResetPassword
        showModal={showModal}
        onChange={onChange}
        modalClose={modalClose}
        onClickChangePassword={onClickChangePassword}
      />
    </section>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  resetPassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { resetPassword })(Profile);
