import { useState } from "react";
import GoogleMapReact from "google-map-react";
import { ItemBubble } from "./ItemBubble";
import geoService from "../services/GeoService";

const GoogleMap = ({ initialData, filterStatus, currentLocation, setMaps }) => {
  const [data, setData] = useState(initialData);

  const mergeVisibleArea = (oldData, newData) => {
    let merge = [];
    let oldKeys = new Set(oldData.map((item) => item.id));
    if (newData) {
      newData.forEach((item) => {
        if (!oldKeys.has(item.id)) {
          item.isSecondaryResult = true;
        }
        merge.push(item);
      });
    }
    return merge;
  };

  const mergeDataFunction = (map, maps) => {
    let bounds = new maps.LatLngBounds();
    for (let i = 0; i < data.length; ++i) {
      if (!data[i].latitude || !data[i].longitude) continue;
      let position = new maps.LatLng(data[i].latitude, data[i].longitude);
      bounds.extend(position);
    }
    maps.event.addListener(map, "tilesloaded", () => {
      let bounds = map.getBounds();
      let ne = bounds.getNorthEast();
      let sw = bounds.getSouthWest();

      const myObj = { ...filterStatus };
      delete myObj.keywords;

      fetch(process.env.REACT_APP_API_SEARCH_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          locationType: "tabid_coordinates",
          north: ne.lat(),
          south: sw.lat(),
          east: ne.lng(),
          west: sw.lng(),
          per_page: 5000,
          ...myObj,
        }),
      })
        .then((response) => response.json())
        .then((newData) => setData(mergeVisibleArea(data, newData)))
        .catch((error) => console.log(error));
    });
    map.fitBounds(bounds);
  };

  const handleApiLoaded = async (map, maps) => {
    setMaps(maps);
    mergeDataFunction(map, maps);
    let marker = new maps.Marker({
      position: currentLocation,
      map,
      title: "User Location",
    });
    marker.setMap(map);
    const geojson = await geoService()
    const filterData = geojson.features.find(
      (item) =>
        parseInt(item.properties.ZIP) === parseInt(filterStatus.keywords)
    );
    const triangleCoords = [];
    let bounds = new maps.LatLngBounds();

    filterData?.geometry.coordinates[0].forEach((item) => {
      let position = new maps.LatLng(item[1], item[0]);
      bounds.extend(position);
      const oneCoord = {
        lat: item[1],
        lng: item[0],
      };
      triangleCoords.push(oneCoord);
    });

    var bermudaTriangle = new maps.Polygon({
      paths: triangleCoords,
      strokeColor: "#FF0000",
      strokeWeight: 2,
      fillColor: "transparent",
    });
    bermudaTriangle.setMap(map);
    map.fitBounds(bounds);
  };

  return (
    data && (
      <GoogleMapReact
        yesIWantToUseGoogleMapApiInternals
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_KEY,
          libraries: "places",
        }}
        defaultZoom={12}
        defaultCenter={currentLocation}
        onGoogleApiLoaded={({ map, maps }) => {
          handleApiLoaded(map, maps)
        }}
      >
        {data.map((item, i) => {
          const duplicatedItems = data.filter(
            (checkItem) =>
              checkItem.latitude === item.latitude &&
              checkItem.longitude === item.longitude
          );
          return (
            <ItemBubble
              key={item["id"]}
              lat={item["latitude"]}
              lng={item["longitude"]}
              item={item}
              duplicatedItems={duplicatedItems}
            />
          );
        })}
      </GoogleMapReact>
    )
  );
};

export default GoogleMap;
