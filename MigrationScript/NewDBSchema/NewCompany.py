# =========================================================================================
# Created By  : Giuseppe Barbieri
# Created Date: October 2024
# =========================================================================================
class NewCompany:
    def __init__(self, id: int, userId: int, type: str, name: str, representative: str, 
                 phone: str, email: str, location: str, comments: str, createdAt: str, updatedAt: str):
        self.id = id
        self.userId = userId
        self.type = type
        self.name = name
        self.representative = representative
        self.phone = phone
        self.email = email
        self.location = location
        self.comments = comments
        self.createdAt = createdAt
        self.updatedAt = updatedAt
# =========================================================================================
# End
# =========================================================================================