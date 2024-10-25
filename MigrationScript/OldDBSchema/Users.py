# =========================================================================================
# Created By  : Giuseppe Barbieri
# Created Date: October 2024
# =========================================================================================
class User:
    def __init__(self, id: int, username: str, password: str, first_name: str, last_name: str, 
                 email_address: str, privilege_level: str):
        self.id = id
        self.username = username
        self.password = password
        self.first_name = first_name
        self.last_name = last_name
        self.email_address = email_address
        self.privilege_level = privilege_level
# =========================================================================================
# End
# =========================================================================================