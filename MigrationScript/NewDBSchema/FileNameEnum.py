from enum import Enum

class FileNameEnum(Enum):
    """Enum for the file names of the database schema files."""
    PRODUCT = 'New_Product_List'
    COMPANY = 'New_Company_List'
    INVENTORY = 'New_Inventory'
    QUOTE = 'New_Quote'
    QUOTED_PRODUCT = 'New_Quoted_Product'
    RECEIVED_ORDER = 'New_Received_Order'
    RECEIVED_ITEM = 'New_Received_Item'