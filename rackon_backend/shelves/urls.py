from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', ShelfListCreateView.as_view(), name='shelf-list-create'),
    path('available/', AvailableShelvesView.as_view(), name='shelf-available'), 
    path('<int:pk>/', ShelfDetailView.as_view(), name='shelf-detail'),
    path('upload-image/', ShelfImageUploadView.as_view(), name='shelf-image-upload'),
    path('images/<int:pk>/delete/', ShelfImageDeleteView.as_view(), name='shelf-image-delete'),
    path('<int:shelf_id>/inventory/', ShelfInventoryListCreateView.as_view(), name='shelf-inventory-list-create'),
    path('inventory/<int:pk>/', ShelfInventoryUpdateView.as_view(), name='shelf-inventory-update'),
    path("brand/active/", BrandActiveShelves.as_view(), name="brand-active-shelves"),
] 
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
