import React from "react";
import ReactDom from "react-dom";
import FindAddressPresenter from "./FindAddressPresenter";

interface IState {
  lat: number;
  lng: number;
}

class FindAddressContainer extends React.Component<any, IState> {
  public mapRef: any;
  public map: google.maps.Map;
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }
  public componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSucces,
      this.handleGeoError
    );
  }

  public render() {
    return <FindAddressPresenter mapRef={this.mapRef} />;
  }

  public handleGeoError = () => {
    return;
  };

  public handleGeoSucces = (position: Position) => {
    const {
      coords: { latitude, longitude }
    } = position;
    this.setState({
      lat: latitude,
      lng: longitude
    });
    this.loadMap(latitude, longitude);
  };

  public loadMap = (lat, lng) => {
    const { google } = this.props;
    const maps = google.maps;
    const mapNode = ReactDom.findDOMNode(this.mapRef.current);
    const mapConfig: google.maps.MapOptions = {
      center: {
        lat,
        lng
      },
      disableDefaultUI: true,
      zoom: 11
    };
    this.map = new maps.Map(mapNode, mapConfig);
    this.map.addListener("dragend", this.handleDragEnd);
  };
  public handleDragEnd = () => {
    const newCenter = this.map.getCenter();
    const lat = newCenter.lat();
    const lng = newCenter.lng();
    this.setState({
      lat,
      lng
    });
  };
}

export default FindAddressContainer;