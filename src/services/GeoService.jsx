const geoService = () => {
  const result = fetch('/ZIP_CODES.geojson').then(res => res.json())
  return result
}

export default geoService