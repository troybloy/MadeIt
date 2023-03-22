from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
         first_name='Willard', last_name='Marett', email='demo@aa.io', username='Demo', password='password')
    jules = User(
        first_name='Julius', last_name='Caesar', email='ettubrute@aa.io', username='jules', password='password')
    coolstoic = User(
        first_name='Marcus', last_name='Aurelius', email='markaurelius@aa.io', username='CoolStoic', password='password')

    db.session.add(demo)
    db.session.add(jules)
    db.session.add(coolstoic)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
