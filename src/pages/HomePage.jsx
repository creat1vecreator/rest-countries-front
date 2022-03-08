import React, {useEffect, useState} from 'react';
import axios from "axios";
import {ALL_COUNTRIES} from "../config";
import {Controls} from "../components/Controls";
import {List} from "../components/List";
import {Card} from "../components/Card";
import {useHistory} from 'react-router-dom'

export const HomePage = ({countries, setCountries}) => {
    const [filteredCountries, setFilteredCountries] = useState(countries);

    const {push} = useHistory();

    const handleSearch = (search, region) => {
        let data = [...countries];

        if (region) {
            data = data.filter(c => c.region.includes(region));
        }

        if (search) {
            data = data.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
        }
        setFilteredCountries(data);

    };

    useEffect(() => {
        if (!countries.length) {

            axios.get(ALL_COUNTRIES)
                .then(({data}) => {
                    setCountries(data);
                })
        }
    }, []);

    useEffect(() => {
        handleSearch();
    }, [countries]);

    return (
        <>
            <Controls onSearch={handleSearch}/>
            <List>
                {filteredCountries.map(country => {
                        const countryInfo = {
                            img: country.flags.png,
                            name: country.name,
                            info: [{
                                title: 'Population',
                                description: country.population.toLocaleString()
                            },
                                {
                                    title: 'Region',
                                    description: country.region
                                },
                                {
                                    title: 'Capital',
                                    description: country.capital
                                },
                            ]
                        };


                        return <Card key={country.name} img={countryInfo.img} name={countryInfo.name}
                                     info={countryInfo.info} onClick={() => {
                            push(`/country/${country.name}`)
                        }
                        }/>;

                    }
                )
                }

            </List>

        </>
    );
};

