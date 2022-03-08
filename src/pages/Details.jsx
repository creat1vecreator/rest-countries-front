import React from 'react';
import axios from 'axios';
import {useState, useEffect} from "react";
import {IoArrowBack} from 'react-icons/io5';
import {useHistory, useParams} from "react-router-dom";
import {searchByCountry} from "../config";
import Button from "../components/Button";
import Info from "../components/Info";


export const Details = () => {
    const {name} = useParams();

    const {push, goBack} = useHistory();

    const[country, setCountry] = useState(null);
    console.log(country)

    useEffect(() => {
        axios.get(searchByCountry(name))
            .then(({data}) => setCountry(data[0]));

    }, [name])



    return (

        <div>
            <Button onClick={goBack}>
                <IoArrowBack/> Back
            </Button>
            {
                country && (
                    <Info push={push}{...country}/>
                )
            }

            Details {name}

        </div>
    );
};

