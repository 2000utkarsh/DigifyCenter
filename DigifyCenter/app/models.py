from django.db import models

# Create your models here.
class Registration(models.Model):
    name = models.CharField(max_length=50)
    contact_number = models.PositiveIntegerField()
    email = models.EmailField()


    def __str__(self):
        return self.name
