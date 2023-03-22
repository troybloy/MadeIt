from flask.cli import AppGroup
from .users import seed_users, undo_users
from .shops import seed_shops, undo_shops
from .items import seed_items, undo_items

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    # Add other seed functions here
    seed_shops()
    seed_items()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_items()
    undo_shops()
    undo_users()
    # Add other undo functions here
