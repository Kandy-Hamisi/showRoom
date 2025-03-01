import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
    const headers = {
        'X-RapidAPI-Key': '8ca5b4ac9amsh16c2e94d866c2bbp103240jsnab580d52147e',
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    }

    const { manufacturer, year, model, fuel, limit } = filters;

    const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&fuel_type=${fuel}`, {
        headers: headers,
    });

    const result = await response.json();

    return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; //Base rental price per day in dollars

    const mileageFactor = 0.1; // Additional rate per mile driven

    const ageFactor = 0.05; // Additional rate per of vehicle age

    // calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() -year) * ageFactor;

    // Calculate the total renatal rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

    return rentalRatePerDay.toFixed(0);
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {

    // key... hrjavascript-mastery
    const url = new URL('https://cdn.imagin.studio/getimage');

    const { make, year, model } = car;
    url.searchParams.append('customer', 'img');
    url.searchParams.append('make', make);
    url.searchParams.append('modelFamily', model.split(' ')[0]);
    url.searchParams.append('ZoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${year}`);
    url.searchParams.append('angle', `${angle}`);
    

    return `${url}`;

}

export const UpdateSearchParams = (type: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set(type, value);

    const newPathName = `${window.location.pathname}?${searchParams.toString()}`;

    return newPathName;
}