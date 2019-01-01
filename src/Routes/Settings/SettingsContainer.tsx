import React from "react";
import { Mutation, Query } from "react-apollo";
import { GET_PLACES, USER_PROFILE } from "../../sharedQueries";
import { LOG_USER_OUT } from "../../sharedQueries.local";
import { getPlaces, userProfile } from "../../types/api";
import SettingsPresenter from "./SettingsPresenter";

class MiniProfileQuery extends Query<userProfile> {}

class PlacesQeury extends Query<getPlaces> {}

class SettingsContainer extends React.Component {
  public render() {
    return (
      <Mutation mutation={LOG_USER_OUT}>
        {(logUserOut) => (
          <MiniProfileQuery query={USER_PROFILE}>
            {({ data: userData, loading: userDataLoading }) => (
              <PlacesQeury query={GET_PLACES}>
                {({ data: placesData, loading: placesLoading }) => (
                  <SettingsPresenter
                    userDataLoading={userDataLoading}
                    placesLoading={placesLoading}
                    placesData={placesData}
                    userData={userData}
                    logUserOut={logUserOut}
                  />
                )}
              </PlacesQeury>
            )}
          </MiniProfileQuery>
        )}
      </Mutation>
    );
  }
}

export default SettingsContainer;
