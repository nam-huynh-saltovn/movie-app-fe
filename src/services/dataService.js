import axios from "axios";
import { API_ROOT } from '../constants/constants';

const apiUrl = API_ROOT;

export const fetchDataOptions = async (updateOptionState, setIsLoading) => {
    setIsLoading(true);
    try {
      const endpoints = ['type', 'year', 'category', 'country', 'actor', 'director'];

      // call promise all api to get data type, year, category,.....from BE 
      const responses = await Promise.all(
          endpoints.map(endpoint => axios.get(`${apiUrl}/api/v1/${endpoint}`))
      );

      const [typeData, yearData, categoryData, countryData, actorData, directorData] = responses.map(res => res.data);
      // set states for options to use in <select /> (type, year, category,.....)
      updateOptionState('typeOptions', formatOptions(typeData, 'type_id', 'type_name'));
      updateOptionState('yearOptions', formatOptions(yearData, 'year_id', 'year_name'));
      updateOptionState('categoryOptions', formatOptions(categoryData, 'cat_id', 'cat_name'));
      updateOptionState('countryOptions', formatOptions(countryData, 'ctr_id', 'ctr_name'));
      updateOptionState('actorOptions', formatOptions(actorData, 'act_id', 'act_name'));
      updateOptionState('directorOptions', formatOptions(directorData, 'dir_id', 'dir_name'));
    } catch (error) {
      console.error("Error fetching movie data", error);
    } finally {
      setIsLoading(false);
    }
}

export const setDataMovie = (optionState, data, updateState) =>{
    updateState("name", data.mov_name || '');
    updateState("slug", data.mov_slug || '');
    updateState("originName", data.ori_name || '');
    updateState("content", data.content || '');
    updateState("posterUrl", data.poster_url || '');
    updateState("thumbUrl", data.thumb_url || '');
    updateState("time", data.time || '');
    updateState("currentEp", data.episode_current || '');
    updateState("totalEp", data.episode_total || '');
    updateState("quality", data.quality || '');
    updateState("lang", data.lang || '');
    updateState("year", data.Year.year_id || '');
    updateState("type", data.Type.type_id || '');

    // Filter categories by slug and setCategoryState if valid
    const filteredCategories = data.Categories.map(category =>
        findOrCreateOption(optionState.categoryOptions, 'cat_slug', category, {
            ...category,
            value: category.cat_id,
            label: category.cat_name
        })
    );
    updateState("category", filteredCategories); // set state for category

    // Filter countries by slug and setCountryState if valid
    const filteredCountries = data.Countries.map(country =>
        findOrCreateOption(optionState.countryOptions, 'ctr_id', country, {
            ...country,
            value: country.ctr_id,
            label: country.ctr_name
        })
    );
    updateState("country", filteredCountries); // set state for country

    // Filter actors by act_name and setActorState if valid
    const filteredActors = data.Actors.map(actor =>
        findOrCreateOption(optionState.actorOptions, 'act_name', actor, {
            act_name: actor,
            sort_order: 10,
            value: actor.act_id,
            label: actor.act_name
        })
    );
    updateState("actor", filteredActors); // set state for actor

    // Filter director by dir_name and setDirectorState if valid
    const filteredDirectors = data.Directors.map(director =>
            findOrCreateOption(optionState.directorOptions, 'dir_name', director, {
                ...director,
                value: director.dir_id,
                label: director.dir_name
            })
        );
    updateState("director", filteredDirectors); // set state for director
}

export const getData = async (endpoint, value) => {
    try {
        console.log(`${apiUrl}/api/v1/${endpoint}/${value}`);
        
        // call promise all api to get data type, year, category,.....from BE 
        const result = await axios.get(`${apiUrl}/api/v1/${endpoint}?${value}`);
        return result.data;
    } catch (error) {
      console.error("Error fetching movie data", error);
    }
}

const findOrCreateOption = (options, key, value, defaultOptions) => options.find(option => option[key] === value) || defaultOptions;

// Utility function to format options
const formatOptions = (data, valueField, labelField, slugField = null) =>
data.map(item => ({
    ...item,
    // add field value and label to use in <Select /> library
    value: item[valueField], 
    label: item[labelField],
    ...(slugField && { slug: item[slugField] }),
}));