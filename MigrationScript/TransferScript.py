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
    print('Importing JSON Files...')
    start_time = datetime.now()

    user_list = [User(**item) for item in read_json_file("Users")]
    old_product_list = [Product(**item) for item in read_json_file("Product")]
    old_inventory_list = [Inventory(**item) for item in read_json_file("Inventory")]
    old_quotes_list = [Quotes(**item) for item in read_json_file("Quotes")]
    old_product_quotes_list = [ProductQuote(**item) for item in read_json_file("ProductQuotes")]
    old_company_list = [Company(**item) for item in read_json_file("Company")]
    old_received_order_list = [ReceivedOrder(**item) for item in read_json_file("ReceivedOrders")]

    end_time = datetime.now()  # Record the end time
    elapsed_time = end_time - start_time  # Calculate the elapsed time
    print(f'Finished Importing: Elapsed time: {elapsed_time}')  # Print the elapsed time

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

# This should happen first, used to  create new sellers  later for 
# received orders and received items from the old inventory
def convert_company_to_new():
    global new_company_list
    print('Converting Company to new schema...')
    start_time = datetime.now()
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
    save_to_file(FileNameEnum.COMPANY.value, new_company_list)
    end_time = datetime.now()  # Record the end time
    elapsed_time = end_time - start_time  # Calculate the elapsed time
    print(f'Finished Converting Company to new schema: Elapsed time: {elapsed_time}')  # Print the elapsed time

def convert_to_new_product_schema():
    global new_product_list
    print('Converting Product to new schema...')
    start_time = datetime.now()
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
    
    save_to_file(FileNameEnum.PRODUCT.value, new_product_list)
    end_time = datetime.now()
    elapsed_time = end_time - start_time
    print(f'Finished Converting Product to new schema: Elapsed time: {elapsed_time}')

def convert_old_inventory_fields():
    global old_inventory_list, old_company_list, new_product_list
    print('Converting Is Tested and Product ID...')
    start_time = datetime.now()
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
                break
    end_time = datetime.now()
    elapsed_time = end_time - start_time
    print(f'Finished Converting Product to new schema: Elapsed time: {elapsed_time}')
    
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
        if(c.name.lower() == old.seller.lower()):
            companyId = c.id
            break
            
    if(companyId == 0):
        companyId = max(new_company_list, key=lambda x: x.id).id + 1
        tmpComp = NewCompany(
                id=companyId,
                userId=2,
                type='Auto Created',
                name=old.seller,
                representative='',
                phone='',
                email='',
                location='',
                comment='',
                createdAt="2022-01-03 20:38:35.5-05",
                updatedAt="2022-01-03 20:38:35.5-05",
            )
        new_company_list.append(tmpComp)
    else:
        # Somehow check if the received order already exists

        receivedOrderId = 0
        for r in new_received_order_list:
            if(r.companyId == companyId and old.po_number == r.purchaseOrderNumber and r.userId == 2):
                 receivedOrderId = r.id
        
        if(receivedOrderId == 0):
            receivedOrderId = max(new_received_order_list, key=lambda x: x.id).id + 1
            newPurchaseOrderNumber = 'AC-' + str(random.randint(10000000, 99999999))
            if(old.po_number != None or  old.po_number != '' or  old.po_number != ' ' or old.po_number != 'N/A' or old.po_number != 'N/a' or old.po_number != 'n/a'):
                newPurchaseOrderNumber = old.po_number

            tmpRO = NewReceivedOrder(
                id = receivedOrderId,
                purchaseOrderNumber = newPurchaseOrderNumber,
                companyId = companyId,
                userId = 2,
                orderType = 'Auto Created',
                trackingNumber = '',
                dateReceived = old.date_received + ' 20:38:35.5-05',
                shippedVia='',
                comment='',
                createdAt=old.date_received + ' 20:38:35.5-05',
                updatedAt=old.date_received + ' 20:38:35.5-05' 
            )
            new_received_order_list.append(tmpRO)

        # Check if we have a received item for this order already then just add to it
        for r in new_received_item_list:
            if(r.receivingId == receivedOrderId and r.productId == old.new_product_id):
                r.quantity += 1
                return receivedOrderId

        # Else create a new received item
        receivedItemId = max(new_received_item_list, key=lambda x: x.id).id + 1
        tmp = NewReceivedItem(
            id=receivedItemId,
            receivingId=receivedOrderId,
            quantity=1,
            productId=old.new_product_id,
            cud=old.product_condition,
            comment='',
            finishedAdding= True,
            createdAt=old.date_received + ' 20:38:35.5-05',
            updatedAt=old.date_received + ' 20:38:35.5-05'
        )
        new_received_item_list.append(tmp)

        return receivedOrderId

def convert_quotes_to_new():
    global old_quotes_list, new_quotes_list, user_list
    print('Converting Quote to new schema...')
    start_time = datetime.now()
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
    save_to_file(FileNameEnum.QUOTE.value, new_quotes_list)
    end_time = datetime.now()
    elapsed_time = end_time - start_time
    print(f'Finished Converting Quote to new schema: Elapsed time: {elapsed_time}')

def convert_quoted_products_to_new():
    global old_product_quotes_list, new_product_quotes_list
    print('Converting Quoted Products to new schema...')
    start_time = datetime.now()
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
            productCondition = "",
            comment = x.comments.replace('\n',' | '),
            createdAt="2022-01-03 20:38:35.5-05",
            updatedAt="2022-01-03 20:38:35.5-05"
        )
        if (product_id != 0):
            new_product_quotes_list.append(tmpProd)

    save_to_file(FileNameEnum.QUOTED_PRODUCT.value, new_product_quotes_list)
    end_time = datetime.now()
    elapsed_time = end_time - start_time
    print(f'Finished Converting Quoted Products to new schema: Elapsed time: {elapsed_time}')

# Need to create new companies based off the Orders
def create_company_from_received(order: ReceivedOrder):
    global new_company_list
    new_id = max(new_company_list, key=lambda x: x.id).id + 1
    tmpProd = NewCompany(
            id=new_id,
            userId=2,
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

def convert_received_order_to_new():
    global old_received_order_list, new_received_order_list, new_company_list
    print('Converting Received Order to new schema...')
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

        tmpProd = NewReceivedOrder(
            id = receivedOrderId+1,
            purchaseOrderNumber = x.poNumber,
            companyId = company_id,
            userId = user_id,
            orderType = 'Auto Created',
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
    save_to_file(FileNameEnum.RECEIVED_ORDER.value, new_received_order_list)

def create_received_item():
    global old_received_order_list, new_received_item_list, new_product_list
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
            finishedAdding= (True if x.added_to_inventory.lower() == "yes" else False),
            createdAt=x.time,
            updatedAt=x.time
        )
        if(productId != 0):
            new_received_item_list.append(tmp)
    save_to_file(FileNameEnum.RECEIVED_ITEM.value, new_received_item_list)

def convert_inventory_to_new():
    global new_inventory_list, old_inventory_list
    print('Converting Inventory to new Schema...')
    for x in old_inventory_list:
        isReserved = False
        if(x.is_reserved == 'Yes'):
            isReserved = True
        
        tmpInv = NewInventory(
            id=0,
            productId=x.new_product_id,
            removedInventoryId=0,
            purchaseOrderId=convert_seller_to_received(x),
            serialNumber=x.serial_number,
            condition=x.product_condition,
            warrantyExpiration=x.warranty_exp + " 20:38:35.5-05",
            tested=x.new_is_tested,
            testedDate=x.date_received + " 20:38:35.5-05",
            comment=x.comment,
            location=x.location,
            createdAt=x.date_received + " 20:38:35.5-05",
            updatedAt=x.date_received + " 20:38:35.5-05",
            reserved=isReserved
        )

        if(tmpInv.productId != None):
            new_inventory_list.append(tmpInv)
            

    save_to_file(FileNameEnum.INVENTORY.value, new_inventory_list)

def run():
    import_all_json()
    convert_company_to_new()

    convert_to_new_product_schema()
    convert_old_inventory_fields()
    
    convert_quotes_to_new()
    convert_quoted_products_to_new()
    convert_received_order_to_new()
    create_received_item()

    convert_inventory_to_new()

run()
# =========================================================================================
# End
# =========================================================================================