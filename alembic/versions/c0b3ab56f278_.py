"""empty message

Revision ID: c0b3ab56f278
Revises: f5592cac08e5
Create Date: 2022-09-02 17:52:03.454510

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c0b3ab56f278'
down_revision = 'f5592cac08e5'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column('amogus_table', sa.Column('path_name', sa.String()))


def downgrade() -> None:
    op.drop_column('amogus_table', 'path_name')
