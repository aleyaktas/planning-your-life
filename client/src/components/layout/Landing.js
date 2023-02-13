import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { getTodoList } from "../../actions/todolist";

const Landing = ({ isAuthenticated, getTodoList }) => {
  let history = useHistory();
  const fetchId = async () => {
    var myDayId = await getTodoList();
    if (isAuthenticated) history.push(`/todolist/${myDayId}`);
  };

  useEffect(() => {
    fetchId();
  }, [fetchId]);

  return (
    <div>
      <section className="landing">
        <div className="overlay">
          <div className="landing-inner">
            <div className="landing-text-container">
              <p className="landing-text">
                Step into a more organized life by creating a free account
              </p>
              {/* <button className="account-button">Create Account</button> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  getTodoList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getTodoList })(Landing);
