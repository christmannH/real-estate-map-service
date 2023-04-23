/**
 * Copyright(C) 2022 freelancer.com/AfterHoursTech
 * ALL RIGHTS RESERVED. NOT OPEN SOURCE.
 */
import { useEffect, useState } from 'react';

function useSearchService(filterState) {

    const [data, setData] = useState();

    function reset() {
        setData(null);
    }

    useEffect(() => {
        if (filterState.keywords === '') return;
        // console.log(filterState);

        reset();
        fetch(process.env.REACT_APP_API_SEARCH_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...filterState,
            keywords: String(filterState.keywords)
          })
        })
          .then(response => response.json())
          .then(data => { setData(data); })
          .catch(error => console.log(error))
      }, [filterState]);

    return data;
}

export { useSearchService };