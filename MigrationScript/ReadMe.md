Migration Script Input Order & Notes

When exporting from SQL (old database) you need to save the json files as the following

1. company_information = Company.json
2. inventory = Inventory.json
3. products = Product.json
4. product_quotes = Quotes.json
5. received_orders = ReceivedOrders.json
6. user_accounts = Users.json


Order of Operations
1. Users - User Types already prefilled
2. Companies
3. Products
4. Receiving
5. Received Items
6. Inventory
7. Quotes
8. Quoted Products

** Might need to remove the get_quoted_product() function from the script **
