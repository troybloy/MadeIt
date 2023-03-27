from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired


class CreateItemForm(FlaskForm):
  owner_id = IntegerField('Owner Id', validators=[DataRequired()])
  item_name = StringField('Name', validators=[DataRequired()])
  item_price = StringField('Price', validators=[DataRequired()])
  item_description = StringField('Description', validators=[DataRequired()])
  item_img = StringField('Image')
  shop_id = IntegerField('Shop Id', validators=[DataRequired()])
  submit = SubmitField('Submit')
