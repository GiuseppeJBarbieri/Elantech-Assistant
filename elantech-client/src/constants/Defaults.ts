import ICompany from '../types/ICompany';
import IProduct from '../types/IProduct';
import IQuote from '../types/IQuote';

export const defaultProduct = (): IProduct => {
    return JSON.parse(JSON.stringify({
        id: 0,
        productNumber: '',
        userId: 0,
        altNumber1: '',
        altNumber2: '',
        altNumber3: '',
        altNumber4: '',
        altNumber5: '',
        altNumber6: '',
        quantity: 0,
        productType: '',
        brand: '',
        description: '',
        ebayLink: '',
        websiteLink: '',
        quickSpecsLink: '',
        relatedTags: ''
    }))
}

export const defaultCompany = (): ICompany => {
    return JSON.parse(JSON.stringify({
        id: 0,
        companyType: '',
        companyName: '',
        companyRep: '',
        phoneNumber: '',
        email: '',
        location: '',
        comments: '',
    }))
}

export const defaultQuote = (): IQuote => {
    return JSON.parse(JSON.stringify({
        id: 0,
        companyID: 0,
        userID: 0,
        dateQuoted: '',
        sold: false,
    }))
}

export const defaultAlert = () => {
    return JSON.parse(JSON.stringify({
        label: '',
        type: 'danger',
        show: false
    }))
}
