from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', ShelfListCreateView.as_view(), name='shelf-list-create'),
    path('<int:pk>/', ShelfDetailView.as_view(), name='shelf-detail'),
    path('upload-image/', ShelfImageUploadView.as_view(), name='shelf-image-upload'),
    path('images/<int:pk>/delete/', ShelfImageDeleteView.as_view(), name='shelf-image-delete'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
