# =========================================================================================
# Created By  : Giuseppe Barbieri
# Created Date: October 2024
# =========================================================================================
class Product:
    def __init__(self, product_number: str, product_type: str, 
                 product_model: str, spare_number: str, assembly_number: str, 
                 model_number: str, brand: str, link: str, quantity: int, 
                 location: str, description: str, related_tags: str, date_last_added: str, 
                 oldest_date_added: str):
        self.product_number = product_number
        self.product_type = product_type
        self.product_model = product_model
        self.spare_number = spare_number
        self.assembly_number = assembly_number
        self.model_number = model_number
        self.brand = brand
        self.link = link
        self.quantity = quantity
        self.location = location
        self.description = description
        self.related_tags = related_tags
        self.date_last_added = date_last_added
        self.oldest_date_added = oldest_date_added
# =========================================================================================
# End
# =========================================================================================