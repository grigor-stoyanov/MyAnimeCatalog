from random import choice

from django.contrib import auth
from django.contrib.auth import base_user
from django.contrib.auth.hashers import make_password


class AnimeUserManager(base_user.BaseUserManager):
    use_in_migrations = True

    def generate_new_tag(self, username):
        """
        Generate a set of unique and random username#user_tag combination.
        """
        tags = set(range(1000, 9999))
        taken_tags = set(self.model.objects.filter(username=username).values_list('user_tag', flat=True))
        return choice(list(tags - taken_tags))

    def _create_user(self, username, password, **extra_fields):
        """
        Create and save a user with the given username,user_tag, and password.
        """
        if not username:
            raise ValueError('The given username must be set')
        user = self.model(username=username, user_tag=self.generate_new_tag(username), **extra_fields)
        user.password = make_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(username, password, **extra_fields)

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(username, password, **extra_fields)

    def with_perm(self, perm, is_active=True, include_superusers=True, backend=None, obj=None):
        if backend is None:
            backends = auth._get_backends(return_tuples=True)
            if len(backends) == 1:
                backend, _ = backends[0]
            else:
                raise ValueError(
                    'You have multiple authentication backends configured and '
                    'therefore must provide the `backend` argument.'
                )
        elif not isinstance(backend, str):
            raise TypeError(
                'backend must be a dotted import path string (got %r).'
                % backend
            )
        else:
            backend = auth.load_backend(backend)
        if hasattr(backend, 'with_perm'):
            return backend.with_perm(
                perm,
                is_active=is_active,
                include_superusers=include_superusers,
                obj=obj,
            )
        return self.none()
