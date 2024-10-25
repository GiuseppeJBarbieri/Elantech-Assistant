# =========================================================================================
# Created By  : Giuseppe Barbieri
# Created Date: October 2024
# =========================================================================================
# Imports
# =========================================================================================
import json, csv
from typing import List
from NewDBSchema import NewProduct, NewInventory, NewCompany, NewQuotes, NewProductQuote, NewReceivedOrder, NewReceivedItem
from OldDBSchema import Product, Inventory, Company, Quotes, ReceivedOrder, ProductQuote, User
# =========================================================================================
# Start
# =========================================================================================
old_product_list: List[Product] = []
new_product_list: List[NewProduct] = []

old_inventory_list: List[Inventory] = []
new_inventory_list: List[NewInventory] = []

old_quotes_list: List[Quotes] = []
new_quotes_list: List[NewQuotes] = []

old_product_quotes_list: List[ProductQuote] = []
new_product_quotes_list: List[NewProductQuote] = []

old_company_list: List[Company] = []
new_company_list: List[NewCompany] = []

old_received_order_list: List[ReceivedOrder] = []
new_received_order_list: List[NewReceivedOrder] = []

new_received_item_list: List[NewReceivedItem] = []

user_list: List[User] = []

def get_users_json():
    global user_list
    """
    Get all Users from JSON.
    """
    print('Reading in Users from JSON')
    with open("DBDumpJSON/Users.json", 'r') as file:
        data = json.load(file)
        # Map JSON objects to the custom Product class
        user_list = [User(**item) for item in data]

def get_products_json():
    global old_product_list
    """
    Get all Products from JSON.
    """
    print('Reading in Product from JSON')
    with open("DBDumpJSON/Product.json", 'r') as file:
        data = json.load(file)
        # Map JSON objects to the custom Product class
        old_product_list = [Product(**item) for item in data]

def convert_to_new_product_schema():
    global new_product_list
    s = 0
    for x in old_product_list:
        s+=1
        tmpProd = NewProduct(
            id=s,
            userId=1,
            productNumber=x.product_number.replace(",", "|"),
            altNumber1=x.spare_number.replace(",", "|"),
            altNumber2=x.assembly_number.replace(",", "|"),
            altNumber3=x.model_number.replace(",", "|"),
            altNumber4="",
            altNumber5="",
            altNumber6="",
            quantity=x.quantity,
            productType=x.product_type.replace(",", "|"),
            brand=x.brand.replace(",", "|"),
            description=x.description.replace(",", "|"),
            relatedTags=x.related_tags,
            createdAt="2022-01-03 20:38:35.5-05",
            updatedAt="2022-01-03 20:38:35.5-05"
        )
        new_product_list.append(tmpProd)

def save_products_to_file():
    product_header = ['userId', 'productNumber', 'altNumber1', 'altNumber2', 'altNumber3', 'altNumber4', 'altNumber5', 'altNumber6', 'quantity', 'productType', 'brand', 'description', 'relatedTags', 'createdAt', 'updatedAt']
    print('Saving Product List...')
    with open('NewDBDump/New_Product_List.csv', 'w', newline='') as csv_file:
        spam_writer = csv.writer(csv_file, delimiter=',', quotechar='"',  quoting=csv.QUOTE_MINIMAL)
        spam_writer.writerow(product_header)
        for x in new_product_list:
            spam_writer.writerow([x.userId, x.productNumber, x.altNumber1, x.altNumber2, x.altNumber3, 
                                  x.altNumber4, x.altNumber5, x.altNumber6, x.quantity, x.productType, x.brand, 
                                  x.description, x.relatedTags, x.createdAt, x.updatedAt])  

def get_company_json():
    global old_company_list
    """
    Get all Company from JSON.
    """
    print('Reading in Company from JSON')
    with open("DBDumpJSON/Company.json", 'r') as file:
        data = json.load(file)
        # Map JSON objects to the custom Product class
        old_company_list = [Company(**item) for item in data]

def convert_company_to_new():
    global new_company_list
    print('Converting Company to new schema...')
    for x in old_company_list:
        tmpProd = NewCompany(
            id=x.company_id,
            companyType='',
            companyName=x.company_name,
            companyRep='',
            phoneNumber=x.phone_number,
            email='',
            location=x.address.replace('\x9f', '').replace('\x91', '').replace('\ufffd', ''),
            comments=x.company_comments,
            createdAt="2022-01-03 20:38:35.5-05",
            updatedAt="2022-01-03 20:38:35.5-05",
        )
        new_company_list.append(tmpProd)

def save_company_to_file():
    company_header = ['id', 'companyType', 'companyName', 'companyRep', 'phoneNumber', 'email', 'location', 'comments', 'createdAt', 'updatedAt']
    print('Saving Company List...')
    with open('NewDBDump/New_Company_List.csv', 'w', newline='', encoding='utf-8') as csv_file:
        spam_writer = csv.writer(csv_file, delimiter=',', quotechar='"',  quoting=csv.QUOTE_MINIMAL)
        spam_writer.writerow(company_header)
        for x in new_company_list:
            spam_writer.writerow([x.id, x.companyType, x.companyName, x.companyRep, x.phoneNumber, 
                                  x.email, x.location, x.comments, x.createdAt, x.updatedAt])  

def get_quotes_json():
    global old_quotes_list
    """
    Get all Quotes from JSON.
    """
    print('Reading in Quotes from JSON')
    with open("DBDumpJSON/Quotes.json", 'r') as file:
        data = json.load(file)
        # Map JSON objects to the custom Product class
        old_quotes_list = [Quotes(**item) for item in data]

def convert_quotes_to_new():
    global old_quotes_list, new_quotes_list, user_list
    print('Converting Quote to new schema...')
    s=0
    for x in old_quotes_list:
        user_id = 0 
        for y in user_list:
            if(y.username.lower() == x.username.lower()):
                user_id=y.id
                break
            if(x.username == 'Admin'):
                user_id=2
                break

        sold = False
        if(x.sold.lower() == "yes"):
            sold = True

        tmpProd = NewQuotes(
            id=x.quote_id,
            companyId=x.companyID,
            userId=user_id,
            dateQuoted=x.date_quoted + ' 20:38:35.5-05',
            sold=sold,
            createdAt="2022-01-03 20:38:35.5-05",
            updatedAt="2022-01-03 20:38:35.5-05"
        )
        new_quotes_list.append(tmpProd)

def save_quotes_file():
    quotes_header = ['id', 'companyId', 'userId', 'dateQuoted', 'sold', 'createdAt', 'updatedAt']
    print('Saving Quotes List...')
    with open('NewDBDump/New_Quotes.csv', 'w', newline='', encoding='utf-8') as csv_file:
        spam_writer = csv.writer(csv_file, delimiter=',', quotechar='"',  quoting=csv.QUOTE_MINIMAL)
        spam_writer.writerow(quotes_header)
        for x in new_quotes_list:
            spam_writer.writerow([x.id, x.companyId, x.userId, x.dateQuoted,  x.sold, x.createdAt, x.updatedAt])  

def get_quoted_products():
    global old_product_quotes_list
    """
    Get all Product Quotes from JSON.
    """
    print('Reading in Product Quotes from JSON')
    with open("DBDumpJSON/ProductQuotes.json", 'r') as file:
        data = json.load(file)
        # Map JSON objects to the custom Product class
        old_product_quotes_list = [ProductQuote(**item) for item in data]

def convert_quoted_products_to_new():
    global old_product_quotes_list, new_product_quotes_list
    print('Converting Quoted Products to new schema...')
    s=0
    for x in old_product_quotes_list:
        product_id=0
        for y in new_product_list:
            if(y.productNumber == x.product_number):
                product_id = y.id
                break

        s+=1
        tmpProd = NewProductQuote(
            id = s,
            quoteId = x.quote_id,
            productId = product_id,
            quantity = x.quantity,
            quotedPrice = x.quoted_price,
            productCondition = "",
            comment = x.comments.replace('\n',' | '),
            createdAt="2022-01-03 20:38:35.5-05",
            updatedAt="2022-01-03 20:38:35.5-05"
        )
        new_product_quotes_list.append(tmpProd)

def save_quoted_products_file():
    product_quote_header = ['id', 'quoteId', 'productId', 'quantity', 'quotedPrice', 'productCondition', 'comment', 'createdAt', 'updatedAt']
    print('Saving upload list...')
    with open('NewDBDump/New_Quoted_Product.csv', 'w', newline='') as csv_file:
        spam_writer = csv.writer(csv_file, delimiter=',', quotechar='"',  quoting=csv.QUOTE_MINIMAL)
        spam_writer.writerow(product_quote_header)
        for x in new_product_quotes_list:
            spam_writer.writerow([x.id, x.quoteId, x.productId, x.quantity, x.quotedPrice, x.productCondition, x.comment, x.createdAt, x.updatedAt])  

def get_received_order_json():
    global old_received_order_list
    """
    Get all Received Orders from JSON.
    """
    print('Reading in Received Orders from JSON')
    with open("DBDumpJSON/ReceivedOrders.json", 'r') as file:
        data = json.load(file)
        # Map JSON objects to the custom Product class
        old_received_order_list = [ReceivedOrder(**item) for item in data]

# Need to create new companies based off the Orders
def create_company_from_received(order: ReceivedOrder):
    last_company = new_company_list[-1]
    new_id = last_company.id+1
    tmpProd = NewCompany(
            id=new_id,
            companyType='',
            companyName=order.purchased_from,
            companyRep='',
            phoneNumber='',
            email='',
            location='',
            comments='',
            createdAt="2022-01-03 20:38:35.5-05",
            updatedAt="2022-01-03 20:38:35.5-05",
        )
    new_company_list.append(tmpProd)
    return new_id

# Need to finish this
def convert_received_order_to_new():
    global old_received_order_list, new_received_order_list, new_company_list
    print('Converting Received Order to new schema...')
    s=0
    for x in old_received_order_list:
        user_id=0
        for u in user_list:
            if(x.who_received.lower() == (u.first_name.lower() + u.last_name.lower())):
                user_id = u.id
                break

        company_id=0
        for c in new_company_list:
            if(x.purchased_from.lower() == c.companyName.lower()):
                company_id=c.id
                break
        
        if(company_id == 0):
            company_id = create_company_from_received(x)

        s+=1
        tmpProd = NewReceivedOrder(
            id = s,
            poNumber = x.poNumber,
            companyId = company_id,
            userId = user_id,
            orderType = '',
            trackingNumber = '',
            dateReceived = x.time,
            shippedVia='',
            comments=x.comments,
            createdAt=x.time,
            updatedAt=x.time 
        )
        new_received_order_list.append(tmpProd)

def create_received_item():
    global old_received_order_list, new_received_item_list, new_product_list
    s=0
    for x in old_received_order_list:
        orderId = 0
        for y in new_received_order_list:
            if (x.poNumber == y.poNumber):
                orderId = y.id
                break
        productId = 0
        for p in new_product_list:
            if(p.productNumber == x.product_Number):
                productId = p.id
                break
        s+=1
        tmp = NewReceivedItem(
            id=s,
            orderId=orderId,
            productId=productId,
            cud=x.cud,
            comment=x.comments,
            finishedAdding= (True if x.added_to_inventory.lower() == "yes" else False),
            createdAt=x.time,
            updatedAt=x.time
        )
        new_received_item_list.append(tmp)

def save_received_order_file():
    inv_header = ['id', 'poNumber', 'companyId', 'userId', 'orderType', 'trackingNumber', 'dateReceived', 'shippedVia', 'comments', 'createdAt', 'updatedAt']
    print('Saving upload list...')
    with open('NewDBDump/New_Received_Order.csv', 'w', newline='') as csv_file:
        spam_writer = csv.writer(csv_file, delimiter=',', quotechar='"',  quoting=csv.QUOTE_MINIMAL)
        spam_writer.writerow(inv_header)
        for x in new_received_order_list:
            spam_writer.writerow([x.id, x.poNumber, x.companyId, x.userId, x.orderType, x.trackingNumber, x.dateReceived, x.shippedVia, x.comments, x.createdAt, x.updatedAt])  

def save_received_item_file():
    inv_header = ['id', 'orderId', 'productId', 'cud', 'comment', 'finishedAdding', 'createdAt', 'updatedAt']
    print('Saving upload list...')
    with open('NewDBDump/New_Received_Item.csv', 'w', newline='') as csv_file:
        spam_writer = csv.writer(csv_file, delimiter=',', quotechar='"',  quoting=csv.QUOTE_MINIMAL)
        spam_writer.writerow(inv_header)
        for x in new_received_item_list:
            spam_writer.writerow([x.id, x.orderId, x.productId, x.cud, x.comment, x.finishedAdding, x.createdAt, x.updatedAt])  

def get_inventory_json():
    global old_inventory_list
    """
    Get all Inventory from JSON.
    """
    print('Reading in Inventory from JSON')
    with open("DBDumpJSON/Inventory.json", 'r') as file:
        data = json.load(file)
        # Map JSON objects to the custom Product class
        old_inventory_list = [Inventory(**item) for item in data]

def convert_old_inventory_fields():
    global old_inventory_list
    print('Converting Is Tested and Product ID...')
    for x in old_inventory_list:
        if(x.is_tested != str):
            x.is_tested = "Not Tested"
        
        if(x.is_tested.lower() == 'is tested'):
            x.new_is_tested = True
        else:
            x.new_is_tested = False

        if(x.product_condition != str):
            x.product_condition = 'Used'

        for y in new_product_list:
            if(y.productNumber.lower() == x.product_number.lower()):
                x.new_product_id = y.id
                break

        for c in old_company_list:
            if(c.company_name == x.seller):
                x.new_company_id = c.company_id

def covert_inventory_to_new():
    global new_inventory_list
    print('Converting Inventory to new Schema...')
    for x in old_inventory_list:
        if(x.new_product_id == 0):
            print(x.product_number)
        else:
            tmpProd = NewInventory(
                id=0,
                productId=x.new_product_id,
                removeId=0,
                poId=0,
                serialNumber=x.serial_number,
                condition=x.product_condition,
                warrantyExpiration=x.warranty_exp,
                isTested=x.new_is_tested,
                dateTested="2022-01-03 20:38:35.5-05",
                comment=x.comment,
                location=x.location,
                createdAt="2022-01-03 20:38:35.5-05",
                updatedAt="2022-01-03 20:38:35.5-05",
            )
            new_inventory_list.append(tmpProd)

def save_inventory_file():
    inv_header = ['productId', 'serialNumber', 'condition', 'warrantyExpiration', 'isTested', 'dateTested', 'comment', 'location', 'createdAt', 'updatedAt']
    print('Saving upload list...')
    with open('NewDBDump/New_Inventory_List.csv', 'w', newline='') as csv_file:
        spam_writer = csv.writer(csv_file, delimiter=',', quotechar='"',  quoting=csv.QUOTE_MINIMAL)
        spam_writer.writerow(inv_header)
        for x in new_inventory_list:
            spam_writer.writerow([x.productId, x.serialNumber, x.condition, x.warrantyExpiration, x.isTested, 
                                  x.dateTested, x.comment, x.location,  x.createdAt, x.updatedAt])  

def run():
    get_users_json()
    get_products_json()
    get_inventory_json()
    get_quotes_json()
    get_company_json()
    get_received_order_json()

    convert_to_new_product_schema()
    save_products_to_file()

    convert_old_inventory_fields()
    covert_inventory_to_new()
    save_inventory_file()

    convert_company_to_new()
     
    convert_quotes_to_new()
    save_quotes_file()

    get_quoted_products()
    convert_quoted_products_to_new()
    save_quoted_products_file()

    convert_received_order_to_new()
    create_received_item()
    save_received_order_file()
    save_received_item_file()
    # Do this last
    save_company_to_file()

run()
# =========================================================================================
# End
# =========================================================================================