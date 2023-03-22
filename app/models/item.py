from .db import db

class Item(db.Model):
  __tablename__ = 'items'

  if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key = True)
  owner_id = db.Column(db.Integer, db.ForeignKey(add_prefeix_for_prod('users.id')), nullable = False)
  item_name = db.Column(db.String(50), nullable = False)
  item_price = db.Column(db.String(10), nullable = False)
  item_description = db.Column(db.String(255), nullable = False)
  item_img = db.Column(db.String(500))
  shop_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('shops.id')), nullable=False)

  owner = db.relationship('User', back_populates='item_owner')
  item = db.relationship('Shop', back_populates='shop_item')

  def to_dict(self):
    return {
      "id": self.id,
      "owner_id": self.owner_id,
      "item_name": self.item_name,
      "item_price": self.item_price,
      "item_description": self.item_description,
      "item_img": self.item_img,
      "shop_id": self.shop_id,
    }
