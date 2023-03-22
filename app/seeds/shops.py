from app.models import db, Shop

def seed_shops():
    shop_one = Shop(
        owner_id=1,
        shop_name="Unique colored fabric",
        shop_description="Fabric of any color so that you can make your perfect garment.",
        shop_img="https://www.marthastewart.com/thmb/bcLDYd7rZnI94jM4RcH-bmo_7Po=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/liberty-fabric-d110821-0314-fd015ef6439647b9ab4c09ee562b68c5.jpg"
    )
    shop_two = Shop(
        owner_id=2,
        shop_name="Patchwork clothing",
        shop_description="My clothing is handmade with the highest quality textiles to give you a fresh, streetwear look",
        shop_img="http://static1.squarespace.com/static/61266b7ec0d66b344e266860/61266bae31ac8009e9754a01/61906f87aff35733eb96a87c/1648079990743/IMG_3122+%281%29.jpg?format=1500w"
    )
    shop_three = Shop(
        owner_id=3,
        shop_name="Thrifted and repaired Levis",
        shop_description="These Levis are vintage and repaired to restore their original shapes. We have a large selection of 501s, 505s, and 510s especially!",
        shop_img="https://i.ebayimg.com/images/g/LXMAAOSwy8Bg7ZxC/s-l500.jpg"
    )
    shop_four = Shop(
        owner_id=1,
        shop_name="Hanboks",
        shop_description="I make traditional korean hanboks with the finest materials.",
        shop_img="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/8e/68/23/caption.jpg?w=1200&h=-1&s=1"
    )
    shop_five = Shop(
        owner_id=2,
        shop_name="Kimonos",
        shop_description="I sell handmade kimonos and stay true to tradition.",
        shop_img="https://images.theconversation.com/files/480575/original/file-20220823-11-bzckmi.jpg?ixlib=rb-1.1.0&rect=22%2C29%2C4917%2C3258&q=45&auto=format&w=926&fit=clip"
    )
    shop_six = Shop(
        owner_id=3,
        shop_name="Silk",
        shop_description="I have a silk farm and produce high-quality silk at very affordable prices.",
        shop_img="https://i.ytimg.com/vi/zvYrAnorq_s/maxresdefault.jpg"
    )


    db.session.add(shop_one)
    db.session.add(shop_two)
    db.session.add(shop_three)
    db.session.add(shop_four)
    db.session.add(shop_five)
    db.session.add(shop_six)


    db.session.commit()

def undo_shops():
    if environment == 'production':
        db.session.execute(f'TRUNCATE table {SCHEMA}.shops RESTART IDENTITY CASCADE;')
    else:
        db.session.execute('DELETE FROM shops')
    db.session.commit()
