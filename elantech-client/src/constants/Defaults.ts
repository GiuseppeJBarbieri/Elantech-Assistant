import IAlert from '../types/IAlert';
import ICompany from '../types/ICompany';
import IInventory from '../types/IInventory';
import IProduct from '../types/IProduct';
import IQuote from '../types/IQuote';
import IQuotedProduct from '../types/IQuotedProduct';
import IReceivedItem from '../types/IReceivedItem';
import IReceiving from '../types/IReceiving';

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
        ebayUrl: '',
        websiteUrl: '',
        quickSpecsUrl: '',
        relatedTags: ''
    }))
}

export const defaultInventory = (): IInventory => {
    return JSON.parse(JSON.stringify({
        id: 0,
        productId: 0,
        serialNumber: '',
        condition: '',
        warrantyExpiration: undefined,
        tested: false,
        testedDate: undefined,
        comment: '',
        location: '',
        reserved: false,
    }))
}

export const defaultCompany = (): ICompany => {
    return JSON.parse(JSON.stringify({
        id: 0,
        userId: 0,
        type: '',
        name: '',
        representative: '',
        phone: '',
        email: '',
        location: '',
        comment: '',
    }))
}

export const defaultQuote = (): IQuote => {
    return JSON.parse(JSON.stringify({
        id: 0,
        companyId: 0,
        userId: 0,
        dateQuoted: new Date(),
        sold: false,
    }))
}

export const defaultQuotedProduct = (): IQuotedProduct => {
    return JSON.parse(JSON.stringify({
        quoteId: 0,
        productId: 0,
        quantity: 0,
        quotedPrice: 0.0,
        productCondition: '',
        comment: '',
    }))
}

export const defaultReceiving = (): IReceiving => {
    return JSON.parse(JSON.stringify({
        companyId: 0,
        purchaseOrderNumber: '',
        orderType: '',
        trackingNumber: '',
        dateReceived: new Date(),
        shippedVia: '',
        comment: '',
    }))
}

export const defaultReceivedItem = (): IReceivedItem => {
    return JSON.parse(JSON.stringify({
        receivingId: 0,
        productId: 0,
        quantity: 0,
        cud: '',
        comment: '',
        finishedAdding: false,
        product: {}
    }))
}


export const defaultAlert = (): IAlert => {
    return JSON.parse(JSON.stringify({
        label: '',
        type: 'danger',
        show: false
    }))
}

export const defaultAlertUnauthorized = (): IAlert => {
    return JSON.parse(JSON.stringify({
        label: 'Account does not have the permissions to delete a company. Please log into a user account that has the required permissions.',
        type: 'danger',
        show: false
    }))
}
