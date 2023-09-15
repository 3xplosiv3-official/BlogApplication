"""
Initialization Services.

This module provides a utility function to ensure the presence of
an admin user in the system.
If an admin user doesn't exist, it initializes a new admin user with
default credentials.
"""

from app.api.v1.users.models import User
from app.core.config.settings import settings


async def init_default_admin():
    """
    Ensure the presence of an admin user in the system.

    This function checks if a default admin exists.
    If not, it creates a new default admin with credentials from settings.
    """

    admin = await User.get_or_none(
        username=settings.DEFAULT_ADMIN_USERNAME
    )
    if not admin:

        new_admin = await User.create(
            username=settings.DEFAULT_ADMIN_USERNAME,
            status=1,
            hashed_password=settings.DEFAULT_ADMIN_PASSWORD
        )
        new_admin.set_password(settings.DEFAULT_ADMIN_PASSWORD)

        await new_admin.save()

