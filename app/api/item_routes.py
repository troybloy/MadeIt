from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Item, db
from ..forms.item_form import CreateItemForm


item_routes = Blueprint('items', __name__)
#*************************************************************************#
# GET ALL ITEMS
@item_routes.route('/', methods=['GET'])
def get_items():
    items = Item.query.all()
    print('API ROUTE ITEMS', items)
    return {'items': [item.to_dict() for item in items]}

