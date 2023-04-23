function detailEndpoint(id) {
    return `${process.env.REACT_APP_API_DETAIL_URL}${id}`;
}

export { detailEndpoint };