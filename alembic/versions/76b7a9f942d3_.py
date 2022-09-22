"""empty message

Revision ID: 76b7a9f942d3
Revises: c0b3ab56f278
Create Date: 2022-09-22 21:30:53.258389

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '76b7a9f942d3'
down_revision = 'c0b3ab56f278'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column('amogus_users', sa.Column('role', sa.String(), server_default='user'))
    op.add_column('amogus_users', sa.Column('profile_img_path_name', sa.String(), server_default='profile_default.jpg'))
    op.add_column('amogus_table', sa.Column('posted_at', sa.TIMESTAMP(timezone=True), server_default=sa.text('now()'), nullable=False))


def downgrade() -> None:
    op.drop_column('amogus_table', 'posted_at')
    op.drop_column('amogus_users', 'profile_img_path_name')
    op.drop_column('amogus_users', 'role')