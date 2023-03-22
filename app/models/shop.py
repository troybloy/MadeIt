from .db import db

class Shop(db.Model):
  __tablename__ = 'shops'

  id = db.Column(db.Integer, primary_key = True)
  owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
  shop_name = db.Column(db.String(35), nullable = False)
  shop_description = db.Column(db.String(120), nullable = False)
  shop_img = db.Column(db.String(500))

  owner = db.relationship('User', back_populates='shop_owner')
  shop_item = db.relationship('Item', back_populates='item', cascade='all, delete-orphan')

  def to_dict(self):
    return {
      "id": self.id,
      "owner_id": self.owner_id,
      "shop_name": self.shop_name,
      "shop_description": self.shop_description,
      "shop_img": self.shop_img,
    }
