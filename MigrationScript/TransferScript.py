# =========================================================================================
# Created By  : Giuseppe Barbieri
# Created Date: October 2024
# =========================================================================================
# Imports
# =========================================================================================
import json, csv
from typing import List
from NewDBSchema import FileNameEnum, NewProduct, NewInventory, NewCompany, NewQuote, NewProductQuote, NewReceivedOrder, NewReceivedItem
from OldDBSchema import Product, Inventory, Company, Quotes, ReceivedOrder, ProductQuote, User
# =========================================================================================
# Start
# =========================================================================================
old_product_list: List[Product] = []
new_product_list: List[NewProduct] = []

old_inventory_list: List[Inventory] = []
new_inventory_list: List[NewInventory] = []

old_quotes_list: List[Quotes] = []
new_quotes_list: List[NewQuote] = []

old_product_quotes_list: List[ProductQuote] = []
new_product_quotes_list: List[NewProductQuote] = []

old_company_list: List[Company] = []
new_company_list: List[NewCompany] = []

old_received_order_list: List[ReceivedOrder] = []
new_received_order_list: List[NewReceivedOrder] = []

new_received_item_list: List[NewReceivedItem] = []

user_list: List[User] = []
        
def import_all_json():
    global old_product_list, old_inventory_list, old_quotes_list, old_product_quotes_list, old_company_list, old_received_order_list, user_list
    user_list = [User(**item) for item in read_json_file("Users")]
    old_product_list = [Product(**item) for item in read_json_file("Product")]
    old_inventory_list = [Inventory(**item) for item in read_json_file("Inventory")]
    old_quotes_list = [Quotes(**item) for item in read_json_file("Quotes")]
    old_product_quotes_list = [ProductQuote(**item) for item in read_json_file("ProductQuotes")]
    old_company_list = [Company(**item) for item in read_json_file("Company")]
    old_received_order_list = [ReceivedOrder(**item) for item in read_json_file("ReceivedOrders")]

def read_json_file(file_name: str):
    file_path = "DBDumpJSON/" + file_name + ".json"
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as file:
        data = json.load(file)
        return data

def save_to_file(file_name: str, data: List):
    print('Saving ' + file_name + ' List...')
    with open('NewDBDump/' + file_name + '.csv', 'w', newline='', encoding='utf-8') as csv_file:
        spam_writer = csv.writer(csv_file, delimiter=',', quotechar='"',  quoting=csv.QUOTE_MINIMAL)
        attributes = list(data[0].__dict__.keys())
        spam_writer.writerow(attributes)
        for item in data:
            spam_writer.writerow([getattr(item, attr) for attr in attributes])

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
    
    save_to_file(FileNameEnum.PRODUCT, new_product_list)

def convert_company_to_new():
    global new_company_list
    print('Converting Company to new schema...')
    for x in old_company_list:
        tmpProd = NewCompany(
            id=x.company_id,
            userId=1,
            type='',
            name=x.company_name,
            representative='',
            phone=x.phone_number,
            email='',
            location=x.address.replace('\x9f', '').replace('\x91', '').replace('\ufffd', ''),
            comment=x.company_comments,
            createdAt="2022-01-03 20:38:35.5-05",
            updatedAt="2022-01-03 20:38:35.5-05",
        )
        new_company_list.append(tmpProd)
    save_to_file(FileNameEnum.COMPANY, new_company_list)

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

        tmpProd = NewQuote(
            id=x.quote_id,
            companyId=x.companyID,
            userId=user_id,
            dateQuoted=x.date_quoted + ' 20:38:35.5-05',
            sold=sold,
            createdAt="2022-01-03 20:38:35.5-05",
            updatedAt="2022-01-03 20:38:35.5-05"
        )
        new_quotes_list.append(tmpProd)
    save_to_file(FileNameEnum.QUOTE, new_quotes_list)

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
        if (product_id != 0):
            new_product_quotes_list.append(tmpProd)

    save_to_file(FileNameEnum.QUOTED_PRODUCT, new_product_quotes_list)

# Need to create new companies based off the Orders
def create_company_from_received(order: ReceivedOrder):
    last_company = new_company_list[-1]
    new_id = last_company.id+1
    tmpProd = NewCompany(
            id=new_id,
            userId=1,
            type='',
            name=order.purchased_from,
            representative='',
            phone='',
            email='',
            location='',
            comment='',
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
            if(x.purchased_from.lower() == c.name.lower()):
                company_id=c.id
                break
        
        if(company_id == 0):
            company_id = create_company_from_received(x)


        s+=1
        tmpProd = NewReceivedOrder(
            id = s,
            purchaseOrderNumber = x.poNumber,
            companyId = company_id,
            userId = user_id,
            orderType = '',
            trackingNumber = '',
            dateReceived = x.time,
            shippedVia='',
            comment=x.comments,
            createdAt=x.time,
            updatedAt=x.time 
        )
        exists = False
        for r in new_received_order_list:
            if r.purchaseOrderNumber == x.poNumber:
                exists = True
                break

        if exists is False:
            new_received_order_list.append(tmpProd)
    save_to_file(FileNameEnum.RECEIVED_ORDER, new_received_order_list)

def create_received_item():
    global old_received_order_list, new_received_item_list, new_product_list
    s=0
    for x in old_received_order_list:
        orderId = 0
        for y in new_received_order_list:
            if (x.poNumber == y.purchaseOrderNumber):
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
            receivingId=orderId,
            quantity=x.quantity,
            productId=productId,
            cud=x.cud,
            comment=x.comments,
            finishedAdding= (True if x.added_to_inventory.lower() == "yes" else False),
            createdAt=x.time,
            updatedAt=x.time
        )
        if(productId != 0):
            new_received_item_list.append(tmp)
    save_to_file(FileNameEnum.RECEIVED_ITEM, new_received_item_list)

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

def convert_inventory_to_new():
    global new_inventory_list
    print('Converting Inventory to new Schema...')
    for x in old_inventory_list:
        if(x.new_product_id == 0):
            print(x.product_number)
        else:
            tmpProd = NewInventory(
                id=0,
                productId=x.new_product_id,
                removedInventoryId=0,
                purchaseOrderId=0,
                serialNumber=x.serial_number,
                condition=x.product_condition,
                warrantyExpiration=x.warranty_exp,
                tested=x.new_is_tested,
                testedDate="2022-01-03 20:38:35.5-05",
                comment=x.comment,
                location=x.location,
                createdAt="2022-01-03 20:38:35.5-05",
                updatedAt="2022-01-03 20:38:35.5-05",
            )
            if(tmpProd.productId != None):
                new_inventory_list.append(tmpProd)
    save_to_file(FileNameEnum.INVENTORY, new_inventory_list)

def run():
    import_all_json()
    convert_to_new_product_schema()
    convert_old_inventory_fields()
    convert_inventory_to_new()
    convert_company_to_new()
    convert_quotes_to_new()
    convert_quoted_products_to_new()
    convert_received_order_to_new()
    create_received_item()

run()
# =========================================================================================
# End
# =========================================================================================