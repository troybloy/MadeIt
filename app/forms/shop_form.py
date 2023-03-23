from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError


class CreateShopForm(FlaskForm):
  owner_id = IntegerField('Owner Id', validators=[DataRequired()])
  shop_name = StringField('Shop Name', validators=[DataRequired()])
  shop_description = StringField('Shop Description', validators=[DataRequired()])
  shop_img = StringField('Shop Image', validators=[DataRequired()])
  submit = SubmitField('Submit')
