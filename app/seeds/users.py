from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
         first_name='Demo', last_name='User', email='demo@user.com', username='demo', password='password')
    john = User(
        first_name='John', last_name='Smith', email='johnsmith@user.com', username='johnsmith', password='password')
    jane = User(
        first_name='Jane', last_name='Doe', email='janedoe@user.com', username='janedoe', password='password')

    db.session.add(demo)
    db.session.add(john)
    db.session.add(jane)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    if environment == 'production':
        db.session.execute(f'TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;')
    else:
        db.session.execute('DELETE FROM users')
    db.session.commit()
