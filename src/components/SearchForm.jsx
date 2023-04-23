import { useEffect, useState } from 'react';
import Select from 'react-select'
import {FaMapMarkerAlt} from 'react-icons/fa'

import './SearchForm.scss';
import geoService from '../services/GeoService';

const SearchForm = (props) => {
    const {
        filterStatus,
        setFilterStatus,
        userZip
    } = props

    const [options, setOptions] = useState([])
    const [value, setValue] = useState('');

    const currLocOpt = [{
        'value': userZip,
        'label': <div><FaMapMarkerAlt/><span>   Current Location</span></div>
    }]

    const handleChange = (e) => {
        setValue(e.label)
        setFilterStatus({
            ...filterStatus,
            keywords : e.value
        })
    }

    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          minHeight: '34px',
          height: '34px',
          textOverflow: "ellipsis",
          minWidth: "300px"
        }),
        valueContainer: (provided, state) => ({
          ...provided,
          height: '32px',
          padding: '0 5px',
          textOverflow: "ellipsis",
          fontSize: "14px"
        }),
        input: (provided, state) => ({
          ...provided,
          margin: '0px',
        }),
        indicatorSeparator: state => ({
          display: 'none',
        }),
        indicatorsContainer: (provided, state) => ({
          ...provided,
          height: '34px',
        }),
    };

    useEffect(() => {
        async function searchPosition() {
            const geojson = await geoService();
            const temp = []

            geojson.features.forEach(item => {
                const twin = temp.find(one => one.label === item.label);
                if(!twin) {
                    temp.push({
                        'value' : item.properties.ZIP,
                        'label' : item.properties.COMMUNITY + ' ' + item.properties.ZIP
                    })
                }
            })
            setOptions(temp)
        }
        searchPosition()
    }, [filterStatus]);

    return (
        <>
            <Select
                onInputChange={setValue}
                options={value ? options : currLocOpt}
                onChange={handleChange}
                styles={customStyles}
                placeholder = 'City, Neighborhood, ZIP, Address'
            />
        </>
    )
}

export default SearchForm;