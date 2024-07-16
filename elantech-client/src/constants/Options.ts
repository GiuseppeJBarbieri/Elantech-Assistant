import { ROUTES } from './API'
import { PAGE_ROUTES } from './PageRoutes'

export const brandOptionsList = {
    'HPE': 'HPE',
    'Dell': 'Dell',
    'Cisco': 'Cisco',
    'HP': 'HP'
}
export const typeOptionsList = {
    'Riser': 'Riser',
    'CPU': 'CPU',
    'Other': 'Other'
}
export const typeList = [
    'Riser',
    'CPU',
    'Other'
]
export const orderType = [
    'New Factory Sealed',
    'New Opened Box',
    'Renew',
    'Used',
    'Damaged'
]
export const brandList = ['3M', '8x8', 'Acer', 'Adobe', 'AMD', 'APC', 'Apple', 'Aruba', 'ASUS', 'Autodesk', 'Avaya', 'Avepoint', 'AVer', 'AWS', 'Barco', 'Barracuda Networks', 'Belkin', 'BenQ', 'Bitdefender', 'Black Box', 'BlueJeans', 'Brother', 'Canon', 'Capsa Healthcare', 'CDW Product Protection', 'Check Point', 'Cisco', 'Citrix', 'Code', 'Cohesity', 'Commvault', 'Cradlepoint', 'CrowdStrike', 'CyberPower', 'Cybereason', 'Dell Client', 'Dell Technologies Solutions', 'DocuSign', 'DTEN', 'Dynabook', 'Eaton', 'Elo', 'Epson', 'Ergotron', 'ExtraHop', 'Extreme Networks', 'F5', 'FireEye', 'Five9', 'Forcepoint', 'Fortinet', 'Fujitsu', 'Google', 'GoTo', 'Hewlett Packard Enterprise', 'Hitachi Vantara', 'Honeywell', 'HP', 'Humanscale', 'IBM', 'Intel', 'i-PRO Americas', 'Ivanti', 'Jabra', 'Jamf', 'Juniper Networks', 'Kingston', 'Kodak', 'Legrand', 'Lenovo Client', 'Lenovo Data Center Group', 'Lexmark', 'LG', 'Logitech', 'Mandiant', 'Micron', 'Microsoft', 'Milestone', 'Molex', 'MSI Computer Corp', 'Neat', 'NetApp', 'NETGEAR', 'Netskope', 'Newline', 'Nutanix', 'NVIDIA', 'Okta', 'OtterBox', 'Owl Labs', 'Palo Alto Networks', 'Panasonic', 'Park Place', 'Peerless-AV', 'Planar', 'PNY', 'Poly', 'Progress', 'Promethean', 'Proofpoint', 'Pure Storage', 'QNAP', 'Quest Software', 'Red Hat', 'RSA', 'Rubrik', 'Ruckus', 'Samsun', 'Seagate Technology', 'Service Express', 'Sharp/NEC', 'SonicWall', 'Sophos', 'SUSE', 'StarTech.com', 'Symantec', 'Sysdig', 'Tableau', 'Tanium', 'Targus', 'Tenable', 'Thales', 'Trellix', 'Trend Micro', 'Tripp Lite', 'Veeam', 'Veritas', 'Vertiv', 'ViewSonic', 'VMware', 'Vonage', 'WatchGuard', 'Western Digital', 'Worth Ave. Group', 'Xerox', 'Yealink', 'Zebra', 'Zendesk', 'Zoom']
export const conditionList = [
    'New Factory Sealed',
    'New Opened Box',
    'Renew',
    'Used',
    'Damaged'
]

export const NavigationParams = [
    {
        PageRoute: PAGE_ROUTES.HOME,
        IconType: 'HouseDoor',
        LabelText: 'Home',
        IsVisible: true
    },
    {
        PageRoute: PAGE_ROUTES.QUOTES,
        IconType: 'Shop',
        LabelText: 'Quotes',
        IsVisible: true
    },
    {
        PageRoute: PAGE_ROUTES.RECEIVING,
        IconType: 'Truck',
        LabelText: 'Receiving',
        IsVisible: true
    },
    {
        PageRoute: PAGE_ROUTES.OUTGOING,
        IconType: 'HouseDoor',
        LabelText: 'Outgoing',
        IsVisible: false
    },
    {
        PageRoute: PAGE_ROUTES.PROCUREMENT,
        IconType: 'HouseDoor',
        LabelText: 'Procurement',
        IsVisible: false
    },
    {
        PageRoute: PAGE_ROUTES.RECEIVING,
        IconType: 'HouseDoor',
        LabelText: 'Broker Bin',
        IsVisible: false
    },
    {
        PageRoute: PAGE_ROUTES.PROCUREMENT,
        IconType: 'CartPlus',
        LabelText: 'Removed',
        IsVisible: true
    },
    {
        PageRoute: PAGE_ROUTES.PROCUREMENT,
        IconType: 'CartPlus',
        LabelText: 'Completed Orders',
        IsVisible: false
    },
    {
        PageRoute: PAGE_ROUTES.PROCUREMENT,
        IconType: 'CartPlus',
        LabelText: 'Current Orders',
        IsVisible: false
    },
    {
        PageRoute: PAGE_ROUTES.SETTINGS,
        IconType: 'Gear',
        LabelText: 'Settings',
        IsVisible: true
    },
]