from django.db import models

class ProjectManager(models.Model):
    name = models.CharField(unique=True, max_length=100)
    created = models.DateTimeField(auto_now_add=True) #Cuando se crea la fila, pone autoamticamente la fecha y hora
    modified = models.DateTimeField(auto_now=True) #Cuando se modifica la fila, actualiza la fecha y hora
    
    
    def __str__(self):
        return self.name

class Employees(models.Model):
    name = models.CharField(unique=True, max_length=100)
    created = models.DateTimeField(auto_now_add=True) #Cuando se crea la fila, pone autoamticamente la fecha y hora
    modified = models.DateTimeField(auto_now=True) #Cuando se modifica la fila, actualiza la fecha y hora
    
    
    def __str__(self):
        return self.name

class Project(models.Model):
    name = models.CharField(unique=True, max_length=100)
    employees = models.ManyToManyField(Employees)
    projectManager = models.ForeignKey(ProjectManager, on_delete=models.CASCADE, blank=True, null=True)
    start_date = models.DateField()
    end_date = models.DateField()
    comments = models.CharField(max_length=500, blank=True, null=True)
    status = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True) #Cuando se crea la fila, pone autoamticamente la fecha y hora
    modified = models.DateTimeField(auto_now=True) #Cuando se modifica la fila, actualiza la fecha y hora
    
    
    def __str__(self):
        return self.name