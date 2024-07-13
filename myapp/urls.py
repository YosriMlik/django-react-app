from rest_framework import routers
from .api import TodoViewset

router = routers.DefaultRouter()
router.register('todos', TodoViewset, 'todos')

urlpatterns = router.urls