from app.models import db, Item

def seed_items():
  item_one = Item(
    owner_id=1,
    item_name="Green fabric",
    item_price="20.00",
    item_description="$20 per yard, very high quality fabric",
    item_img="https://1502fabrics.com/wp-content/uploads/2018/09/Santa-Fe-Green-Apple.jpg",
    shop_id=1
  )
  item_two = Item(
    owner_id=2,
    item_name="Patchwork jacket",
    item_price="70.00",
    item_description="This piece was made with painstaking detail.",
    item_img="https://cdn-images.farfetch-contents.com/marine-serre-regenerated-denim-jacket_18835559_43922491_1000.jpg",
    shop_id=2
  )
  item_three = Item(
    owner_id=3,
    item_name="Levi 501s",
    item_price="125.00",
    item_description="Truly a classic levi.",
    item_img="https://cdn.shopify.com/s/files/1/2776/0162/products/501_blue_dubbelfold.jpg?v=1527366396",
    shop_id=3
  )
  item_four = Item(
    owner_id=1,
    item_name="Women's hanbok",
    item_price="216.00",
    item_description="This hanbok is stunningly beautiful",
    item_img="https://hanboksarang.com/wp-content/uploads/sd-001-6-600x900.jpeg",
    shop_id=4
  )
  item_five = Item(
    owner_id=2,
    item_name="Beautiful Kimono",
    item_price="118.00",
    item_description="Truly a beautiful kimono that will turn heads.",
    item_img="https://www.net-a-porter.com/variants/images/1647597289935747/in/w920_q60.jpg",
    shop_id=5
  )
  item_six = Item(
    owner_id=3,
    item_name="Ivory silk, 1 yard",
    item_price="17.99",
    item_description="High quality silk.",
    item_img="https://i.etsystatic.com/19594995/r/il/311f54/1838488431/il_fullxfull.1838488431_luhl.jpg",
    shop_id=6
  )
  item_seven = Item(
    owner_id=1,
    item_name="Gold fabric",
    item_price="20.00",
    item_description="Beautiful gold-colored fabric.",
    item_img="https://i.etsystatic.com/5977438/r/il/425abe/3159184624/il_fullxfull.3159184624_j8h2.jpg",
    shop_id=1
  )
  item_eight = Item(
    owner_id=2,
    item_name="Patchwork green jacket",
    item_price="59.99",
    item_description="A beautiful handmade jacket using marine serre denim pieces.",
    item_img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVkBO67jVUVkcZ8jjOcfoCIlAGFTpZJ0nlPA&usqp=CAU",
    shop_id=2
  )
  item_nine = Item(
    owner_id=3,
    item_name="Levi 510s",
    item_price="115.00",
    item_description="These jeans are truly classics. Amazing silhouettes",
    item_img="http://cdn.shopify.com/s/files/1/1141/0648/products/levis-blue-rigid-501-shrink-to-fit-product-1-17737235-0-134185786-normal_large_flex_large_1f823640-802d-4365-9f9b-f21e14d29a1e_grande.jpeg?v=1477508954",
    shop_id=3
  )
  item_ten = Item(
    owner_id=1,
    item_name="Men's hanbok",
    item_price="240.00",
    item_description="A beautiful, traditional men's piece.",
    item_img="https://ae01.alicdn.com/kf/H32740651e39047debb25047d72b8955bF/Men-S-Korean-Clothing-Korean-Performance-Costumes-Wedding-Hanbok-Dress-Traditional-Costume-Robes-Minority-Dance-Costumes.jpg_Q90.jpg_.webp",
    shop_id=4
  )
  item_eleven = Item(
    owner_id=2,
    item_name="Stunning Kimono",
    item_price="219.99",
    item_description="This kimono is a result of hundreds of hours of intricate sewing.",
    item_img="https://media.istockphoto.com/id/108355203/photo/japanese-woman-with-open-arms.jpg?s=612x612&w=0&k=20&c=mfPQVlP6IESX3boO40tYMdiJhOh1KkEbQ1TlOChCqg0=",
    shop_id=5
  )
  item_twelve = Item(
    owner_id=3,
    item_name="Ivory silk, 2 yards",
    item_price="30.00",
    item_description="A larger cut of silk at a more affordable price.",
    item_img="https://i.etsystatic.com/19594995/r/il/311f54/1838488431/il_fullxfull.1838488431_luhl.jpg",
    shop_id=6
  )

  db.session.add(item_one)
  db.session.add(item_two)
  db.session.add(item_three)
  db.session.add(item_four)
  db.session.add(item_five)
  db.session.add(item_six)
  db.session.add(item_seven)
  db.session.add(item_eight)
  db.session.add(item_nine)
  db.session.add(item_ten)
  db.session.add(item_eleven)
  db.session.add(item_twelve)

  db.session.commit()


def undo_items():
    if environment == 'production':
        db.session.execute(f'TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;')
    else:
        db.session.execute('DELETE FROM items')
    db.session.commit()
