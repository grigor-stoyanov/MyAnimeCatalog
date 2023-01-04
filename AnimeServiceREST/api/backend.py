from django.contrib.auth import get_user_model

MyUser = get_user_model()


class UsernameAndUserTag:
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = MyUser.objects.get(username=username.username, user_tag=username.user_tag)
            if user.check_password(password):
                return user
        except MyUser.DoesNotExist:
            # Run the default password hasher once to reduce the timing
            # difference between an existing and a nonexistent user (#20760).
            MyUser().set_password(password)
