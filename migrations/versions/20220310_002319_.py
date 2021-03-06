"""empty message

Revision ID: ea61effd1098
Revises: 
Create Date: 2022-03-10 00:23:19.316977

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ea61effd1098'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('notifications',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('sender', sa.Integer(), nullable=False),
    sa.Column('message', sa.String(length=300), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('link', sa.String(length=255), nullable=False),
    sa.Column('read', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('f_name', sa.String(length=100), nullable=False),
    sa.Column('l_name', sa.String(length=100), nullable=False),
    sa.Column('avatar', sa.String(length=3000), nullable=True),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('bio', sa.String(length=750), nullable=True),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('saved', sa.ARRAY(sa.Integer()), nullable=True),
    sa.Column('user_tags', sa.ARRAY(sa.Integer()), nullable=True),
    sa.Column('lat', sa.Float(), nullable=True),
    sa.Column('long', sa.Float(), nullable=True),
    sa.Column('private', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('channels',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user1_id', sa.Integer(), nullable=False),
    sa.Column('user2_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user1_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['user2_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('follows',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('follower_id', sa.Integer(), nullable=False),
    sa.Column('following_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['follower_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['following_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('posts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('album_id', sa.Integer(), nullable=True),
    sa.Column('img_url', sa.String(length=255), nullable=False),
    sa.Column('caption', sa.String(length=500), nullable=False),
    sa.Column('lat', sa.Float(), nullable=True),
    sa.Column('long', sa.Float(), nullable=True),
    sa.Column('tags', sa.ARRAY(sa.String(length=100)), nullable=True),
    sa.Column('createdAt', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('post_id', sa.Integer(), nullable=False),
    sa.Column('body', sa.String(length=300), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['post_id'], ['posts.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('likes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('post_id', sa.Integer(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['post_id'], ['posts.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('messages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('sender_id', sa.Integer(), nullable=False),
    sa.Column('receiver_id', sa.Integer(), nullable=False),
    sa.Column('message', sa.Text(), nullable=False),
    sa.Column('dm_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['dm_id'], ['channels.id'], ),
    sa.ForeignKeyConstraint(['receiver_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['sender_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('messages')
    op.drop_table('likes')
    op.drop_table('comments')
    op.drop_table('posts')
    op.drop_table('follows')
    op.drop_table('channels')
    op.drop_table('users')
    op.drop_table('notifications')
    # ### end Alembic commands ###
