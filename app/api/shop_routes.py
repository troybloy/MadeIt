from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Shop, db
from ..forms.shop_form import CreateShopForm

shop_routes = Blueprint('shops', __name__)


#*************************************************************************#
# GET ALL SHOPS
@shop_routes.route('/', methods=['GET'])
def get_shops():
    shops = Shop.query.all()
    return {'shops': [shop.to_dict() for shop in shops]}

#*************************************************************************#
#CREATE A SHOP
@shop_routes.route('/', methods=['POST'])
@login_required
def create_shop():

    form = CreateShopForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

      shopData = Shop(
        owener_id = current_user.id,
        shop_name = form.data["shop_name"],
        shop_description = form.data["shop_description"],
        shop_img = form.data["shop_img"]
      )

      db.session.add(shopData)
      db.session.commit()
      return jsonify(shopData.to_dict()), 200
    else:
      return {'errors': form.errors}, 401

#*************************************************************************#
# UPDATE A SHOP
@shop_routes.route('/<int:shop_id>', methods=['PUT'])
@login_required
def update_shop(shop_id):

      form = CreateShopForm()

      form["csrf_token"].data = request.cookies["csrf_token"]

      if form.validate_on_submit():

        shop = Shop.query.get(shop_id)

        shop.owner_id = current_user.id
        shop.shop_name = form.data["shop_name"]
        shop.shop_description = form.data["shop_description"]
        shop.shop_img = form.data["shop_img"]

        db.session.commit()
        return jsonify(shop.to_dict()), 200
      else:
        return {'errors': form.errors}, 401

#****************************************************************************************************
# DELETE A SHOP
@shop_routes.route('/<int:shop_id>', methods=['DELETE'])
@login_required
def delete_shop(shop_id):

      shop = Shop.query.get(shop_id)
      db.session.delete(shop)
      db.session.commit()
      return {'message': 'Business deleted'}


