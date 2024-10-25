# =========================================================================================
# Created By  : Giuseppe Barbieri
# Created Date: October 2024
# =========================================================================================
class Inventory:
    def __init__(self, hardware_type: str, serial_number: str, product_number: str, 
                 product_description: str, location: str, comment: str, product_condition: str, 
                 seller: str, date_received: str, cost_price: float, po_number: str, brand: str, 
                 is_reserved: str, warranty_exp: str, is_tested: str, 
                 new_is_tested: bool = None, new_product_id: int = None, new_company_id: int = None):
        self.hardware_type = hardware_type
        self.serial_number = serial_number
        self.product_number = product_number
        self.product_description = product_description
        self.location = location
        self.comment = comment
        self.product_condition = product_condition
        self.seller = seller
        self.date_received = date_received
        self.cost_price = cost_price
        self.po_number = po_number
        self.brand = brand
        self.is_reserved = is_reserved
        self.warranty_exp = warranty_exp
        self.is_tested = is_tested
        self.new_is_tested = new_is_tested
        self.new_product_id = new_product_id
        self.new_company_id = new_company_id 
# =========================================================================================
# End
# =========================================================================================