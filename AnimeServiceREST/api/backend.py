from django.contrib.auth import get_user_model
from rest_framework import filters

MyUser = get_user_model()


class UsernameAndUserTag:
    def authenticate(self, request, user=None, password=None, **kwargs):
        try:
            user = MyUser.objects.get(username=user.username, user_tag=user.user_tag)
            if user.check_password(password):
                return user
        except (MyUser.DoesNotExist, AttributeError):
            # Run the default password hasher once to reduce the timing
            # difference between an existing and a nonexistent user (#20760).
            MyUser().set_password(password)
