"""empty message

Revision ID: a44586581694
Revises: 8f8bb1c66fae
Create Date: 2020-08-05 23:05:13.244596

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a44586581694'
down_revision = '8f8bb1c66fae'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('countries', sa.Column('latitude', sa.Float(), nullable=True))
    op.add_column('countries', sa.Column('longitude', sa.Float(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('countries', 'longitude')
    op.drop_column('countries', 'latitude')
    # ### end Alembic commands ###