"""empty message

Revision ID: f5592cac08e5
Revises: 09ae3d48ffd9
Create Date: 2022-08-26 14:32:19.203341

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f5592cac08e5'
down_revision = '09ae3d48ffd9'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.alter_column('amogus_table', 'sussy', nullable=False, new_column_name='Title')


def downgrade() -> None:
    op.alter_column('amogus_table', 'Title', nullable=False, new_column_name='sussy')
