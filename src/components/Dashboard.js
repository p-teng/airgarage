import React, { useState } from 'react';
import axios from "axios";
import queryString from 'query-string';
import { apiKey } from '../apiKey';

import Typography from '@material-ui/core/Typography';
import Textfield from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import LinearProgress from '@material-ui/core/LinearProgress';

import SearchIcon from '@material-ui/icons/Search';
import CustomTable from './CustomTable';

export default function Dashboard() {
    const API_KEY = apiKey;
    const [response, setResponse] = useState([])
    const [businesses, setBusinesses] = useState([])
    const [location, setLocation] = useState("");
    const [loading, setLoading] = useState(false);

    function apiCall() {
        setLoading(true);
        var queryParams = {
            "location": location,
            "term": "parking" // set as static
        }
        const query = queryString.stringify(queryParams);
        axios.get(`http://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?${query}`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        })
        .then((response) => {
            setResponse(response.data);
            setBusinesses(response.data.businesses);
            setLoading(false);
        })
        .catch((e) => {
            console.log(e);
            setLoading(false);
        })
    }

    const handleChange=(event)=>{
        setLocation(event.target.value);
        event.preventDefault();
    }

    return(
        <div>
            <Typography variant="h3" style={{marginTop: "2vh"}}>
                Gar
                <i style={{color: 'grey'}}>b</i>
                age
            </Typography>

            <Typography variant="h5" style={{marginTop: "1vh"}}>
                Finding terrible parking just became easier.
            </Typography>

            <Textfield variant="outlined"
                style={{width: "20vw", marginTop: "1vh"}}
                value={location} 
                onChange={handleChange} 
                label="Search by location"
                placeholder="San Francisco"
                onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {
                        apiCall();
                        ev.preventDefault();
                    }
                }}
                InputProps={{
                    endAdornment: <InputAdornment position="end">
                                        <IconButton onClick={()=>apiCall()}>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>,
                }}/>
            {loading ? <LinearProgress style={{width: "20%", marginLeft: "40%", marginTop: "3px"}}/> : <div />}
            <CustomTable businesses={businesses} />
        </div>
    )
}