import { createContext, useState, useEffect } from 'react';

import SHOP_DATA from '../shop-data.js';

import { addCollectionAndDocument, getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.jsx';


export const CategoriesContext = createContext({
    categoriesMap: {},

});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    // Creates shop items in the DB - ONLY ran once - so commented out now
    // useEffect(() => {
    //     addCollectionAndDocument('categories', SHOP_DATA)
    // }, []);

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap);
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    }, []);

    const value = { categoriesMap };

    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}