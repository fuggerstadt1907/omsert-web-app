import { getRequest } from '../http/HttpService';
import { ENDPOINTS } from '../api';

export const getAllCountries = () => getRequest(ENDPOINTS.COUNTRY.ALL);

export const getCountryByName = (country) => getRequest(ENDPOINTS.COUNTRY.NAME + '/' + country);