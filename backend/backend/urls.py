from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('project', ProjectViewSet, basename='project')
router.register('projectManager', ProjectManagerViewSet, basename='projectManager')
router.register('employees', EmployeesViewSet, basename='employees')
urlpatterns = router.urls