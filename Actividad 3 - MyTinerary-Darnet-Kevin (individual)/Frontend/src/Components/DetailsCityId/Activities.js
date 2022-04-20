import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import activitiesActions from "../Redux/actions/activitiesActions";

function Activities(props) {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    props
      .findOneActivityPerItinerary(props.id)
      .then((res) => setActivities(res.response));
  }, [props.id]);

  return (
    <>
      {activities?.map((activity) => {
        return (
          <div className="conteinerActivities">
            <div className="divTitleActivity">
              <h3 className="titleActivity">{activity.name}</h3>
            </div>
            <div className="divImgActivity">
              <img className="imgActivities" src={activity.image} />
            </div>
          </div>
        );
      })}
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    oneActivityPerItinerary: state.activitiesReducer.oneActivityPerItinerary,
  };
};

const mapDispatchToProps = {
  findOneActivityPerItinerary: activitiesActions.findOneActivityPerItinerary,
};
export default connect(mapStateToProps, mapDispatchToProps)(Activities);
