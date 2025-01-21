# =========================================================================================
# Created By  : Giuseppe Barbieri
# Created Date: October 2024
# =========================================================================================
# Imports
# =========================================================================================
import json, csv, random
from typing import List
from datetime import datetime
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
    print('#START# Importing JSON Files...')
    user_list = [User(**item) for item in read_json_file('Users')]
    old_product_list = [Product(**item) for item in read_json_file('Product')]
    old_inventory_list = [Inventory(**item) for item in read_json_file('Inventory')]
    old_quotes_list = [Quotes(**item) for item in read_json_file('Quotes')]
    old_product_quotes_list = [ProductQuote(**item) for item in read_json_file('ProductQuotes')]
    old_company_list = [Company(**item) for item in read_json_file('Company')]
    old_received_order_list = [ReceivedOrder(**item) for item in read_json_file('ReceivedOrders')]
    print('#END# Importing JSON Files...')

def read_json_file(file_name: str):
    file_path = 'DBDumpJSON/' + file_name + '.json'
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

# This should happen first, used to  create new sellers  later for 
# received orders and received items from the old inventory
def convert_company_to_new():
    global new_company_list
    print('#START# Converting Company to new schema...')
    for x in old_company_list:
        companyType = 'Other'
        if(x.company_name.lower().__contains__('ebay')):
           companyType = 'Ebay'

        if(x.company_name != None or x.company_name != '' or x.company_name != ' '):
            tmpProd = NewCompany(
                id=x.company_id,
                userId=1,
                type=companyType,
                name=x.company_name,
                representative=None,
                phone=x.phone_number,
                email=None,
                location=x.address.replace('\x9f', '').replace('\x91', '').replace('\ufffd', ''),
                comment=x.company_comments,
                createdAt='2022-01-03 20:38:35.5-05',
                updatedAt='2022-01-03 20:38:35.5-05',
            )
        new_company_list.append(tmpProd)

    print('#END# Converting Company to new schema...')

def convert_to_new_product_schema():
    global new_product_list
    print('#START# Converting Product to new schema...')
    s = 0
    for x in old_product_list:
        s+=1
        tmpProd = NewProduct(
            id=s,
            userId=1,
            productNumber=x.product_number.strip().replace(',', '|'),
            altNumber1=x.spare_number.replace(',', '|'),
            altNumber2=x.assembly_number.replace(',', '|'),
            altNumber3=x.model_number.replace(',', '|'),
            altNumber4=None,
            altNumber5=None,
            altNumber6=None,
            quantity=x.quantity,
            productType=x.product_type.replace(',', '|'),
            brand=x.brand.replace(',', '|'),
            description=x.description.replace(',', '|'),
            ebayUrl=None,
            websiteUrl=None,
            quickSpecsUrl=None,
            relatedTags=x.related_tags,
            reasonForRemoval=None,
            createdAt='2022-01-03 20:38:35.5-05',
            updatedAt='2022-01-03 20:38:35.5-05'
        )
        new_product_list.append(tmpProd)
    
    print('#END# Converting Product to new schema...')

def convert_old_inventory_fields():
    global old_inventory_list, old_company_list, new_product_list
    print('#START# Converting Is Tested and Product ID...')
    for x in old_inventory_list:
        if(x.is_tested != str):
            x.is_tested = 'Not Tested'
        
        if(x.is_tested.lower() == 'is tested'):
            x.new_is_tested = True
        else:
            x.new_is_tested = False

        if(x.product_condition != str):
            x.product_condition = ''

        for y in new_product_list:
            if(y.productNumber.lower().strip() == x.product_number.lower().strip()):
                x.new_product_id = y.id
                break

    print('#END# Converting Is Tested and Product ID...')

# takes an inventory item, creates a new company, received order, and item
def convert_seller_to_received(old: Inventory):
    # 0. Check if seller exists in new company list
    # 1. Get the Seller + date received
    # 2. Create a company for the seller
    # 2. Create a Received Order if there's seller information
    # 3. Create the received item
    # 4. Return the received order id
    global new_received_order_list, new_received_item_list, new_company_list
    
    # check if the company exists by comparing the seller name to the company name
    companyId = 0
    for c in new_company_list:
        if(c.name.lower().strip() == old.seller.lower().strip()):
            companyId = c.id
            break

    if(companyId == 0):
        if(companyId == 0 and old.seller.strip() != '' and old.seller.strip().lower() != 'n/a'
            and old.seller.strip() != '0' and old.seller.strip() != '3' and old.seller.strip() != '6' and old.seller.strip() != '12'
            and old.seller.strip() != '123' and old.seller.strip() != '123999' and old.seller.strip() != '????' and old.seller.strip() != 'a'):
            
            companyId = max(new_company_list, key=lambda x: x.id).id + 1
            
            companyType = 'Auto Created'
            if(old.seller.lower().__contains__('ebay')):
                companyType = 'eBay'

            tmpComp = NewCompany(
                id=companyId,
                userId=2,
                type=companyType,
                name=old.seller.strip(),
                representative=None,
                phone=None,
                email=None,
                location=None,
                comment=None,
                createdAt='2025-01-03 20:38:35.5-05',
                updatedAt='2025-01-03 20:38:35.5-05',
            )
            new_company_list.append(tmpComp)
        else:
            return None
    
    # Somehow check if the received order already exists
    receivedOrderId = 0
    for r in new_received_order_list:
        if(r.companyId == companyId or old.po_number.lower().strip() == r.purchaseOrderNumber.lower().strip()):
             receivedOrderId = r.id
             break
    
    if(receivedOrderId == 0):
        receivedOrderId = max(new_received_order_list, key=lambda x: x.id).id + 1
        newPurchaseOrderNumber = 'AC-' + str(random.randint(10000000, 99999999))
        if(old.po_number != None and old.po_number.strip() != '' and old.po_number != 'N/A' and old.po_number != 'N/a' and old.po_number != 'n/a'):
            newPurchaseOrderNumber = old.po_number

        tmpRO = NewReceivedOrder(
            id = receivedOrderId,
            purchaseOrderNumber = newPurchaseOrderNumber,
            companyId = companyId,
            userId = 2,
            orderType = 'Auto Created - Here',
            trackingNumber = None,
            dateReceived = old.date_received.replace('T', ' ') + ' 20:38:35.5-05',
            shippedVia=None,
            comment=None,
            createdAt=old.date_received + ' 20:38:35.5-05',
            updatedAt=old.date_received + ' 20:38:35.5-05' 
        )
        new_received_order_list.append(tmpRO)

    # Check if we have a received item for this order already then just add to it
    for r in new_received_item_list:
        if(r.receivingId == receivedOrderId and r.productId == old.new_product_id):
            r.quantity += 1
            return receivedOrderId

    if(old.new_product_id == None or old.new_product_id == 0):
        print(old.product_number)
    else:
        # Else create a new received item
        receivedItemId = max(new_received_item_list, key=lambda x: x.id).id + 1
        tmp = NewReceivedItem(
            id=receivedItemId,
            receivingId=receivedOrderId,
            quantity=1,
            productId=old.new_product_id,
            cud=old.product_condition,
            comment=None,
            finishedAdding= True,
            createdAt=old.date_received + ' 20:38:35.5-05',
            updatedAt=old.date_received + ' 20:38:35.5-05'
        )
        new_received_item_list.append(tmp)

    return receivedOrderId

def convert_quotes_to_new():
    global old_quotes_list, new_quotes_list, user_list
    print('#START# Converting Quote to new schema...')
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
        if(x.sold.lower() == 'yes'):
            sold = True

        tmpProd = NewQuote(
            id=x.quote_id,
            companyId=x.companyID,
            userId=user_id,
            dateQuoted=x.date_quoted + ' 20:38:35.5-05',
            sold=sold,
            createdAt=x.date_quoted + ' 20:38:35.5-05',
            updatedAt=x.date_quoted + ' 20:38:35.5-05'
        )
        new_quotes_list.append(tmpProd)

    print('#END# Converting Quote to new schema...')

def convert_quoted_products_to_new():
    global old_product_quotes_list, new_product_quotes_list
    print('#START# Converting Quoted Products to new schema...')
    product_quote_id = 0
    if(len(new_product_quotes_list) != 0):
        product_quote_id = max(new_product_quotes_list, key=lambda x: x.id).id

    for x in old_product_quotes_list:
        product_id=0
        for y in new_product_list:
            if(y.productNumber == x.product_number):
                product_id = y.id
                break

        product_quote_id+=1
        tmpProd = NewProductQuote(
            id = product_quote_id,
            quoteId = x.quote_id,
            productId = product_id,
            quantity = x.quantity,
            quotedPrice = x.quoted_price,
            productCondition = None,
            comment = x.comments.replace('\n',' | '),
            createdAt=x.date_quoted + ' 20:38:35.5-05',
            updatedAt=x.date_quoted + ' 20:38:35.5-05'
        )
        if (product_id != 0):
            new_product_quotes_list.append(tmpProd)
    print('#END# Converting Quoted Products to new schema...')

# Need to create new companies based off the Orders
def create_company_from_received(order: ReceivedOrder):
    global new_company_list
    new_id = max(new_company_list, key=lambda x: x.id).id + 1

    companyType = 'Auto Created'
    if(order.purchased_from.lower().__contains__('ebay')):
        companyType = 'eBay'

    tmpProd = NewCompany(
            id=new_id,
            userId=2,
            type=companyType,
            name=order.purchased_from,
            representative=None,
            phone=None,
            email=None,
            location=None,
            comment=None,
            createdAt='2022-01-03 20:38:35.5-05',
            updatedAt='2022-01-03 20:38:35.5-05',
        )
    new_company_list.append(tmpProd)
    return new_id

def convert_received_order_to_new():
    global old_received_order_list, new_received_order_list, new_company_list
    print('#START# Converting Received Order to new schema...')
    receivedOrderId = 0
    if(len(new_received_order_list) != 0):
        receivedOrderId = max(new_received_order_list, key=lambda x: x.id).id

    for x in old_received_order_list:
        user_id=2
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

        receivedOrderId += 1
        tmpProd = NewReceivedOrder(
            id=receivedOrderId,
            purchaseOrderNumber=x.poNumber,
            companyId=company_id,
            userId=user_id,
            orderType='Auto Created 2',
            trackingNumber= None,
            dateReceived=x.time,
            shippedVia=None,
            comment=x.comments,
            createdAt=x.time.split('.')[0].replace('T', ' ') + '.5-05',
            updatedAt=x.time.split('.')[0].replace('T', ' ') + '.5-05' 
        )
        exists = False
        for r in new_received_order_list:
            if r.purchaseOrderNumber == x.poNumber:
                exists = True
                break

        if exists is False:
            new_received_order_list.append(tmpProd)

    print('#END# Converting Received Order to new schema...')

def create_received_item():
    global old_received_order_list, new_received_item_list, new_product_list
    print('#START# Creating Received Items...')
    receivedItemId = 0
    if(len(new_received_item_list) != 0):
        receivedItemId = max(new_received_item_list, key=lambda x: x.id).id
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
        receivedItemId += 1
        tmp = NewReceivedItem(
            id=receivedItemId,
            receivingId=orderId,
            quantity=x.quantity,
            productId=productId,
            cud=x.cud,
            comment=x.comments,
            finishedAdding= (True if x.added_to_inventory.lower() == 'yes' else False),
            createdAt=x.time.split('.')[0].replace('T', ' ') + '.5-05',
            updatedAt=x.time.split('.')[0].replace('T', ' ') + '.5-05'
        )
        if(productId != 0):
            new_received_item_list.append(tmp)

    print('#END# Creating Received Items...')

def convert_inventory_to_new():
    global new_inventory_list, old_inventory_list
    print('#START# Converting Inventory to new Schema...')
    inventoryId = 0
    if(len(new_received_item_list) != 0):
        inventoryId = max(new_received_item_list, key=lambda x: x.id).id
    for x in old_inventory_list:
        isReserved = False
        if(x.is_reserved == 'Yes'):
            isReserved = True
        inventoryId += 1
            
        testedDate = None
        if(x.new_is_tested == True):
            testedDate = x.date_received + ' 20:38:35.5-05',
        
        warrantyExpirationDate = x.warranty_exp + ' 20:38:35.5-05'
        if(x.warranty_exp == None or x.warranty_exp.strip() == ''):
            warrantyExpirationDate = None

        tmpInv = NewInventory(
            id=inventoryId,
            productId=x.new_product_id,
            removedInventoryId=None,
            purchaseOrderId=convert_seller_to_received(x),
            serialNumber=x.serial_number,
            condition=x.product_condition,
            warrantyExpiration=warrantyExpirationDate,
            tested=x.new_is_tested,
            testedDate=testedDate,
            comment=x.comment,
            location=x.location,
            reserved=isReserved,
            createdAt=x.date_received + ' 20:38:35.5-05',
            updatedAt=x.date_received + ' 20:38:35.5-05'
        )

        if(tmpInv.productId != None):
            new_inventory_list.append(tmpInv)

    print('#END# Converting Inventory to new Schema...')
        
def save_all():
    save_to_file(FileNameEnum.QUOTE.value, new_quotes_list)
    save_to_file(FileNameEnum.COMPANY.value, new_company_list)
    save_to_file(FileNameEnum.PRODUCT.value, new_product_list)
    save_to_file(FileNameEnum.INVENTORY.value, new_inventory_list)
    save_to_file(FileNameEnum.RECEIVED_ITEM.value, new_received_item_list)
    save_to_file(FileNameEnum.RECEIVED_ORDER.value, new_received_order_list)
    save_to_file(FileNameEnum.QUOTED_PRODUCT.value, new_product_quotes_list)

def speed_test(toRun):
    start_time = datetime.now()
    toRun()
    end_time = datetime.now()
    elapsed_time = end_time - start_time
    print(f'>>> Elapsed time: {elapsed_time}')

def run():
    speed_test(import_all_json)
    speed_test(convert_company_to_new)
    speed_test(convert_to_new_product_schema)
    speed_test(convert_old_inventory_fields)
    speed_test(convert_quotes_to_new)
    speed_test(convert_quoted_products_to_new)
    speed_test(convert_received_order_to_new)
    speed_test(create_received_item)
    speed_test(convert_inventory_to_new)
    speed_test(save_all)
    
    

run()
# =========================================================================================
# End
# =========================================================================================