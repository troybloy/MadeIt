from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Item, db
from ..forms.item_form import CreateItemForm
from sqlalchemy import or_



item_routes = Blueprint('items', __name__)

#*************************************************************************#
# GET ALL ITEMS
@item_routes.route('/', methods=['GET'])
def get_items():
    items = Item.query.all()
    print('API ROUTE ITEMS', items)
    return {'items': [item.to_dict() for item in items]}

#*************************************************************************#
# UPDATE AN ITEM
@item_routes.route('/<int:item_id>', methods=['PUT'])
@login_required
def update_item(item_id):
        form = CreateItemForm()

        form["csrf_token"].data = request.cookies["csrf_token"]

        if form.validate_on_submit():

          item = Item.query.get(item_id)

          item.owner_id = current_user.id
          item.item_name = form.data["item_name"]
          item.item_price = form.data["item_price"]
          item.item_description = form.data["item_description"]
          item.item_img = form.data["item_img"]
          item.shop_id = form.data["shop_id"]
          # item.category_id = form.data["category_id"]

          db.session.commit()
          return jsonify(item.to_dict()), 200
        else:
          return {'errors': form.errors}, 401

#*************************************************************************#
#CREATE AN ITEM
@item_routes.route('/create_item', methods=['POST'])
@login_required
def create_item():

      form = CreateItemForm()

      form["csrf_token"].data = request.cookies["csrf_token"]

      if form.validate_on_submit():

        item_data = Item(
          owner_id = current_user.id,
          item_name = form.data["item_name"],
          item_price = form.data["item_price"],
          item_description = form.data["item_description"],
          item_img = form.data["item_img"],
          shop_id = form.data["shop_id"]
          )

        db.session.add(item_data)
        db.session.commit()
        return jsonify(item_data.to_dict()), 200
      else:
        return {'errors': form.errors}, 401

#*************************************************************************#
# DELETE AN ITEM
@item_routes.route('/<int:item_id>', methods=['DELETE'])
@login_required
def delete_item(item_id):
    item = Item.query.get(item_id)
    db.session.delete(item)
    db.session.commit()
    return {'message': 'Menu Item deleted'}


#*************************************************************************#
# SEARCH ITEMS
@item_routes.route('/search', methods=['GET'])
def search_items():
    query = request.args.get('q', default='', type=str)
    items = Item.query.filter(or_(Item.item_name.ilike(f"%{query}%"), Item.item_description.ilike(f"%{query}%"))).all()
    return {'items': [item.to_dict() for item in items]}
